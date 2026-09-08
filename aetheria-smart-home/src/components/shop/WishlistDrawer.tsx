/**
 * WishlistDrawer Component
 */

import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { EmptyState } from '../common/EmptyState';

export const WishlistDrawer: React.FC = () => {
  const { products, wishlistIds, wishlistDrawerOpen, toggleWishlistDrawer, toggleWishlist, addToCart, navigateTo } = useShop();

  if (!wishlistDrawerOpen) return null;

  const wishlistedProducts = (products || []).filter(p => p && (wishlistIds || []).includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => toggleWishlistDrawer(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 shadow-2xl flex flex-col border-l border-slate-800 text-slate-100">
          <div className="p-6 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
              <h2 className="text-lg font-extrabold">Saved Wishlist ({(wishlistedProducts || []).length})</h2>
            </div>
            <button
              onClick={() => toggleWishlistDrawer(false)}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {(wishlistedProducts || []).length === 0 ? (
              <EmptyState
                type="wishlist"
                title="Your wishlist is empty"
                description="Save smart home products to your personal wishlist to review or enquiry later."
                actionLabel="Explore Catalog"
                onAction={() => {
                  toggleWishlistDrawer(false);
                  navigateTo('shop');
                }}
              />
            ) : (
              <div className="space-y-4">
                {(wishlistedProducts || []).map(product => (
                  <div key={product.id} className="flex gap-4 p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                    <img
                      src={product.images?.[0] || 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80'}
                      alt={product.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-800 border border-slate-700/60"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold text-white line-clamp-1">{product.name}</h4>
                          <button
                            onClick={() => toggleWishlist(product)}
                            className="text-slate-500 hover:text-rose-400 p-0.5 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-xs font-bold text-teal-400 mt-0.5">
                          ${product.salePrice || product.price}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          addToCart(product);
                        }}
                        className="mt-2 py-1.5 px-3 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors w-fit shadow-md shadow-teal-500/10"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        Move to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {(wishlistedProducts || []).length > 0 && (
            <div className="p-6 bg-slate-950 border-t border-slate-800">
              <button
                onClick={() => {
                  toggleWishlistDrawer(false);
                  navigateTo('wishlist');
                }}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/60 font-bold text-xs transition-colors shadow-md text-center"
              >
                View Complete Wishlist Page
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
