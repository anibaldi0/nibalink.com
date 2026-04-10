// frontend/src/pages/Bitacora_page.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';

interface ErrorPost {
  id: number;
  title: string;
  error_payload: string;
  solution: string;
  created_at: string;
}

const BitacoraPage: React.FC = () => {
  const [errors, setErrors] = useState<ErrorPost[]>([]);
  const [loading, setLoading] = useState(true);

  // CORRECCION NINJA: Definimos la URL base desde el entorno
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    // Reemplazamos localhost por la variable dinamica
    axios.get<ErrorPost[]>(`${apiUrl}/blog/`)
      .then(res => {
        setErrors(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return <div className="py-20 text-center text-slate-500 animate-pulse">Sincronizando registros del servidor...</div>;
  }

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-10 flex items-center gap-3 text-slate-800 dark:text-white">
        <AlertCircle className="text-blue-600 dark:text-blue-400" size={28} />
        Bitacora de Desafios Resueltos
      </h2>

      <div className="grid gap-8">
        {errors.map(err => (
          <div key={err.id} className="bg-white dark:bg-slate-800/40 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 shadow-xl hover:border-blue-500/40 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">{err.title}</h3>
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-900/80 px-2 py-1 rounded-md">LOG_ID: {err.id}</span>
            </div>
            
            <div className="flex gap-2 mb-4">
              {(err.error_payload.toLowerCase().includes('python') || err.error_payload.includes('ModuleNotFound')) && (
                <span className="text-[9px] bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border border-yellow-500/20 px-2 py-0.5 rounded font-black uppercase">Python</span>
              )}
              {(err.solution.toLowerCase().includes('docker') || err.solution.toLowerCase().includes('workdir')) && (
                <span className="text-[9px] bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-400/20 px-2 py-0.5 rounded font-black uppercase">Docker</span>
              )}
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-4 mb-4 border border-red-500/10 font-mono text-xs text-red-600 dark:text-red-400/90 overflow-x-auto">
              <code>{err.error_payload}</code>
            </div>

            <div className="flex gap-3 items-start bg-green-500/5 p-4 rounded-xl border border-green-500/10">
              <CheckCircle2 className="text-green-600 dark:text-green-500 shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="text-green-600 dark:text-green-400 font-bold mr-1 italic underline">Resolucion:</span> {err.solution}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center gap-2 text-slate-400 dark:text-slate-500">
              <Clock size={14} />
              <span className="text-[10px] uppercase tracking-widest">{new Date(err.created_at).toLocaleString('es-AR')}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BitacoraPage;
