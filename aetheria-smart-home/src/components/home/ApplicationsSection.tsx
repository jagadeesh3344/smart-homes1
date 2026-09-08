/**
 * Applications Section
 * Showcasing real-world use cases (Luxury Villas, Apartments, Offices, Theatres, Entrances, Outdoor)
 */

import React from 'react';
import { Building2, Home, Film, Shield, Sun, Briefcase, ArrowRight, CheckCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { initialProjects } from '../../data/projectsData';

export const ApplicationsSection: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="py-24 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-bold block">
              ARCHITECTURAL DEPLOYMENTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-zinc-900 tracking-tight font-serif">
              Real-World Applications
            </h2>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">
              Engineered for bespoke private residences, penthouses, commercial boardrooms, home cinemas, and perimeter security.
            </p>
          </div>

          <button
            onClick={() => navigateTo('projects')}
            className="self-start md:self-auto text-[10px] font-bold uppercase tracking-widest text-zinc-800 hover:text-[#C5A880] flex items-center gap-2 bg-white hover:bg-zinc-50 px-5 py-3.5 rounded border border-zinc-200 shadow-sm transition-all cursor-pointer"
          >
            <span>View Project Case Studies</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialProjects.slice(0, 6).map((proj) => (
            <div
              key={proj.id}
              onClick={() => navigateTo('projects')}
              className="bg-white border border-zinc-200 rounded-xl overflow-hidden group hover:border-[#C5A880] hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-sm"
            >
              <div className="relative h-52 overflow-hidden bg-zinc-100">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-750 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 bg-[#C5A880] text-white font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded shadow-sm">
                  {proj.category}
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 group-hover:text-[#C5A880] transition-colors font-serif">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-zinc-550 font-light mt-2 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-zinc-100">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#C5A880]">Deployed Systems:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(proj.systems || proj.technologies || proj.solutionCategories || []).slice(0, 3).map((sys, idx) => (
                      <span key={idx} className="text-[9px] bg-zinc-50 text-zinc-600 px-2.5 py-1 rounded border border-zinc-150 font-light">
                        {sys}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
