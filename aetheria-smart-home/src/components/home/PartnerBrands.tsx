/**
 * PartnerBrands Component - Quiet Luxury Brands Grid
 */

import React, { useState, useEffect } from 'react';

export const PartnerBrands: React.FC = () => {
  const [brands, setBrands] = useState<{ name: string; sub: string }[]>([
    { name: 'LUTRON', sub: 'Architectural Shading' },
    { name: 'CRESTRON', sub: 'Ecosystem Controllers' },
    { name: 'BANG & OLUFSEN', sub: 'High-Fidelity Audio' },
    { name: 'SAVANT', sub: 'Elite Smart Home' },
    { name: 'SONOS', sub: 'Wireless Multi-Room' },
    { name: 'KNX', sub: 'Wired Bus Systems' },
  ]);

  useEffect(() => {
    const loadBrands = () => {
      try {
        const stored = localStorage.getItem('smarthome_brands_v2');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setBrands(parsed);
          }
        }
      } catch (e) {
        console.error("Error loading brands", e);
      }
    };
    loadBrands();
    
    // Create an interval to poll for updates in case localStorage changes across context
    const interval = setInterval(loadBrands, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-[#FAFAFA] border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <h3 className="text-center text-[10px] uppercase tracking-widest text-[#C5A880] font-bold mb-10">
          Integrated Ecosystem Partners
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg bg-white border border-zinc-200 text-center transition-all duration-300 shadow-sm hover:border-[#C5A880]"
            >
              <div className="text-sm font-semibold tracking-widest text-zinc-800 uppercase">
                {brand.name}
              </div>
              <div className="text-[9px] text-[#C5A880] tracking-wider uppercase mt-1 font-bold">
                {brand.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
