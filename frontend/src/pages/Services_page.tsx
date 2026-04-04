// frontend/src/pages/Services_page.tsx
import React from 'react';
import { Layers, Code2, Globe2, CheckCircle2 } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const detailedServices = [
    {
      title: "Desarrollo Fullstack",
      desc: "Creacion de aplicaciones robustas usando herramientas tipadas para un frontend y un backend estable y potente, asegurando alta performance y escalabilidad.",
      icon: <Code2 className="text-blue-500" size={32} />
    },
    {
      title: "Infraestructura & Despliegue",
      desc: "Configuracion de servidores linux y Dockerizacion de aplicaciones en caso de necesitarse.",
      icon: <Layers className="text-blue-500" size={32} />
    },
    {
      title: "Seguridad y Redes",
      desc: "Implementacion de Cloudflare Tunnels y Nginx para proteger tus aplicaciones y optimizar la entrega de contenido.",
      icon: <Globe2 className="text-blue-500" size={32} />
    }
  ];

  return (
    <div className="py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-16">
        <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">
          Nuestras Capacidades
        </h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl font-medium italic">
          Soluciones de ingenieria digital diseñadas para funcionar sin interrupciones.
        </p>
      </div>

      <div className="space-y-12">
        {detailedServices.map((service, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-8 p-8 bg-slate-50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] hover:border-blue-500/30 transition-all">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl h-fit border border-slate-200 dark:border-slate-700 shadow-sm">
              {service.icon}
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">
                {service.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-lg">
                {service.desc}
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">
                  <CheckCircle2 size={14} /> Calidad Premium
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">
                  <CheckCircle2 size={14} /> Soporte personalizado
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;