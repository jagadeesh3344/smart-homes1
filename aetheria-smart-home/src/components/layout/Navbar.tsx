/**
 * Navbar Component - Premium sticky architectural header.
 * Clean, high-contrast visual design, balanced negative space.
 */

import React, { useState } from 'react';
import { Cpu, Menu, X, Search as SearchIcon, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Navbar: React.FC = () => {
  const { activeRoute, navigateTo, handleLogoClick, cart, toggleCartDrawer, setSearchQuery } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavigation = (route: string) => {
    setMobileMenuOpen(false);
    navigateTo(route);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch);
      navigateTo('shop');
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200 text-zinc-800 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* LEFT: Client Logo */}
        <div
          id="navbar-logo"
          onClick={handleLogoClick}
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="w-9 h-9 rounded bg-zinc-50 border border-zinc-200 flex items-center justify-center text-[#C5A880] shadow-sm group-hover:scale-102 transition-transform duration-300">
            <Cpu className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div className="space-y-0.5">
            <span className="text-sm font-semibold tracking-[0.25em] text-zinc-900 uppercase block leading-none font-serif">
              AETHERIA
            </span>
            <span className="text-[8px] uppercase font-bold text-zinc-400 tracking-[0.15em] block">
              Architectural Systems
            </span>
          </div>
        </div>

        {/* CENTER: Public Navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-500">
          <button
            onClick={() => handleNavigation('home')}
            className={`hover:text-zinc-900 transition-colors cursor-pointer py-2 ${
              activeRoute === 'home' ? 'text-[#C5A880]' : ''
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavigation('solutions')}
            className={`hover:text-zinc-900 transition-colors cursor-pointer py-2 ${
              activeRoute === 'solutions' ? 'text-[#C5A880]' : ''
            }`}
          >
            Solutions
          </button>

          <button
            onClick={() => handleNavigation('shop')}
            className={`hover:text-zinc-900 transition-colors cursor-pointer py-2 ${
              activeRoute === 'shop' ? 'text-[#C5A880]' : ''
            }`}
          >
            Products
          </button>

          <button
            onClick={() => handleNavigation('projects')}
            className={`hover:text-zinc-900 transition-colors cursor-pointer py-2 ${
              activeRoute === 'projects' ? 'text-[#C5A880]' : ''
            }`}
          >
            Projects
          </button>

          <button
            onClick={() => handleNavigation('videos')}
            className={`hover:text-zinc-900 transition-colors cursor-pointer py-2 ${
              activeRoute === 'videos' ? 'text-[#C5A880]' : ''
            }`}
          >
            Videos
          </button>

          <button
            onClick={() => handleNavigation('about')}
            className={`hover:text-zinc-900 transition-colors cursor-pointer py-2 ${
              activeRoute === 'about' ? 'text-[#C5A880]' : ''
            }`}
          >
            About
          </button>

          <button
            onClick={() => handleNavigation('contact')}
            className={`hover:text-zinc-900 transition-colors cursor-pointer py-2 ${
              activeRoute === 'contact' ? 'text-[#C5A880]' : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* RIGHT: Actions */}
        <div className="hidden lg:flex items-center gap-5 shrink-0">
          {/* Dynamic Search Overlay Button */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center bg-zinc-50 border border-zinc-200 rounded overflow-hidden px-2.5 py-1 animate-fade-in w-48">
                <input
                  type="text"
                  autoFocus
                  placeholder="Search space..."
                  value={localSearch}
                  onChange={e => setLocalSearch(e.target.value)}
                  className="bg-transparent text-[11px] text-zinc-900 outline-none w-full"
                />
                <button type="submit">
                  <SearchIcon className="w-3.5 h-3.5 text-[#C5A880] cursor-pointer" />
                </button>
                <X className="w-3.5 h-3.5 text-zinc-400 ml-1.5 cursor-pointer" onClick={() => setSearchOpen(false)} />
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded hover:bg-zinc-50 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
                title="Search Catalogue"
              >
                <SearchIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Cart Trigger */}
          <button
            onClick={() => toggleCartDrawer(true)}
            className="p-2 rounded hover:bg-zinc-50 text-zinc-500 hover:text-zinc-900 transition-colors relative cursor-pointer"
            title="View Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C5A880] text-zinc-950 rounded-full text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Get a Quote Action CTA */}
          <button
            onClick={() => handleNavigation('contact')}
            className="px-5 py-2.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-3 h-3 text-white" />
          </button>
        </div>

        {/* Mobile Header elements */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Mobile Search */}
          <button
            onClick={() => {
              navigateTo('shop');
              setSearchQuery('');
            }}
            className="p-2 text-zinc-500 hover:text-zinc-950 animate-fade-in"
          >
            <SearchIcon className="w-4 h-4" />
          </button>

          {/* Mobile Cart */}
          <button
            onClick={() => toggleCartDrawer(true)}
            className="p-2 text-zinc-500 hover:text-zinc-950 relative"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C5A880] text-zinc-950 rounded-full text-[8px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded hover:bg-zinc-100 text-zinc-500 hover:text-zinc-950"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-zinc-200 px-6 py-8 space-y-6 animate-fade-in">
          <div className="flex flex-col gap-4 text-xs uppercase tracking-widest font-bold text-zinc-500">
            <button onClick={() => handleNavigation('home')} className="text-left py-2 hover:text-zinc-900">
              Home
            </button>
            <button onClick={() => handleNavigation('solutions')} className="text-left py-2 hover:text-zinc-900">
              Solutions
            </button>
            <button onClick={() => handleNavigation('shop')} className="text-left py-2 hover:text-zinc-900">
              Products
            </button>
            <button onClick={() => handleNavigation('projects')} className="text-left py-2 hover:text-zinc-900">
              Projects
            </button>
            <button onClick={() => handleNavigation('videos')} className="text-left py-2 hover:text-zinc-900">
              Videos
            </button>
            <button onClick={() => handleNavigation('about')} className="text-left py-2 hover:text-zinc-900">
              About
            </button>
            <button onClick={() => handleNavigation('contact')} className="text-left py-2 hover:text-zinc-900">
              Contact
            </button>
          </div>

          <div className="pt-6 border-t border-zinc-200">
            <button
              onClick={() => handleNavigation('contact')}
              className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
