// frontend/src/pages/Home_page.tsx
import React from 'react';
import Hero from '../components/sections/Hero_component';
import { Cpu, ShieldCheck, Terminal } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    { icon: <Cpu />, title: "Arquitectura Docker", desc: "Contenedores para despliegues identicos en cualquier entorno." },
    { icon: <ShieldCheck />, title: "Seguridad & Nube", desc: "Configuracion de tuneles Cloudflare y Oracle Cloud." },
    { icon: <Terminal />, title: "Codigo Tipado", desc: "Desarrollo con TypeScript para minimizar errores en produccion." }
  ];

  return (
    <div className="animate-in fade-in duration-700 pb-20">
      {/* El Hero ahora es el punto de entrada principal */}
      <Hero />

      {/* Grid de features para reforzar la propuesta de valor */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-12">
        {features.map((item, i) => (
          <div key={i} className="group p-6 rounded-2xl bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm border border-slate-200 dark:border-slate-800 text-left transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="text-blue-600 dark:text-blue-400 mb-4 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-xl">
              {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
            </div>
            <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white uppercase tracking-tight">{item.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;