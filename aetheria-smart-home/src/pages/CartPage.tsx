/**
 * CartPage Component - Light Mode Luxury Style
 */

import React from 'react';
import { useShop } from '../context/ShopContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, openEnquiryModal, navigateTo } = useShop();

  const totalAmount = cart.reduce((sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity, 0);

  return (
    <div className="bg-[#FDFDFD] min-h-screen py-12 text-zinc-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <Breadcrumbs items={[{ label: 'Enquiry Cart' }]} />

        <div className="my-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-light text-zinc-900 tracking-tight font-serif">
              Enquiry Cart
            </h1>
            <p className="text-zinc-500 text-xs sm:text-sm font-light mt-2 max-w-2xl">
              Review your items before requesting a consolidated architectural quote.
            </p>
          </div>

          {(cart || []).length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors cursor-pointer uppercase tracking-widest"
            >
              Clear Cart Items
            </button>
          )}
        </div>

        {(cart || []).length === 0 ? (
          <EmptyState
            type="cart"
            title="Your enquiry cart is empty"
            description="Explore our smart home products or packages and request a custom architectural quote."
            actionLabel="Explore Catalog"
            onAction={() => navigateTo('shop')}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-start">
            {/* Cart Items Table */}
            <div className="lg:col-span-8 space-y-4">
              {(cart || []).map(item => (
                <div key={item.product.id} className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm flex flex-col sm:flex-row gap-5 items-center justify-between hover:border-[#C5A880] transition-colors">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.product.images?.[0] || 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80'}
                      alt={item.product.name}
                      className="w-20 h-20 rounded object-cover bg-zinc-50 shrink-0 border border-zinc-200 shadow-inner"
                    />

                    <div>
                      <span className="text-[10px] font-bold text-[#C5A880] uppercase tracking-wider block">
                        {item.product.categoryName || 'Smart Hardware'}
                      </span>
                      <h3
                        onClick={() => navigateTo('product-details', { id: item.product.id })}
                        className="font-semibold text-zinc-900 text-sm sm:text-base hover:text-[#C5A880] cursor-pointer transition-colors font-serif"
                      >
                        {item.product.name}
                      </h3>
                      <span className="text-xs text-zinc-400 font-mono">SKU: {item.product.sku}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    <div className="flex items-center border border-zinc-200 rounded bg-zinc-50 overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100/40 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-zinc-800">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100/40 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[80px]">
                      <div className="text-sm sm:text-base font-semibold text-zinc-900">
                        ${(item.product.salePrice || item.product.price) * item.quantity}
                      </div>
                      <span className="text-[10px] text-zinc-450 font-light">
                        ${item.product.salePrice || item.product.price} each
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 stroke-[1.5]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary Card */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-zinc-200 shadow-sm space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-150 pb-3">
                  Enquiry Summary
                </h3>

                <div className="space-y-3 text-xs text-zinc-500">
                  <div className="flex justify-between">
                    <span className="font-light">Items Count:</span>
                    <span className="font-bold text-zinc-800">{(cart || []).length} Products</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-light">Estimated Total Value:</span>
                    <span className="font-bold text-zinc-800">${totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-light">Installation Support:</span>
                    <span className="font-semibold text-[#C5A880]">Architectural Included</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-150 flex justify-between items-baseline">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Estimate Quote:</span>
                  <span className="text-2xl font-semibold text-zinc-900">${totalAmount}</span>
                </div>

                <button
                  onClick={() => openEnquiryModal()}
                  className="w-full py-4 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Valuation</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
