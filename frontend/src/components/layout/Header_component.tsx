// frontend/src/components/layout/Header_component.tsx

import React, { useState } from 'react';
import { Menu, X, Sun, Moon, LogIn, LogOut, User, LayoutDashboard } from 'lucide-react'; 
import { useDarkMode } from '../../hooks/useDarkMode_hook';
import { Link, useNavigate } from 'react-router-dom';
import nibalinkLogo from '../../assets/img/nibalink_dark.png';

interface HeaderProps {
  loading: boolean;
}

const Header: React.FC<HeaderProps> = ({ loading }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, setIsDark } = useDarkMode();
  const navigate = useNavigate();

  const token = localStorage.getItem('nibalink_token');
  const isAdmin = !!token;

  const handleLogout = () => {
    localStorage.removeItem('nibalink_token');
    setIsMenuOpen(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="max-w-4xl mx-auto mb-10 py-6 relative">
      <div className="flex justify-between items-center">
        {/* Logo e Identidad */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex flex-col items-end">
            <img 
              src={nibalinkLogo} 
              alt="Nibalink Logo" 
              className="h-9 w-auto group-hover:scale-105 transition-transform"
            />
            <p className="text-blue-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
              enlace digital
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Inicio</Link>
            <Link to="/servicios" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Servicios</Link>
            <Link to="/bitacora" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Bitacora</Link>
            <Link to="/metrics" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Metricas</Link>
            {isAdmin && (
              <Link to="/dashboard" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Dashboard</Link>
            )}
          </nav>
          
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>

          {isAdmin ? (
            <button onClick={handleLogout} className="flex items-center gap-2 text-xs font-black uppercase text-red-500 hover:text-red-600 transition-colors">
              <LogOut size={16} /> Salir
            </button>
          ) : (
            <Link to="/login" className="p-2 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white transition-all">
              <LogIn size={18} />
            </Link>
          )}

          <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:ring-2 ring-blue-500/50 transition-all">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="flex items-center gap-2 px-3 py-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-full border border-slate-300 dark:border-slate-700">
            <div className={`h-2 w-2 rounded-full ${loading ? 'bg-yellow-500 animate-ping' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]'}`}></div>
            <span className="text-[9px] font-mono uppercase text-slate-500 dark:text-slate-400">
              {loading ? 'Sync' : 'Online'}
            </span>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button onClick={() => setIsDark(!isDark)} className="p-2 text-slate-600 dark:text-yellow-400">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="p-2 text-slate-600 dark:text-slate-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - CORREGIDO */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-2 text-sm font-medium">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">Inicio</Link>
            <Link to="/servicios" onClick={() => setIsMenuOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">Servicios</Link>
            <Link to="/bitacora" onClick={() => setIsMenuOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">Bitácora</Link>
            <Link to="/metrics" onClick={() => setIsMenuOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">Métricas</Link>
            
            {/* LINK DASHBOARD MOBILE - AÑADIDO */}
            {isAdmin && (
              <Link 
                to="/dashboard" 
                onClick={() => setIsMenuOpen(false)} 
                className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg font-bold flex items-center gap-2"
              >
                <LayoutDashboard size={18} /> Panel de Control
              </Link>
            )}

            <div className="h-px bg-slate-200 dark:bg-slate-700 my-2"></div>

            {isAdmin ? (
              <button onClick={handleLogout} className="flex items-center gap-2 p-3 text-red-500 font-bold">
                <LogOut size={18} /> Cerrar Sesión (Admin)
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 p-3 text-blue-600 font-bold">
                <User size={18} /> Acceso Administrador
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;