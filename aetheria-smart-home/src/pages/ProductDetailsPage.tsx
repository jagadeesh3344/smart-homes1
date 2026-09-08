/**
 * ProductDetailsPage Component - Light Mode Luxury Style
 */

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { RatingStars } from '../components/common/RatingStars';
import { EmptyState } from '../components/common/EmptyState';
import { ProductCard } from '../components/shop/ProductCard';
import {
  ShoppingBag,
  Cpu,
  Send,
  HelpCircle,
  CheckCircle2,
  Plus,
  Minus
} from 'lucide-react';
import { StorageService } from '../services/storage';

export const ProductDetailsPage: React.FC = () => {
  const {
    products,
    routeParams,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openEnquiryModal,
    navigateTo,
    refreshData,
    addToast
  } = useShop();

  const productId = routeParams.id;
  const product = products.find(p => p.id === productId);

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews' | 'faqs'>('description');

  // Selected Options States
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedBodyColor, setSelectedBodyColor] = useState<string | null>(null);
  const [selectedReflectorColor, setSelectedReflectorColor] = useState<string | null>(null);

  // Initialize options once product is loaded
  React.useEffect(() => {
    if (product) {
      if (product.variants && product.variants.length > 0) {
        const defVar = product.variants.find(v => v.isDefault) || product.variants[0];
        setSelectedVariantId(defVar.id);
      } else {
        setSelectedVariantId(null);
      }
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      } else {
        setSelectedColor(null);
      }
      if (product.bodyColors && product.bodyColors.length > 0) {
        setSelectedBodyColor(product.bodyColors[0]);
      } else {
        setSelectedBodyColor(null);
      }
      if (product.reflectorColors && product.reflectorColors.length > 0) {
        setSelectedReflectorColor(product.reflectorColors[0]);
      } else {
        setSelectedReflectorColor(null);
      }
    }
  }, [product]);

  // Review Form state
  const [reviewName, setReviewName] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  if (!product) {
    return (
      <div className="bg-[#FDFDFD] min-h-screen py-16 text-zinc-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Breadcrumbs items={[{ label: 'Smart Home Shop', route: 'shop' }, { label: 'Product Not Found' }]} />
          <EmptyState
            type="products"
            title="Product not found or unavailable."
            description="The smart home item you are looking for may have been updated or removed."
            actionLabel="Return to Catalog"
            onAction={() => navigateTo('shop')}
          />
        </div>
      </div>
    );
  }

  const activeVariant = product.variants?.find(v => v.id === selectedVariantId) || null;

  const currentPrice = activeVariant && activeVariant.price !== undefined
    ? activeVariant.price
    : (product.salePrice !== undefined ? product.salePrice : product.price || 0);

  const originalPrice = activeVariant && activeVariant.originalPrice !== undefined
    ? activeVariant.originalPrice
    : (product.salePrice !== undefined ? product.price : undefined);

  const activeSku = activeVariant?.sku || product.sku || '';

  const discountPercent = (originalPrice && currentPrice && originalPrice > currentPrice)
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const handleAddToCart = (isBuyNow = false) => {
    // Create a cloned product representing the specific configuration selected
    let configuredProduct = { ...product };
    let nameSuffix = [];
    
    if (activeVariant) {
      configuredProduct.id = `${product.id}_${activeVariant.id}`;
      configuredProduct.sku = activeVariant.sku || product.sku;
      configuredProduct.price = activeVariant.originalPrice !== undefined ? activeVariant.originalPrice : activeVariant.price;
      configuredProduct.salePrice = activeVariant.originalPrice !== undefined ? activeVariant.price : undefined;
      nameSuffix.push(activeVariant.name);
    }
    
    if (selectedColor) nameSuffix.push(selectedColor);
    if (selectedBodyColor) nameSuffix.push(selectedBodyColor);
    if (selectedReflectorColor) nameSuffix.push(`Reflector: ${selectedReflectorColor}`);
    
    if (nameSuffix.length > 0) {
      configuredProduct.name = `${product.name} (${nameSuffix.join(', ')})`;
    }
    
    addToCart(configuredProduct, quantity);
    
    if (isBuyNow) {
      navigateTo('cart');
    }
  };

  const isWishlisted = isInWishlist(product.id);
  const relatedProducts = (products || []).filter(p => p && p.id !== product.id).slice(0, 3);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName && reviewComment) {
      const newReview = {
        id: 'rev_' + Date.now().toString(36),
        userName: reviewName,
        userEmail: reviewEmail,
        rating: reviewRating,
        comment: reviewComment,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        verifiedPurchase: true
      };

      const updatedReviews = [...(product.reviews || []), newReview];
      const newReviewCount = updatedReviews.length;
      const newAvgRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / newReviewCount;

      StorageService.updateProduct(product.id, {
        reviews: updatedReviews,
        reviewCount: newReviewCount,
        rating: Math.round(newAvgRating * 10) / 10
      });

      refreshData();
      addToast('Thank you! Your verified review has been published.');
      setReviewName('');
      setReviewEmail('');
      setReviewComment('');
    }
  };

  const images = (Array.isArray(product.images) && product.images.length > 0)
    ? product.images
    : [product.image || 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80'];

  const productHighlights = [
    '16 Million Colors & Tunable White',
    'Voice Control (Alexa, Google, Siri)',
    'Energy Saving & Efficiency',
    'Schedule & Custom Timers',
    'Easy Plug & Play Installation'
  ];

  return (
    <div className="bg-[#FDFDFD] min-h-screen py-12 text-zinc-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <Breadcrumbs
          items={[
            { label: 'Shop', route: 'shop' },
            { label: product.categoryName || 'Smart Automation', route: 'shop', params: { category: product.categoryId } },
            { label: product.name }
          ]}
        />

        {/* Main Product Details Box - Screen 04 */}
        <div className="bg-white rounded-xl p-8 sm:p-12 border border-zinc-200 shadow-lg my-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded overflow-hidden bg-zinc-50 border border-zinc-200 shadow-inner">
              {images[selectedImageIndex] === 'IMAGE REQUIRES SOURCE ASSET' ? (
                <div className="w-full h-full bg-zinc-100 flex flex-col items-center justify-center p-6 border border-zinc-200/60 text-center select-none">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">KSH Catalogue May 2026</span>
                  <span className="text-sm font-semibold text-zinc-650 max-w-xs uppercase">IMAGE REQUIRES SOURCE ASSET</span>
                  <p className="text-zinc-400 text-xs font-light mt-3 max-w-xs">Please configure the exact catalogue source file to upload high-resolution architectural assets.</p>
                </div>
              ) : (
                <img
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
              {product.protocol && (
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#C5A880] px-3 py-1.5 rounded border border-zinc-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <Cpu className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{product.protocol}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded overflow-hidden border-2 transition-all shrink-0 bg-zinc-50 cursor-pointer flex items-center justify-center text-center ${
                    selectedImageIndex === idx ? 'border-[#C5A880] scale-102' : 'border-zinc-200 hover:border-zinc-350'
                  }`}
                >
                  {img === 'IMAGE REQUIRES SOURCE ASSET' ? (
                    <div className="w-full h-full bg-zinc-100 flex flex-col items-center justify-center p-1 text-[8px] leading-tight select-none font-bold text-zinc-400">
                      <span>KSH</span>
                      <span>ASSET</span>
                    </div>
                  ) : (
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column Specifications & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold text-[#C5A880] uppercase tracking-widest">
                  {product.categoryName || 'Smart Automation'}
                </span>
                <span className="text-xs text-zinc-450 font-mono">SKU: {activeSku}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-light text-zinc-900 tracking-tight mb-3 font-serif">
                {product.name}
              </h1>

              <div className="flex items-center justify-between gap-4 mb-6">
                <RatingStars rating={product.rating || 5.0} reviewCount={product.reviewCount || 12} showCount />
                
                {product.cataloguePage && (
                  <span className="text-[10px] font-mono bg-zinc-100 text-zinc-500 border border-zinc-200 px-2.5 py-1 rounded-full font-semibold">
                    Catalogue Page: {product.cataloguePage}
                  </span>
                )}
              </div>

              <div className="mb-6 pt-4 border-t border-zinc-100">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Quote Price</span>
                <div className="flex items-center gap-3">
                  {product.priceOnRequest ? (
                    <span className="text-base sm:text-lg font-semibold text-[#C5A880] uppercase tracking-wider">Price on Request</span>
                  ) : (
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-2xl sm:text-3.5xl font-light text-zinc-900">
                        ₹{currentPrice.toLocaleString('en-IN')}
                      </span>
                      {originalPrice && (
                        <span className="text-sm sm:text-base text-zinc-400 line-through font-light">
                          ₹{originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                      {discountPercent > 0 && (
                        <span className="text-[10px] sm:text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase tracking-wider">
                          {discountPercent}% OFF
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Option Selectors */}
              <div className="space-y-4 mb-6">
                {/* 1. Variants Selector */}
                {product.variants && product.variants.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold text-zinc-450 uppercase tracking-widest block mb-2">
                      Select Model / Size / Finish *
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariantId(v.id)}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                            selectedVariantId === v.id
                              ? 'bg-zinc-950 border-zinc-950 text-white font-bold'
                              : 'bg-white border-zinc-200 hover:border-zinc-350 text-zinc-700'
                          }`}
                        >
                          <div className="text-left">
                            <div>{v.name}</div>
                            {v.price !== undefined && !product.priceOnRequest && (
                              <div className={`text-[10px] font-mono mt-0.5 ${selectedVariantId === v.id ? 'text-zinc-300' : 'text-zinc-500'}`}>
                                ₹{v.price.toLocaleString('en-IN')}
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Standard Colors Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold text-zinc-450 uppercase tracking-widest block mb-2">
                      Select Color Options *
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                            selectedColor === color
                              ? 'bg-zinc-900 border-zinc-900 text-white'
                              : 'bg-white border-zinc-200 hover:border-zinc-350 text-zinc-600'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Body Color Selector */}
                {product.bodyColors && product.bodyColors.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold text-zinc-450 uppercase tracking-widest block mb-2">
                      Select Body / Frame Finish *
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.bodyColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedBodyColor(color)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                            selectedBodyColor === color
                              ? 'bg-zinc-900 border-zinc-900 text-white'
                              : 'bg-white border-zinc-200 hover:border-zinc-350 text-zinc-650'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Reflector Core Color Selector */}
                {product.reflectorColors && product.reflectorColors.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold text-zinc-450 uppercase tracking-widest block mb-2">
                      Select Reflector Core Finish *
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.reflectorColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedReflectorColor(color)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                            selectedReflectorColor === color
                              ? 'bg-zinc-900 border-zinc-900 text-white'
                              : 'bg-white border-zinc-200 hover:border-zinc-350 text-zinc-650'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Availability Badge */}
              <div className="mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs text-zinc-500 font-medium">Availability: In Stock (Certified Delivery & Installation)</span>
              </div>

              {/* Product Highlights checklist */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3 mb-6 shadow-inner">
                <h4 className="text-[10px] font-bold uppercase text-zinc-800 tracking-widest">Product Highlights</h4>
                <ul className="space-y-1.5 text-xs text-zinc-650 font-light leading-relaxed">
                  {productHighlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 stroke-[1.5]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ACTION BUTTONS (Add to Cart / Buy Now) */}
            <div className="space-y-4 pt-6 border-t border-zinc-100">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Quantity:</span>
                <div className="flex items-center border border-zinc-200 rounded-xl bg-zinc-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2.5 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100/50 transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-sm font-bold text-zinc-850">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2.5 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100/50 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    handleAddToCart(false);
                  }}
                  className="flex-1 py-4 px-6 rounded-xl bg-zinc-950 hover:bg-zinc-850 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                  <span>Add to Enquiry Cart</span>
                </button>
                <button
                  onClick={() => {
                    handleAddToCart(true);
                  }}
                  className="flex-1 py-4 px-6 rounded-xl bg-[#C5A880] hover:bg-[#B49770] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                >
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Content: Description, Specifications, Reviews, FAQs */}
        <div className="bg-white rounded-xl p-8 sm:p-12 border border-zinc-200 shadow-sm my-8">
          {/* Tab Navigation Headers */}
          <div className="flex flex-wrap gap-2 border-b border-zinc-150 pb-4 mb-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-5 py-2.5 rounded text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === 'description'
                  ? 'bg-zinc-900 text-white shadow-sm font-bold'
                  : 'bg-zinc-50 text-zinc-500 border border-zinc-200 hover:text-zinc-900'
              }`}
            >
              Description
            </button>

            <button
              onClick={() => setActiveTab('specifications')}
              className={`px-5 py-2.5 rounded text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === 'specifications'
                  ? 'bg-zinc-900 text-white shadow-sm font-bold'
                  : 'bg-zinc-50 text-zinc-500 border border-zinc-200 hover:text-zinc-900'
              }`}
            >
              Specifications
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-5 py-2.5 rounded text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-zinc-900 text-white shadow-sm font-bold'
                  : 'bg-zinc-50 text-zinc-500 border border-zinc-200 hover:text-zinc-900'
              }`}
            >
              Reviews ({product.reviewCount || 9})
            </button>

            <button
              onClick={() => setActiveTab('faqs')}
              className={`px-5 py-2.5 rounded text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === 'faqs'
                  ? 'bg-zinc-900 text-white shadow-sm font-bold'
                  : 'bg-zinc-50 text-zinc-500 border border-zinc-200 hover:text-zinc-900'
              }`}
            >
              FAQs
            </button>
          </div>

          {/* Description Tab */}
          {activeTab === 'description' && (
            <div className="space-y-4 text-zinc-600 text-xs sm:text-sm leading-relaxed font-light">
              <p>{product.description}</p>
              <p>Designed for smooth integration with your existing smart home network. Provides instantaneous response, schedule automation, and high energy efficiency.</p>
            </div>
          )}

          {/* Specifications Tab */}
          {activeTab === 'specifications' && (
            <div className="divide-y divide-zinc-100">
              <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <span className="font-bold text-zinc-400 uppercase tracking-widest">Hardware Protocol</span>
                <span className="sm:col-span-2 font-medium text-zinc-800">{product.protocol || 'Matter over Thread'}</span>
              </div>
              <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <span className="font-bold text-zinc-400 uppercase tracking-widest">SKU Reference</span>
                <span className="sm:col-span-2 font-mono text-zinc-800">{product.sku}</span>
              </div>
              {product.specifications?.map((spec, idx) => (
                <div key={idx} className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <span className="font-bold text-zinc-400 uppercase tracking-widest">{spec.key}</span>
                  <span className="sm:col-span-2 font-medium text-zinc-800">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <div className="space-y-4 mb-8">
                {(!product.reviews || product.reviews.length === 0) ? (
                  <p className="text-xs text-zinc-400 italic">No reviews submitted yet for this product. Be the first to share your experience.</p>
                ) : (
                  (product.reviews || []).map(rev => (
                    <div key={rev.id} className="p-5 rounded bg-zinc-50 border border-zinc-200 shadow-inner">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-semibold text-sm text-zinc-900 block font-serif">{rev.userName}</span>
                          <span className="text-[10px] text-zinc-400">{rev.date}</span>
                        </div>
                        <RatingStars rating={rev.rating} size="sm" />
                      </div>
                      <p className="text-xs text-zinc-600 font-light leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleReviewSubmit} className="pt-6 border-t border-zinc-100 space-y-4">
                <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-widest">Submit Review</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={reviewName}
                    onChange={e => setReviewName(e.target.value)}
                    placeholder="Your Name *"
                    className="px-4 py-3 rounded border border-zinc-200 text-xs bg-zinc-50 text-zinc-800 placeholder:text-zinc-350 focus:outline-none focus:border-[#C5A880] focus:bg-white transition-all"
                  />
                  <input
                    type="email"
                    required
                    value={reviewEmail}
                    onChange={e => setReviewEmail(e.target.value)}
                    placeholder="Your Email *"
                    className="px-4 py-3 rounded border border-zinc-200 text-xs bg-zinc-50 text-zinc-800 placeholder:text-zinc-350 focus:outline-none focus:border-[#C5A880] focus:bg-white transition-all"
                  />
                </div>
                <textarea
                  required
                  rows={3}
                  value={reviewComment}
                  onChange={e => setReviewComment(e.target.value)}
                  placeholder="Write review comment..."
                  className="w-full px-4 py-3 rounded border border-zinc-200 text-xs bg-zinc-50 text-zinc-800 placeholder:text-zinc-350 focus:outline-none focus:border-[#C5A880] focus:bg-white transition-all resize-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Post Review</span>
                </button>
              </form>
            </div>
          )}

          {/* FAQs Tab */}
          {activeTab === 'faqs' && (
            <div className="space-y-4">
              <div className="p-5 rounded bg-zinc-50 border border-zinc-200 shadow-inner">
                <h4 className="text-xs font-bold text-zinc-800 mb-1 flex items-center gap-2 font-serif">
                  <HelpCircle className="w-4 h-4 text-[#C5A880] shrink-0 stroke-[1.5]" />
                  <span>Does this require a smart home hub?</span>
                </h4>
                <p className="text-xs text-zinc-650 pl-6 font-light leading-relaxed">It works directly via Wi-Fi/Matter, or can pair with standard Matter/Thread hubs.</p>
              </div>

              <div className="p-5 rounded bg-zinc-50 border border-zinc-200 shadow-inner">
                <h4 className="text-xs font-bold text-zinc-800 mb-1 flex items-center gap-2 font-serif">
                  <HelpCircle className="w-4 h-4 text-[#C5A880] shrink-0 stroke-[1.5]" />
                  <span>Is professional installation provided?</span>
                </h4>
                <p className="text-xs text-zinc-650 pl-6 font-light leading-relaxed">Yes! Our certified engineers can perform complete white-glove setup upon request.</p>
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {(relatedProducts || []).length > 0 && (
          <div className="my-12">
            <h2 className="text-xl font-light text-zinc-900 mb-6 font-serif">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(relatedProducts || []).map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
