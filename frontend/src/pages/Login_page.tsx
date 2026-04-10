// frontend/src/pages/Login_page.tsx

/**
 * FILE: frontend/src/pages/Login_page.tsx
 * DESCRIPTION: Interfaz de acceso para el Administrador.
 *              Usa el campo email_user de la DB como Nickname.
 */

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock, User as UserIcon, ShieldAlert, Loader2 } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState(''); // El Nick o Email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    // FastAPI mapea esto al campo 'username' del form, que nosotros
    // buscaremos en la columna 'email_user' de la DB.
    formData.append('username', identifier); 
    formData.append('password', password);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData);
      localStorage.setItem('nibalink_token', response.data.access_token);
      
      // Redirigimos y forzamos recarga para actualizar el Header
      navigate('/servicios');
      window.location.reload(); 
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Credenciales invalidas, Anibal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center animate-in fade-in zoom-in duration-300">
      <div className="w-full max-w-md p-8 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] shadow-2xl">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/10 mb-4 border border-blue-500/20">
            <UserIcon className="text-blue-600 dark:text-blue-400" size={32} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">ADMIN_AUTH</h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold mt-1">Nibalink Control Systems</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/5 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-xs font-black animate-shake">
            <ShieldAlert size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Access ID</label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" // Cambiado de 'email' a 'text' para que no pida el @
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Ingresa tu Nick"
                className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-slate-900/50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none transition-all font-bold text-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">Secret Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-slate-900/50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none transition-all font-bold text-slate-800 dark:text-white"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'INICIAR SESIÓN'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
