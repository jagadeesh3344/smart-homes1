/**
 * OrderEnquiryPage Component - Dedicated Enquiry Checkout View
 * Styled for Premium Light-Mode Luxury Theme.
 */

import React from 'react';
import { useShop } from '../context/ShopContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { MessageSquare, ShieldCheck } from 'lucide-react';

export const OrderEnquiryPage: React.FC = () => {
  const { openEnquiryModal, navigateTo } = useShop();

  return (
    <div className="bg-[#FDFDFD] min-h-screen py-12 text-zinc-900 transition-colors">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <Breadcrumbs items={[{ label: 'Order Enquiry' }]} />

        <div className="bg-white rounded-xl p-8 sm:p-12 border border-zinc-200 shadow-sm my-6 text-center space-y-6">
          <div className="w-16 h-16 rounded bg-[#C5A880]/10 text-[#C5A880] flex items-center justify-center mx-auto border border-[#C5A880]/30 shadow-inner">
            <ShieldCheck className="w-8 h-8 stroke-[1.5]" />
          </div>

          <h1 className="text-3xl font-light text-zinc-900 tracking-tight font-serif">
            Smart Home Enquiry Checkout
          </h1>

          <p className="text-xs sm:text-sm text-zinc-550 max-w-xl mx-auto leading-relaxed font-light">
            In accordance with Aetheria premium architectural standards, no third-party checkout gateway is integrated. Every purchasing request initiates a professional quotation and a customized hardware compatibility assessment.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openEnquiryModal()}
              className="px-8 py-3.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-[#C5A880]" />
              <span>Launch Enquiry Window</span>
            </button>

            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-3.5 rounded bg-zinc-50 hover:bg-zinc-100 text-zinc-500 font-bold text-xs uppercase tracking-widest transition-colors border border-zinc-200 cursor-pointer"
            >
              <span>Return to Catalog</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
