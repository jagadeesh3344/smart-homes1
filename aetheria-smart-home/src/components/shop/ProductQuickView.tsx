/**
 * Product Quick View Modal
 */

import React from 'react';
import { X, MessageSquare, ShoppingBag, ShieldCheck, Cpu, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { RatingStars } from '../common/RatingStars';

export const ProductQuickView: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, openEnquiryModal, navigateTo } = useShop();

  if (!quickViewProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div
        className="bg-slate-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-800 relative animate-scale-up max-h-[90vh] flex flex-col md:flex-row text-slate-100"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white shadow-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="md:w-1/2 bg-slate-950 relative min-h-[280px]">
          <img
            src={quickViewProduct.images?.[0] || 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'}
            alt={quickViewProduct.name}
            className="w-full h-full object-cover"
          />
          {quickViewProduct.protocol && (
            <div className="absolute bottom-4 left-4 bg-slate-900/90 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-white/10">
              <Cpu className="w-3.5 h-3.5 text-teal-400" />
              {quickViewProduct.protocol}
            </div>
          )}
        </div>

        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-1">
              {quickViewProduct.categoryName || 'Smart Automation'}
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
              {quickViewProduct.name}
            </h2>

            <div className="flex items-center gap-3 mb-4">
              <RatingStars rating={quickViewProduct.rating || 5.0} reviewCount={quickViewProduct.reviewCount || 10} showCount />
              <span className="text-xs text-slate-400 font-mono">SKU: {quickViewProduct.sku}</span>
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl sm:text-3xl font-black text-white">
                ${quickViewProduct.salePrice || quickViewProduct.price}
              </span>
              {quickViewProduct.salePrice && (
                <span className="text-sm text-slate-500 line-through font-medium">
                  ${quickViewProduct.price}
                </span>
              )}
            </div>

            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              {quickViewProduct.shortDescription || quickViewProduct.description || ''}
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <Check className="w-4 h-4 text-teal-400" />
                <span>Matter & HomeKit Ecosystem Native</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>{quickViewProduct.warranty || '3-Year Replacement Warranty'}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  closeQuickView();
                  openEnquiryModal(quickViewProduct);
                }}
                className="py-3 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                Direct Enquiry
              </button>

              <button
                onClick={() => {
                  addToCart(quickViewProduct);
                  closeQuickView();
                }}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/60 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
            </div>

            <button
              onClick={() => {
                closeQuickView();
                navigateTo('product-details', { id: quickViewProduct.id });
              }}
              className="w-full text-center text-xs font-semibold text-slate-400 hover:text-teal-300 transition-colors py-1"
            >
              View Full Technical Specifications & Specs →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
