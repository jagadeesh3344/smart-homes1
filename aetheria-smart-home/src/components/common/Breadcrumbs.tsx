/**
 * Breadcrumbs Component - Light Mode Refined Style
 */

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface BreadcrumbItem {
  label: string;
  route?: string;
  params?: Record<string, string>;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { navigateTo } = useShop();

  return (
    <nav className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-zinc-400 py-3 overflow-x-auto no-scrollbar font-bold">
      <button
        onClick={() => navigateTo('home')}
        className="flex items-center gap-1.5 hover:text-[#C5A880] transition-colors shrink-0 cursor-pointer"
      >
        <Home className="w-3.5 h-3.5 text-zinc-400" />
        <span>Home</span>
      </button>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
          {item.route ? (
            <button
              onClick={() => navigateTo(item.route!, item.params)}
              className="hover:text-[#C5A880] transition-colors whitespace-nowrap text-zinc-400 cursor-pointer"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-zinc-800 truncate max-w-[200px] sm:max-w-xs">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
