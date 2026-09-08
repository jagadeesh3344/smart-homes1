import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Layers, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface CategoryDropdownProps {
  variant?: 'navbar' | 'main';
  label?: string;
  className?: string;
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  variant = 'navbar',
  label = 'Categories',
  className = ''
}) => {
  const { categories, products, navigateTo } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCategory = (categoryId: string) => {
    setIsOpen(false);
    navigateTo('shop', { category: categoryId });
  };

  if (variant === 'main') {
    return (
      <div className={`relative inline-block ${className}`} ref={dropdownRef}>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-slate-800 uppercase tracking-wider hidden sm:inline">
            Categories
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between gap-3 min-w-[220px] sm:min-w-[280px] px-4 py-2.5 rounded-2xl bg-slate-900 border border-teal-500/50 text-teal-300 font-extrabold text-xs uppercase tracking-wider hover:border-teal-400 hover:bg-slate-850 transition-all shadow-lg cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-400" />
              <span>{label}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-teal-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Dropdown Floating Panel */}
        {isOpen && (
          <div className="absolute left-0 sm:right-0 sm:left-auto top-full mt-2 w-72 sm:w-80 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 border-b border-slate-800 flex justify-between items-center">
              <span>Select Category</span>
              <span className="text-teal-400 font-mono">{(categories || []).length} Categories</span>
            </div>

            <div className="max-h-72 overflow-y-auto py-1 divide-y divide-slate-800/50">
              {(categories || []).map((cat) => {
                const count = (products || []).filter(
                  (p) => p.categoryId === cat.id || p.categoryName === cat.name
                ).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.id)}
                    className="w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-slate-800/90 transition-colors group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700/60 group-hover:border-teal-400/50 transition-colors">
                      <img
                        src={cat.image || 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=200&q=80'}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-200 group-hover:text-teal-300 transition-colors truncate">
                        {cat.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {count} {count === 1 ? 'Item' : 'Items'}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                  </button>
                );
              })}
            </div>

            <div className="p-2 border-t border-slate-800 bg-slate-950/80">
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigateTo('categories');
                }}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-300 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
              >
                <span>View All Categories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Navbar Dropdown variant
  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="hover:text-teal-400 transition-colors py-2 flex items-center gap-1 cursor-pointer"
      >
        <span>{label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-teal-400' : ''}`} />
      </button>

      {/* Floating Popover Overlay Menu */}
      {isOpen && (
        <div
          onMouseLeave={() => setIsOpen(false)}
          className="absolute left-0 top-full mt-1 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden py-1 divide-y divide-slate-800/60 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-teal-400/80 bg-slate-950/50 flex justify-between items-center">
            <span>Explore Categories</span>
            <Sparkles className="w-3 h-3 text-teal-400" />
          </div>

          <div className="max-h-64 overflow-y-auto py-1">
            {(categories || []).map((cat) => {
              const count = (products || []).filter(
                (p) => p.categoryId === cat.id || p.categoryName === cat.name
              ).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className="w-full text-left px-3 py-2 flex items-center gap-2.5 hover:bg-slate-800 text-slate-300 hover:text-teal-300 transition-colors group cursor-pointer"
                >
                  <img
                    src={cat.image || 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=200&q=80'}
                    alt={cat.name}
                    className="w-7 h-7 rounded-lg object-cover shrink-0 border border-slate-700/60 group-hover:border-teal-400/50"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">{cat.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{count} items</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-1.5 bg-slate-950">
            <button
              onClick={() => {
                setIsOpen(false);
                navigateTo('categories');
              }}
              className="w-full py-1.5 px-3 rounded-xl bg-teal-500/10 hover:bg-teal-500 text-teal-300 hover:text-slate-950 font-extrabold text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1"
            >
              <span>All Categories Page</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
