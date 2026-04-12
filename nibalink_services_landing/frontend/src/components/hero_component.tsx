import React from 'react';

const HeroComponent = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-50 px-4">
      <div className="relative mb-8">
        {/* Logo de candado circular con estetica cyberpunk */}
        <div className="w-32 h-32 border-2 border-cyan-500 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(6,182,212,0.5)]">
          <svg className="w-16 h-16 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>
      <h1 className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-4">
        NIBALINK.COM
      </h1>
      <p className="text-xl font-mono text-slate-400 text-center max-w-2xl">
        Enlace digital: El motor tecnico detras de silca-digital.com. 
        Infraestructura robusta desde Avellaneda para el mundo.
      </p>
    </section>
  );
};

export default HeroComponent;
