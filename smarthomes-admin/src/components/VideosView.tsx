import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, CheckCircle, ExternalLink, X, Video as VideoIcon } from 'lucide-react';
import { getVideos, addVideo, updateVideo, deleteVideo } from '../utils/db';
import { Video } from '../types';

export default function VideosView() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [category, setCategory] = useState('Smart Switches');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [active, setActive] = useState(true);

  const [toast, setToast] = useState('');

  const loadData = () => {
    setVideos(getVideos().sort((a, b) => a.displayOrder - b.displayOrder));
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleOpenAdd = () => {
    setModalMode('add');
    setEditingId(null);
    setTitle('');
    setDescription('');
    setYoutubeUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    setThumbnail('https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80');
    setCategory('Smart Switches');
    setDisplayOrder(videos.length + 1);
    setActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (v: Video) => {
    setModalMode('edit');
    setEditingId(v.id);
    setTitle(v.title);
    setDescription(v.description);
    setYoutubeUrl(v.youtubeUrl);
    setThumbnail(v.thumbnail);
    setCategory(v.category);
    setDisplayOrder(v.displayOrder);
    setActive(v.active);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this video metadata completely from database?')) {
      deleteVideo(id);
      triggerToast('Video catalog item deleted successfully.');
      loadData();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !youtubeUrl.trim()) {
      alert('Title and YouTube URL are required.');
      return;
    }

    const payload: Omit<Video, 'id' | 'createdAt'> = {
      title: title.trim(),
      description: description.trim(),
      youtubeUrl: youtubeUrl.trim(),
      thumbnail: thumbnail.trim() || 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80',
      category: category.trim(),
      displayOrder: Number(displayOrder) || 1,
      active
    };

    if (modalMode === 'add') {
      addVideo(payload);
      triggerToast('Video catalog item created successfully.');
    } else if (editingId) {
      updateVideo(editingId, payload);
      triggerToast('Video catalog item details updated.');
    }

    setIsModalOpen(false);
    loadData();
  };

  return (
    <div className="space-y-6" id="videos-view-panel">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-50 border border-green-200 text-green-800 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-bold text-sm">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-gray-800">Videos Catalog</h2>
          <p className="text-xs text-gray-400 font-medium">Link tutorials and case study YouTube links to enrich website pages</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md cursor-pointer"
          id="btn-add-video"
        >
          <Plus className="w-4 h-4" /> ADD VIDEO METADATA
        </button>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="videos-list-grid">
        {videos.map(v => (
          <div key={v.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              {/* Cover with Redirect click indicator */}
              <div className="h-44 relative bg-gray-100 flex items-center justify-center">
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Video Play Overlay Trigger */}
                <a 
                  href={v.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 bg-gray-950/30 hover:bg-gray-950/45 flex items-center justify-center text-white transition-colors cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-600 border border-indigo-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                    ▶
                  </div>
                </a>

                <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold border ${v.active ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-gray-400 text-white border-gray-500'}`}>
                    {v.active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-900/80 rounded text-[8px] font-extrabold text-white border border-gray-800">
                    {v.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-gray-950/80 px-2 py-0.5 rounded text-[8px] font-mono text-white z-10">
                  Order Index: {v.displayOrder}
                </div>
              </div>

              {/* Info content summary */}
              <div className="p-5 space-y-2 text-xs font-medium text-gray-600">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-black text-gray-800 leading-tight line-clamp-1">{v.title}</h3>
                  <a 
                    href={v.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 text-gray-400 hover:text-indigo-600 rounded"
                    title="Open YouTube Redirect Link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-gray-500 leading-relaxed text-[11px] line-clamp-3">
                  {v.description || 'No marketing summary defined for this walk-through.'}
                </p>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(v)}
                className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 hover:bg-indigo-100 border border-indigo-200 px-2.5 py-1.5 rounded-lg bg-white cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" /> EDIT VIDEO
              </button>
              <button
                onClick={() => handleDelete(v.id)}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT VIDEO MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="video-modal">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-gray-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-gray-800 uppercase tracking-wide">
                  {modalMode === 'add' ? 'Link Video Link' : 'Edit Video Details'}
                </h3>
                <p className="text-[10px] text-gray-400 font-medium">Define metadata redirect records matching public channels</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-gray-200 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-medium text-gray-600 overflow-y-auto">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Video Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Titan Smart Switchboard Walkthrough"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Teaser Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Draft a brief overview highlighting core features shown..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl font-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">YouTube Video Link URL</label>
                <input
                  type="url"
                  required
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl font-mono text-gray-700"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Thumbnail Preview Image URL</label>
                <input
                  type="url"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="Paste thumbnail web link..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Video Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl bg-white text-xs font-semibold"
                  >
                    <option value="Smart Switches">Smart Switches</option>
                    <option value="Gate Automation">Gate Automation</option>
                    <option value="Security Systems">Security Systems</option>
                    <option value="Lighting Solutions">Lighting Solutions</option>
                    <option value="Climate Control">Climate Control</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Display Sorting Index</label>
                  <input
                    type="number"
                    min="1"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 border border-gray-100 rounded-xl">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Active &amp; Visible on Public Video Page</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2.5 px-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl cursor-pointer"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl cursor-pointer shadow-sm"
                >
                  SAVE VIDEO SPEC
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
