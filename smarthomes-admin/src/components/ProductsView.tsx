import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Copy, 
  Eye, 
  Filter, 
  ChevronDown, 
  MoreHorizontal, 
  Sparkles, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  EyeOff,
  Sliders,
  Check,
  X,
  RefreshCw,
  TrendingDown,
  Loader2
} from 'lucide-react';
import { 
  getProducts, 
  getProductsDirect,
  getCategories, 
  addProduct, 
  updateProduct, 
  deleteProduct,
  subscribeToDBChanges,
  globalSyncError
} from '../utils/db';
import { Product, Category, ProductVariant } from '../types';

export default function ProductsView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Search, Filter, Sort States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedFeatured, setSelectedFeatured] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Bulk Selection States
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkConfirmOpen, setIsBulkConfirmOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState<'delete' | 'activate' | 'deactivate' | 'feature' | 'unfeature' | null>(null);

  // Form Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Detail Modal States
  const [selectedViewProduct, setSelectedViewProduct] = useState<Product | null>(null);

  // Form Fields State
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formBrand, setFormBrand] = useState('');
  const [formCategoryId, setFormCategoryId] = useState('');
  const [formShortDescription, setFormShortDescription] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPrice, setFormPrice] = useState(0);
  const [formOriginalPrice, setFormOriginalPrice] = useState(0);
  const [formStock, setFormStock] = useState(0);
  const [formStatus, setFormStatus] = useState<Product['status']>('Active');
  const [formFeatured, setFormFeatured] = useState(false);
  const [formCataloguePage, setFormCataloguePage] = useState<number>(0);
  const [formImages, setFormImages] = useState<string[]>(['']);
  const [formVariants, setFormVariants] = useState<ProductVariant[]>([]);
  
  // Features, specifications lists helper
  const [formFeatures, setFormFeatures] = useState<string>('');
  const [formSpecs, setFormSpecs] = useState<{ key: string; val: string }[]>([]);

  // Alert notification states
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Single Delete Confirmation
  const [singleDeleteId, setSingleDeleteId] = useState<string | null>(null);

  // Load Data and pagination/sync states
  const [loading, setLoading] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const isLoadingRef = useRef(false);

  const loadData = async () => {
    if (globalSyncError) {
      setFirebaseError(globalSyncError);
    } else {
      setFirebaseError(null);
    }

    // 1. Instantly pull from the offline-first localStorage cache
    const cachedProducts = getProducts();
    setProducts(cachedProducts);
    setCategories(getCategories());

    // 2. Only run a background query to fill cache if we have zero products loaded
    if (cachedProducts.length === 0) {
      if (isLoadingRef.current) {
        console.log('Skipping concurrent loadData call');
        return;
      }
      isLoadingRef.current = true;
      setLoading(true);
      setFirebaseError(null);
      try {
        const prods = await getProductsDirect();
        setProducts(prods);
      } catch (err: any) {
        console.error('Failed to query products from Firestore:', err);
        setFirebaseError(err?.message || 'Failed to sync with cloud database.');
      } finally {
        setLoading(false);
        isLoadingRef.current = false;
      }
    }
  };

  useEffect(() => {
    loadData();
    const unsubscribe = subscribeToDBChanges(() => {
      loadData();
    });
    return unsubscribe;
  }, []);

  // Reset page to 1 when any filter changes to prevent empty page states
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedBrand, selectedStatus, selectedFeatured, sortBy]);

  // Show customized toast
  const triggerToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Autogenerate Slug & SKU
  useEffect(() => {
    if (modalMode === 'add') {
      const generatedSlug = formName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormSlug(generatedSlug);

      if (formName && formBrand) {
        const brandCode = formBrand.substring(0, 3).toUpperCase();
        const randNum = Math.floor(100 + Math.random() * 900);
        setFormSku(`KSH-${brandCode}-${randNum}`);
      }
    }
  }, [formName, formBrand, modalMode]);

  // Handle Price Changes Auto discount
  const calculatedDiscount = () => {
    if (formOriginalPrice <= 0 || formPrice <= 0) return 0;
    if (formPrice >= formOriginalPrice) return 0;
    const pct = ((formOriginalPrice - formPrice) / formOriginalPrice) * 100;
    return parseFloat(pct.toFixed(2));
  };

  // Filters & Sorting calculations
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
    const matchesBrand = selectedBrand === 'all' || product.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    const matchesFeatured = 
      selectedFeatured === 'all' || 
      (selectedFeatured === 'yes' && product.featured) || 
      (selectedFeatured === 'no' && !product.featured);

    return matchesSearch && matchesCategory && matchesBrand && matchesStatus && matchesFeatured;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    // Default: 'newest'
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Calculate pagination window
  const totalPages = Math.ceil(sortedProducts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + pageSize);

  // Extract unique brands for filter list
  const uniqueBrands = Array.from(new Set(products.map(p => p.brand))).filter(Boolean);

  // Selection Logic
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(sortedProducts.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // CRUD Actions
  const handleDeleteConfirm = (id: string) => {
    setSingleDeleteId(id);
  };

  const handleExecuteDelete = async () => {
    if (singleDeleteId) {
      try {
        await deleteProduct(singleDeleteId);
        triggerToast('Product deleted from database successfully.');
      } catch (err: any) {
        triggerToast(`Deletion failed: ${err.message}`, 'error');
      } finally {
        setSingleDeleteId(null);
        loadData();
      }
    }
  };

  const handleDuplicate = async (p: Product) => {
    const duplicated: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
      name: `${p.name} (Copy)`,
      slug: `${p.slug}-copy`,
      sku: `${p.sku}-DUP`,
      brand: p.brand,
      categoryId: p.categoryId,
      shortDescription: p.shortDescription,
      description: p.description,
      images: [...p.images],
      price: p.price,
      originalPrice: p.originalPrice,
      discountPercentage: p.discountPercentage,
      stock: p.stock,
      status: 'Draft', // default duplication to draft
      featured: false,
      cataloguePage: p.cataloguePage,
      features: p.features ? [...p.features] : [],
      specifications: p.specifications ? { ...p.specifications } : {},
      variants: p.variants.map(v => ({
        ...v,
        id: `var-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        sku: `${v.sku}-DUP`
      }))
    };
    try {
      await addProduct(duplicated);
      triggerToast('Product duplicated as Draft successfully.');
    } catch (err: any) {
      triggerToast(`Duplication failed: ${err.message}`, 'error');
    } finally {
      loadData();
    }
  };

  const handleToggleStatus = async (p: Product) => {
    const newStatus: Product['status'] = p.status === 'Active' ? 'Inactive' : 'Active';
    try {
      await updateProduct(p.id, { status: newStatus });
      triggerToast(`Product status toggled to ${newStatus}.`);
    } catch (err: any) {
      triggerToast(`Failed to update status: ${err.message}`, 'error');
    } finally {
      loadData();
    }
  };

  // Bulk Actions
  const handleOpenBulkConfirm = (action: typeof bulkAction) => {
    setBulkAction(action);
    setIsBulkConfirmOpen(true);
  };

  const handleExecuteBulkAction = async () => {
    if (!bulkAction || selectedIds.length === 0) return;

    try {
      triggerToast(`Executing bulk operation on ${selectedIds.length} items...`);
      const promises = selectedIds.map(async (id) => {
        if (bulkAction === 'delete') {
          await deleteProduct(id);
        } else if (bulkAction === 'activate') {
          await updateProduct(id, { status: 'Active' });
        } else if (bulkAction === 'deactivate') {
          await updateProduct(id, { status: 'Inactive' });
        } else if (bulkAction === 'feature') {
          await updateProduct(id, { featured: true });
        } else if (bulkAction === 'unfeature') {
          await updateProduct(id, { featured: false });
        }
      });
      await Promise.all(promises);
      triggerToast(`Bulk operation executed successfully on ${selectedIds.length} items.`);
    } catch (err: any) {
      triggerToast(`Bulk operation failed: ${err.message}`, 'error');
    } finally {
      setSelectedIds([]);
      setIsBulkConfirmOpen(false);
      setBulkAction(null);
      loadData();
    }
  };

  // Form Operations
  const handleOpenAdd = () => {
    setModalMode('add');
    setEditingId(null);
    
    // Clear Form Fields
    setFormName('');
    setFormSlug('');
    setFormSku('');
    setFormBrand('K Smart Homes');
    setFormCategoryId('');
    setFormShortDescription('');
    setFormDescription('');
    setFormPrice(0);
    setFormOriginalPrice(0);
    setFormStock(0);
    setFormStatus('Active');
    setFormFeatured(false);
    setFormCataloguePage(0);
    setFormImages(['https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80']);
    setFormVariants([]);
    setFormFeatures('');
    setFormSpecs([]);

    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setModalMode('edit');
    setEditingId(p.id);

    // Populate Fields
    setFormName(p.name);
    setFormSlug(p.slug);
    setFormSku(p.sku);
    setFormBrand(p.brand);
    setFormCategoryId(p.categoryId);
    setFormShortDescription(p.shortDescription);
    setFormDescription(p.description);
    setFormPrice(p.price);
    setFormOriginalPrice(p.originalPrice);
    setFormStock(p.stock);
    setFormStatus(p.status);
    setFormFeatured(p.featured);
    setFormCataloguePage(p.cataloguePage || 0);
    setFormImages(p.images && p.images.length > 0 ? [...p.images] : ['']);
    setFormVariants(p.variants ? [...p.variants] : []);
    setFormFeatures(p.features ? p.features.join('\n') : '');
    
    // Convert specs object to array
    const specsArr = p.specifications 
      ? Object.entries(p.specifications).map(([key, val]) => ({ key, val }))
      : [];
    setFormSpecs(specsArr);

    setIsModalOpen(true);
  };

  // Form Array Field Helpers
  const handleAddImageUrl = () => {
    setFormImages(prev => [...prev, '']);
  };

  const handleImageChange = (idx: number, val: string) => {
    setFormImages(prev => {
      const copy = [...prev];
      copy[idx] = val;
      return copy;
    });
  };

  const handleRemoveImage = (idx: number) => {
    setFormImages(prev => prev.filter((_, i) => i !== idx));
  };

  // Spec Field Helpers
  const handleAddSpec = () => {
    setFormSpecs(prev => [...prev, { key: '', val: '' }]);
  };

  const handleSpecChange = (idx: number, field: 'key' | 'val', value: string) => {
    setFormSpecs(prev => {
      const copy = [...prev];
      copy[idx][field] = value;
      return copy;
    });
  };

  const handleRemoveSpec = (idx: number) => {
    setFormSpecs(prev => prev.filter((_, i) => i !== idx));
  };

  // Variant Field Helpers
  const handleAddVariant = () => {
    const newVariant: ProductVariant = {
      id: `var-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: 'Custom Finish Variant',
      sku: `${formSku || 'KSH'}-VAR-${formVariants.length + 1}`,
      price: formPrice || 0,
      originalPrice: formOriginalPrice || 0,
      stock: 5,
      smart: true,
      colour: 'Standard',
      material: 'Metallic'
    };
    setFormVariants(prev => [...prev, newVariant]);
  };

  const handleVariantChange = (idx: number, fields: Partial<ProductVariant>) => {
    setFormVariants(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], ...fields };
      return copy;
    });
  };

  const handleRemoveVariant = (idx: number) => {
    setFormVariants(prev => prev.filter((_, i) => i !== idx));
  };

  // Save/Submit Form handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("SAVE: started");

    // Reset error log to prevent state confusion
    setFirebaseError(null);

    // STEP 4 - Temporary Debugging output
    console.log('--- PRODUCT FORM SUBMISSION STATE DEBUG ---');
    console.log('formName (Product Display Name):', formName);
    console.log('formSku (Unique Model SKU):', formSku);
    console.log('formBrand (Manufacturer Brand):', formBrand);
    console.log('formCategoryId (React State Variable):', formCategoryId);
    console.log('systemCategory / categoryId / systemCategoryId:', formCategoryId);
    console.log('Categories currently loaded in state:', categories);
    console.log('-------------------------------------------');

    // 1. Product Display Name Validation
    if (!formName.trim()) {
      triggerToast('Validation Failure: Product Display Name is required.', 'error');
      return;
    }

    // 2. Model SKU Validation
    if (!formSku.trim()) {
      triggerToast('Validation Failure: Unique Model SKU is required.', 'error');
      return;
    }

    // 3. Manufacturer Brand Validation
    if (!formBrand.trim()) {
      triggerToast('Validation Failure: Manufacturer Brand is required.', 'error');
      return;
    }

    // 4. System Category Validation
    if (!formCategoryId) {
      triggerToast('Validation Failure: System Category selection is required.', 'error');
      return;
    }

    // 5. Short Description Validation
    if (!formShortDescription.trim()) {
      triggerToast('Validation Failure: Teaser Short Description is required.', 'error');
      return;
    }

    // 6. Full Description Validation
    if (!formDescription.trim()) {
      triggerToast('Validation Failure: Full Detailed Product Description is required.', 'error');
      return;
    }

    // 7. Original Price Validation
    if (formOriginalPrice === undefined || formOriginalPrice === null || isNaN(formOriginalPrice) || formOriginalPrice < 0) {
      triggerToast('Validation Failure: Original Price must be a valid non-negative number.', 'error');
      return;
    }

    // 8. Selling Price Validation
    if (formPrice === undefined || formPrice === null || isNaN(formPrice) || formPrice < 0) {
      triggerToast('Validation Failure: Selling Price must be a valid non-negative number.', 'error');
      return;
    }

    // 9. Pricing Logical Verification
    if (formPrice > formOriginalPrice) {
      triggerToast('Validation Failure: Selling Price cannot exceed the Original Price.', 'error');
      return;
    }

    // 10. Warehouse Stock Validation
    if (formStock === undefined || formStock === null || isNaN(formStock) || formStock < 0) {
      triggerToast('Validation Failure: Stock level must be a non-negative count.', 'error');
      return;
    }

    console.log("SAVE: validation passed");

    // Convert specs array back to record object
    const specsRecord: Record<string, string> = {};
    formSpecs.forEach(s => {
      if (s.key.trim()) {
        specsRecord[s.key.trim()] = s.val.trim();
      }
    });

    const parsedFeatures = formFeatures
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const validImages = formImages.map(img => img.trim()).filter(img => img.length > 0);

    const productPayload: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
      name: formName.trim(),
      slug: formSlug.trim(),
      sku: formSku.trim(),
      brand: formBrand.trim(),
      categoryId: formCategoryId,
      shortDescription: formShortDescription.trim(),
      description: formDescription.trim(),
      images: validImages.length > 0 ? validImages : ['https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80'],
      price: formPrice,
      originalPrice: formOriginalPrice,
      discountPercentage: calculatedDiscount(),
      stock: formStock,
      status: formStatus,
      featured: formFeatured,
      cataloguePage: Number(formCataloguePage) || 0,
      features: parsedFeatures,
      variants: formVariants && formVariants.length > 0 ? formVariants : [],
      // If technical specifications are empty, skip processing completely
      ...(Object.keys(specsRecord).length > 0 ? { specifications: specsRecord } : {})
    };

    setSubmittingForm(true);
    try {
      if (modalMode === 'add') {
        // Prevent SKU duplication on create
        const exists = products.find(p => p.sku.toLowerCase() === formSku.trim().toLowerCase());
        if (exists) {
          triggerToast(`Validation Failure: A product with SKU ${formSku} already exists. SKU must be unique.`, 'error');
          setSubmittingForm(false);
          return;
        }

        console.log("SAVE: product Firestore write started");
        await addProduct(productPayload);
        console.log("SAVE: product Firestore write completed");
      } else {
        if (editingId) {
          console.log("SAVE: product Firestore write started");
          await updateProduct(editingId, productPayload);
          console.log("SAVE: product Firestore write completed");
        }
      }

      console.log("SAVE: variants started");
      // Check if variants exist or are empty
      if (formVariants && formVariants.length > 0) {
        console.log("SAVE: variants are configured", formVariants);
      } else {
        console.log("SAVE: variants are empty (skipped)");
      }
      console.log("SAVE: variants completed");

      console.log("SAVE: technical specs started");
      // Check if specs exist or are empty
      if (Object.keys(specsRecord).length > 0) {
        console.log("SAVE: technical specs are configured", specsRecord);
      } else {
        console.log("SAVE: technical specs are empty (skipped)");
      }
      console.log("SAVE: technical specs completed");
      
      console.log("SAVE: refresh started");
      // Update/re-fetch Admin product list
      await loadData();
      console.log("SAVE: refresh completed");
      
      // Close product form OR return to product list
      setIsModalOpen(false);
      
      // Show success message
      triggerToast('Product saved successfully.');
    } catch (err: any) {
      console.error('Firestore Product Save Operation Rejected:', err);
      const exactErrorMsg = err?.message || err?.toString() || 'Permission denied or Firestore configuration mismatch.';
      triggerToast(`Firebase Error: ${exactErrorMsg}`, 'error');
    } finally {
      console.log("SAVE: setting saving false");
      setSubmittingForm(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6" id="products-view-panel">
      {/* Toast Alert Indicator */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border font-semibold text-sm animate-bounce
          ${toastType === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}
        `} id="toast-notification">
          {toastType === 'success' ? <CheckCircle className="w-5 h-5 text-green-600" /> : <AlertTriangle className="w-5 h-5 text-red-600" />}
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top action header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-gray-800">Products Catalogue</h2>
            <span className="bg-indigo-50 text-indigo-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-indigo-100 uppercase animate-pulse" id="firestore-product-count-badge">
              {products.length} Products in Firestore
            </span>
          </div>
          <p className="text-xs text-gray-400 font-medium">Add, modify, duplicate, or delete physical inventory specs</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md shadow-indigo-600/15 cursor-pointer"
          id="btn-add-product"
        >
          <Plus className="w-4 h-4" /> ADD NEW PRODUCT
        </button>
      </div>

      {/* Database Filters Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-4">
        {/* Search and Sorting Row */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name, SKU model, brand, description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-sm placeholder-gray-400"
              id="search-input"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-gray-500 uppercase shrink-0">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2.5 pl-3 pr-8 border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-xs font-semibold text-gray-700 bg-white"
            >
              <option value="newest">Newest Added</option>
              <option value="oldest">Oldest Added</option>
              <option value="name">Alphabetical (A-Z)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Detailed Filters Dropdowns Row */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-gray-50 text-xs font-semibold text-gray-700">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="uppercase tracking-wider text-[10px] text-gray-400 font-bold">Filters:</span>
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden text-xs"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          {/* Brand Dropdown */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden text-xs"
          >
            <option value="all">All Brands</option>
            {uniqueBrands.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          {/* Status Dropdown */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden text-xs"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Draft">Draft</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          {/* Featured Dropdown */}
          <select
            value={selectedFeatured}
            onChange={(e) => setSelectedFeatured(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden text-xs"
          >
            <option value="all">Featured: All</option>
            <option value="yes">Featured ON</option>
            <option value="no">Featured OFF</option>
          </select>

          {(searchQuery || selectedCategory !== 'all' || selectedBrand !== 'all' || selectedStatus !== 'all' || selectedFeatured !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedBrand('all');
                setSelectedStatus('all');
                setSelectedFeatured('all');
              }}
              className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 rounded-lg flex items-center gap-1.5 cursor-pointer font-bold"
            >
              <X className="w-3.5 h-3.5" /> Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Bulk Action Controls */}
      {selectedIds.length > 0 && (
        <div className="bg-indigo-50 border border-indigo-100 px-5 py-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs animate-pulse">
          <div className="text-xs font-semibold text-indigo-800">
            Selected <span className="font-extrabold text-indigo-950">{selectedIds.length} products</span>. Apply batch changes:
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleOpenBulkConfirm('activate')}
              className="px-3 py-1.5 bg-white hover:bg-gray-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold rounded-lg cursor-pointer uppercase"
            >
              Activate
            </button>
            <button
              onClick={() => handleOpenBulkConfirm('deactivate')}
              className="px-3 py-1.5 bg-white hover:bg-gray-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold rounded-lg cursor-pointer uppercase"
            >
              Deactivate
            </button>
            <button
              onClick={() => handleOpenBulkConfirm('feature')}
              className="px-3 py-1.5 bg-white hover:bg-gray-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold rounded-lg cursor-pointer uppercase"
            >
              Mark Featured
            </button>
            <button
              onClick={() => handleOpenBulkConfirm('unfeature')}
              className="px-3 py-1.5 bg-white hover:bg-gray-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold rounded-lg cursor-pointer uppercase"
            >
              Remove Featured
            </button>
            <button
              onClick={() => handleOpenBulkConfirm('delete')}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white border border-red-500 text-[10px] font-bold rounded-lg cursor-pointer uppercase shadow-xs"
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Main Table Content Container */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-4 text-gray-500 font-semibold" id="loading-spinner-panel">
            <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
            <p className="text-xs tracking-wider uppercase text-gray-400">Syncing with live Firestore catalog...</p>
          </div>
        ) : firebaseError ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3 text-red-500 font-semibold border border-red-100 bg-red-50/10" id="error-alert-panel">
            <AlertTriangle className="w-8 h-8 text-red-600 animate-bounce" />
            <p className="text-sm">Firestore Sync Failed</p>
            <p className="text-xs font-normal text-gray-400 max-w-md text-center">{firebaseError}</p>
            <button 
              onClick={loadData}
              className="mt-2 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-lg shadow-xs cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {sortedProducts.length === 0 ? (
              <div className="p-12 text-center text-gray-400 font-medium">
                No products found matching the search criteria.
              </div>
            ) : (
              <table className="w-full text-left border-collapse" id="products-data-table">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                    <th className="py-3.5 px-5 text-center w-12">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedIds.length === sortedProducts.length && sortedProducts.length > 0}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </th>
                    <th className="py-3.5 px-4 w-16">Image</th>
                    <th className="py-3.5 px-4">Product Name</th>
                    <th className="py-3.5 px-4">SKU / Brand</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price / Discount</th>
                    <th className="py-3.5 px-4 text-center">Stock</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-center">Featured</th>
                    <th className="py-3.5 px-4 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-600">
                  {paginatedProducts.map(p => {
                    const hasDiscount = p.discountPercentage > 0;
                    const isLowStock = p.stock <= 10;
                    return (
                      <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-5 text-center">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(p.id)}
                            onChange={() => handleSelectOne(p.id)}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </td>
                        <td className="py-4 px-4">
                          <img
                            src={p.images[0] || 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80'}
                            alt={p.name}
                            className="w-10 h-10 object-cover rounded-lg bg-gray-50 border border-gray-200"
                            referrerPolicy="no-referrer"
                          />
                        </td>
                        <td className="py-4 px-4 max-w-[200px]">
                          <p className="font-bold text-gray-800 break-words leading-tight">{p.name}</p>
                          {p.cataloguePage ? (
                            <span className="text-[9px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-sm font-semibold tracking-wide">
                              Cat. Page {p.cataloguePage}
                            </span>
                          ) : null}
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-mono text-gray-800 font-semibold">{p.sku}</p>
                          <p className="text-[10px] text-gray-400">{p.brand}</p>
                        </td>
                        <td className="py-4 px-4 capitalize font-semibold text-gray-500">
                          {categories.find(c => c.id === p.categoryId)?.name || p.categoryId.replace('-', ' ')}
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-gray-800">{formatCurrency(p.price)}</p>
                          {hasDiscount ? (
                            <p className="text-[10px] text-red-500 font-bold">
                              <span className="line-through text-gray-400 font-medium mr-1">{formatCurrency(p.originalPrice)}</span>
                              {p.discountPercentage}% OFF
                            </p>
                          ) : (
                            <p className="text-[10px] text-gray-400">Regular Price</p>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <p className={`font-extrabold ${p.stock === 0 ? 'text-red-600' : isLowStock ? 'text-yellow-600' : 'text-gray-800'}`}>
                            {p.stock}
                          </p>
                          {p.stock === 0 ? (
                            <span className="text-[8px] bg-red-50 text-red-600 border border-red-100 px-1 rounded font-bold uppercase tracking-wide">Empty</span>
                          ) : isLowStock ? (
                            <span className="text-[8px] bg-yellow-50 text-yellow-700 border border-yellow-100 px-1 rounded font-bold uppercase tracking-wide">Low</span>
                          ) : null}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border
                            ${p.status === 'Active' ? 'bg-green-50 border-green-200 text-green-700' : 
                              p.status === 'Out of Stock' ? 'bg-red-50 border-red-200 text-red-700' :
                              'bg-gray-100 border-gray-200 text-gray-500'}
                          `}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={async () => {
                              try {
                                await updateProduct(p.id, { featured: !p.featured });
                                triggerToast(`Product featured setting toggled.`);
                                loadData();
                              } catch (err: any) {
                                triggerToast(`Failed to toggle featured status: ${err.message}`, 'error');
                              }
                            }}
                            className={`w-7 h-7 rounded-full flex items-center justify-center border font-bold transition-colors cursor-pointer mx-auto
                              ${p.featured 
                                ? 'bg-yellow-50 border-yellow-300 text-yellow-600 hover:bg-yellow-100' 
                                : 'bg-gray-50 border-gray-200 text-gray-300 hover:bg-gray-100'
                              }
                            `}
                            title="Toggle Featured Setting"
                          >
                            ★
                          </button>
                        </td>
                        <td className="py-4 px-4 text-right pr-6">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedViewProduct(p)}
                              className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-md hover:bg-gray-100 cursor-pointer"
                              title="Quick View Details"
                            >
                              <Eye className="w-4.5 h-4.5" />
                            </button>
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-md hover:bg-gray-100 cursor-pointer"
                              title="Edit"
                            >
                              <Edit3 className="w-4.5 h-4.5" />
                            </button>
                            <button
                              onClick={() => handleDuplicate(p)}
                              className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-md hover:bg-gray-100 cursor-pointer"
                              title="Duplicate"
                            >
                              <Copy className="w-4.5 h-4.5" />
                            </button>
                            <button
                              onClick={() => handleToggleStatus(p)}
                              className={`p-1.5 rounded-md hover:bg-gray-100 cursor-pointer ${p.status === 'Active' ? 'text-gray-400 hover:text-yellow-600' : 'text-green-500 hover:text-green-700'}`}
                              title={p.status === 'Active' ? 'Deactivate/Disable' : 'Activate/Enable'}
                            >
                              {p.status === 'Active' ? <EyeOff className="w-4.5 h-4.5" /> : <Check className="w-4.5 h-4.5" />}
                            </button>
                            <button
                              onClick={() => handleDeleteConfirm(p.id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 cursor-pointer"
                              title="Delete Permanently"
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      {!loading && !firebaseError && sortedProducts.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs" id="pagination-footer">
          <div className="text-xs text-gray-500 font-semibold">
            Showing <span className="text-gray-800 font-extrabold">{startIndex + 1}</span> to{' '}
            <span className="text-gray-800 font-extrabold">
              {Math.min(startIndex + pageSize, sortedProducts.length)}
            </span>{' '}
            of <span className="text-gray-800 font-extrabold">{sortedProducts.length}</span> filtered products{' '}
            <span className="text-gray-400 font-medium">({products.length} total in cloud)</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Page Size Select */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase text-gray-400 font-bold">Rows Per Page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="py-1.5 px-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 bg-gray-50"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>

            {/* Next/Prev Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed cursor-pointer font-bold text-xs"
              >
                ◀ Prev
              </button>
              <div className="text-xs font-bold text-gray-700 px-2">
                Page {currentPage} of {totalPages || 1}
              </div>
              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed cursor-pointer font-bold text-xs"
              >
                Next ▶
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SINGLE DELETE CONFIRMATION DIALOG */}
      {singleDeleteId && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="delete-confirmation-dialog">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-gray-100 shadow-2xl text-center space-y-5">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto border border-red-100">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-800">Delete Product Permanently?</h3>
              <p className="text-xs text-gray-400 font-medium mt-1 leading-snug">
                This action cannot be undone. Any transaction lists or order items referencing this product ID will maintain static details, but the item will disappear from public catalogues.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSingleDeleteId(null)}
                className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer transition-colors"
              >
                No, Keep Product
              </button>
              <button
                onClick={handleExecuteDelete}
                className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl cursor-pointer transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BULK CONFIRMATION DIALOG */}
      {isBulkConfirmOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="bulk-confirmation-dialog">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-gray-100 shadow-2xl text-center space-y-5">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto border border-indigo-100">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-800 capitalize">Execute Batch {bulkAction}?</h3>
              <p className="text-xs text-gray-400 font-medium mt-1 leading-snug">
                Are you absolutely sure you want to perform this action on <span className="font-extrabold text-indigo-600">{selectedIds.length} products</span> at once? This will write directly to the database and update the public website.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setIsBulkConfirmOpen(false);
                  setBulkAction(null);
                }}
                className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteBulkAction}
                className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer transition-colors shadow-sm"
              >
                Execute Batch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK VIEW DETAILS MODAL */}
      {selectedViewProduct && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto" id="product-detail-modal">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-gray-100 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            {/* Image Slider / Static Panel */}
            <div className="md:w-1/2 bg-gray-50 flex flex-col p-6 items-center justify-center border-r border-gray-100 min-h-[300px]">
              <img
                src={selectedViewProduct.images[0]}
                alt={selectedViewProduct.name}
                className="w-full h-64 object-cover rounded-2xl shadow-md border border-gray-200"
                referrerPolicy="no-referrer"
              />
              <div className="flex gap-2 mt-4 overflow-x-auto w-full justify-center">
                {selectedViewProduct.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="gallery"
                    className="w-12 h-12 object-cover rounded-lg border border-gray-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
            </div>

            {/* Info Panel */}
            <div className="md:w-1/2 p-6 overflow-y-auto space-y-4 text-xs font-medium text-gray-600 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-indigo-50 border border-indigo-200 rounded-full text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                    {categories.find(c => c.id === selectedViewProduct.categoryId)?.name || selectedViewProduct.categoryId.replace('-', ' ')}
                  </span>
                  <span className="font-mono text-[10px] text-gray-400 font-bold">PAGE: {selectedViewProduct.cataloguePage || 'N/A'}</span>
                </div>

                <h3 className="text-lg font-black text-gray-800 leading-tight">{selectedViewProduct.name}</h3>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-gray-800">{formatCurrency(selectedViewProduct.price)}</span>
                  {selectedViewProduct.discountPercentage > 0 && (
                    <>
                      <span className="line-through text-gray-400 font-bold">{formatCurrency(selectedViewProduct.originalPrice)}</span>
                      <span className="text-red-500 font-extrabold">{selectedViewProduct.discountPercentage}% OFF</span>
                    </>
                  )}
                </div>

                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-[11px] space-y-1">
                  <p className="flex justify-between"><span className="text-gray-400">SKU Code:</span> <span className="font-mono text-gray-800 font-bold">{selectedViewProduct.sku}</span></p>
                  <p className="flex justify-between"><span className="text-gray-400">Manufacturer Brand:</span> <span className="text-gray-800 font-bold">{selectedViewProduct.brand}</span></p>
                  <p className="flex justify-between"><span className="text-gray-400">In Stock Qty:</span> <span className="text-gray-800 font-bold">{selectedViewProduct.stock} items</span></p>
                  <p className="flex justify-between"><span className="text-gray-400">Current Status:</span> <span className="text-indigo-600 font-extrabold uppercase">{selectedViewProduct.status}</span></p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Short Description</h4>
                  <p className="text-gray-600 leading-snug">{selectedViewProduct.shortDescription}</p>
                </div>

                {selectedViewProduct.variants && selectedViewProduct.variants.length > 0 && (
                  <div className="space-y-1.5">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Available Catalogued Variants</h4>
                    <div className="space-y-1 max-h-[120px] overflow-y-auto">
                      {selectedViewProduct.variants.map((v, i) => (
                        <div key={i} className="p-2 border border-gray-100 rounded-lg flex justify-between items-center bg-gray-50/50">
                          <div>
                            <p className="font-bold text-gray-800">{v.name}</p>
                            <p className="text-[9px] text-gray-400">SKU: {v.sku} | Mat: {v.material || 'N/A'}</p>
                          </div>
                          <span className="font-bold text-indigo-600">{formatCurrency(v.price)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={() => setSelectedViewProduct(null)}
                  className="w-full py-2.5 px-4 bg-gray-800 hover:bg-gray-900 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Close Detail Panel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT FULL-FORM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto" id="product-form-modal">
          <div className="bg-white rounded-3xl max-w-4xl w-full border border-gray-100 shadow-2xl flex flex-col max-h-[92vh] animate-fadeIn">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 rounded-t-3xl">
              <div>
                <h3 className="text-base font-bold text-gray-800 uppercase tracking-wide">
                  {modalMode === 'add' ? 'Add New Product Spec' : 'Edit Product Spec'}
                </h3>
                <p className="text-[10px] text-gray-400 font-semibold">
                  {modalMode === 'add' ? 'Construct product according to the K Smart Homes catalogue page source' : `Modifying spec for unique reference id: ${editingId}`}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-gray-200 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Scroll */}
            <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-gray-600 font-medium">
              
              {/* SECTION 1: BASIC INFORMATION */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest border-b border-indigo-50 pb-1 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" /> Basic Product Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Product Display Name</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Titan Smart Touch Switch Board"
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Unique Model SKU</label>
                    <input
                      type="text"
                      required
                      value={formSku}
                      onChange={(e) => setFormSku(e.target.value)}
                      placeholder="e.g. KSH-SW-TITAN"
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-mono font-bold text-gray-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Manufacturer Brand</label>
                    <input
                      type="text"
                      required
                      value={formBrand}
                      onChange={(e) => setFormBrand(e.target.value)}
                      placeholder="e.g. K Smart Homes"
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">System Category</label>
                    <select
                      value={formCategoryId}
                      onChange={(e) => setFormCategoryId(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden bg-white font-medium text-gray-800"
                    >
                      <option value="">-- Select System Category --</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Catalogue Page Source</label>
                    <input
                      type="number"
                      value={formCataloguePage || ''}
                      onChange={(e) => setFormCataloguePage(Number(e.target.value))}
                      placeholder="e.g. 12"
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Product Status</label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as Product['status'])}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden bg-white font-bold"
                    >
                      <option value="Active">Active (Visible)</option>
                      <option value="Inactive">Inactive (Hidden)</option>
                      <option value="Draft">Draft Mode</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: DESCRIPTION & CONTENT */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest border-b border-indigo-50 pb-1 flex items-center gap-2">
                  <Sliders className="w-4 h-4 shrink-0" /> Marketing Descriptions & Bullet Lists
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Teaser Short Description (For cards / previews)</label>
                    <input
                      type="text"
                      required
                      value={formShortDescription}
                      onChange={(e) => setFormShortDescription(e.target.value)}
                      placeholder="e.g. 12-Modular premium touch switch board with Wi-Fi, timers, and voice alerts."
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Full Detailed Product Description</label>
                    <textarea
                      rows={3}
                      required
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="Write extensive documentation, features overview, physical mechanics, materials, etc."
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">High-Level Features (one bullet statement per line)</label>
                    <textarea
                      rows={3}
                      value={formFeatures}
                      onChange={(e) => setFormFeatures(e.target.value)}
                      placeholder="Capacitive sleek glass panel&#10;Google Home & Alexa smart control&#10;Zero internal wiring required"
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: PRICING & STOCK */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest border-b border-indigo-50 pb-1 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 shrink-0" /> Pricing Structure & Warehouse Stock
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Original Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={formOriginalPrice || ''}
                      onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                      placeholder="e.g. 20000"
                      className="w-full px-3.5 py-2.5 border border-gray-300 bg-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-bold text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Selling Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={formPrice || ''}
                      onChange={(e) => setFormPrice(Number(e.target.value))}
                      placeholder="e.g. 18000"
                      className="w-full px-3.5 py-2.5 border border-gray-300 bg-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-bold text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Calculated Discount</label>
                    <div className="px-3.5 py-2.5 border border-gray-200 bg-gray-100 rounded-xl font-black text-indigo-700 text-center text-sm">
                      {calculatedDiscount()}% OFF
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Warehouse Stock Count</label>
                    <input
                      type="number"
                      required
                      value={formStock || ''}
                      onChange={(e) => setFormStock(Number(e.target.value))}
                      placeholder="e.g. 15"
                      className="w-full px-3.5 py-2.5 border border-gray-300 bg-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-bold text-gray-800"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: PRODUCT IMAGES */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest border-b border-indigo-50 pb-1 flex justify-between items-center">
                  <span>Product Gallery Image URLs</span>
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="text-[10px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg font-bold border border-indigo-100 cursor-pointer"
                  >
                    + Add Image URL Slot
                  </button>
                </h4>
                <div className="space-y-2.5">
                  {formImages.map((img, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="url"
                        value={img}
                        onChange={(e) => handleImageChange(idx, e.target.value)}
                        placeholder="Paste image URL (e.g., Unsplash, Cloudinary, Imgur)"
                        className="flex-1 px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-xs"
                      />
                      {formImages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-xl border border-red-100 shrink-0 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <p className="text-[10px] text-gray-400 font-semibold italic">
                    The first image URL will act as the Main Thumbnail. Make sure to use high-fidelity, safe URLs.
                  </p>
                </div>
              </div>

              {/* SECTION 5: PRODUCT VARIANTS */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest border-b border-indigo-50 pb-1 flex justify-between items-center">
                  <span>Product Variant Multi-Option System</span>
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="text-[10px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg font-bold border border-indigo-100 cursor-pointer"
                  >
                    + Add Product Variant Option
                  </button>
                </h4>
                {formVariants.length === 0 ? (
                  <p className="p-4 bg-gray-50 border border-dashed border-gray-200 rounded-2xl text-center text-gray-400 font-semibold italic">
                    No custom variants constructed. This product will behave as a single SKU.
                  </p>
                ) : (
                  <div className="space-y-3 max-h-[300px] overflow-y-auto p-2 border border-gray-100 rounded-2xl bg-gray-50/50">
                    {formVariants.map((v, i) => (
                      <div key={v.id} className="p-4 bg-white rounded-xl border border-gray-200 space-y-3 shadow-xs">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                          <span className="font-bold text-gray-700 text-xs">Variant #{i + 1} Specifications</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveVariant(i)}
                            className="text-[10px] font-bold text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" /> Remove Option
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">Variant Name</label>
                            <input
                              type="text"
                              value={v.name}
                              onChange={(e) => handleVariantChange(i, { name: e.target.value })}
                              placeholder="e.g. 4S + 1SK - Premium Silver"
                              className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">Variant SKU</label>
                            <input
                              type="text"
                              value={v.sku}
                              onChange={(e) => handleVariantChange(i, { sku: e.target.value })}
                              className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-xs font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">Selling Price (₹)</label>
                            <input
                              type="number"
                              value={v.price || ''}
                              onChange={(e) => handleVariantChange(i, { price: Number(e.target.value) })}
                              className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-xs font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">Stock Count</label>
                            <input
                              type="number"
                              value={v.stock || ''}
                              onChange={(e) => handleVariantChange(i, { stock: Number(e.target.value) })}
                              className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-xs font-bold"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">Color Finish</label>
                            <input
                              type="text"
                              value={v.colour || ''}
                              onChange={(e) => handleVariantChange(i, { colour: e.target.value })}
                              placeholder="e.g. Obsidian Black"
                              className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">Base Material</label>
                            <input
                              type="text"
                              value={v.material || ''}
                              onChange={(e) => handleVariantChange(i, { material: e.target.value })}
                              placeholder="e.g. Aluminium"
                              className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">Finish Texture</label>
                            <input
                              type="text"
                              value={v.finish || ''}
                              onChange={(e) => handleVariantChange(i, { finish: e.target.value })}
                              placeholder="e.g. Brushed Patina"
                              className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">Smart Device Enabled</label>
                            <select
                              value={v.smart ? 'true' : 'false'}
                              onChange={(e) => handleVariantChange(i, { smart: e.target.value === 'true' })}
                              className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-xs bg-white"
                            >
                              <option value="true">Smart Wi-Fi</option>
                              <option value="false">Non-Smart Standard</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION 6: TECHNICAL SPECIFICATIONS */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest border-b border-indigo-50 pb-1 flex justify-between items-center">
                  <span>Technical Specifications Data Sheet</span>
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="text-[10px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg font-bold border border-indigo-100 cursor-pointer"
                  >
                    + Add Technical Spec Key/Val
                  </button>
                </h4>
                {formSpecs.length === 0 ? (
                  <p className="p-4 bg-gray-50 border border-dashed border-gray-200 rounded-2xl text-center text-gray-400 font-semibold italic">
                    No technical specifications defined.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {formSpecs.map((spec, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={spec.key}
                          onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                          placeholder="Specification Key (e.g., Rated Load, Connectivity)"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs font-bold"
                        />
                        <input
                          type="text"
                          value={spec.val}
                          onChange={(e) => handleSpecChange(idx, 'val', e.target.value)}
                          placeholder="Specification Value (e.g., 16A Power / Wi-Fi 2.4GHz)"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSpec(idx)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg border border-red-100 shrink-0 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-3xl flex gap-3 justify-end">
              <button
                type="button"
                disabled={submittingForm}
                onClick={() => setIsModalOpen(false)}
                className="py-2.5 px-5 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-xl cursor-pointer disabled:opacity-50"
              >
                Discard Changes
              </button>
              <button
                type="submit"
                disabled={submittingForm}
                className="py-2.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer disabled:opacity-50 flex items-center gap-2"
              >
                {submittingForm ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4 text-white" />
                    <span>Saving Product Spec...</span>
                  </>
                ) : (
                  <span>SAVE CATALOGUE PRODUCT</span>
                )}
              </button>
            </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
