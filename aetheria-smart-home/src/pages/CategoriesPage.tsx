/**
 * CategoriesPage Component - Light Mode Luxury Style
 */

import React from 'react';
import { useShop } from '../context/ShopContext';
import { EmptyState } from '../components/common/EmptyState';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ValueTrustBadges } from '../components/common/ValueTrustBadges';

export const CategoriesPage: React.FC = () => {
  const { categories, products, navigateTo } = useShop();

  return (
    <div className="bg-[#FDFDFD] min-h-screen py-12 text-zinc-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <Breadcrumbs items={[{ label: 'Categories' }]} />

        <div className="my-8">
          <h1 className="text-3xl sm:text-5xl font-light text-zinc-900 tracking-tight font-serif">
            Automation Categories
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm font-light mt-2 max-w-2xl">
            Browse specialized smart home divisions including hubs, architectural lighting, biometric locks, and audio systems.
          </p>
        </div>

        {(categories || []).length === 0 ? (
          <EmptyState
            type="categories"
            title="No categories available."
            description="Categories will appear here once available."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(categories || []).map(cat => {
              const productCount = (products || []).filter(p => p && p.categoryId === cat.id).length;
              return (
                <div
                  key={cat.id}
                  onClick={() => navigateTo('shop', { category: cat.id })}
                  className="group bg-white rounded-xl overflow-hidden border border-zinc-200 shadow-sm hover:shadow-md hover:border-[#C5A880] transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative h-56 bg-zinc-100 overflow-hidden">
                    <img
                      src={cat.image || 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-[#C5A880] text-[9px] font-bold px-3 py-1.5 rounded border border-zinc-200 shadow-sm uppercase tracking-widest">
                      {productCount} Products
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-[#C5A880] transition-colors mb-2 font-serif">
                      {cat.name}
                    </h3>
                    {cat.description && (
                      <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 font-light">
                        {cat.description}
                      </p>
                    )}
                    <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center text-[10px] font-bold uppercase tracking-widest text-[#C5A880] group-hover:translate-x-1 transition-transform">
                      <span>Browse Category Products</span>
                      <span className="ml-1">→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom 4 Trust Badges matching Screen 03 Wireframe */}
        <div className="mt-16">
          <ValueTrustBadges />
        </div>
      </div>
    </div>
  );
};
