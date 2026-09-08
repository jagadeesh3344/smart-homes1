import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, CheckCircle, Percent, X, Calendar } from 'lucide-react';
import { getOffers, addOffer, updateOffer, deleteOffer } from '../utils/db';
import { Offer } from '../types';

export default function OffersView() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields matching Offer interface fields
  const [couponCode, setCouponCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState<'Percentage' | 'Fixed'>('Percentage');
  const [discountValue, setDiscountValue] = useState(10);
  const [type, setType] = useState<Offer['type']>('Order');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [active, setActive] = useState(true);

  const [toast, setToast] = useState('');

  const loadData = () => {
    setOffers(getOffers());
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleOpenAdd = () => {
    setModalMode('add');
    setEditingId(null);
    setCouponCode('');
    setTitle('General Seasonal Discount');
    setDescription('Apply this checkout discount on smart-homes orders.');
    setDiscountType('Percentage');
    setDiscountValue(10);
    setType('Order');
    
    // Default dates
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 30);
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
    
    setActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (off: Offer) => {
    setModalMode('edit');
    setEditingId(off.id);
    setCouponCode(off.couponCode || '');
    setTitle(off.title);
    setDescription(off.description);
    setDiscountType(off.discountType);
    setDiscountValue(off.discountValue);
    setType(off.type);
    setStartDate(off.startDate);
    setEndDate(off.endDate);
    setActive(off.active);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this campaign coupon code? Checkout scripts will instantly reject it.')) {
      deleteOffer(id);
      triggerToast('Promo offer deleted.');
      loadData();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanCode = couponCode.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (!cleanCode) {
      alert('Coupon code must contain alpha-numeric characters.');
      return;
    }

    if (!title.trim()) {
      alert('Campaign Title is required.');
      return;
    }

    if (discountValue < 0) {
      alert('Discount value cannot be negative.');
      return;
    }

    if (discountType === 'Percentage' && discountValue > 100) {
      alert('Percentage discount values cannot exceed 100%.');
      return;
    }

    const payload: Omit<Offer, 'id' | 'createdAt'> = {
      couponCode: cleanCode,
      title: title.trim(),
      description: description.trim(),
      discountType,
      discountValue: Number(discountValue),
      type,
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || new Date().toISOString().split('T')[0],
      active
    };

    if (modalMode === 'add') {
      const exists = offers.find(o => o.couponCode === cleanCode);
      if (exists) {
        alert('A coupon matching this promo code already exists.');
        return;
      }
      addOffer(payload);
      triggerToast('Promotional campaign coupon created successfully!');
    } else if (editingId) {
      updateOffer(editingId, payload);
      triggerToast('Promotional campaign coupon updated.');
    }

    setIsModalOpen(false);
    loadData();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const isExpired = (isoString: string) => {
    return new Date(isoString) < new Date();
  };

  return (
    <div className="space-y-6" id="offers-view-panel">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-50 border border-green-200 text-green-800 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-bold text-sm">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-gray-800">Campaigns &amp; Promos</h2>
          <p className="text-xs text-gray-400 font-medium">Set up flat currency deductions or percentage-based checkout discounts</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md cursor-pointer"
          id="btn-add-offer"
        >
          <Plus className="w-4 h-4" /> CREATE NEW COUPON
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="offers-list-grid">
        {offers.map(off => {
          const expired = isExpired(off.endDate);
          return (
            <div key={off.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              
              {/* Header Visual */}
              <div className="p-5 bg-gradient-to-r from-indigo-50 to-indigo-100/50 border-b border-gray-100/80 relative flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-indigo-500 font-extrabold uppercase tracking-widest">{off.title}</span>
                  <h3 className="text-lg font-black font-mono text-indigo-950 tracking-wider select-all">{off.couponCode}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-white border border-indigo-100 flex items-center justify-center shadow-xs">
                  <Percent className="w-5 h-5 text-indigo-600" />
                </div>
              </div>

              {/* Specs Content */}
              <div className="p-5 space-y-4 text-xs font-medium text-gray-600">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Discount Payload:</span>
                  <span className="font-black text-indigo-600 text-sm">
                    {off.discountType === 'Percentage' ? `${off.discountValue}% Off` : `${formatCurrency(off.discountValue)} Off`}
                  </span>
                </div>

                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-gray-400">Scope Category:</span>
                  <span className="font-extrabold text-indigo-600 uppercase tracking-wide bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded-md text-[9px]">
                    {off.type} Level
                  </span>
                </div>

                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-gray-400">Campaign Expiration:</span>
                  <span className={`font-bold flex items-center gap-1 ${expired ? 'text-red-500' : 'text-gray-700'}`}>
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {new Date(off.endDate).toLocaleDateString()}
                    {expired && <span className="text-[9px] font-extrabold uppercase">(EXPIRED)</span>}
                  </span>
                </div>

                <p className="text-gray-500 text-[11px] leading-relaxed pt-2 border-t border-gray-50">
                  {off.description || 'Applies discount deductions corresponding to specifications during active checkout.'}
                </p>
              </div>

              {/* Footer controls */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <span className={`inline-block px-2.5 py-1 rounded text-[8px] font-extrabold tracking-wide border uppercase
                  ${off.active && !expired ? 'bg-green-500/95 text-white border-green-600' : 'bg-red-500/95 text-white border-red-600'}
                `}>
                  {off.active && !expired ? 'ACTIVE' : 'DISABLED'}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenEdit(off)}
                    className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 hover:bg-indigo-100 border border-indigo-200 px-2.5 py-1.5 rounded-lg bg-white cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> EDIT CODE
                  </button>
                  <button
                    onClick={() => handleDelete(off.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* ADD / EDIT COUPON MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="offer-modal">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-gray-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-gray-800 uppercase tracking-wide">
                  {modalMode === 'add' ? 'Construct Campaign Coupon' : 'Edit Coupon Settings'}
                </h3>
                <p className="text-[10px] text-gray-400 font-medium">Verify deductions values prior to publishing coupons</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-gray-200 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-medium text-gray-600 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Coupon Promo Code</label>
                  <input
                    type="text"
                    required
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="e.g. FESTIVE15"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl font-mono font-black tracking-wider text-indigo-700"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Campaign Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Festive Seasonal Discount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Campaign Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize coupon parameters e.g., applicable on lighting consults..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Campaign Type Scope</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as Offer['type'])}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl bg-white text-xs font-semibold"
                  >
                    <option value="Product">Product Specific</option>
                    <option value="Category">Category Specific</option>
                    <option value="Order">Order Flat Level</option>
                    <option value="Shipping">Shipping Free Waiver</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Deduction Logic</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as 'Percentage' | 'Fixed')}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl bg-white text-xs font-semibold"
                  >
                    <option value="Percentage">Percentage (%)</option>
                    <option value="Fixed">Flat Deduct (INR)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Deduction Value</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Start Active Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">End Expiry Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl font-semibold"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 border border-gray-100 rounded-xl">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Publish &amp; Enable Coupon Immediately</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2.5 px-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl cursor-pointer"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl cursor-pointer shadow-sm"
                >
                  SAVE PROMO COUPON
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
