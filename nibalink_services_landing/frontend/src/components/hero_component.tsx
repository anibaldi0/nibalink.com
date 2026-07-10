// nibalink_services_landing/frontend/src/components/hero_component.tsx

import { useState } from 'react';
import { Cpu } from 'lucide-react';
import nibalinkLogo from '../assets/img/nibalink_dark.png';

export default function HeroComponent() {
  const [isCharging, setIsCharging] = useState(false); // Nuevo estado para la carga de energia
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLogoClick = () => {
    // 1. Inicia la fase de "carga de energia"
    setIsCharging(true);
    
    // 2. Despues de 1000ms (1 segundo), inicia el despegue como estrella fugaz
    setTimeout(() => {
      setIsCharging(false); // Detenemos la carga
      setIsLaunching(true); // Iniciamos el despegue
    }, 1000); 

    // 3. El delay final antes de la redireccion para que se vea la estrella fugaz
    setTimeout(() => {
      window.location.href = "https://nibalink.com";
    }, 1700); // 1000ms de carga + 700ms de vuelo
  };

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center bg-slate-950 overflow-hidden">
      {/* ... fondos igual ... */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#1e3a8a,transparent_50%)] opacity-50" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 flex flex-col items-center">
        {/* ... icono CPU igual ... */}
        <div className="mb-8 p-4 bg-slate-900/50 border border-blue-500/30 rounded-2xl backdrop-blur-sm shadow-[0_0_20px_rgba(37,99,235,0.2)]">
          <Cpu className="w-12 h-12 text-blue-500 animate-pulse" />
        </div>
        
        <div className="flex flex-col items-center mb-6 cursor-pointer group" onClick={handleLogoClick}>
          <div className="relative">
            <img 
              src={nibalinkLogo} 
              alt="Nibalink Logo" 
              className={`h-16 md:h-20 w-auto transition-all duration-700 ease-in-out
                ${isLaunching 
                  ? 'scale-150 rotate-[360deg] -translate-y-[100vh] translate-x-[100vw] opacity-0 blur-sm' // ESTRELLA FUGAZ
                  : isCharging
                    ? 'scale-110 sepia invert hue-rotate-[240deg] saturate-200 drop-shadow-[0_0_30px_rgba(239,68,68,1)] animate-pulse' // CARGA INCANDESCENTE (ROJO)
                    : 'hover:scale-105 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]' // ESTADO INICIAL
                }`}
            />
            {/* Contorno de pulso amenazante durante la carga */}
            {isCharging && (
              <div className="absolute -inset-4 border-4 border-red-500 rounded-full animate-ping opacity-70" />
            )}

            {/* Efecto rastro de luz cuando sale disparado (cian) */}
            {isLaunching && (
              <div className="absolute inset-0 bg-cyan-400 blur-2xl animate-ping rounded-full opacity-50" />
            )}
          </div>
          
          <h1 className="sr-only">NIBALINK.COM</h1>
          {/* ... textos con fadeout durante el despegue ... */}
          <p className={`text-sm font-mono tracking-[0.4em] text-blue-400 uppercase mt-4 transition-opacity duration-300 ${isLaunching || isCharging ? 'opacity-0' : 'opacity-100'}`}>
            Enlace Digital
          </p>
        </div>
        
        <p className={`text-slate-400 text-center max-w-lg px-4 leading-relaxed font-medium italic transition-opacity duration-500 ${isLaunching || isCharging ? 'opacity-0' : 'opacity-100'}`}>
          Infraestructura de backend robusta y gestion de datos optimizado para tu proximo nivel de escalabilidad.
        </p>
      </div>
    </section>
  );
}