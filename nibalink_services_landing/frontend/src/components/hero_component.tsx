
// nibalink_services_landing/frontend/src/components/hero_component.tsx

import { Cpu } from 'lucide-react';

export default function HeroComponent() {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center bg-slate-950 overflow-hidden">
      {/* Efecto de resplandor de fondo (Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#1e3a8a,transparent_50%)] opacity-50" />
      
      {/* Grilla tecnica */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-6 p-4 bg-slate-900/50 border border-blue-500/30 rounded-2xl backdrop-blur-sm shadow-[0_0_20px_rgba(37,99,235,0.2)]">
          <Cpu className="w-12 h-12 text-blue-500 animate-pulse" />
        </div>
        
        <h1 className="text-6xl font-bold tracking-tighter text-white mb-2">
          NIBALINK<span className="text-blue-600">.COM</span>
        </h1>
        <p className="text-sm font-mono tracking-[0.3em] text-blue-400 uppercase mb-8">
          Enlace Digital
        </p>
        
        <p className="text-slate-400 text-center max-w-lg px-4 leading-relaxed">
          Infraestructura de backend robusta y gestion de datos optimizada para el proximo nivel de escalabilidad.
        </p>
      </div>
    </section>
  );
}
