// frontend/src/components/modals/CreateSite_modal.tsx

import React, { useState } from 'react';
import { X, Loader2, Globe } from 'lucide-react';

interface CreateProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (siteData: { site_name: string; url: string; is_active: boolean }) => Promise<void>;
}

const CreateSiteModal: React.FC<CreateProps> = ({ isOpen, onClose, onConfirm }) => {
  const [siteData, setSiteData] = useState({ site_name: '', url: '', is_active: true });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onConfirm(siteData);
    setLoading(false);
    setSiteData({ site_name: '', url: '', is_active: true });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden transition-all duration-300 scale-100">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="text-blue-500" size={24} /> Nuevo Monitor
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Nombre del Sitio</label>
            <input 
              type="text" required placeholder="Ej: Nibalink Portfolio"
              value={siteData.site_name}
              onChange={(e) => setSiteData({...siteData, site_name: e.target.value})}
              className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">URL (https://...)</label>
            <input 
              type="url" required placeholder="https://nibalink.com"
              value={siteData.url}
              onChange={(e) => setSiteData({...siteData, url: e.target.value})}
              className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none transition-all font-mono text-sm"
            />
          </div>
          <button 
            type="submit" disabled={loading}
            className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'GUARDAR CONFIGURACION'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSiteModal;
