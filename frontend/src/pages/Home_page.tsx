// frontend/src/pages/Home_page.tsx
import React from 'react';
import Hero from '../components/sections/Hero_component';
import { Cpu, ShieldCheck, Terminal, Server, Code2, Database } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    { 
      icon: <Server />, 
      title: "Infraestructura Cloud", 
      desc: "Despliegue robusto en Oracle Cloud utilizando Ubuntu y Nginx para alta disponibilidad." 
    },
    { 
      icon: <ShieldCheck />, 
      title: "Hardening & Seguridad", 
      desc: "Proteccion de activos digitales mediante Cloudflare Tunnels y auditoria de vulnerabilidades activa." 
    },
    { 
      icon: <Cpu />, 
      title: "Orquestacion Docker", 
      desc: "Entornos aislados y replicables con Docker Compose, garantizando consistencia en el despliegue." 
    },
    { 
      icon: <Code2 />, 
      title: "Stack FPSPRT", 
      desc: "Desarrollo moderno con FastAPI, React y validacion estricta de datos mediante Pydantic." 
    },
    { 
      icon: <Database />, 
      title: "Persistencia Avanzada", 
      desc: "Modelado de datos complejo con SQLAlchemy 2.0 y PostgreSQL para integridad total." 
    },
    { 
      icon: <Terminal />, 
      title: "Automatizacion & CLI", 
      desc: "Gestion de sistemas via terminal y monitoreo de telemetria en tiempo real." 
    }
  ];

  return (
    <div className="animate-in fade-in duration-1000 pb-20">
      {/* Seccion Principal */}
      <Hero />

      {/* Titulo de transicion */}
      <div className="mt-20 mb-12 text-center">
        <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
          Core Capabilities
        </span>
      </div>

      {/* Grid de features: Ahora 2x3 para mostrar mas potencia */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {features.map((item, i) => (
          <div 
            key={i} 
            className="group p-8 rounded-[2rem] bg-white dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:border-blue-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1"
          >
            <div className="text-blue-600 dark:text-blue-400 mb-6 transition-all duration-500 group-hover:rotate-[360deg] flex items-center justify-center w-14 h-14 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
              {React.cloneElement(item.icon as React.ReactElement, { size: 30 })}
            </div>
            <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-white uppercase tracking-tight">
              {item.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;