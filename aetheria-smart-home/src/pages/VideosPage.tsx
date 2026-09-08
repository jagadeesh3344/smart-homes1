/**
 * VideosPage - Elegant Architectural Showcase for Smart Living Video Demonstrations.
 * Refined light-mode luxury layout with golden accents.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { StorageService, extractYoutubeId } from '../services/storage';
import { YouTubeVideo } from '../types';
import { useShop } from '../context/ShopContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Youtube, Play, Search, Filter, Layers, Clock, ArrowUpRight } from 'lucide-react';

export const VideosPage: React.FC = () => {
  const { navigateTo } = useShop();
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('all');

  useEffect(() => {
    setVideos(StorageService.getVideos());
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    videos.forEach(v => {
      if (v.category) set.add(v.category);
    });
    return ['all', ...Array.from(set)];
  }, [videos]);

  const playlists = useMemo(() => {
    const set = new Set<string>();
    videos.forEach(v => {
      if (v.playlist) set.add(v.playlist);
    });
    return ['all', ...Array.from(set)];
  }, [videos]);

  const featuredVideo = useMemo(() => {
    return videos.find(v => v.isFeatured) || videos[0] || null;
  }, [videos]);

  const filteredVideos = useMemo(() => {
    return videos.filter(v => {
      const matchesSearch =
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (v.playlist && v.playlist.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === 'all' || v.category === selectedCategory;
      const matchesPlay = selectedPlaylist === 'all' || v.playlist === selectedPlaylist;

      return matchesSearch && matchesCat && matchesPlay;
    });
  }, [videos, searchQuery, selectedCategory, selectedPlaylist]);

  const featuredYtId = featuredVideo ? (featuredVideo.youtubeId || extractYoutubeId(featuredVideo.youtubeUrl) || '28I6M9iTByo') : '';

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 pb-24 transition-colors">
      {/* Breadcrumbs Header */}
      <div className="border-b border-zinc-200 py-4 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: 'home' }, { label: 'Video Demonstrations' }]} />
        </div>
      </div>

      {/* Hero Header */}
      <section className="py-16 border-b border-zinc-200 bg-zinc-50/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-zinc-200 text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A880] shadow-sm">
              <Youtube className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Video Demonstrations</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-light text-zinc-900 tracking-tight font-serif leading-tight">
              See Smart Living <br />
              <span className="text-zinc-400 italic">In Action.</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 font-light leading-relaxed max-w-xl">
              Explore professional Matter setups, linear architectural lighting profiles, and direct hardware reviews with our product experts.
            </p>
          </div>

          {/* Featured Masterclass Panel */}
          {featuredVideo && (
            <div className="mt-12 bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12">
              <a
                href={featuredVideo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="lg:col-span-8 bg-zinc-100 relative aspect-video group block overflow-hidden"
              >
                <img
                  src={featuredVideo.thumbnailUrl || `https://img.youtube.com/vi/${featuredYtId}/maxresdefault.jpg`}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-101 transition-all duration-500 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-zinc-950/10 group-hover:bg-transparent flex items-center justify-center transition-all">
                  <div className="w-16 h-16 rounded-full bg-white/95 hover:bg-white text-zinc-950 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-350">
                    <Play className="w-6 h-6 fill-zinc-950 translate-x-0.5 text-zinc-950" />
                  </div>
                </div>
              </a>

              <div className="lg:col-span-4 p-8 flex flex-col justify-between space-y-8 bg-white">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-zinc-50 border border-zinc-200 text-[#C5A880] px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shadow-inner">
                      ★ Featured Video
                    </span>
                    <span className="bg-zinc-50 text-zinc-500 px-2 py-0.5 rounded text-[9px] font-mono border border-zinc-200 shadow-inner">
                      {featuredVideo.duration || '12:00'}
                    </span>
                  </div>
                  <h2 className="text-xl font-normal text-zinc-900 font-serif leading-snug">
                    {featuredVideo.title}
                  </h2>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed line-clamp-4">
                    {featuredVideo.description}
                  </p>
                </div>

                <div className="space-y-4 pt-6 border-t border-zinc-100">
                  <a
                    href={featuredVideo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-md"
                  >
                    <span>Watch on YouTube</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C5A880]" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Video Filter and Card Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-12 space-y-8">
        <div className="bg-white p-6 rounded-xl border border-zinc-200 space-y-4 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search video guides..."
                className="w-full pl-10 pr-4 py-2.5 rounded bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 placeholder-zinc-300 focus:border-[#C5A880] focus:bg-white outline-none transition-all"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none text-xs">
              <Filter className="w-4 h-4 text-zinc-400 shrink-0 hidden sm:inline mr-2" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-zinc-900 text-white shadow-sm'
                      : 'bg-zinc-50 text-zinc-500 hover:text-zinc-900 border border-zinc-200'
                  }`}
                >
                  {cat === 'all' ? 'All Categories' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Playlists selectors */}
          {playlists.length > 1 && (
            <div className="flex items-center gap-2 pt-3 border-t border-zinc-150 text-xs overflow-x-auto pb-1">
              <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px] shrink-0 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Playlists:</span>
              </span>
              {playlists.map(p => (
                <button
                  key={p}
                  onClick={() => setSelectedPlaylist(p)}
                  className={`px-3 py-1 rounded text-[10px] font-semibold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                    selectedPlaylist === p
                      ? 'bg-zinc-100 text-[#C5A880] border border-zinc-200 shadow-inner'
                      : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  {p === 'all' ? 'All Playlists' : p}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Video Card Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs text-zinc-400">
            <span>Showing <strong className="text-zinc-800">{filteredVideos.length}</strong> video guides</span>
          </div>

          {filteredVideos.length === 0 ? (
            <div className="bg-white border border-zinc-200 rounded-xl p-16 text-center space-y-4 shadow-sm">
              <Youtube className="w-12 h-12 text-zinc-300 mx-auto" />
              <h3 className="text-base font-normal text-zinc-800 font-serif">No videos matched</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto font-light">
                Please try adjusting your search terms or selecting a different video category filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map(vid => {
                const ytId = vid.youtubeId || extractYoutubeId(vid.youtubeUrl) || 'dQw4w9WgXcQ';
                const thumb = vid.thumbnailUrl || `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;

                return (
                  <a
                    key={vid.id}
                    href={vid.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-zinc-200 rounded-xl overflow-hidden group hover:border-[#C5A880] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md"
                  >
                    <div>
                      {/* Video Thumbnail */}
                      <div className="relative aspect-video bg-zinc-100 overflow-hidden">
                        <img
                          src={thumb}
                          alt={vid.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500 opacity-90"
                        />
                        <div className="absolute inset-0 bg-zinc-950/10 flex items-center justify-center">
                          <div className="w-11 h-11 rounded-full bg-white/95 hover:bg-white text-zinc-950 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                            <Play className="w-4 h-4 fill-zinc-950 translate-x-0.5 text-zinc-950" />
                          </div>
                        </div>

                        {/* Top Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="bg-white/95 backdrop-blur-sm text-[#C5A880] px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider border border-zinc-200 shadow-sm">
                            {vid.category}
                          </span>
                        </div>

                        {/* Duration Badge */}
                        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-zinc-600 px-2 py-1 rounded text-[9px] font-mono flex items-center gap-1 border border-zinc-200 shadow-sm">
                          <Clock className="w-3 h-3 text-zinc-400" />
                          <span>{vid.duration || '10:00'}</span>
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="p-5 space-y-2">
                        <span className="text-[9px] font-mono text-[#C5A880] font-bold uppercase tracking-wider">
                          {vid.playlist || 'General Guide'}
                        </span>
                        <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-[#C5A880] transition-colors line-clamp-2 uppercase tracking-wide font-serif">
                          {vid.title}
                        </h3>
                        <p className="text-[11px] text-zinc-500 leading-relaxed font-light line-clamp-2">
                          {vid.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex justify-between items-center text-xs border-t border-zinc-100 mt-2">
                      <span className="text-zinc-400 text-[10px] font-semibold uppercase tracking-wider">Watch Demonstration</span>
                      <span className="text-[#C5A880] font-bold flex items-center gap-1">
                        Watch on YouTube ↗
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
