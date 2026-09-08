/**
 * AboutPage Component - Premium Architectural Brand Presentation
 */

import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Lightbulb, Award, ShieldCheck, Headphones } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const stats = [
    { label: 'Architectures Commissioned', value: '10K+' },
    { label: 'Certified Hardwares', value: '500+' },
    { label: 'Active Regions', value: '50+' },
    { label: 'Years of Experience', value: '10+' },
  ];

  const values = [
    {
      title: 'Aesthetic Integration',
      desc: 'We engineer smart living interfaces that completely disappear within premium plaster boardlines.',
      icon: Lightbulb
    },
    {
      title: 'Architectural Standards',
      desc: 'Certified to support whole-home smart systems across multiple network interfaces natively.',
      icon: Award
    },
    {
      title: 'Immutable Privacy',
      desc: 'We prioritize complete secure processing, ensuring your floorplans and data remain strictly local.',
      icon: ShieldCheck
    },
    {
      title: 'Bespoke Support',
      desc: 'Our certified engineering director supports you from wiring blueprints to commissioning.',
      icon: Headphones
    }
  ];

  return (
    <div className="bg-[#FDFDFD] min-h-screen py-12 text-zinc-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <Breadcrumbs items={[{ label: 'About Us' }]} />

        {/* Hero Section */}
        <div className="bg-white border border-zinc-200 rounded-xl p-8 sm:p-12 shadow-sm my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl font-light text-zinc-900 tracking-tight font-serif">
              About Aetheria
            </h1>
            <p className="text-xs sm:text-sm text-zinc-550 leading-relaxed font-light">
              We are dedicated to bringing the latest smart home automation solutions to make your life simpler, safer and more comfortable. By combining architectural design sensibilities with robust physical hardware, we craft custom systems that seamlessly disappear into modern aesthetics.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded bg-zinc-50 border border-zinc-200 shadow-inner">
                <h3 className="text-[10px] font-bold text-[#C5A880] uppercase mb-1 tracking-widest">Our Mission</h3>
                <p className="text-xs text-zinc-650 font-light leading-relaxed">
                  To deliver innovative, reliable, and visually integrated smart home solutions.
                </p>
              </div>

              <div className="p-4 rounded bg-zinc-50 border border-zinc-200 shadow-inner">
                <h3 className="text-[10px] font-bold text-[#C5A880] uppercase mb-1 tracking-widest">Our Vision</h3>
                <p className="text-xs text-zinc-650 font-light leading-relaxed">
                  To be the most trusted, aesthetically refined smart home partner in premium residences.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded overflow-hidden border border-zinc-200 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Modern Smart Home Interior"
                className="w-full h-72 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-8 shadow-sm my-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <div key={i} className="p-4 space-y-1">
                <div className="text-3xl sm:text-4xl font-semibold text-zinc-900 font-serif">{s.value}</div>
                <div className="text-[10px] font-bold text-[#C5A880] uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values Section */}
        <div className="bg-white border border-zinc-200 rounded-xl p-8 sm:p-12 shadow-sm my-8">
          <h2 className="text-2xl font-light text-zinc-900 text-center font-serif mb-10">
            Our Core Pillars
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const IconComp = v.icon;
              return (
                <div key={i} className="p-6 rounded bg-zinc-50 border border-zinc-200 text-center flex flex-col items-center shadow-inner hover:border-[#C5A880] transition-colors">
                  <div className="w-12 h-12 rounded bg-white text-[#C5A880] flex items-center justify-center mb-4 border border-zinc-200 shadow-sm">
                    <IconComp className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-900 mb-2">{v.title}</h3>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
