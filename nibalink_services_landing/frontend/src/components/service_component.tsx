
// nibalink_services_landing/frontend/src/components/service_component.tsx

import { ShieldCheck, Terminal, Database, Cloud } from 'lucide-react';

const services = [
  {
    title: "Backend Nativo",
    desc: "Sistemas robustos en Laravel/MySQL. Rendimiento superior sin la sobrecarga de plugins.",
    icon: <Database className="w-6 h-6 text-blue-500" />
  },
  {
    title: "Sysadmin Ninja",
    desc: "Gestion de instancias en Oracle Cloud y despliegues optimizados con Docker.",
    icon: <Terminal className="w-6 h-6 text-blue-500" />
  },
  {
    title: "Seguridad Integral",
    desc: "Implementacion de protocolos de seguridad y hardening de servidores.",
    icon: <ShieldCheck className="w-6 h-6 text-blue-500" />
  },
  {
    title: "Escalabilidad ARM",
    desc: "Arquitecturas diseñadas para aprovechar la eficiencia de Ampere Computing.",
    icon: <Cloud className="w-6 h-6 text-blue-500" />
  }
];

export default function ServiceComponent() {
  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div key={i} className="group p-8 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-blue-500/50 transition-all duration-300 backdrop-blur-md">
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
