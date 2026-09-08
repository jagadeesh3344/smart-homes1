/**
 * BackToTop Button Component
 */

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-22 right-6 z-40 p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-850 text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md border border-slate-700/80 cursor-pointer"
      title="Back to top"
    >
      <ArrowUp className="w-5 h-5 text-teal-400" />
    </button>
  );
};
