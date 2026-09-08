import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, CheckCircle, HelpCircle, X } from 'lucide-react';
import { getFAQs, addFAQ, updateFAQ, deleteFAQ } from '../utils/db';
import { FAQ } from '../types';

export default function FaqsView() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('Smart Switches');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [active, setActive] = useState(true);

  const [toast, setToast] = useState('');

  const loadData = () => {
    setFaqs(getFAQs().sort((a, b) => a.displayOrder - b.displayOrder));
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
    setQuestion('');
    setAnswer('');
    setCategory('Smart Switches');
    setDisplayOrder(faqs.length + 1);
    setActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (f: FAQ) => {
    setModalMode('edit');
    setEditingId(f.id);
    setQuestion(f.question);
    setAnswer(f.answer);
    setCategory(f.category);
    setDisplayOrder(f.displayOrder);
    setActive(f.active);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this FAQ entry from database?')) {
      deleteFAQ(id);
      triggerToast('FAQ entry deleted successfully.');
      loadData();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim()) {
      alert('Question and Answer text are required.');
      return;
    }

    const payload: Omit<FAQ, 'id' | 'createdAt'> = {
      question: question.trim(),
      answer: answer.trim(),
      category: category.trim(),
      displayOrder: Number(displayOrder) || 1,
      active
    };

    if (modalMode === 'add') {
      addFAQ(payload);
      triggerToast('FAQ entry added successfully.');
    } else if (editingId) {
      updateFAQ(editingId, payload);
      triggerToast('FAQ entry details updated.');
    }

    setIsModalOpen(false);
    loadData();
  };

  return (
    <div className="space-y-6" id="faqs-view-panel">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-50 border border-green-200 text-green-800 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-bold text-sm">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-gray-800">FAQ Management</h2>
          <p className="text-xs text-gray-400 font-medium font-sans">Publish technical support guides, pre-requisite queries, or wiring procedures</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md cursor-pointer"
          id="btn-add-faq"
        >
          <Plus className="w-4 h-4" /> ADD FAQ RECORD
        </button>
      </div>

      {/* FAQs List Accordion table style */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden divide-y divide-gray-100" id="faqs-list-accordion">
        {faqs.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm font-semibold">No FAQs registered in system database yet.</div>
        ) : (
          faqs.map(faq => (
            <div key={faq.id} className="p-5 flex flex-col md:flex-row gap-4 justify-between items-start hover:bg-gray-50/40 transition-colors">
              <div className="space-y-2 flex-1 text-xs font-medium text-gray-600">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold border ${faq.active ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-gray-400 text-white border-gray-500'}`}>
                    {faq.active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 border border-gray-250 rounded text-[8px] font-extrabold text-gray-700">
                    {faq.category}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono font-bold">Display Order: {faq.displayOrder}</span>
                </div>
                <h3 className="text-sm font-black text-gray-800 leading-tight flex items-start gap-2">
                  <HelpCircle className="w-4.5 h-4.5 text-indigo-500 shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="pl-6 text-gray-500 leading-relaxed text-[11px] font-sans break-words">{faq.answer}</p>
              </div>

              <div className="flex gap-2 self-end md:self-start border-l border-gray-50 pl-0 md:pl-4">
                <button
                  onClick={() => handleOpenEdit(faq)}
                  className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg cursor-pointer"
                  title="Edit FAQ"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ADD / EDIT FAQ MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="faq-modal">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-gray-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-gray-800 uppercase tracking-wide">
                  {modalMode === 'add' ? 'Construct FAQ Entry' : 'Edit FAQ Entry'}
                </h3>
                <p className="text-[10px] text-gray-400 font-medium">Configure customer self-support Q&amp;A specs</p>
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
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Question Headline</label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. Do I need to rewire my entire house?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Answer / wiring Procedure Details</label>
                <textarea
                  rows={4}
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Write clear, descriptive instructions explaining solution guidelines..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl font-sans text-gray-600 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">FAQ Section Category</label>
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
                    <option value="Installation">Installation Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Display Reorder Sorting Index</label>
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
                  <span>Active &amp; Visible on Support Center Page</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2.5 px-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl cursor-pointer shadow-sm"
                >
                  SAVE FAQ SPEC
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
