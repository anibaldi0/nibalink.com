
// nibalink_services_landing/frontend/src/components/contacto_component.tsx

export default function ContactComponent() {
  const message = encodeURIComponent("Hola, solicito consultoria para servicios de backend y gestion de datos.");
  
  return (
    <section className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-8">¿Estas listo para asegurar tu sistema?</h2>
        <a 
          href={`https://wa.me/5491127900298?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)]"
        >
          SOLICITAR ENLACE DIGITAL
        </a>

	{/* CONTENEDOR FLEX EN COLUMNA PARA SEPARAR LAS LINEAS */}
        <div className="mt-10 flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
          <span className="text-cyan-400 font-black drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
            nibalink.com
          </span>
          <span className="text-slate-500">
            Buenos Aires - Argentina
          </span>
        </div>

      </div>
    </section>
  );
}
