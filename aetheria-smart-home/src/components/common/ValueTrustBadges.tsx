/**
 * ValueTrustBadges Component - 4 Trust Pillars matching the wireframes
 */

import React from 'react';
import { Headphones, ShieldCheck, Tag, Lock } from 'lucide-react';

export const ValueTrustBadges: React.FC = () => {
  const badges = [
    {
      title: 'Free Consultation',
      subtitle: 'Get expert advice',
      icon: Headphones,
    },
    {
      title: '1 Year Warranty',
      subtitle: 'On all products',
      icon: ShieldCheck,
    },
    {
      title: 'Bespoke Valuation',
      subtitle: 'Premium value guarantee',
      icon: Tag,
    },
    {
      title: 'Secure Enquiry',
      subtitle: 'Your data is safe',
      icon: Lock,
    },
  ];

  return (
    <div className="bg-[#FAFAFA] border-t border-b border-zinc-200 py-10 my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5 p-4 rounded bg-white border border-zinc-200 shadow-sm hover:border-[#C5A880] transition-colors">
                <div className="w-10 h-10 rounded bg-zinc-50 border border-zinc-200 text-[#C5A880] flex items-center justify-center shrink-0 shadow-inner">
                  <Icon className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-900">{b.title}</h4>
                  <p className="text-[10px] text-zinc-500 font-light mt-0.5">{b.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
