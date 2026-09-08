/**
 * ComparePage Component - Side-by-Side Product Comparison Table (Light Mode Luxury Style)
 */

import React from 'react';
import { useShop } from '../context/ShopContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { X, Cpu } from 'lucide-react';

export const ComparePage: React.FC = () => {
  const { products, compareIds, toggleCompare, addToCart, openEnquiryModal, navigateTo } = useShop();

  const comparedProducts = (products || []).filter(p => p && (compareIds || []).includes(p.id));

  return (
    <div className="bg-[#FDFDFD] min-h-screen py-12 text-zinc-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <Breadcrumbs items={[{ label: 'Compare Products' }]} />

        <div className="my-8">
          <h1 className="text-3xl sm:text-5xl font-light text-zinc-900 tracking-tight font-serif">
            Smart Hardware Comparison
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm font-light mt-2 max-w-2xl">
            Compare technical specs, protocols, warranties, and prices side-by-side.
          </p>
        </div>

        {(comparedProducts || []).length === 0 ? (
          <EmptyState
            type="search"
            title="No products selected for comparison"
            description="Click the compare icon on product cards across the shop to compare up to 4 devices simultaneously."
            actionLabel="Explore Catalog"
            onAction={() => navigateTo('shop')}
          />
        ) : (
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-x-auto my-8">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50/60">
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400 w-48">Spec Feature</th>
                  {(comparedProducts || []).map(p => (
                    <th key={p.id} className="p-4 w-64">
                      <div className="relative space-y-2">
                        <button
                          onClick={() => toggleCompare(p)}
                          className="absolute -top-1 -right-1 p-1 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-400 hover:text-zinc-800 transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <img
                          src={p.images?.[0] || 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80'}
                          alt={p.name}
                          className="w-24 h-24 rounded object-cover bg-zinc-50 mx-auto border border-zinc-200 shadow-inner"
                        />
                        <h4 className="text-sm font-semibold text-zinc-900 text-center line-clamp-1 font-serif">{p.name}</h4>
                        <div className="text-center text-sm font-bold text-[#C5A880]">${p.salePrice || p.price}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-150 text-xs text-zinc-650 font-light">
                <tr>
                  <td className="p-4 font-bold uppercase tracking-widest text-[10px] text-zinc-400 bg-zinc-50/30">Smart Protocol</td>
                  {(comparedProducts || []).map(p => (
                    <td key={p.id} className="p-4 font-semibold text-zinc-800">
                      <span className="bg-white text-[#C5A880] border border-zinc-200 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 shadow-sm">
                        <Cpu className="w-3 h-3 text-[#C5A880]" />
                        <span>{p.protocol || 'Matter'}</span>
                      </span>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-4 font-bold uppercase tracking-widest text-[10px] text-zinc-400 bg-zinc-50/30">Category</td>
                  {(comparedProducts || []).map(p => (
                    <td key={p.id} className="p-4 text-zinc-750 font-medium">{p.categoryName || 'Smart Automation'}</td>
                  ))}
                </tr>

                <tr>
                  <td className="p-4 font-bold uppercase tracking-widest text-[10px] text-zinc-400 bg-zinc-50/30">Warranty Coverage</td>
                  {(comparedProducts || []).map(p => (
                    <td key={p.id} className="p-4 text-zinc-750 font-medium">{p.warranty || '3-Year Replacement'}</td>
                  ))}
                </tr>

                <tr>
                  <td className="p-4 font-bold uppercase tracking-widest text-[10px] text-zinc-400 bg-zinc-50/30">Stock Availability</td>
                  {(comparedProducts || []).map(p => (
                    <td key={p.id} className="p-4 font-bold text-emerald-600">In Stock ({p.stock})</td>
                  ))}
                </tr>

                <tr>
                  <td className="p-4 font-bold uppercase tracking-widest text-[10px] text-zinc-400 bg-zinc-50/30">Actions</td>
                  {(comparedProducts || []).map(p => (
                    <td key={p.id} className="p-4 space-y-2">
                      <button
                        onClick={() => openEnquiryModal(p)}
                        className="w-full py-2.5 rounded bg-zinc-900 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-colors cursor-pointer shadow-sm"
                      >
                        Enquire
                      </button>
                      <button
                        onClick={() => addToCart(p)}
                        className="w-full py-2.5 rounded bg-zinc-50 text-zinc-500 font-bold text-[10px] uppercase tracking-widest border border-zinc-200 hover:text-zinc-850 hover:bg-zinc-100 transition-colors cursor-pointer"
                      >
                        Add to Cart
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
