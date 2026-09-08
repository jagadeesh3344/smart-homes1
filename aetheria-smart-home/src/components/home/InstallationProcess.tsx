/**
 * InstallationProcess Component - How It Works 4-Step Process
 */

import React from 'react';
import { MessageSquare, ShoppingBag, Wrench, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const InstallationProcess: React.FC = () => {
  const { openEnquiryModal } = useShop();

  const steps = [
    {
      step: '1',
      title: 'Consultation & Advisory',
      icon: MessageSquare,
      description: 'Discuss your blueprints and smart specifications with our elite consultants.'
    },
    {
      step: '2',
      title: 'Choose Products & Layouts',
      icon: ShoppingBag,
      description: 'Select pristine capacitive touch switches and architectural linear lights from our showroom.'
    },
    {
      step: '3',
      title: 'Technical Commissioning',
      icon: Wrench,
      description: 'Our certified engineers professionally install and tune your complete smart home.'
    },
    {
      step: '4',
      title: 'Enjoy Smart Living',
      icon: Sparkles,
      description: 'Unify control across Apple Home, voice assistants, and capacitive glass interfaces.'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#FAFAFA] text-zinc-900 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-bold block mb-2">
            SIMPLE PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-zinc-900 tracking-tight font-serif">
            How It Works
          </h2>
          <p className="text-zinc-500 text-xs font-light">
            Get started with smart automation in four easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded border border-zinc-200 relative hover:border-[#C5A880] hover:shadow-md transition-all duration-300 shadow-sm"
              >
                <div className="w-7 h-7 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-800 font-bold text-[10px] flex items-center justify-center font-mono absolute top-6 right-6 shadow-sm">
                  {item.step}
                </div>

                <div className="w-12 h-12 rounded bg-zinc-50 text-[#C5A880] flex items-center justify-center mb-6 border border-zinc-150 shadow-sm">
                  <IconComponent className="w-5 h-5" />
                </div>

                <h3 className="text-base font-semibold text-zinc-900 mb-2">{item.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed font-light">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

