/**
 * CartDrawer - Sliding Enquiry Cart
 */

import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { EmptyState } from '../common/EmptyState';

export const CartDrawer: React.FC = () => {
  const { cart, cartDrawerOpen, toggleCartDrawer, removeFromCart, updateCartQuantity, openEnquiryModal, navigateTo } = useShop();

  if (!cartDrawerOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => toggleCartDrawer(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 shadow-2xl flex flex-col border-l border-slate-800 text-slate-100">
          {/* Header */}
          <div className="p-6 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-teal-400" />
              <h2 className="text-lg font-extrabold">Enquiry Cart ({(cart || []).length})</h2>
            </div>
            <button
              onClick={() => toggleCartDrawer(false)}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {(cart || []).length === 0 ? (
              <EmptyState
                type="cart"
                title="Your enquiry cart is empty"
                description="Browse our smart home products and add items to generate a consolidated enquiry."
                actionLabel="Explore Shop"
                onAction={() => {
                  toggleCartDrawer(false);
                  navigateTo('shop');
                }}
              />
            ) : (
              <div className="space-y-4">
                {(cart || []).map(item => (
                  <div key={item.product.id} className="flex gap-4 p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                    <img
                      src={item.product.images?.[0] || 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80'}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-800 border border-slate-700/60"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold text-white line-clamp-1">{item.product.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-500 hover:text-rose-400 p-0.5 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-xs font-bold text-teal-400 mt-0.5">
                          ${item.product.salePrice || item.product.price}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-slate-700 rounded-lg bg-slate-900">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-white font-mono">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {(cart || []).length > 0 && (
            <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Estimate:</span>
                <span className="text-xl font-black text-white">${totalAmount}</span>
              </div>

              <button
                onClick={() => {
                  toggleCartDrawer(false);
                  openEnquiryModal();
                }}
                className="w-full py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  toggleCartDrawer(false);
                  navigateTo('cart');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 border border-slate-700/60 text-slate-300 font-semibold text-xs hover:bg-slate-750 transition-colors"
              >
                View Full Cart & Items
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
