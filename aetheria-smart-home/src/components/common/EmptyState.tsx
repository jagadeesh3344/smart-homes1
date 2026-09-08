/**
 * Professional Reusable Empty State Illustration Component
 */

import React from 'react';
import { PackageX, FolderX, ShoppingBag, Heart, Search, HelpCircle, ShieldCheck } from 'lucide-react';

interface EmptyStateProps {
  type: 'products' | 'categories' | 'cart' | 'wishlist' | 'search' | 'orders' | 'reviews' | 'offers';
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'products':
        return <PackageX className="w-16 h-16 text-teal-500/80 stroke-[1.25]" />;
      case 'categories':
        return <FolderX className="w-16 h-16 text-blue-500/80 stroke-[1.25]" />;
      case 'cart':
        return <ShoppingBag className="w-16 h-16 text-slate-400 stroke-[1.25]" />;
      case 'wishlist':
        return <Heart className="w-16 h-16 text-rose-400 stroke-[1.25]" />;
      case 'search':
        return <Search className="w-16 h-16 text-slate-400 stroke-[1.25]" />;
      case 'offers':
        return <ShieldCheck className="w-16 h-16 text-indigo-400 stroke-[1.25]" />;
      default:
        return <HelpCircle className="w-16 h-16 text-slate-400 stroke-[1.25]" />;
    }
  };

  const getDefaultTitle = () => {
    switch (type) {
      case 'products':
        return 'No products available yet.';
      case 'categories':
        return 'No categories available.';
      case 'cart':
        return 'Your enquiry cart is empty';
      case 'wishlist':
        return 'Your wishlist is empty';
      case 'search':
        return 'No smart home products found';
      case 'orders':
        return 'No order enquiries yet';
      case 'offers':
        return 'No promotional offers currently active';
      default:
        return 'No items found';
    }
  };

  const getDefaultDescription = () => {
    switch (type) {
      case 'products':
        return 'Our product catalog is currently being updated. Please check back soon.';
      case 'categories':
        return 'Categories will appear here once available.';
      case 'cart':
        return 'Explore our smart home products or packages and request a custom architectural quote.';
      case 'wishlist':
        return 'Save your favorite luxury devices or home packages to review later or request a group enquiry.';
      case 'search':
        return 'Try searching for different keywords or browse our automation categories.';
      case 'orders':
        return 'When customers request quotes or WhatsApp enquiries, they will appear here in your dashboard.';
      case 'offers':
        return 'Check back soon for seasonal smart home bundle discounts and upgrade promotions.';
      default:
        return 'There is currently no data to display.';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 text-center max-w-xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-xl my-6 transition-all">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800 shadow-inner">
          {getIcon()}
        </div>
        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-2">
        {title || getDefaultTitle()}
      </h3>

      <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8 max-w-md">
        {description || getDefaultDescription()}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all shadow-md active:scale-95"
          >
            {actionLabel}
          </button>
        )}

        {secondaryActionLabel && onSecondaryAction && (
          <button
            onClick={onSecondaryAction}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700 transition-all active:scale-95"
          >
            {secondaryActionLabel}
          </button>
        )}
      </div>
    </div>
  );
};
