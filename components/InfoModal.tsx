
import React from 'react';
import { InfoContent } from '../types';
import { XIcon } from './Icons';

interface InfoModalProps {
  content: InfoContent | null;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ content, onClose }) => {
  if (!content) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-xl shadow-2xl p-6 md:p-8 max-w-2xl w-full border border-slate-700 relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <XIcon className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-bold text-cyan-400 mb-4">{content.title}</h3>
        <div className="text-slate-300 space-y-4" dangerouslySetInnerHTML={{ __html: content.content }} />
      </div>
    </div>
  );
};

export default InfoModal;
