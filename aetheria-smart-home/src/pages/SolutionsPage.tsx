/**
 * SolutionsPage - Premium Architectural Solutions Hub.
 * Left sidebar navigation for categories, rich detail panes with full specifications, 
 * hardware details, and action buttons on the right.
 */

import React, { useState, useEffect } from 'react';
import {
  ToggleLeft,
  Cpu,
  Activity,
  Smartphone,
  Lightbulb,
  Blinds,
  Lock,
  Video,
  ShieldCheck,
  Speaker,
  Maximize2,
  DoorOpen,
  Building,
  Sparkles,
  Wrench,
  CheckCircle,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  ClipboardList
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { StorageService } from '../services/storage';
import { SolutionService, Category } from '../types';

const iconMap: Record<string, React.ComponentType<any>> = {
  cat_switches: ToggleLeft,
  cat_retrofit: Cpu,
  cat_gateways: Activity,
  cat_display_panels: Smartphone,
  cat_lighting: Lightbulb,
  cat_curtains: Blinds,
  cat_locks: Lock,
  cat_vdp: Video,
  cat_security: ShieldCheck,
  cat_entertainment: Speaker,
  cat_glass: Maximize2,
  cat_entrance: DoorOpen,
  cat_industrial: Building,
  cat_pergola: Sparkles,
  cat_services: Wrench,
};

export const SolutionsPage: React.FC = () => {
  const { navigateTo, openEnquiryModal, siteContent } = useShop();
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<SolutionService[]>([]);
  const [selectedCatId, setSelectedCatId] = useState<string>('cat_switches');

  useEffect(() => {
    // Load categories and filter down to those that actually exist and have services
    const cats = StorageService.getCategories();
    setCategories(cats);
    
    const srvs = StorageService.getServices();
    setServices(srvs);

    if (cats.length > 0) {
      setSelectedCatId(cats[0].id);
    }
  }, []);

  // Filter solutions/services belonging to the selected category
  const filteredServices = services.filter(service => 
    (service.relatedCategoryIds || []).includes(selectedCatId)
  );

  const handleWhatsAppChat = (title: string) => {
    const phone = siteContent.whatsappNumber || siteContent.phone || "+919876543210";
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(`Hello, I am interested in your ${title} architectural solution and would like to request technical specifications.`);
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-[#FDFDFD] min-h-screen text-zinc-900 pb-24 transition-colors">
      {/* Editorial Header */}
      <section className="py-20 border-b border-zinc-200 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-zinc-200 text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A880] shadow-sm">
              SYSTEM ARCHITECTURES
            </span>
            <h1 className="text-3xl sm:text-5xl font-light text-zinc-900 tracking-tight font-serif leading-tight">
              Bespoke Integrations, <br />
              <span className="text-zinc-400 italic">Engineered to Disappear.</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 font-light leading-relaxed max-w-xl">
              Browse our architectural blueprints and technical specifications by category. Each system is calibrated to integrate flawlessly with your design standards.
            </p>
          </div>
        </div>
      </section>

      {/* Main Solutions Hub Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT SIDEBAR: Categories list */}
          <div className="lg:col-span-3 space-y-2 sticky top-24 z-10 bg-[#FDFDFD] lg:bg-transparent py-4 lg:py-0 border-b border-zinc-200 lg:border-none">
            <div className="hidden lg:block mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block">
                Select Category
              </span>
            </div>

            {/* Mobile Categories list (horizontal scroll) */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-3 lg:pb-0 scrollbar-none">
              {categories.map(cat => {
                const IconComponent = iconMap[cat.id] || Cpu;
                const isSelected = selectedCatId === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCatId(cat.id)}
                    className={`flex items-center gap-3.5 px-4 py-3 rounded text-left transition-all duration-300 w-full shrink-0 lg:shrink cursor-pointer border ${
                      isSelected
                        ? 'bg-white border-zinc-200 text-[#C5A880] shadow-sm'
                        : 'bg-transparent border-transparent text-zinc-500 hover:text-zinc-900'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded flex items-center justify-center border transition-colors shrink-0 ${
                      isSelected ? 'bg-zinc-50 border-zinc-200 text-[#C5A880]' : 'bg-transparent border-transparent text-zinc-400'
                    }`}>
                      <IconComponent className="w-4 h-4 stroke-[1.5]" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider block truncate">
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT CONTENT: Selected Category Solutions List */}
          <div className="lg:col-span-9 space-y-12">
            {filteredServices.length === 0 ? (
              <div className="bg-white border border-zinc-200 p-16 rounded text-center space-y-4 shadow-sm">
                <Cpu className="w-12 h-12 text-zinc-300 mx-auto" />
                <h3 className="text-base font-normal text-zinc-800 font-serif">No Specifications Listed</h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto font-light leading-relaxed">
                  We are currently publishing complete hardware specs and connection blueprints for this category. Please check back shortly or enquire directly.
                </p>
                <button
                  onClick={() => openEnquiryModal()}
                  className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest rounded transition-all cursor-pointer shadow-sm"
                >
                  Contact Design Partner
                </button>
              </div>
            ) : (
              filteredServices.map(service => (
                <div
                  key={service.id}
                  className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 space-y-8 hover:border-[#C5A880] transition-all duration-300 shadow-sm"
                >
                  {/* Service Title Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-zinc-100 pb-6">
                    <div className="space-y-1">
                      <div className="text-[9px] font-mono text-[#C5A880] font-bold uppercase tracking-widest">
                        SPECIFICATION SHEET #{service.sortOrder}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-light text-zinc-900 font-serif">
                        {service.title}
                      </h2>
                    </div>

                    <span className="px-3 py-1 rounded bg-zinc-50 border border-zinc-200 text-zinc-500 text-[9px] font-bold uppercase tracking-wider self-start">
                      MATTER / THREAD NATIVE
                    </span>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm text-zinc-650 font-light leading-relaxed">
                      {service.fullDescription}
                    </p>
                  </div>

                  {/* Technical Highlights / Hardware Involved */}
                  {service.keyFeatures && service.keyFeatures.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                        Hardware Specifications & Capabilities
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {service.keyFeatures.map((feat, idx) => (
                          <div
                            key={idx}
                            className="bg-zinc-50 border border-zinc-200 p-4 rounded flex items-start gap-3 shadow-inner"
                          >
                            <CheckCircle className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5 stroke-[1.5]" />
                            <span className="text-[11px] text-zinc-600 leading-relaxed font-light">
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Applications & Benefits Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {service.applications && service.applications.length > 0 && (
                      <div className="bg-zinc-50/50 border border-zinc-150 p-6 rounded space-y-3">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                          Recommended Architecture
                        </h4>
                        <ul className="space-y-2">
                          {service.applications.map((app, idx) => (
                            <li key={idx} className="text-[11px] text-zinc-500 flex items-center gap-2 font-light">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" />
                              <span>{app}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {service.benefits && service.benefits.length > 0 && (
                      <div className="bg-zinc-50/50 border border-zinc-150 p-6 rounded space-y-3">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                          Integration Benefits
                        </h4>
                        <ul className="space-y-2">
                          {service.benefits.map((ben, idx) => (
                            <li key={idx} className="text-[11px] text-zinc-500 flex items-center gap-2 font-light">
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-350 shrink-0" />
                              <span>{ben}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Action Bar */}
                  <div className="pt-6 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => navigateTo('shop')}
                      className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 hover:text-zinc-800 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Browse Hardware Catalogue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      {/* WhatsApp Direct Enquiry */}
                      <button
                        type="button"
                        onClick={() => handleWhatsAppChat(service.title)}
                        className="flex-1 sm:flex-none justify-center px-4 py-2.5 rounded bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-200 text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                      >
                        <MessageSquare className="w-4 h-4 text-[#C5A880]" />
                        <span>WhatsApp Enquiry</span>
                      </button>

                      {/* Request Itemized Quote */}
                      <button
                        type="button"
                        onClick={() => openEnquiryModal()}
                        className="flex-1 sm:flex-none justify-center px-5 py-3 rounded bg-zinc-900 hover:bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <ClipboardList className="w-4 h-4 text-[#C5A880]" />
                        <span>Request Quote</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>

      {/* Footer Design Partner Consult */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-24">
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-8 sm:p-12 text-center space-y-6">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A880]">
            BESPOKE AUTOMATION BLUEPRINTS
          </span>
          <h2 className="text-2xl sm:text-4xl font-light text-zinc-900 font-serif max-w-2xl mx-auto leading-tight">
            Ready to design your smart home project?
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed">
            Collaborate directly with our integration directors. Send us your floor plans, layout sketches, or schedule a physical showroom demo.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openEnquiryModal()}
              className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>Schedule Floor Plan Review</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
