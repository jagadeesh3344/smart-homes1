/**
 * Floating WhatsApp Button Component
 */

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';

export const FloatingWhatsApp: React.FC = () => {
  const { siteContent, openEnquiryModal } = useShop();
  const { requireAuth } = useAuth();

  const handleClick = () => {
    requireAuth({
      type: 'whatsapp_enquiry',
      onSuccess: () => {
        openEnquiryModal();
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-emerald-500 text-white shadow-2xl hover:bg-emerald-400 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group border border-emerald-400/30"
      title="Chat & Enquire on WhatsApp"
    >
      <MessageSquare className="w-6 h-6 fill-current" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 text-xs font-bold whitespace-nowrap transition-all duration-300">
        WhatsApp Enquiry
      </span>
    </button>
  );
};
