// frontend/src/components/sections/Services_component.tsx
import React from 'react';
import { Cpu, ShieldCheck, Terminal, AlertCircle } from 'lucide-react';

const servicesData = [
  { icon: <Cpu />, title: "Arquitectura Docker", desc: "Contenedores para despliegues idénticos en cualquier entorno." },
  { icon: <ShieldCheck />, title: "Seguridad & Nube", desc: "Configuración de túneles Cloudflare y Oracle Cloud." },
  { icon: <Terminal />, title: "Código Tipado", desc: "Desarrollo con TypeScript para minimizar errores en producción." }
];

const Services: React.FC = () => {
  return (
    <section className="py-20 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300 relative">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-slate-900 dark:text-white tracking-tight">
        <AlertCircle className="text-blue-600 dark:text-blue-400" size={32} />
        Servicios de Ingeniería Web
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative">
        {servicesData.map((item, i) => (
          <div 
            key={i} 
            // CAMBIO: Agregamos group, transition-transform y scale-105 al hover
            className="group p-8 rounded-3xl bg-white dark:bg-slate-800/20 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500/50 shadow-xl dark:shadow-blue-950/20 text-left transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transform hover:scale-105"
          >
            <div className="text-blue-600 dark:text-blue-400 mb-6 bg-slate-100 dark:bg-slate-900 w-16 h-16 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-inner group-hover:scale-110 transition-transform duration-300">
              {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100 tracking-tight">{item.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
