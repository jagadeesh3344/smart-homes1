/**
 * ProductCard Component - Premium Luxury E-Commerce Product Card
 */

import React from 'react';
import { Heart, Eye, MessageSquare, Cpu, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { RatingStars } from '../common/RatingStars';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const {
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openQuickView,
    openEnquiryModal,
  } = useShop();

  const isWishlisted = isInWishlist(product.id);

  const mainImage = (Array.isArray(product.images) && product.images.length > 0)
    ? product.images[0]
    : (product.image || 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80');

  if (layout === 'list') {
    return (
      <div className="group bg-white rounded-xl border border-zinc-200 hover:border-[#C5A880] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5">
        <div 
          onClick={() => navigateTo('product-details', { id: product.id })}
          className="relative sm:w-64 h-48 sm:h-52 shrink-0 rounded overflow-hidden bg-zinc-50 cursor-pointer"
        >
          {mainImage === 'IMAGE REQUIRES SOURCE ASSET' ? (
            <div className="w-full h-full bg-zinc-100 flex flex-col items-center justify-center p-4 border border-zinc-200/60 text-center select-none">
              <span className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">KSH Catalogue</span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-zinc-500 max-w-[180px]">IMAGE REQUIRES SOURCE ASSET</span>
            </div>
          ) : (
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-101 transition-transform duration-500 opacity-95"
              loading="lazy"
            />
          )}
          {product.protocol && (
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#C5A880] px-2.5 py-1 rounded border border-zinc-200 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-sm">
              <Cpu className="w-3 h-3 text-[#C5A880]" />
              <span>{product.protocol}</span>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#C5A880]">
                {product.categoryName || 'Smart Automation'}
              </span>
              <span className="text-[10px] sm:text-xs text-zinc-400 font-mono">SKU: {product.sku}</span>
            </div>

            <h3
              onClick={() => navigateTo('product-details', { id: product.id })}
              className="text-base sm:text-lg font-semibold text-zinc-900 hover:text-[#C5A880] transition-colors cursor-pointer mb-1 sm:mb-2 line-clamp-1 font-serif"
            >
              {product.name}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-500 font-light line-clamp-2 mb-2 sm:mb-3">
              {product.shortDescription || product.description || ''}
            </p>

            <RatingStars rating={product.rating || 5.0} reviewCount={product.reviewCount || 12} showCount />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-zinc-100">
            <div className="flex items-baseline gap-2">
              {product.priceOnRequest ? (
                <span className="text-xs sm:text-sm font-semibold text-zinc-500 uppercase tracking-wider">Price on Request</span>
              ) : (
                <>
                  <span className="text-lg sm:text-xl font-semibold text-zinc-900">
                    ₹{(product.salePrice || product.price || 0).toLocaleString('en-IN')}
                  </span>
                  {product.salePrice && (
                    <span className="text-xs text-zinc-400 line-through font-light">
                      ₹{(product.price || 0).toLocaleString('en-IN')}
                    </span>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openEnquiryModal(product)}
                className="px-4 py-2.5 rounded bg-white hover:bg-zinc-50 text-zinc-800 font-bold text-xs border border-zinc-200 shadow-sm flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="hidden sm:inline">Enquire</span>
              </button>
              <button
                onClick={() => addToCart(product)}
                className="px-5 py-3 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs tracking-widest uppercase transition-all shadow-md cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-xl border border-zinc-200 hover:border-[#C5A880] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between relative">
      <div 
        onClick={() => navigateTo('product-details', { id: product.id })}
        className="relative w-full aspect-square bg-zinc-50 overflow-hidden cursor-pointer"
      >
        {mainImage === 'IMAGE REQUIRES SOURCE ASSET' ? (
          <div className="w-full h-full bg-zinc-100 flex flex-col items-center justify-center p-4 border border-zinc-200/60 text-center select-none">
            <span className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">KSH Catalogue</span>
            <span className="text-[9px] sm:text-[10px] font-semibold text-zinc-500 max-w-[180px]">IMAGE REQUIRES SOURCE ASSET</span>
          </div>
        ) : (
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-101 transition-transform duration-500 opacity-95"
            loading="lazy"
          />
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1.5 z-10">
          {product.isNewArrival && (
            <span className="bg-white/95 backdrop-blur-sm text-[#C5A880] border border-zinc-200 text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow-sm">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-zinc-900/90 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow-sm">
              Top
            </span>
          )}
          {product.salePrice && (
            <span className="bg-[#C5A880] text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow-sm">
              Sale
            </span>
          )}
        </div>

        {/* Quick Actions Overlay (Visible always on mobile or hover on desktop) */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            className={`p-1.5 sm:p-2 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-zinc-200 transition-all cursor-pointer ${
              isWishlisted
                ? 'bg-rose-500 text-white border-rose-500'
                : 'text-zinc-650 hover:bg-white hover:text-rose-500'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-current' : 'stroke-[1.5]'}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            title="Quick View"
            className="p-1.5 sm:p-2 rounded-full bg-white/95 hover:bg-white text-zinc-650 hover:text-zinc-950 backdrop-blur-md shadow-md transition-all border border-zinc-200 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Protocol Chip */}
        {product.protocol && (
          <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-white/95 backdrop-blur-sm text-[#C5A880] px-2 py-1 rounded text-[9px] sm:text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border border-zinc-200 shadow-sm">
            <Cpu className="w-3 h-3 text-[#C5A880]" />
            <span>{product.protocol}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="text-[10px] sm:text-[11px] font-bold text-[#C5A880] uppercase tracking-wider mb-0.5 sm:mb-1">
            {product.categoryName || 'Smart Automation'}
          </div>

          <h3
            onClick={() => navigateTo('product-details', { id: product.id })}
            className="font-semibold text-zinc-900 hover:text-[#C5A880] transition-colors cursor-pointer text-xs sm:text-base line-clamp-1 mb-1 font-serif"
          >
            {product.name}
          </h3>

          <p className="text-[11px] sm:text-xs text-zinc-500 font-light line-clamp-2 mb-2 hidden sm:block">
            {product.shortDescription || product.description || ''}
          </p>

          <RatingStars rating={product.rating || 5.0} reviewCount={product.reviewCount || 8} showCount />
        </div>

        <div className="mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-zinc-100 flex items-center justify-between gap-1.5 sm:gap-2">
          <div>
            <div className="text-[9px] sm:text-[10px] text-zinc-400 uppercase font-bold tracking-widest hidden sm:block">Quote Price</div>
            <div className="flex items-center flex-wrap gap-1 sm:gap-1.5">
              {product.priceOnRequest ? (
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Price on Request</span>
              ) : (
                <>
                  <span className="text-sm sm:text-lg font-semibold text-zinc-900">
                    ₹{(product.salePrice || product.price || 0).toLocaleString('en-IN')}
                  </span>
                  {product.salePrice && (
                    <>
                      <span className="text-[10px] sm:text-xs text-zinc-400 line-through font-light">
                        ₹{(product.price || 0).toLocaleString('en-IN')}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 uppercase font-mono leading-none">
                        {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                      </span>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={() => addToCart(product)}
              className="px-3.5 py-2.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-[11px] sm:text-xs tracking-wider transition-all shadow-sm active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
