/**
 * ProjectsPage - Architectural Projects & Case Studies Portfolio
 * Displays real-world installations or a luxury architectural empty state with CTA
 */

import React, { useState, useEffect } from 'react';
import { 
  Building2, MapPin, ArrowRight, Play, ChevronRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { StorageService } from '../services/storage';
import { Project } from '../types';

export const ProjectsPage: React.FC = () => {
  const { navigateTo } = useShop();
  const [projects, setProjects] = useState<Project[]>(() => StorageService.getProjects());
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  useEffect(() => {
    setProjects(StorageService.getProjects());
  }, []);

  const projectTypes = ['All', 'Luxury Villa', 'Penthouse', 'Modern Apartment', 'Commercial Space', 'Private Estate', 'Home Cinema'];

  const filteredProjects = selectedFilter === 'All'
    ? projects
    : projects.filter(p => p.projectType.toLowerCase() === selectedFilter.toLowerCase());

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 py-16 px-6 sm:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-50 border border-zinc-200 text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A880] mb-4 shadow-sm">
            <Building2 className="w-3.5 h-3.5" />
            CURATED ARCHITECTURAL PORTFOLIO
          </span>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-zinc-900 font-serif leading-tight">
            Projects & Case Studies
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm mt-3 max-w-2xl mx-auto font-light leading-relaxed">
            Explore our commissioned whole-home automation projects, private cinemas, and luxury architectural living spaces.
          </p>

          {/* Filter Pills (only if projects exist) */}
          {projects.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {projectTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedFilter(type)}
                  className={`px-4 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    selectedFilter === type
                      ? 'bg-zinc-900 text-white shadow-md'
                      : 'bg-white text-zinc-500 hover:text-zinc-800 border border-zinc-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Projects Grid or Professional Empty State */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                onClick={() => navigateTo('project-detail', { id: project.id })}
                className="group bg-white rounded-xl border border-zinc-200 overflow-hidden hover:border-[#C5A880] transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-md"
              >
                <div>
                  {/* Hero Thumbnail */}
                  <div className="relative h-60 overflow-hidden bg-zinc-100">
                    <img
                      src={project.heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-750 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent" />
                    
                    {/* Project Type Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded bg-white/95 backdrop-blur-md border border-zinc-200 text-[#C5A880] text-[9px] font-bold uppercase tracking-widest shadow-sm">
                      {project.projectType}
                    </div>

                    {/* Location Badge */}
                    {project.location && (
                      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-zinc-800 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded border border-zinc-200 shadow-sm font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{project.location}</span>
                      </div>
                    )}

                    {project.youtubeUrl && (
                      <div className="absolute top-4 right-4 w-8 h-8 rounded bg-red-600 text-white flex items-center justify-center shadow-md">
                        <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-3">
                    <h3 className="font-semibold text-lg text-zinc-900 group-hover:text-[#C5A880] transition-colors font-serif">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-550 font-light leading-relaxed line-clamp-2">
                      {project.shortDescription || project.overview}
                    </p>

                    {/* Systems Chips */}
                    {(() => {
                      const tags = project.systems || project.technologies || project.solutionCategories || [];
                      if (tags.length === 0) return null;
                      return (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {tags.slice(0, 3).map((sys, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] font-light px-2.5 py-1 rounded bg-zinc-50 text-zinc-600 border border-zinc-150"
                            >
                              {sys}
                            </span>
                          ))}
                          {tags.length > 3 && (
                            <span className="text-[9px] font-light px-2.5 py-1 rounded bg-zinc-100 text-zinc-500">
                              +{tags.length - 3} more
                            </span>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 sm:p-8 pt-0 border-t border-zinc-100 mt-4">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#C5A880] group-hover:text-zinc-800 pt-3">
                    <span>View Architectural Case Study</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* High-End Architectural Empty State */
          <div className="max-w-2xl mx-auto bg-white rounded-xl border border-zinc-200 p-8 sm:p-12 text-center shadow-lg space-y-6">
            <div className="w-16 h-16 rounded bg-zinc-50 border border-zinc-200 text-[#C5A880] flex items-center justify-center mx-auto shadow-sm">
              <Building2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-light text-zinc-900 font-serif">
                Our Portfolio is Being Curated
              </h2>
              <p className="text-zinc-500 text-xs font-light max-w-md mx-auto leading-relaxed">
                Discover how Aetheria can transform your space. We are currently preparing photographic documentation and case studies of our latest residential commissions.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigateTo('consultation')}
                className="w-full sm:w-auto px-6 py-3.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book a Design Consultation</span>
                <ChevronRight className="w-4 h-4 text-[#C5A880]" />
              </button>
              
              <button
                onClick={() => navigateTo('configurator')}
                className="w-full sm:w-auto px-6 py-3.5 rounded bg-white hover:bg-zinc-50 text-zinc-800 font-bold text-xs uppercase tracking-widest border border-zinc-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Build Your Smart Home</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
