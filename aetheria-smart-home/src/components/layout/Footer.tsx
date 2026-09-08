/**
 * Footer Component - Elegant, Premium, Minimalist architectural footer.
 */

import React from 'react';
import { Cpu, Phone, Mail, MapPin, ShieldCheck, Clock } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Footer: React.FC = () => {
  const { siteContent, navigateTo, handleLogoClick } = useShop();

  return (
    <footer className="bg-zinc-50 text-zinc-500 border-t border-zinc-200 transition-colors">
      {/* Upper Brand Value Proposition */}
      <div className="border-b border-zinc-200 bg-zinc-100/40 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded bg-white border border-zinc-200 text-[#C5A880] flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5 stroke-[1.25]" />
            </div>
            <div>
              <h4 className="text-zinc-800 font-bold text-xs uppercase tracking-wider">3-Year Advance Coverage</h4>
              <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed font-light">
                All integrated hardware controllers are backed by immediate replacement protection and priority support.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded bg-white border border-zinc-200 text-[#C5A880] flex items-center justify-center shrink-0 shadow-sm">
              <Cpu className="w-5 h-5 stroke-[1.25]" />
            </div>
            <div>
              <h4 className="text-zinc-800 font-bold text-xs uppercase tracking-wider">Matter & Thread Standard</h4>
              <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed font-light">
                Native local synchronization across Apple Home, Google Home, and Amazon Alexa with local offline resilience.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded bg-white border border-zinc-200 text-[#C5A880] flex items-center justify-center shrink-0 shadow-sm">
              <Clock className="w-5 h-5 stroke-[1.25]" />
            </div>
            <div>
              <h4 className="text-zinc-800 font-bold text-xs uppercase tracking-wider">Architectural Advisory</h4>
              <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed font-light">
                Professional whole-home automation layout planning, layout review, and premium white-glove engineering support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div className="lg:col-span-2 space-y-5">
          <div
            onClick={handleLogoClick}
            className="flex items-center gap-3 cursor-pointer select-none group inline-flex"
            title="Return to Home Page"
          >
            <div className="w-9 h-9 rounded bg-white border border-zinc-200 flex items-center justify-center text-[#C5A880] shadow-sm">
              <Cpu className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div className="space-y-0.5">
              <span className="text-base font-semibold tracking-[0.2em] text-zinc-900 uppercase block leading-none font-serif">
                AETHERIA
              </span>
              <span className="text-[8px] uppercase font-bold text-zinc-400 tracking-[0.15em] block">
                Architectural Systems
              </span>
            </div>
          </div>

          <p className="text-xs text-zinc-500 leading-relaxed max-w-sm font-light">
            {siteContent.aboutText || "Crafting premium bespoke smart home spaces and intelligent control systems for modern luxury estates."}
          </p>

          <div className="space-y-2.5 pt-2 text-xs text-zinc-600 font-light">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
              <span>{siteContent.address || "102, Design District, New Delhi, India"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
              <a href={`tel:${siteContent.phone}`} className="hover:text-zinc-900 transition-colors">{siteContent.phone || "+91 98765 43210"}</a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
              <a href={`mailto:${siteContent.email}`} className="hover:text-zinc-900 transition-colors">{siteContent.email || "info@aetheriasmarthomes.com"}</a>
            </div>
          </div>
        </div>

        {/* Navigation Solutions */}
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880] mb-4">Solutions</h4>
          <ul className="space-y-2 text-xs text-zinc-500 font-light">
            <li><button onClick={() => navigateTo('solutions')} className="hover:text-zinc-900 transition-colors text-left">Smart Home Automation</button></li>
            <li><button onClick={() => navigateTo('solutions')} className="hover:text-zinc-900 transition-colors text-left">Smart Lighting Systems</button></li>
            <li><button onClick={() => navigateTo('solutions')} className="hover:text-zinc-900 transition-colors text-left">Motorized Curtains</button></li>
            <li><button onClick={() => navigateTo('solutions')} className="hover:text-zinc-900 transition-colors text-left">Security & Access Control</button></li>
            <li><button onClick={() => navigateTo('solutions')} className="hover:text-zinc-900 transition-colors text-left">Circadian lighting</button></li>
          </ul>
        </div>

        {/* Resources & Legal */}
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4">Resources</h4>
          <ul className="space-y-2 text-xs text-zinc-500 font-light">
            <li><button onClick={() => navigateTo('privacy')} className="hover:text-zinc-900 transition-colors text-left">Privacy Policy</button></li>
            <li><button onClick={() => navigateTo('shipping')} className="hover:text-zinc-900 transition-colors text-left">Shipping & Delivery</button></li>
            <li><button onClick={() => navigateTo('terms')} className="hover:text-zinc-900 transition-colors text-left">Terms & Conditions</button></li>
            <li><button onClick={() => navigateTo('returns')} className="hover:text-zinc-900 transition-colors text-left">Returns & Replacements</button></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-zinc-200 py-6 text-xs text-zinc-400 text-center bg-zinc-100/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>© {new Date().getFullYear()} {siteContent.businessName || "Aetheria Smart Homes"}. All rights reserved.</span>
          <div className="flex items-center gap-4 text-[10px] text-zinc-400 font-light">
            <span>AETHERIA NEURAL CORE ARCHITECTURE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
