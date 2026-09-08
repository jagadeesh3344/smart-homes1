import React, { useState, useEffect } from 'react';
import { Search, Save, CheckCircle, Eye } from 'lucide-react';
import { getSEOConfigs, updateSEOConfig } from '../utils/db';
import { SEOConfig } from '../types';

export default function SeoView() {
  const [seoList, setSeoList] = useState<SEOConfig[]>([]);
  const [selectedPage, setSelectedPage] = useState<SEOConfig | null>(null);
  
  // Fields editing
  const [title, setTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [ogImage, setOgImage] = useState('');
  const [keywords, setKeywords] = useState('');
  const [robotsIndex, setRobotsIndex] = useState(true);

  const [toast, setToast] = useState('');

  const loadData = () => {
    const list = getSEOConfigs();
    setSeoList(list);
    if (list.length > 0) {
      if (!selectedPage) {
        handleSelectPage(list[0]);
      } else {
        const refreshed = list.find(s => s.page === selectedPage.page);
        if (refreshed) handleSelectPage(refreshed);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSelectPage = (seo: SEOConfig) => {
    setSelectedPage(seo);
    setTitle(seo.title);
    setMetaDescription(seo.metaDescription);
    setCanonicalUrl(seo.canonicalUrl || `https://ksmarthomes.com/${seo.page.toLowerCase()}`);
    setOgTitle(seo.ogTitle || seo.title);
    setOgDescription(seo.ogDescription || seo.metaDescription);
    setOgImage(seo.ogImage || 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80');
    setKeywords(seo.keywords || '');
    setRobotsIndex(seo.robotsIndex !== undefined ? seo.robotsIndex : true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPage) return;

    const payload: Partial<SEOConfig> = {
      title: title.trim(),
      metaDescription: metaDescription.trim(),
      canonicalUrl: canonicalUrl.trim(),
      ogTitle: ogTitle.trim() || title.trim(),
      ogDescription: ogDescription.trim() || metaDescription.trim(),
      ogImage: ogImage.trim(),
      keywords: keywords.trim(),
      robotsIndex
    };

    updateSEOConfig(selectedPage.page, payload);
    triggerToast(`SEO metadata for page "${selectedPage.page}" saved!`);
    loadData();
  };

  return (
    <div className="space-y-6" id="seo-view-panel">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-50 border border-green-200 text-green-800 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-bold text-sm">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex justify-between items-center">
        <div>
          <h2 className="text-base font-bold text-gray-800">SEO &amp; Index Metadata</h2>
          <p className="text-xs text-gray-400 font-medium">Fine-tune Search Engine optimization, page headers, robot configurations, and OG social previews</p>
        </div>
        <div className="bg-indigo-50 border border-indigo-150 p-2.5 rounded-xl text-xs font-bold text-indigo-700 flex items-center gap-1.5">
          <Search className="w-4 h-4 text-indigo-500" />
          Total Managed Pages: <span className="font-black text-indigo-950 font-mono">{seoList.length} paths</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side (Route Selection) */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Public page</h3>
          
          <div className="space-y-1">
            {seoList.map(seo => (
              <button
                key={seo.page}
                onClick={() => handleSelectPage(seo)}
                className={`w-full text-left p-3.5 rounded-xl font-bold text-xs flex justify-between items-center cursor-pointer transition-all
                  ${selectedPage?.page === seo.page 
                    ? 'bg-indigo-600 border border-indigo-500 text-white shadow-md' 
                    : 'bg-white border border-gray-100 hover:bg-gray-50 text-gray-700 hover:text-gray-950'}
                `}
              >
                <div>
                  <p className="font-bold uppercase tracking-wide">{seo.page}</p>
                  <p className={`text-[9px] mt-0.5 ${selectedPage?.page === seo.page ? 'text-indigo-200' : 'text-gray-400'}`}>
                    {seo.title.substring(0, 32)}...
                  </p>
                </div>
                <span className={`text-[8px] px-2 py-0.5 rounded-sm font-mono tracking-widest uppercase
                  ${selectedPage?.page === seo.page ? 'bg-indigo-700 text-white' : 'bg-gray-100 text-gray-500'}
                `}>
                  {seo.robotsIndex ? 'INDEX' : 'NOINDEX'}
                </span>
              </button>
            ))}
          </div>

          <p className="text-[10px] text-gray-400 leading-normal pt-2 italic text-center font-medium">
            Search engine index crawlers scrape these specific directories periodically.
          </p>
        </div>

        {/* Right Side (Metadata Editor) */}
        <div className="lg:col-span-2 space-y-6">
          {selectedPage && (
            <form onSubmit={handleSave} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-5">
              <div className="border-b border-gray-50 pb-3 flex justify-between items-center">
                <div>
                  <span className="text-[9px] text-gray-400 font-extrabold uppercase tracking-widest">Active Header File</span>
                  <h3 className="font-mono text-sm font-black text-indigo-700">{selectedPage.page} Settings</h3>
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] uppercase px-4 py-2.5 rounded-xl shadow-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" /> Save Page SEO
                </button>
              </div>

              {/* Main Fields */}
              <div className="space-y-4 text-xs font-medium text-gray-600">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Browser Page Title</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Smart Touch Switches - K Smart Homes"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Robots Index Trigger</label>
                    <select
                      value={robotsIndex ? 'true' : 'false'}
                      onChange={(e) => setRobotsIndex(e.target.value === 'true')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white font-semibold"
                    >
                      <option value="true">INDEX, FOLLOW (Searchable page)</option>
                      <option value="false">NOINDEX, NOFOLLOW (Private / Hidden)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Canonical Link URL</label>
                    <input
                      type="url"
                      required
                      value={canonicalUrl}
                      onChange={(e) => setCanonicalUrl(e.target.value)}
                      placeholder="https://ksmarthomes.com/"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl font-semibold font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Keywords Tags (Comma Separated)</label>
                    <input
                      type="text"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="smart switches, automation, touch panel, luxury switches"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl font-mono text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Meta Description</label>
                  <textarea
                    rows={2}
                    required
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Provide a 150-160 character description describing page assets..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl font-sans"
                  />
                </div>

                {/* Open Graph Social Previews fields */}
                <div className="p-4 bg-gray-50 border border-gray-150 rounded-2xl space-y-4">
                  <h4 className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1">
                    <Eye className="w-4 h-4 text-indigo-500" /> Open Graph Social Card Parameters
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">OG Display Title</label>
                      <input
                        type="text"
                        value={ogTitle}
                        onChange={(e) => setOgTitle(e.target.value)}
                        placeholder="e.g. Smart Touch Switches K Smart Homes"
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">OG Banner Image URL</label>
                      <input
                        type="url"
                        value={ogImage}
                        onChange={(e) => setOgImage(e.target.value)}
                        placeholder="Paste cover thumbnail image..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">OG Display Description</label>
                    <textarea
                      rows={2}
                      value={ogDescription}
                      onChange={(e) => setOgDescription(e.target.value)}
                      placeholder="Custom summary shown when link is shared on Whatsapp or social channels..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white font-sans"
                    />
                  </div>
                </div>

                {/* Google Search Mock preview visualizer */}
                <div className="p-4 border border-gray-150 rounded-2xl space-y-1 font-sans">
                  <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">Google SERP Preview</span>
                  <div className="space-y-1">
                    <p className="text-[11px] text-gray-400 flex items-center gap-1">
                      <span>{canonicalUrl || 'https://ksmarthomes.com'}</span>
                    </p>
                    <h4 className="text-sm font-bold text-[#1a0dab] hover:underline cursor-pointer leading-tight">
                      {title || 'Smart switches | K Smart Homes'}
                    </h4>
                    <p className="text-[11px] text-[#4d5156] leading-relaxed line-clamp-2">
                      {metaDescription || 'No Meta Description compiled yet.'}
                    </p>
                  </div>
                </div>

              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
