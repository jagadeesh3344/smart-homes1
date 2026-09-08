/**
 * ConnectedEcosystemSection Component - Premium Architectural Categories Grid.
 * Displays the 8 visual categories with clean architectural imagery.
 */

import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Lightbulb, Shield, Thermometer, Blinds, Music, Key, Sliders, Network, ArrowRight } from 'lucide-react';

export const ConnectedEcosystemSection: React.FC = () => {
  const { navigateTo } = useShop();

  const categories = [
    {
      name: 'Lighting',
      description: 'Circadian lighting & smart controls',
      image: 'https://images.unsplash.com/photo-1565538810844-1e119eae168f?auto=format&fit=crop&w=600&q=80',
      icon: <Lightbulb className="w-5 h-5 text-[#C5A880]" />,
    },
    {
      name: 'Security',
      description: 'Ajax alarm & perimeter active defense',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
      icon: <Shield className="w-5 h-5 text-[#C5A880]" />,
    },
    {
      name: 'Climate',
      description: 'Intelligent climate integration',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      icon: <Thermometer className="w-5 h-5 text-[#C5A880]" />,
    },
    {
      name: 'Curtains',
      description: 'Whisper-quiet motorized shading',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
      icon: <Blinds className="w-5 h-5 text-[#C5A880]" />,
    },
    {
      name: 'Entertainment',
      description: 'Dolby Atmos home theaters & audio',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
      icon: <Music className="w-5 h-5 text-[#C5A880]" />,
    },
    {
      name: 'Access',
      description: '3D biometric smart door locks',
      image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80',
      icon: <Key className="w-5 h-5 text-[#C5A880]" />,
    },
    {
      name: 'Automation',
      description: 'Gate, garage & pergola motorized loops',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      icon: <Sliders className="w-5 h-5 text-[#C5A880]" />,
    },
    {
      name: 'Networking',
      description: 'Enterprise gigabit local mesh resilience',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
      icon: <Network className="w-5 h-5 text-[#C5A880]" />,
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-zinc-200 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A880]">
            INTELLIGENT ECOSYSTEM
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-zinc-900 tracking-tight font-serif leading-tight">
            Everything Your Space Needs. <br />
            <span className="text-zinc-400 italic">One Intelligent Ecosystem.</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-light max-w-lg mx-auto leading-relaxed">
            A single architectural blueprint linking light, security, climate, entertainment, and access into absolute harmony.
          </p>
        </div>

        {/* 8-column visual categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => navigateTo('solutions')}
              className="group relative rounded-lg overflow-hidden border border-zinc-200 bg-zinc-50 aspect-[4/3] cursor-pointer hover:border-[#C5A880] hover:shadow-md transition-all duration-500 flex flex-col justify-end p-5"
            >
              {/* Background image with overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover opacity-15 brightness-105 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent opacity-90" />
              </div>

              {/* Category Info */}
              <div className="relative z-10 space-y-2">
                <div className="w-8 h-8 rounded bg-white border border-zinc-200 flex items-center justify-center shadow-sm">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 tracking-wider uppercase group-hover:text-[#C5A880] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-zinc-500 font-light">
                    {cat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Bar */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('solutions')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A880] hover:text-zinc-900 transition-colors cursor-pointer"
          >
            <span>Explore Solutions Spec Sheet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
