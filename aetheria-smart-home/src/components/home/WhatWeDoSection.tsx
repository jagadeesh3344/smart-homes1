/**
 * What We Do / Solutions Grid Section - Highly refined, curated luxury edition
 */

import React from 'react';
import { Lightbulb, ToggleLeft, ShieldCheck, Speaker, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface CuratedSolution {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ReactNode;
}

const curatedSolutions: CuratedSolution[] = [
  {
    id: 'lighting',
    title: 'Architectural Illumination',
    subtitle: 'Magnetic tracks, downlights, and CCT tuning',
    desc: 'Deep anti-glare architectural downlights paired with 48V low-voltage magnetic track profiles, tunable Kelvin white levels, and premium smart controllers that follow your natural circadian cycle.',
    icon: <Lightbulb className="w-5 h-5 text-[#C5A880]" />
  },
  {
    id: 'switches',
    title: 'Capacitive Glass Switchboards',
    subtitle: 'Bespoke capacitive touch & solid metal tactile',
    desc: 'Modular Titan switches, solid brushed metal rotary dials, and premium crystal-glass capacitive touchplates custom-tailored to blend seamlessly with award-winning luxury interior designs.',
    icon: <ToggleLeft className="w-5 h-5 text-[#C5A880]" />
  },
  {
    id: 'security',
    title: 'Biometric Access & Active Defense',
    subtitle: '3D facial recognition, palm vein, and AI analytics',
    desc: 'Top-tier 3D structured light facial recognition gates, contactless palm vein scanners, and integrated security. Connected directly to wireless intrusion alarms and high-fidelity smart cameras.',
    icon: <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
  },
  {
    id: 'acoustics',
    title: 'Acoustic Cinema & Spatial Audio',
    subtitle: 'Dolby Atmos theatre design and multi-room arrays',
    desc: 'Custom-designed private cinema architecture with precise acoustic paneling, premium Dolby Atmos calibration, and synchronized multi-zone high-resolution streaming controllers.',
    icon: <Speaker className="w-5 h-5 text-[#C5A880]" />
  }
];

export const WhatWeDoSection: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="py-24 bg-[#FAFAFA] border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-bold block">
              THE ART OF INTEGRATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-zinc-900 tracking-tight font-serif">
              Our Core Design Pillars
            </h2>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">
              We engineer luxury. Our custom installations unify architectural downlighting, bespoke touch plates, high-definition acoustics, and biometric defense.
            </p>
          </div>

          <button
            onClick={() => navigateTo('solutions')}
            className="self-start lg:self-auto text-[10px] font-bold uppercase tracking-widest text-zinc-800 hover:text-[#C5A880] flex items-center gap-2 bg-white hover:bg-zinc-50 px-5 py-3.5 rounded border border-zinc-200 shadow-sm transition-all cursor-pointer"
          >
            <span>Explore Systems</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {curatedSolutions.map(item => (
            <div
              key={item.id}
              onClick={() => navigateTo('solutions')}
              className="bg-white border border-zinc-200 p-8 rounded hover:border-[#C5A880] hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded bg-zinc-50 border border-zinc-150 flex items-center justify-center shadow-sm">
                  {item.icon}
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-zinc-950 uppercase tracking-wider group-hover:text-[#C5A880] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-[#C5A880] font-light italic uppercase tracking-wider">
                    {item.subtitle}
                  </p>
                </div>

                <p className="text-xs text-zinc-650 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-700 transition-colors">
                <span>View specification sheet</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-[#C5A880]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
