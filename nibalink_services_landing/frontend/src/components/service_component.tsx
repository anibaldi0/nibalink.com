// frontend/src/components/service_component.tsx
import { useState } from 'react';
import { UserCheck, CalendarClock, ShieldCheck, X, ChevronLeft, ChevronRight } from 'lucide-react';

// IMPORTA LAS IMAGENES
import registerImgDark from '../assets/img/registro_dark.png';
import turnosImgDark from '../assets/img/turnos_dark.png';
import databaseImgDark from '../assets/img/database_dark.png';
import databaseImgLight from '../assets/img/database_light.png';
import registerImgLight from '../assets/img/registro_light.png';
import turnosImgLight from '../assets/img/turnos_light.png';

const services = [
  {
    id: 'registro',
    title: "Acceso Seguro",
    desc: "Sistemas de registro y entrada para perfiles privados y seguros.",
    icon: <UserCheck className="w-6 h-6 text-blue-500" />,
    image: registerImgDark,
    gallery: [registerImgDark, registerImgLight] // Aquí podrias agregar mas imagenes luego
  },
  {
    id: 'turnos',
    title: "Gestor de Turnos",
    desc: "Reservas online y gestion de agenda sin esfuerzo.",
    icon: <CalendarClock className="w-6 h-6 text-blue-500" />,
    image: turnosImgDark,
    gallery: [turnosImgDark, turnosImgLight]
  },
  {
    id: 'database',
    title: "Base de Datos Pro",
    desc: "Tu informacion guardada de forma profesional y siempre disponible.",
    icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
    image: databaseImgDark,
    gallery: [databaseImgDark, databaseImgLight]
  }
];

export default function ServiceComponent() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  // ESTADO PARA LA IMAGEN ACTUAL DEL CARRUSEL
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  // Funciones de navegacion
  const nextImage = () => {
    if (!selectedService) return;
    setCurrentImgIdx((prev) => (prev + 1) % selectedService.gallery.length);
  };

  const prevImage = () => {
    if (!selectedService) return;
    setCurrentImgIdx((prev) => (prev - 1 + selectedService.gallery.length) % selectedService.gallery.length);
  };

  const closeModal = () => {
    setSelectedService(null);
    setCurrentImgIdx(0); // Reset al cerrar
  };

  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* ... (Header y Grid de servicios se mantienen igual) ... */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedService(s)}
              className="group p-6 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-blue-500/50 transition-all duration-300 backdrop-blur-md shadow-xl cursor-pointer"
            >
              <div className="mb-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                <img src={s.image} alt={s.title} className="w-full h-40 object-cover opacity-70 group-hover:opacity-100 transition-all" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL CON CARRUSEL */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative bg-slate-900 border border-slate-800 rounded-[2rem] max-w-5xl w-full overflow-hidden shadow-2xl">
            
            {/* Boton Cerrar */}
            <button onClick={closeModal} className="absolute top-6 right-6 p-2 bg-slate-800/50 hover:bg-red-500/20 text-white rounded-full transition-all z-30 border border-slate-700">
              <X size={24} />
            </button>

            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500/10 rounded-xl">{selectedService.icon}</div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{selectedService.title}</h2>
              </div>

              {/* CONTENEDOR DEL CARRUSEL */}
              <div className="relative group/carousel rounded-2xl border border-slate-800 overflow-hidden bg-slate-950 aspect-video flex items-center justify-center">
                
                {/* Imagen Actual */}
                <img 
                  src={selectedService.gallery[currentImgIdx]} 
                  alt="Preview" 
                  className="w-full h-full object-contain animate-in fade-in zoom-in-95 duration-500"
                />

                {/* Flechas de Navegacion */}
                {selectedService.gallery.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 p-3 bg-slate-900/80 hover:bg-blue-600 text-white rounded-full transition-all border border-slate-700 opacity-0 group-hover/carousel:opacity-100 -translate-x-4 group-hover/carousel:translate-x-0"
                    >
                      <ChevronLeft size={28} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 p-3 bg-slate-900/80 hover:bg-blue-600 text-white rounded-full transition-all border border-slate-700 opacity-0 group-hover/carousel:opacity-100 translate-x-4 group-hover/carousel:translate-x-0"
                    >
                      <ChevronRight size={28} />
                    </button>
                  </>
                )}

                {/* Indicadores (Puntitos) */}
                <div className="absolute bottom-6 flex gap-2">
                  {selectedService.gallery.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`h-1.5 transition-all duration-300 rounded-full ${idx === currentImgIdx ? 'w-8 bg-blue-500' : 'w-2 bg-slate-600'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-slate-400 italic">Mostrando captura {currentImgIdx + 1} de {selectedService.gallery.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}