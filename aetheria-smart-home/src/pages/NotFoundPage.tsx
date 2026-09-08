/**
 * NotFoundPage Component - 404 Page
 * Styled for Premium Light-Mode Luxury Theme.
 */

import React from 'react';
import { useShop } from '../context/ShopContext';
import { Cpu, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="bg-[#FDFDFD] text-zinc-900 min-h-screen flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-6">
        <div className="w-20 h-20 rounded bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] flex items-center justify-center mx-auto shadow-sm">
          <Cpu className="w-10 h-10 stroke-[1.5]" />
        </div>

        <h1 className="text-7xl font-light text-zinc-300 font-serif">404</h1>

        <h2 className="text-2xl font-light text-zinc-900 font-serif">
          Route Not Found
        </h2>

        <p className="text-xs sm:text-sm text-zinc-550 leading-relaxed font-light">
          The smart automation route you are attempting to reach does not exist or has been relocated within our architecture.
        </p>

        <button
          onClick={() => navigateTo('home')}
          className="px-8 py-3.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest transition-all inline-flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-[#C5A880]" />
          <span>Return to Homepage</span>
        </button>
      </div>
    </div>
  );
};
