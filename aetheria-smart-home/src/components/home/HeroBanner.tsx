/**
 * HeroBanner Component - Highly refined, minimalist luxury showroom aesthetic.
 * Meets requirements for clean, premium architectural smart-home styling.
 */

import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Sparkles, ArrowRight, ClipboardList } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center bg-[#FCFCFA] text-zinc-900 overflow-hidden border-b border-zinc-200">
      {/* Background Architectural smart home image with bright overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80"
          alt="Premium Smart Home Architecture"
          className="w-full h-full object-cover opacity-25 brightness-105 scale-102 transition-transform duration-[10000ms] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FCFCFA] via-[#FCFCFA]/80 to-transparent pointer-events-none" />
      </div>

      {/* Atmospheric lighting overlay */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#C5A880]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Content */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10 space-y-8 py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-100 border border-zinc-200 text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A880] mx-auto shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
          <span>AETHERIA ARCHITECTURAL SYSTEMS</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] text-zinc-900 font-serif">
          Smart Living, <br />
          <span className="text-[#C5A880] font-sans font-light italic">Designed Around You.</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
          Intelligent automation for lighting, security, comfort, entertainment and complete control.
        </p>

        {/* Triple CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
          {/* Primary CTA */}
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-4 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-md active:scale-98"
          >
            View Products
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => navigateTo('solutions')}
            className="px-8 py-4 rounded bg-white hover:bg-zinc-50 text-zinc-800 font-bold text-xs uppercase tracking-widest border border-zinc-200 transition-all duration-300 cursor-pointer active:scale-98 shadow-sm"
          >
            Explore Solutions
          </button>

          {/* Third CTA */}
          <button
            onClick={() => navigateTo('contact')}
            className="px-8 py-4 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs uppercase tracking-widest border border-zinc-200 transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-sm"
          >
            <ClipboardList className="w-4 h-4 text-[#C5A880] shrink-0" />
            <span>Get a Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
};
