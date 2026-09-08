/**
 * ShopPage Component - Professional E-Commerce Catalog with Filters & Search
 */

import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/shop/ProductCard';
import { EmptyState } from '../components/common/EmptyState';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ValueTrustBadges } from '../components/common/ValueTrustBadges';
import { Search, LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products, categories, searchQuery, setSearchQuery, routeParams } = useShop();

  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>(routeParams.category || 'all');
  const [selectedProtocol, setSelectedProtocol] = useState<string>('all');
  const [priceMax, setPriceMax] = useState<number>(300000);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'rating'>('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const filteredProducts = useMemo(() => {
    return (products || []).filter(product => {
      if (!product) return false;
      // Filter status
      if (product.status === 'draft') return false;

      // Filter search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = (product.name || '').toLowerCase().includes(query);
        const matchesDesc = (product.shortDescription || '').toLowerCase().includes(query) || (product.description || '').toLowerCase().includes(query);
        const matchesSku = (product.sku || '').toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesSku) return false;
      }

      // Filter category
      if (selectedCategory !== 'all' && product.categoryId !== selectedCategory) {
        return false;
      }

      // Filter protocol
      if (selectedProtocol !== 'all' && product.protocol !== selectedProtocol) {
        return false;
      }

      // Filter price
      if (!product.priceOnRequest) {
        const effectivePrice = product.salePrice || product.price;
        if (effectivePrice && effectivePrice > priceMax) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return (a.salePrice || a.price) - (b.salePrice || b.price);
      }
      if (sortBy === 'price-desc') {
        return (b.salePrice || b.price) - (a.salePrice || a.price);
      }
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [products, searchQuery, selectedCategory, selectedProtocol, priceMax, sortBy]);

  return (
    <div className="bg-[#FDFDFD] min-h-screen py-12 text-zinc-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <Breadcrumbs items={[{ label: 'Smart Home Shop' }]} />

        {/* Header Title */}
        <div className="my-8">
          <h1 className="text-3xl sm:text-5xl font-light text-zinc-900 tracking-tight font-serif">
            Smart Home Hardware Catalog
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm mt-2 max-w-2xl font-light">
            Browse Matter-certified smart hubs, architectural lightstrips, and biometric security systems.
          </p>
        </div>

        {/* Mobile Category Dropdown Selector */}
        <div className="mb-4 sm:hidden">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
            Category Filter
          </label>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 rounded bg-zinc-50 border border-zinc-200 text-xs font-bold text-zinc-800 focus:outline-none focus:border-[#C5A880] shadow-sm cursor-pointer"
          >
            <option value="all">All Products ({(products || []).length})</option>
            {(categories || []).map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filter & View Bar */}
        <div className="bg-white rounded-xl p-4 border border-zinc-200 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products, SKUs..."
              className="w-full pl-9 pr-8 py-2.5 rounded border border-zinc-200 text-xs bg-zinc-50 text-zinc-850 placeholder:text-zinc-300 focus:outline-none focus:border-[#C5A880] focus:bg-white transition-all"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-3 text-zinc-400 hover:text-zinc-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-3.5 py-2.5 rounded bg-zinc-50 text-zinc-650 text-xs font-bold flex items-center gap-1.5 border border-zinc-200 shadow-sm cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-2.5 rounded bg-zinc-50 border border-zinc-200 text-xs font-semibold text-zinc-650 focus:outline-none cursor-pointer max-w-[140px] sm:max-w-none"
            >
              <option value="newest">Sort: Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            {/* Grid / List View Toggles */}
            <div className="hidden sm:flex items-center gap-1 bg-zinc-50 p-1 rounded border border-zinc-200">
              <button
                onClick={() => setLayout('grid')}
                className={`p-1.5 rounded transition-all cursor-pointer ${
                  layout === 'grid' ? 'bg-white text-[#C5A880] border border-zinc-200 shadow-sm' : 'text-zinc-400 hover:text-zinc-800'
                }`}
              >
                <LayoutGrid className="w-4 h-4 stroke-[1.5]" />
              </button>
              <button
                onClick={() => setLayout('list')}
                className={`p-1.5 rounded transition-all cursor-pointer ${
                  layout === 'list' ? 'bg-white text-[#C5A880] border border-zinc-200 shadow-sm' : 'text-zinc-400 hover:text-zinc-800'
                }`}
              >
                <List className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Mobile Filters Drawer/Box */}
        {mobileFilterOpen && (
          <div className="lg:hidden bg-zinc-50 p-4 rounded border border-zinc-200 shadow-sm mb-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-800">
                Filter Products
              </span>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedProtocol('all');
                  setSearchQuery('');
                  setPriceMax(300000);
                }}
                className="text-[11px] font-bold text-[#C5A880] hover:underline cursor-pointer"
              >
                Reset All
              </button>
            </div>

            <div>
              <label className="text-[10px] font-bold text-zinc-450 uppercase tracking-widest block mb-2">
                Smart Protocol
              </label>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {['all', 'Matter', 'Zigbee', 'Wi-Fi', 'Z-Wave', 'Thread'].map(proto => (
                  <button
                    key={proto}
                    onClick={() => setSelectedProtocol(proto)}
                    className={`px-3 py-1.5 rounded border text-[10px] font-bold uppercase transition-all cursor-pointer ${
                      selectedProtocol === proto
                        ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm'
                        : 'bg-white text-zinc-500 border-zinc-200'
                    }`}
                  >
                    {proto}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                <span>Max Price Limit</span>
                <span className="text-[#C5A880] font-mono font-bold">₹{priceMax.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="500"
                max="300000"
                step="2500"
                value={priceMax}
                onChange={e => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#C5A880] bg-zinc-200 h-2 rounded cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24">
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-150 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#C5A880]" />
                  <span>Filter Products</span>
                </span>
                {(selectedCategory !== 'all' || selectedProtocol !== 'all' || searchQuery || priceMax !== 300000) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedProtocol('all');
                      setSearchQuery('');
                      setPriceMax(300000);
                    }}
                    className="text-[11px] font-bold text-[#C5A880] hover:underline cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Categories Filter */}
              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-3">
                  Categories
                </label>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2.5 rounded transition-all flex items-center justify-between cursor-pointer ${
                      selectedCategory === 'all'
                        ? 'bg-zinc-50 text-[#C5A880] border border-zinc-200 font-bold shadow-inner'
                        : 'text-zinc-500 hover:bg-zinc-50 font-light'
                    }`}
                  >
                    <span>All Products</span>
                    <span className="text-[10px] opacity-75">({(products || []).length})</span>
                  </button>

                  {(categories || []).map(cat => {
                    const count = (products || []).filter(p => p && p.categoryId === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left px-3 py-2.5 rounded transition-all flex items-center justify-between cursor-pointer ${
                          selectedCategory === cat.id
                            ? 'bg-zinc-50 text-[#C5A880] border border-zinc-200 font-bold shadow-inner'
                            : 'text-zinc-500 hover:bg-zinc-50 font-light'
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        <span className="text-[10px] opacity-75">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Protocol Filter */}
              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-3">
                  Smart Protocol
                </label>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {['all', 'Matter', 'Zigbee', 'Wi-Fi', 'Z-Wave', 'Thread'].map(proto => (
                    <button
                      key={proto}
                      onClick={() => setSelectedProtocol(proto)}
                      className={`px-2.5 py-1.5 rounded border text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        selectedProtocol === proto
                          ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm'
                          : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100'
                      }`}
                    >
                      {proto}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                  <span>Max Price Limit</span>
                  <span className="text-[#C5A880] font-mono font-bold">₹{priceMax.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="300000"
                  step="2500"
                  value={priceMax}
                  onChange={e => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[#C5A880] bg-zinc-200 h-1 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Product Grid / Empty State */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <EmptyState
                type="products"
                title={(products || []).length === 0 ? 'No products available.' : 'No matching products found.'}
                description={
                  (products || []).length === 0
                    ? 'Products will appear here once available.'
                    : 'Try adjusting your search or filters to view items.'
                }
                actionLabel={(products || []).length === 0 ? undefined : 'Reset Filters'}
                onAction={
                  (products || []).length === 0
                    ? undefined
                    : () => {
                        setSelectedCategory('all');
                        setSelectedProtocol('all');
                        setSearchQuery('');
                        setPriceMax(300000);
                      }
                }
              />
            ) : (
              <div
                className={
                  layout === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {(filteredProducts || []).map(product => (
                  <ProductCard key={product.id} product={product} layout={layout} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom 4 Trust Badges matching Screen 02 & 03 Wireframe */}
        <div className="mt-16">
          <ValueTrustBadges />
        </div>
      </div>
    </div>
  );
};
