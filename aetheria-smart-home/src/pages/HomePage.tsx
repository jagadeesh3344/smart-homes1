/**
 * HomePage Component - Premium, Architectural, Luxury Smart Home Showroom.
 * Designed from the ground up around sophisticated light-and-dark luxury tones.
 */

import React, { useState, useEffect } from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { ConnectedEcosystemSection } from '../components/home/ConnectedEcosystemSection';
import { WhatWeDoSection } from '../components/home/WhatWeDoSection';
import { ProductHighlights } from '../components/home/ProductHighlights';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { PartnerBrands } from '../components/home/PartnerBrands';
import { SmartRoomSimulator } from '../components/home/SmartRoomSimulator';
import { useShop } from '../context/ShopContext';
import { StorageService } from '../services/storage';
import { YouTubeVideo } from '../types';
import { 
  ArrowRight, Sliders, Building2, Calendar, Phone, Mail, 
  CheckCircle, Clock, Play, Youtube 
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, openEnquiryModal, showToast } = useShop();
  const [featuredVideos, setFeaturedVideos] = useState<YouTubeVideo[]>([]);
  
  // Bespoke Advisory Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'villa',
    areaSqFt: '',
    timeline: 'ready',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Fetch top 3 videos for the homepage
    const allVideos = StorageService.getVideos();
    setFeaturedVideos(allVideos.slice(0, 3));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      showToast('Please provide your name, email, and contact number.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      showToast('Bespoke design advisory requested successfully. Our principal engineer will contact you.', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyType: 'villa',
        areaSqFt: '',
        timeline: 'ready',
        message: ''
      });
    }, 1200);
  };

  return (
    <div className="bg-[#FDFDFD] text-zinc-900 transition-colors">
      
      {/* 1. Cinematic Hero Banner */}
      <section id="hero">
        <HeroBanner />
      </section>

      {/* 2. Smart Home Ecosystem (Immediately after Hero) */}
      <section id="ecosystem">
        <ConnectedEcosystemSection />
      </section>

      {/* 3. Core Architectural Design Pillars */}
      <section id="pillars">
        <WhatWeDoSection />
      </section>

      {/* 4. Interactive Room Scene Simulator */}
      <section id="experience">
        <SmartRoomSimulator />
      </section>

      {/* 5. Curated Flagship Product Highlights */}
      <ProductHighlights />

      {/* 6. Whole-Home Configurator Invitation (Flat Layout, No Nested Cards) */}
      <section className="py-24 bg-[#FAFAFA] border-b border-zinc-200 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Box 1: Configurator Planner */}
            <div className="bg-white border border-zinc-200 p-8 sm:p-10 rounded flex flex-col justify-between space-y-6 shadow-sm hover:border-[#C5A880] transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded bg-zinc-50 border border-zinc-200 flex items-center justify-center">
                  <Sliders className="w-5 h-5 text-[#C5A880]" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A880]">
                  Interactive Space Estimator
                </div>
                <h3 className="text-2xl sm:text-3xl font-light text-zinc-900 font-serif leading-tight">
                  Whole-Home Planner
                </h3>
                <p className="text-xs text-zinc-500 font-light leading-relaxed">
                  Design whole-property automation, calculate investment estimates by room and customized technology levels, and instantly generate an architectural proposal.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigateTo('configurator')}
                  className="px-6 py-3.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-md"
                >
                  Launch Configurator
                </button>
              </div>
            </div>

            {/* Box 2: Realised Portfolio Case Studies */}
            <div className="bg-white border border-zinc-200 p-8 sm:p-10 rounded flex flex-col justify-between space-y-6 shadow-sm hover:border-[#C5A880] transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded bg-zinc-50 border border-zinc-200 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#C5A880]" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A880]">
                  Realised Architectures
                </div>
                <h3 className="text-2xl sm:text-3xl font-light text-zinc-900 font-serif leading-tight">
                  Case Studies & Galleries
                </h3>
                <p className="text-xs text-zinc-500 font-light leading-relaxed">
                  Explore bespoke smart villas, modern residential estates, sound-calibrated personal theatres, and high-rise luxury penthouses realized across primary districts.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigateTo('projects')}
                  className="px-6 py-3.5 rounded bg-white hover:bg-zinc-50 text-zinc-800 font-bold text-xs uppercase tracking-widest border border-zinc-200 transition-all duration-300 cursor-pointer shadow-sm"
                >
                  View Projects Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Brand New Homepage Video Section "See Smart Living in Action" */}
      <section className="py-24 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A880]">
                <Youtube className="w-4 h-4 text-[#C5A880]" />
                <span>Video Demonstrations</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-zinc-900 tracking-tight font-serif">
                See Smart Living <br />
                <span className="text-zinc-400 italic">In Action.</span>
              </h2>
              <p className="text-xs text-[#C5A880] font-bold uppercase tracking-widest">
                Watch detailed walkthroughs of tunable lighting, biometric home locks, home theaters, and Matter coordination guides.
              </p>
            </div>

            <button
              onClick={() => navigateTo('videos')}
              className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880] hover:text-zinc-800 flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto"
            >
              <span>View All Videos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVideos.map(vid => {
              const ytId = vid.youtubeId || 'dQw4w9WgXcQ';
              const thumb = vid.thumbnailUrl || `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;

              return (
                <a
                  key={vid.id}
                  href={vid.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-zinc-200 rounded overflow-hidden group hover:border-[#C5A880] hover:shadow-md transition-all duration-300 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    {/* Thumbnail box */}
                    <div className="relative aspect-video bg-zinc-100 overflow-hidden">
                      <img
                        src={thumb}
                        alt={vid.title}
                        loading="lazy"
                        className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-750 ease-out"
                      />
                      <div className="absolute inset-0 bg-zinc-950/20 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white text-zinc-900 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                          <Play className="w-4 h-4 fill-zinc-950 translate-x-0.5" />
                        </div>
                      </div>

                      <div className="absolute top-3 left-3">
                        <span className="bg-white/95 backdrop-blur-sm text-[#C5A880] px-2.5 py-1 rounded text-[8px] font-bold uppercase tracking-wider border border-zinc-200 shadow-sm">
                          {vid.category}
                        </span>
                      </div>
                    </div>

                    {/* Content info */}
                    <div className="p-5 space-y-2">
                      <h3 className="text-xs font-semibold text-zinc-900 group-hover:text-[#C5A880] transition-colors line-clamp-1 uppercase tracking-wide">
                        {vid.title}
                      </h3>
                      <p className="text-[11px] text-zinc-500 leading-relaxed font-light line-clamp-2">
                        {vid.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex justify-between items-center text-[10px] border-t border-zinc-100 mt-2 text-zinc-400 font-bold uppercase tracking-wider">
                    <span>Watch Demo</span>
                    <span className="text-[#C5A880]">Watch on YouTube ↗</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Elite Brands Ticker */}
      <section id="brands">
        <PartnerBrands />
      </section>      {/* 9. Embedded Bespoke Consultation & Advisory Form */}
      <section id="inquiry" className="py-24 bg-[#FAFAFA] border-b border-zinc-200 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Column: Context */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-bold block">
                  BESPOKE ARCHITECTURAL ADVISORY
                </span>
                <h2 className="text-3xl sm:text-4xl font-light text-zinc-900 font-serif leading-tight">
                  Consult with our <br />
                  <span className="text-[#C5A880] italic font-serif">smart architects.</span>
                </h2>
                <p className="text-xs text-zinc-550 font-light leading-relaxed">
                  Submit your blueprints, coordinate wiring layouts, or schedule a physical showroom demonstration with our technical directors.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-zinc-200 text-[11px] text-[#C5A880] font-bold uppercase tracking-wider">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#C5A880]" />
                  <span>Response timeline: Within 4 working hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-[#C5A880]" />
                  <span>Includes full wiring guide drawings</span>
                </div>
              </div>
            </div>

            {/* Right Column: Elegant Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded border border-zinc-200 shadow-lg">
              {isSuccess ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-50 border border-zinc-200 text-[#C5A880] flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900 font-serif">Inquiry Received</h3>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto font-light leading-relaxed">
                    Thank you. Our principal automation designer will contact you directly on your primary phone number to review your project layouts.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-xs text-[#C5A880] hover:underline pt-4 cursor-pointer font-bold"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Sterling Vance"
                        className="w-full bg-zinc-50 border border-zinc-200 focus:border-[#C5A880] rounded py-3 px-4 text-xs text-zinc-800 placeholder-zinc-300 outline-none transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Contact Number</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-zinc-50 border border-zinc-200 focus:border-[#C5A880] rounded py-3 px-4 text-xs text-zinc-800 placeholder-zinc-300 outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Primary Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="vance@architecture.com"
                        className="w-full bg-zinc-50 border border-zinc-200 focus:border-[#C5A880] rounded py-3 px-4 text-xs text-zinc-800 placeholder-zinc-300 outline-none transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Property Type</label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-50 border border-zinc-200 focus:border-[#C5A880] rounded py-3 px-4 text-xs text-zinc-600 outline-none cursor-pointer"
                      >
                        <option value="villa">Luxury Villa / Estate</option>
                        <option value="penthouse">High-End Penthouse</option>
                        <option value="apartment">Premium Apartment</option>
                        <option value="commercial">Commercial Workspace</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Project Area (approx. sq.ft)</label>
                      <input
                        type="number"
                        name="areaSqFt"
                        value={formData.areaSqFt}
                        onChange={handleInputChange}
                        placeholder="e.g. 4500"
                        className="w-full bg-zinc-50 border border-zinc-200 focus:border-[#C5A880] rounded py-3 px-4 text-xs text-zinc-800 placeholder-zinc-300 outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Current Phase</label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-50 border border-zinc-200 focus:border-[#C5A880] rounded py-3 px-4 text-xs text-zinc-600 outline-none cursor-pointer"
                      >
                        <option value="ready">Under Architectural Planning</option>
                        <option value="3months">Wiring / Electrical Stage</option>
                        <option value="6months">Finishing & Furnishing Stage</option>
                        <option value="retrofit">Complete Retrofit</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Architectural Requirements</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="e.g. Looking to integrate circadian linear track lighting, motorized blackout curtains, and multi-zone high-resolution streaming..."
                      className="w-full bg-zinc-50 border border-zinc-200 focus:border-[#C5A880] rounded py-3 px-4 text-xs text-zinc-800 placeholder-zinc-300 outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? 'Scheduling Consultation...' : 'Book Bespoke Design Consultation'}
                    <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 10. Testimonials Section */}
      <TestimonialsSection />
    </div>
  );
};
