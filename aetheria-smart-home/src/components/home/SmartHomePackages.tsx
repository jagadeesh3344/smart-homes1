/**
 * SmartHomePackages Component - Curated Smart Automation Bundles
 */

import React from 'react';
import { ShieldCheck, Check, ArrowRight, Cpu, Layers } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const SmartHomePackages: React.FC = () => {
  const { openEnquiryModal } = useShop();

  const packages = [
    {
      id: 'pkg-condo',
      name: 'Smart Apartment Essential',
      tag: '1-2 Bedroom Residence',
      price: '$1,890',
      description: 'Complete entry-level smart automation including Neural Core Hub, 3 smart lightstrips, biometric door lock, and app controls.',
      features: [
        'Aetheria Neural Hub Pro X1',
        'Biometric 3D Face ID Lock',
        '2x Architectural RGB+IC Lightstrips',
        'Dual-Zone Smart Thermostat',
        'Apple Home & Google Assistant Sync',
        'Standard Installation Included'
      ]
    },
    {
      id: 'pkg-villa',
      name: 'Executive Villa Automation',
      tag: '3-5 Bedroom Estate',
      price: '$4,950',
      popular: true,
      description: 'Comprehensive whole-home intelligence for villas with multiroom ceiling acoustic streaming, 4K AI security cameras, and motorized shading.',
      features: [
        'Dual Aetheria Neural Hub Cores',
        '4x Biometric Sentinel Door Locks',
        'Whole-Villa Circadian Lighting Kit',
        '4-Zone High-Fidelity Audio Receiver',
        '4x 4K AI Night-Vision Perimeter Cameras',
        'Motorized Shading Controller Interface',
        'White-Glove Architectural Calibration'
      ]
    },
    {
      id: 'pkg-estate',
      name: 'Penthouse & Estate Core',
      tag: 'Custom Luxury Mansions',
      price: 'Custom Quote',
      description: 'Custom bespoke architectural engineering including swimming pool automation, spatial audio acoustics, and dedicated touch keypads.',
      features: [
        'Redundant Neural Cluster Hardware',
        'Custom Anodized Brass Touch Keypads',
        'Biometric Gate & Access Controllers',
        'Dolby Atmos Spatial Audio Calibration',
        'HVAC & Radiant Heat Integration',
        'Dedicated 24/7 Automation Engineer Support'
      ]
    }
  ];

  return (
    <section className="py-24 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-bold block mb-2">
            CURATED LIVING SOLUTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-zinc-900 tracking-tight font-serif">
            Smart Home Living Packages
          </h2>
          <p className="text-zinc-500 text-xs font-light leading-relaxed">
            Tailored automation bundles engineered for seamless deployment across modern residences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map(pkg => (
            <div
              key={pkg.id}
              className={`relative bg-zinc-50 rounded-xl p-8 border transition-all duration-300 flex flex-col justify-between ${
                pkg.popular
                  ? 'border-[#C5A880] shadow-md shadow-[#C5A880]/5 ring-1 ring-[#C5A880]/25 bg-white'
                  : 'border-zinc-200 shadow-sm hover:border-zinc-300'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C5A880] text-white font-bold text-[9px] uppercase tracking-widest px-4 py-1.5 rounded shadow-sm">
                  Most Popular Package
                </div>
              )}

              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880] block mb-2">
                  {pkg.tag}
                </span>

                <h3 className="text-xl font-bold text-zinc-900 mb-2 font-serif">
                  {pkg.name}
                </h3>

                <p className="text-xs text-zinc-550 font-light leading-relaxed mb-6">
                  {pkg.description}
                </p>

                <div className="text-3xl font-semibold text-zinc-900 mb-6 pb-6 border-b border-zinc-250/50">
                  {pkg.price}
                </div>

                <div className="space-y-3 mb-8">
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs font-light text-zinc-650">
                      <div className="w-4 h-4 rounded-full bg-zinc-100 text-[#C5A880] border border-zinc-200 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => openEnquiryModal()}
                className={`w-full py-4 rounded font-bold text-xs uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                  pkg.popular
                    ? 'bg-zinc-900 hover:bg-zinc-800 text-white'
                    : 'bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-200'
                }`}
              >
                <span>Request Package Enquiry</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
