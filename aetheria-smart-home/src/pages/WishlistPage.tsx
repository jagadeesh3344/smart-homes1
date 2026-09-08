/**
 * WishlistPage Component - Light Mode Luxury Style
 */

import React from 'react';
import { useShop } from '../context/ShopContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductCard } from '../components/shop/ProductCard';
import { EmptyState } from '../components/common/EmptyState';

export const WishlistPage: React.FC = () => {
  const { products, wishlistIds, navigateTo } = useShop();

  const wishlistedProducts = (products || []).filter(p => p && (wishlistIds || []).includes(p.id));

  return (
    <div className="bg-[#FDFDFD] min-h-screen py-12 text-zinc-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <Breadcrumbs items={[{ label: 'Wishlist' }]} />

        <div className="my-8">
          <h1 className="text-3xl sm:text-5xl font-light text-zinc-900 tracking-tight font-serif">
            Saved Wishlist ({(wishlistedProducts || []).length})
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm font-light mt-2 max-w-2xl">
            Your saved smart home hardware and automation devices.
          </p>
        </div>

        {(wishlistedProducts || []).length === 0 ? (
          <EmptyState
            type="wishlist"
            title="Your wishlist is empty"
            description="Browse our smart home products and click the heart icon on any product to save it to your wishlist."
            actionLabel="Explore Catalog"
            onAction={() => navigateTo('shop')}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(wishlistedProducts || []).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
