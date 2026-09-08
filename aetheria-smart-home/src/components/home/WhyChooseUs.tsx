/**
 * WhyChooseUs Component - Matching Screen 01 Wireframe
 */

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    { title: 'Latest Technology', desc: 'Cutting-edge Matter & Thread multi-protocol smart chips.' },
    { title: 'Energy Efficient', desc: 'Optimize lighting & climate power consumption by up to 35%.' },
    { title: 'Remote Control', desc: 'Manage your entire home securely from anywhere in the world.' },
    { title: 'Voice Assistant Compatible', desc: 'Seamless voice control with Apple Siri, Google Assistant & Alexa.' },
    { title: 'Custom Automation', desc: 'Personalized lighting scenes, schedule routines & security triggers.' },
    { title: 'Trusted by Thousands', desc: 'Over 10,000+ luxury residences and villas automated nationwide.' },
  ];

  return (
    <section className="py-24 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Title & Checklist */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-bold block mb-2">
                UNMATCHED STANDARDS
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-zinc-900 tracking-tight font-serif">
                Why Choose Aetheria?
              </h2>
              <p className="text-zinc-500 text-xs mt-2 leading-relaxed font-light">
                We deliver end-to-end intelligent home automation solutions tailored specifically to your architectural aesthetic and daily lifestyle.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {points.map((p, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded bg-zinc-50 border border-zinc-200 hover:border-[#C5A880] transition-colors shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-zinc-800">{p.title}</h4>
                    <p className="text-[11px] text-zinc-500 leading-snug mt-0.5 font-light">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Smart Control Mobile Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-xl overflow-hidden border border-zinc-200 shadow-lg group bg-zinc-100">
              <img
                src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1000&q=80"
                alt="Smart Home Phone Control App"
                className="w-full h-[380px] sm:h-[440px] object-cover group-hover:scale-102 transition-transform duration-750 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent p-6 flex flex-col justify-end text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">Total Control In Your Palm</span>
                <p className="text-xs text-zinc-200 mt-1 font-light leading-relaxed">Real-time status, scene presets, and multi-room audio sync.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

