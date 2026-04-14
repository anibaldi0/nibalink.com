
// nibalink_services_landing/frontend/src/components/hero_component.tsx

import { Cpu } from 'lucide-react';
import nibalinkLogo from '../assets/img/nibalink_dark.png';

export default function HeroComponent() {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center bg-slate-950 overflow-hidden">
      {/* Efecto de resplandor de fondo (Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#1e3a8a,transparent_50%)] opacity-50" />
      
      {/* Grilla tecnica heredada de nibalink.com */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Icono de hardware con pulso */}
        <div className="mb-8 p-4 bg-slate-900/50 border border-blue-500/30 rounded-2xl backdrop-blur-sm shadow-[0_0_20px_rgba(37,99,235,0.2)]">
          <Cpu className="w-12 h-12 text-blue-500 animate-pulse" />
        </div>
        
        {/* Logo integrado en el H1 */}
        <div className="flex flex-col items-center mb-6">
          <img 
            src={nibalinkLogo} 
            alt="Nibalink Logo" 
            className="h-16 md:h-20 w-auto hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
          />
          <h1 className="sr-only">NIBALINK.COM</h1> {/* SEO: Texto oculto para lectores de pantalla */}
          
          <p className="text-sm font-mono tracking-[0.4em] text-blue-400 uppercase mt-4 animate-in fade-in slide-in-from-bottom-2 duration-1000">
            Enlace Digital
          </p>
        </div>
        
        <p className="text-slate-400 text-center max-w-lg px-4 leading-relaxed font-medium italic">
          Infraestructura de backend robusta y gestion de datos optimizado para tu proximo nivel de escalabilidad.
        </p>
      </div>
    </section>
  );
}