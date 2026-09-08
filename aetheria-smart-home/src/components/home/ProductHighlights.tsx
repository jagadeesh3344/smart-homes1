/**
 * Product Highlights Section - Curated premium showroom style
 * Beautifully curating 4 flagship reference masterpieces from the KSH catalogue.
 */

import React from 'react';
import { CheckCircle, Shield, Award, Layers } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface CuratedReferenceProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  shortDesc: string;
  image: string;
  protocol: string;
  specs: string[];
}

const curatedReferenceProducts: CuratedReferenceProduct[] = [
  {
    id: 'ksh_t4c',
    sku: 'KSH-T4C-GLASS',
    name: 'Model T4-C Glass Touch Keypad',
    category: 'Smart Switches & Touch Boards',
    shortDesc: 'Precision-cut crystal glass faceplate featuring capacitive proximity backlighting, custom engraved touch zones, and integrated Zigbee/Matter control routing.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
    protocol: 'Zigbee 3.0 / Matter',
    specs: [
      'Genuine tempered crystal glass panel',
      'Intelligent proximity-activated white backlight',
      'Silent capacitive haptic tap confirmation',
      'Dual multi-protocol Matter and Thread variants'
    ]
  },
  {
    id: 'ksh_m48',
    sku: 'KSH-M48-SP95',
    name: 'Linear 48V Magnetic Spot Profile',
    category: 'Smart Architectural Lighting',
    shortDesc: 'Low-voltage magnetic track-mounted architectural downlight utilizing deeply recessed anti-glare COB optics, high CRI >95, and CCT dual-Kelvin tuning.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    protocol: 'Zigbee 3.0 / DALI-2',
    specs: [
      'Seamless 2700K to 6500K linear white tuning',
      'Flicker-free 1% absolute dimming performance',
      'Deeply recessed UGR <12 anti-glare reflector',
      'Instant toolless magnetic track snap mounting'
    ]
  },
  {
    id: 'ksh_flpro',
    sku: 'KSH-FL-PRO-3D',
    name: 'Vance Biometric face & Palm Lock',
    category: 'Smart Door Locks',
    shortDesc: 'Elite security gateway featuring military-grade 3D structured-light facial recognition, contactless palm vein mapping, and live high-definition video feed.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    protocol: 'Zigbee 3.0 / Thread',
    specs: [
      'Contactless 3D face unlock in under 0.3s',
      'Secure local offline biometric encryption',
      'Full 1080p wide-angle camera with active IR night',
      'Connected dual-battery active defense layout'
    ]
  },
  {
    id: 'ksh_cg80',
    sku: 'KSH-CG-80-SILENT',
    name: 'QuietGlide Motorized Drapery Drive',
    category: 'Curtain & Shading Automation',
    shortDesc: 'Whisper-quiet high-capacity motor designed for heavy-duty architectural tracks, supporting fabric drapery weight up to 80kg with soft-start logic.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    protocol: 'Zigbee 3.0 / Local RF',
    specs: [
      'Extremely quiet operation under 25dB',
      'Dual-direction fabric pulling up to 80kg',
      'Intelligent manual-override clutch system',
      'Integrated soft-start & soft-stop acceleration'
    ]
  }
];

export const ProductHighlights: React.FC = () => {
  const { openEnquiryModal, siteContent } = useShop();

  const handleWhatsAppProduct = (p: CuratedReferenceProduct) => {
    const msg = encodeURIComponent(`Hello, I am interested in your luxury showcase product ${p.name} (SKU: ${p.sku}) and would like to request details.`);
    window.open(`https://wa.me/${siteContent.whatsappNumber.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
  };

  return (
    <section id="showroom" className="py-24 sm:py-32 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Headings */}
        <div className="space-y-4 max-w-xl mb-16">
          <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold block">
            Elite Reference Series
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal text-zinc-900 tracking-tight font-serif">
            Showroom Masterpieces
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-light leading-relaxed">
            Curated, award-winning smart devices selected from our premium architectural database. Designed to elevate elite residences.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {curatedReferenceProducts.map(product => (
            <div
              key={product.id}
              className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:border-[#C5A880] hover:shadow-md transition-all duration-300 group flex flex-col sm:flex-row shadow-sm"
            >
              {/* Product Image Frame */}
              <div className="relative w-full sm:w-[40%] aspect-square sm:aspect-auto overflow-hidden bg-zinc-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover brightness-95 group-hover:scale-102 transition-transform duration-750 ease-out"
                />

                {/* Protocol Badge */}
                <span className="absolute top-4 left-4 bg-white/95 text-zinc-600 text-[9px] font-bold tracking-wider px-2.5 py-1 rounded border border-zinc-200 shadow-sm">
                  {product.protocol}
                </span>
              </div>

              {/* Product Content Column */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                    {product.category}
                  </span>

                  <h3 className="text-base sm:text-lg font-semibold text-zinc-900 group-hover:text-[#C5A880] transition-colors font-serif">
                    {product.name}
                  </h3>

                  <p className="text-xs text-zinc-650 font-light leading-relaxed">
                    {product.shortDesc}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-1.5 pt-2">
                    {product.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] text-zinc-500 font-light">
                        <CheckCircle className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => openEnquiryModal({ id: product.id, name: product.name, sku: product.sku } as any)}
                    className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white py-2.5 px-3 rounded text-[11px] font-bold tracking-wider uppercase transition-all text-center cursor-pointer shadow-sm"
                  >
                    Request Details
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppProduct(product)}
                    className="px-4 py-2.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800 hover:text-zinc-900 border border-zinc-200 transition-all cursor-pointer text-[11px] font-bold uppercase tracking-wider"
                  >
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
