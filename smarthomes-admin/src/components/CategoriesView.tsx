import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, CheckCircle, AlertTriangle, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { getCategories, addCategory, updateCategory, deleteCategory, subscribeToDBChanges } from '../utils/db';
import { Category } from '../types';

export default function CategoriesView() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [parentId, setParentId] = useState('');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [active, setActive] = useState(true);
  const [featured, setFeatured] = useState(false);

  // Toast
  const [toast, setToast] = useState('');

  const loadData = () => {
    setCategories(getCategories().sort((a, b) => a.displayOrder - b.displayOrder));
  };

  useEffect(() => {
    loadData();
    const unsubscribe = subscribeToDBChanges(() => {
      loadData();
    });
    return unsubscribe;
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // Auto-slug generator
  useEffect(() => {
    if (modalMode === 'add') {
      setSlug(
        name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  }, [name, modalMode]);

  const handleOpenAdd = () => {
    setModalMode('add');
    setEditingId(null);
    setName('');
    setSlug('');
    setDescription('');
    setImageUrl('https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80');
    setParentId('');
    setDisplayOrder(categories.length + 1);
    setActive(true);
    setFeatured(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setModalMode('edit');
    setEditingId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description);
    setImageUrl(cat.image);
    setParentId(cat.parentId || '');
    setDisplayOrder(cat.displayOrder);
    setActive(cat.active);
    setFeatured(cat.featured);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteCategory(id);
      triggerToast('Category deleted successfully.');
      setDeletingId(null);
      loadData();
    } catch (err: any) {
      console.error('Category deletion failed:', err);
      alert(err.message || 'Firestore Deletion Permission Denied or Database Connection Error.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Category Name is required.');
      return;
    }

    const payload: Omit<Category, 'id' | 'createdAt' | 'updatedAt'> = {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim(),
      image: imageUrl.trim() || 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80',
      parentId: parentId || undefined,
      displayOrder: Number(displayOrder) || 1,
      active,
      featured
    };

    if (modalMode === 'add') {
      const exists = categories.find(c => c.slug === slug.trim());
      if (exists) {
        alert('A category with this URL Slug already exists. Slug must be unique.');
        return;
      }
      addCategory(payload);
      triggerToast('Category created successfully.');
    } else if (editingId) {
      updateCategory(editingId, payload);
      triggerToast('Category updated successfully.');
    }

    setIsModalOpen(false);
    loadData();
  };

  return (
    <div className="space-y-6" id="categories-view-panel">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-50 border border-green-200 text-green-800 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-bold text-sm" id="cat-toast">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-gray-800">Categories Directory</h2>
          <p className="text-xs text-gray-400 font-medium">Control the cataloging layout and menu listings of the website</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md cursor-pointer"
          id="btn-add-category"
        >
          <Plus className="w-4 h-4" /> ADD NEW CATEGORY
        </button>
      </div>

      {/* Categories Grid list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="categories-list-grid">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              {/* Cover Image Banner */}
              <div className="h-36 relative bg-gray-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border ${cat.active ? 'bg-green-500/95 text-white border-green-600' : 'bg-gray-500/95 text-white border-gray-600'}`}>
                    {cat.active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                  {cat.featured && (
                    <span className="px-2.5 py-0.5 bg-yellow-500/95 border border-yellow-600 rounded-full text-[9px] font-extrabold text-white">
                      FEATURED ★
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 right-3 bg-gray-900/85 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-mono font-bold text-white">
                  Order: {cat.displayOrder}
                </div>
              </div>

              {/* Main Content Info */}
              <div className="p-5 space-y-2 text-xs font-medium text-gray-600">
                <h3 className="text-sm font-black text-gray-800 leading-tight">{cat.name}</h3>
                <p className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                  <span>Slug:</span>
                  <span className="bg-gray-100 px-1 py-0.5 rounded text-gray-700 select-all font-semibold">{cat.slug}</span>
                </p>
                {cat.parentId && (
                  <p className="text-[10px] text-indigo-600 font-bold">
                    Subcategory of: {cat.parentId}
                  </p>
                )}
                <p className="text-gray-500 leading-relaxed text-[11px] pt-1">
                  {cat.description || 'No custom description provided for this category.'}
                </p>
              </div>
            </div>

            {/* Bottom Panel Actions */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2 min-h-[57px]">
              {deletingId === cat.id ? (
                <div className="flex items-center justify-between w-full" id={`delete-confirm-${cat.id}`}>
                  <span className="text-[10px] text-red-600 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 animate-pulse" /> Confirm delete?
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      disabled={isDeleting}
                      onClick={() => setDeletingId(null)}
                      className="px-2.5 py-1 text-[10px] font-bold text-gray-500 hover:bg-gray-100 rounded-lg border border-gray-200 bg-white cursor-pointer disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={isDeleting}
                      onClick={() => handleDelete(cat.id)}
                      className="px-3 py-1 text-[10px] font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs cursor-pointer disabled:opacity-50 flex items-center gap-1"
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Deleting...</span>
                        </>
                      ) : (
                        <span>Delete</span>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 hover:bg-indigo-100 border border-indigo-200 px-3 py-1.5 rounded-lg bg-white cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> EDIT CATEGORY
                  </button>
                  <button
                    onClick={() => setDeletingId(cat.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg border border-transparent cursor-pointer"
                    title="Delete Category"
                    id={`btn-delete-${cat.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT CATEGORY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="category-modal">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-gray-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-gray-800 uppercase tracking-wide">
                  {modalMode === 'add' ? 'Add Category Spec' : 'Edit Category Spec'}
                </h3>
                <p className="text-[10px] text-gray-400 font-medium">Update directory levels of the SmartHomes portal</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-gray-200 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4 text-xs font-medium text-gray-600">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Category Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Smart Touch Switch Boards"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="smart-touch-switch-boards"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl font-mono font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Category Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize the products catalogued within this tier..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl font-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Category Cover Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Paste image web address (Unsplash, etc.)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Parent Hierarchy (Optional)</label>
                  <select
                    value={parentId}
                    onChange={(e) => setParentId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white"
                  >
                    <option value="">None (Primary Level)</option>
                    {categories
                      .filter(c => c.id !== editingId) // prevent self-referencing hierarchy
                      .map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Display Order Sorting Index</label>
                  <input
                    type="number"
                    min="1"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="flex gap-6 bg-gray-50 p-4 border border-gray-100 rounded-xl">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Active & Publicly Searchable</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Featured on Homepage</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2.5 px-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl cursor-pointer shadow-md"
                >
                  SAVE CATEGORY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
