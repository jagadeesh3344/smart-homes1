/**
 * TestimonialsSection Component - Highly elegant, single editorial quote layout
 */

import React from 'react';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-zinc-50 text-zinc-900 border-b border-zinc-200">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative">
        <Quote className="w-12 h-12 text-[#C5A880]/30 mx-auto mb-8 stroke-[1.5]" />

        <div className="space-y-8">
          <p className="text-xl sm:text-2xl md:text-3xl font-light italic leading-relaxed text-zinc-800 font-serif">
            "Aetheria transformed our penthouse project into an intuitive sanctuary. The Matter integration across Apple HomeKit and touch keypads is flawless. Their absolute devotion to architectural integration is unmatched."
          </p>

          <div className="space-y-1">
            <h4 className="text-sm font-bold tracking-wider uppercase text-zinc-900">
              Alexander Vance
            </h4>
            <p className="text-[11px] text-[#C5A880] uppercase tracking-widest font-bold">
              Managing Director • Vance Luxury Architecture
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
