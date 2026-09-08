import React, { useState, useEffect } from 'react';
import { Globe, Save, CheckCircle, Image as ImageIcon, Link as LinkIcon, Sparkles } from 'lucide-react';
import { getHomepageConfig, saveHomepageConfig } from '../utils/db';
import { HomepageConfig } from '../types';

export default function WebsiteView() {
  const [config, setConfig] = useState<HomepageConfig | null>(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    setConfig(getHomepageConfig());
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleFieldChange = (field: keyof HomepageConfig, value: string) => {
    if (config) {
      setConfig({
        ...config,
        [field]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (config) {
      saveHomepageConfig(config);
      triggerToast('Homepage layout content updated and synced successfully!');
    }
  };

  if (!config) {
    return <div className="p-8 text-center text-gray-400 font-medium">Loading CMS Configurations...</div>;
  }

  return (
    <div className="space-y-6" id="website-view-panel">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-50 border border-green-200 text-green-800 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-bold text-sm">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex justify-between items-center">
        <div>
          <h2 className="text-base font-bold text-gray-800">Homepage CMS Content</h2>
          <p className="text-xs text-gray-400 font-medium">Publish normal content updates directly without editing website code or redeploying</p>
        </div>
        <div className="bg-indigo-50 border border-indigo-150 p-2.5 rounded-xl text-xs font-bold text-indigo-700 flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-indigo-500" />
          Website Layout Mode: <span className="font-black text-indigo-950 uppercase">Live Sync</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side (Forms - takes 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Hero section CMS */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-indigo-700 uppercase tracking-wider pb-1.5 border-b border-gray-50 flex items-center gap-1.5">
              <Sparkles className="w-4.5 h-4.5 text-indigo-500" /> Primary Hero Slider Settings
            </h3>
            
            <div className="space-y-3 text-xs font-medium text-gray-600">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Hero Title Heading</label>
                <input
                  type="text"
                  required
                  value={config.heroTitle}
                  onChange={(e) => handleFieldChange('heroTitle', e.target.value)}
                  placeholder="e.g. Step Into the Future of Living"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl font-bold text-gray-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Hero Description Paragraph</label>
                <textarea
                  rows={4}
                  required
                  value={config.heroDescription}
                  onChange={(e) => handleFieldChange('heroDescription', e.target.value)}
                  placeholder="Provide sub-headline, descriptions, value propositions..."
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl font-sans text-gray-600 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">CTA Button Label</label>
                  <input
                    type="text"
                    required
                    value={config.heroButtonText}
                    onChange={(e) => handleFieldChange('heroButtonText', e.target.value)}
                    placeholder="e.g. Explore Catalogue"
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl font-bold text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">CTA Redirect URL Destination</label>
                  <input
                    type="text"
                    required
                    value={config.heroButtonDestination}
                    onChange={(e) => handleFieldChange('heroButtonDestination', e.target.value)}
                    placeholder="e.g. /catalogue"
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl font-semibold text-gray-800 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Hero Banner Background Image URL</label>
                <div className="mt-1 relative rounded-lg shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ImageIcon className="h-4.5 w-4.5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    required
                    value={config.heroImage}
                    onChange={(e) => handleFieldChange('heroImage', e.target.value)}
                    placeholder="Paste background image link..."
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Promotional banners section CMS */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-indigo-700 uppercase tracking-wider pb-1.5 border-b border-gray-50 flex items-center gap-1.5">
              <LinkIcon className="w-4.5 h-4.5 text-indigo-500" /> Mid-Page Promo Banners
            </h3>

            <div className="space-y-3 text-xs font-medium text-gray-600">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Promotional Pitch Headline</label>
                <input
                  type="text"
                  required
                  value={config.promotionalText}
                  onChange={(e) => handleFieldChange('promotionalText', e.target.value)}
                  placeholder="e.g. Flat 15% off on lighting consults..."
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Promo Cover Banner Image URL</label>
                  <input
                    type="url"
                    required
                    value={config.bannerImage}
                    onChange={(e) => handleFieldChange('bannerImage', e.target.value)}
                    placeholder="Paste promo cover image link..."
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Promo Destination Redirect URL Link</label>
                  <input
                    type="text"
                    required
                    value={config.bannerLink}
                    onChange={(e) => handleFieldChange('bannerLink', e.target.value)}
                    placeholder="e.g. /offers"
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-md cursor-pointer"
              id="btn-save-cms"
            >
              <Save className="w-4.5 h-4.5" /> SYNC AND SAVE CMS CHANGES
            </button>
          </div>
        </div>

        {/* Right Side (Visual Mock Preview - takes 1 column) */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-4 self-start">
          <div className="border-b border-gray-100 pb-2 flex items-center justify-between">
            <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">CMS Mock Visualizer</span>
            <span className="inline-flex w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-xs text-xs font-sans">
            {/* Nav Preview */}
            <div className="bg-gray-900 text-white p-3 flex justify-between items-center text-[10px] font-black font-sans">
              <span>K Smart Homes</span>
              <div className="flex gap-2 text-gray-400 text-[8px]">
                <span>HOME</span>
                <span>CATALOGUE</span>
                <span>VIDEOS</span>
              </div>
            </div>

            {/* Banner Preview */}
            <div className="relative h-44 bg-gray-100 flex items-center justify-center text-center p-4 overflow-hidden">
              <img
                src={config.heroImage}
                alt="preview"
                className="absolute inset-0 w-full h-full object-cover opacity-80 blur-xs"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gray-950/40"></div>
              
              <div className="relative z-10 text-white space-y-1.5 p-2">
                <h4 className="font-extrabold text-xs leading-tight line-clamp-2">{config.heroTitle || 'Preview Title'}</h4>
                <p className="text-[8px] text-gray-300 line-clamp-3 leading-relaxed">{config.heroDescription || 'Preview Description'}</p>
                <span className="inline-block mt-2 bg-indigo-600 px-3 py-1 text-[8px] font-bold rounded-sm tracking-wide">
                  {config.heroButtonText || 'CTA'}
                </span>
              </div>
            </div>

            {/* Promo Mid-Page Preview */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 text-center text-gray-700 space-y-2">
              <p className="text-[9px] font-semibold leading-tight line-clamp-2 text-gray-600">{config.promotionalText || 'Promo Summary'}</p>
              <div className="h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-200">
                <img
                  src={config.bannerImage}
                  alt="promo preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
          
          <p className="text-[10px] text-gray-400 font-medium text-center italic leading-normal">
            This sidebar demonstrates how updates are instantly structured to map directly to public website sections.
          </p>
        </div>

      </form>
    </div>
  );
}
