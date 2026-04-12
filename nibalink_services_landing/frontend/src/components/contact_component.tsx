import React from 'react';

const ContactComponent = () => {
  const message = encodeURIComponent("Hola Silca Digital, vengo desde nibalink.com para solicitar consultoria tecnica.");
  
  return (
    <section className="py-20 text-center bg-slate-950">
      <h2 className="text-2xl text-slate-300 mb-8 font-light italic">Listo para el siguiente nivel de robustez?</h2>
      <a 
        href={`https://wa.me/TU_NUMERO_AQUI?text=${message}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(8,145,178,0.4)]"
      >
        SOLICITAR ENLACE DIGITAL
      </a>
    </section>
  );
};

export default ContactComponent;
