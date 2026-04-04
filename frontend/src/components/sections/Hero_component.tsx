// frontend/src/components/sections/Hero_component.tsx
import React from 'react';
import { Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  // Formato internacional: codigo pais + area + numero (sin espacios ni simbolos)
  const whatsappUrl = "https://wa.me/5491127900298?text=Hola%20Anibal,%20vi%20tu%20web%20nibalink.com%20y%20me%20gustaria%20consultarte%20por%20un%20proyecto";

  return (
    <section className="relative py-20 flex flex-col items-center text-center overflow-hidden">
      {/* Fondo de Grilla y Glow */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[300px] w-[600px] rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-600/20"></div>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold mb-6">
        {/* <Rocket size={14} /> */}
        <span>Disponible para nuevos proyectos</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-none">
        Soluciones Fullstack <br />
        <span className="text-blue-600 dark:text-blue-500">con ADN de Sysadmin</span>
      </h1>
      
      <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400 mb-10">
        Construccion de sitios web robustos y 
        optimizados.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/servicios" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/25 active:scale-95">
          Ver Servicios
        </Link>
        {/* Cambio de button a anchor tag para el enlace externo */}
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 flex items-center justify-center"
        >
          Contactar
        </a>
      </div>
    </section>
  );
};

export default Hero;