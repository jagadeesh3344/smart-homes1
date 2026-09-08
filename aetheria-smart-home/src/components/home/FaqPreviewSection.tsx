import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { StorageService } from '../../services/storage';
import { useShop } from '../../context/ShopContext';

export const FaqPreviewSection: React.FC = () => {
  const { navigateTo } = useShop();
  const [openId, setOpenId] = useState<string | null>(null);
  
  const faqs = StorageService.getFAQs() || [];
  const previewFaqs = faqs.slice(0, 4);

  const toggleAccordion = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section className="py-24 bg-white border-b border-zinc-200">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-bold block">
            GOT QUESTIONS?
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-zinc-900 tracking-tight font-serif">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-zinc-500 font-light leading-relaxed">
            Quick answers regarding installation, protocols, compatibility, and custom smart automation projects.
          </p>
        </div>

        <div className="space-y-4">
          {previewFaqs.map(faq => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#FAFAFA] rounded border border-zinc-200 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left p-5 flex justify-between items-center gap-4 hover:bg-zinc-100 transition-colors"
                >
                  <span className="font-bold text-sm text-zinc-800">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#C5A880] text-white rotate-180' : 'bg-zinc-200 text-zinc-600'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-zinc-650 leading-relaxed border-t border-zinc-200/60 pt-3 bg-white/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigateTo('faq')}
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white bg-zinc-900 hover:bg-zinc-800 transition-colors px-6 py-3.5 rounded shadow-sm"
          >
            <span>View All FAQs</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </button>
        </div>
      </div>
    </section>
  );
};
