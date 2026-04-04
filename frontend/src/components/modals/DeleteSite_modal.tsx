// frontend/src/components/modals/DeleteSite_modal.tsx

import React, { useState, useEffect } from 'react'; // Agregamos useEffect
import { AlertTriangle, X } from 'lucide-react';

interface DeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  siteName: string;
}

const DeleteSiteModal: React.FC<DeleteProps> = ({ isOpen, onClose, onConfirm, siteName }) => {
  const [confirmText, setConfirmText] = useState('');

  // CLEANUP LOGIC: Resetea el input cada vez que el modal cambia de estado (abrir/cerrar)
  useEffect(() => {
    if (!isOpen) {
      setConfirmText('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay con reset al clickear fuera */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-red-500/30 rounded-3xl shadow-2xl scale-100 transition-all duration-300">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="text-lg font-black text-red-600 flex items-center gap-2">
            <AlertTriangle size={20} /> Acción Destructiva
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Escribí <span className="font-bold text-slate-900 dark:text-white uppercase tracking-tighter">DELETE</span> para eliminar permanentemente: <br/>
            <strong className="text-red-500">"{siteName}"</strong>
          </p>
          
          <input 
            type="text" 
            autoFocus // Mejora la UX: el cursor ya aparece ahí al abrir
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Escribí DELETE aquí" // Placeholder más descriptivo
            className="w-full p-4 bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-red-500 rounded-2xl outline-none text-center font-black tracking-widest mb-6 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
          />

          <button 
            onClick={() => {
              if (confirmText === 'DELETE') {
                onConfirm();
                setConfirmText(''); // Limpieza preventiva tras confirmar
              }
            }}
            disabled={confirmText !== 'DELETE'}
            className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 ${
              confirmText === 'DELETE' 
              ? 'bg-red-600 text-white shadow-xl hover:scale-[1.02] active:scale-95' 
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-50'
            }`}
          >
            CONFIRMAR ELIMINACIÓN
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSiteModal;