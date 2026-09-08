/**
 * ProjectDetailPage - In-Depth Architectural Case Study Detail View (Light Mode Luxury Style)
 */

import React, { useState, useEffect } from 'react';
import { 
  Building2, MapPin, Calendar, Sparkles, ArrowLeft, 
  Play, Send, CheckCircle2, Maximize2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { StorageService, extractYoutubeId } from '../services/storage';
import { Project } from '../types';

interface ProjectDetailPageProps {
  id?: string;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ id }) => {
  const { navigateTo } = useShop();
  const [project, setProject] = useState<Project | null>(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const all = StorageService.getProjects();
      const found = all.find(p => p.id === id || p.slug === id);
      setProject(found || null);
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-md">
          <Building2 className="w-12 h-12 text-zinc-400 mx-auto" />
          <h2 className="text-2xl font-light font-serif text-zinc-950">Project Not Found</h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-light">
            The requested architectural case study could not be located or may have been updated.
          </p>
          <button
            onClick={() => navigateTo('projects')}
            className="px-6 py-3 rounded bg-zinc-900 text-white font-bold text-xs uppercase tracking-widest cursor-pointer"
          >
            Return to Projects
          </button>
        </div>
      </div>
    );
  }

  const ytId = project.youtubeUrl ? extractYoutubeId(project.youtubeUrl) : null;

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 py-12 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateTo('projects')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-[#C5A880] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3.5 py-1.5 rounded bg-zinc-50 border border-zinc-200 text-[#C5A880] uppercase tracking-widest shadow-sm">
              {project.projectType}
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-md">
          <div className="relative h-[340px] sm:h-[480px] w-full">
            <img
              src={project.heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
            
            <div className="absolute bottom-8 inset-x-8 max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-3 text-xs text-white">
                {project.location && (
                  <div className="flex items-center gap-1.5 bg-zinc-900/80 backdrop-blur-md px-3 py-1.5 rounded border border-zinc-800">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{project.location}</span>
                  </div>
                )}
                {project.sqft && (
                  <div className="bg-zinc-900/80 backdrop-blur-md px-3 py-1.5 rounded border border-zinc-800 font-mono">
                    {project.sqft}
                  </div>
                )}
                {project.completionYear && (
                  <div className="flex items-center gap-1.5 bg-zinc-900/80 backdrop-blur-md px-3 py-1.5 rounded border border-zinc-800">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Completed {project.completionYear}</span>
                  </div>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-serif">
                {project.title}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-200 max-w-2xl leading-relaxed font-light">
                {project.shortDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Content Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Architectural Overview */}
            <div className="bg-white p-6 sm:p-10 rounded-xl border border-zinc-200 space-y-4 shadow-sm">
              <h2 className="text-xl font-light text-zinc-950 flex items-center gap-2 font-serif">
                <Building2 className="w-5 h-5 text-[#C5A880]" />
                <span>Project Overview & Scope</span>
              </h2>
              <div className="text-xs sm:text-sm text-zinc-650 leading-relaxed font-light whitespace-pre-line">
                {project.overview || project.shortDescription}
              </div>
            </div>

            {/* Engineering Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="bg-white p-6 sm:p-10 rounded-xl border border-zinc-200 space-y-4 shadow-sm">
                <h2 className="text-xl font-light text-zinc-950 flex items-center gap-2 font-serif">
                  <Sparkles className="w-5 h-5 text-[#C5A880]" />
                  <span>Key Automation Highlights</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5 stroke-[1.5]" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Images Grid */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div className="bg-white p-6 sm:p-10 rounded-xl border border-zinc-200 space-y-4 shadow-sm">
                <h2 className="text-xl font-light text-zinc-950 font-serif">
                  Installation Gallery ({project.galleryImages.length})
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.galleryImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveGalleryImage(imgUrl)}
                      className="relative h-36 rounded overflow-hidden border border-zinc-200 cursor-pointer group bg-zinc-50"
                    >
                      <img
                        src={imgUrl}
                        alt={`${project.title} gallery ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Maximize2 className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* YouTube Walkthrough Embed */}
            {ytId && (
              <div className="bg-white p-6 sm:p-10 rounded-xl border border-zinc-200 space-y-4 shadow-sm">
                <h2 className="text-xl font-light text-zinc-950 flex items-center gap-2 font-serif">
                  <Play className="w-5 h-5 text-[#C5A880]" />
                  <span>Cinematic Video Walkthrough</span>
                </h2>
                <div className="relative aspect-video rounded overflow-hidden border border-zinc-200 bg-zinc-50">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${ytId}`}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
            )}

          </div>

          {/* Sidebar CTA & Specs Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Installed Systems Panel */}
            <div className="bg-white p-6 rounded-xl border border-zinc-200 space-y-4 shadow-sm">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                Integrated Systems
              </h3>
              <div className="space-y-2">
                {project.systems && project.systems.map((sys, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded bg-zinc-50 border border-zinc-200 text-xs font-semibold text-zinc-800">
                    <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                    <span>{sys}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Enquiry Callout */}
            <div className="bg-zinc-900 p-6 sm:p-8 rounded-xl border border-zinc-850 shadow-xl space-y-4 text-center text-white">
              <div className="w-12 h-12 rounded bg-zinc-800 text-[#C5A880] flex items-center justify-center mx-auto shadow-inner">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-light text-lg text-white font-serif">
                  Commission Similar Architecture
                </h3>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-light">
                  Discuss your space requirements with our lead Smart Automation Engineers.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => navigateTo('consultation')}
                  className="w-full py-3.5 rounded bg-[#C5A880] hover:bg-[#b89870] text-zinc-950 font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Book Consultation</span>
                </button>

                <button
                  onClick={() => navigateTo('configurator')}
                  className="w-full py-3.5 rounded bg-zinc-800 hover:bg-zinc-750 text-white font-bold text-xs uppercase tracking-widest border border-zinc-700 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Build Custom Config</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Modal for Gallery Images */}
      {activeGalleryImage && (
        <div
          onClick={() => setActiveGalleryImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-md cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[85vh]">
            <img
              src={activeGalleryImage}
              alt="Expanded project view"
              className="w-full h-full object-contain rounded border border-zinc-800"
            />
            <button
              onClick={() => setActiveGalleryImage(null)}
              className="absolute top-4 right-4 bg-zinc-900/95 text-white p-2.5 rounded border border-zinc-800 cursor-pointer text-xs"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
