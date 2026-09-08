/**
 * FAQPage Component - Light Mode Luxury Style
 */

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { faqs } = useShop();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>(faqs?.[0]?.id || null);

  const filteredFaqs = (faqs || []).filter(f => {
    if (!f) return false;
    if (selectedCategory !== 'all' && f.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="bg-[#FDFDFD] min-h-screen py-12 text-zinc-900 transition-colors">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <Breadcrumbs items={[{ label: 'FAQ' }]} />

        <div className="my-8 text-center space-y-2">
          <h1 className="text-3xl sm:text-5xl font-light text-zinc-900 tracking-tight font-serif">
            Frequently Asked Questions
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
            Everything you need to know about Matter hardware compatibility, white-glove installation, and warranties.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm mb-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search FAQ questions or keywords..."
              className="w-full pl-10 pr-4 py-3.5 rounded border border-zinc-200 text-xs bg-zinc-50 text-zinc-800 placeholder:text-zinc-300 focus:outline-none focus:border-[#C5A880] focus:bg-white transition-all"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-4" />
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {['all', 'general', 'products', 'installation', 'warranty', 'shipping'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded border text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-zinc-900 text-white border-zinc-900'
                    : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:text-zinc-950 hover:bg-zinc-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-white border border-zinc-200 rounded-xl text-zinc-500 text-xs font-light shadow-sm">
              No matching questions found. Contact our support team for personal assistance.
            </div>
          ) : (
            filteredFaqs.map(faq => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden transition-all hover:border-[#C5A880]"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left font-semibold text-zinc-800 text-sm flex items-center justify-between gap-4 hover:bg-zinc-50/50 transition-colors font-serif cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-[#C5A880] shrink-0 stroke-[1.5]" />
                      <span>{faq.question}</span>
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#C5A880] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 bg-zinc-50/30 font-light">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
