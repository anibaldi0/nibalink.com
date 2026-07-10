// frontend/src/pages/Services_page.tsx
import React from 'react';
import { Layers, Code2, Globe2, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const detailedServices = [
    {
      title: "Desarrollo Fullstack (Stack FPSPRT)",
      desc: "Arquitecturas escalables con FastAPI y PostgreSQL. Interfaces de alta precision con React y Tailwind CSS, priorizando el tipado fuerte para sistemas de mision critica.",
      icon: <Code2 className="text-blue-500" size={32} />
    },
    {
      title: "Seguridad y Hardening de Infraestructura",
      desc: "Auditoria tecnica de seguridad mediante analisis de vulnerabilidades. Implementacion de headers, firewalls de capa 7 y mitigacion de vectores de ataque en servidores Linux.",
      icon: <ShieldCheck className="text-blue-500" size={32} />
    },
    {
      title: "Arquitectura Cloud y DevOps",
      desc: "Despliegue en Oracle Cloud y entornos locales (Debian). Orquestacion con Docker y conectividad segura mediante Cloudflare Tunnels y Nginx Reverse Proxy.",
      icon: <Layers className="text-blue-500" size={32} />
    }
  ];

  return (
    <div className="py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-16">
        <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">
          Servicios y Capacidades Tecnicas
        </h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl font-medium italic">
          Ingenieria de software y administracion de sistemas orientada a la seguridad y la alta disponibilidad.
        </p>
      </div>

      <div className="space-y-12">
        {detailedServices.map((service, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-8 p-8 bg-slate-50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] hover:border-blue-500/30 transition-all group">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl h-fit border border-slate-200 dark:border-slate-700 shadow-sm group-hover:scale-110 transition-transform">
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
                <span className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-500/5 px-3 py-1 rounded-full border border-blue-500/10">
                  <Zap size={12} /> High Performance
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-black text-green-600 dark:text-green-400 uppercase tracking-widest bg-green-500/5 px-3 py-1 rounded-full border border-green-500/10">
                  <CheckCircle2 size={12} /> Security Audited
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