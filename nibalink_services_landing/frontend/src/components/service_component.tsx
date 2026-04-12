
# frontend/src/components/service_component.tsx

import React from 'react';

const ServiceComponent = () => {
  const services = [
    { title: "Sistemas de Turnos", desc: "Arquitectura escalable para profesionales." },
    { title: "APIs de Catalogos", desc: "Gestion de datos pura, sin la sobrecarga de plugins." },
    { title: "Seguridad & Sysadmin", desc: "Hardening de servidores y despliegue Dockerizado." }
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-cyan-500 mb-12 text-center">Por que Backend Nativo?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="p-6 border border-slate-800 rounded-lg bg-slate-950 hover:border-cyan-500 transition-colors">
              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 p-6 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <p className="text-sm font-mono text-blue-300">
            [SYSADMIN_NOTE]: Laravel/MySQL ofrece una integridad de datos y control de concurrencia que los plugins de CMS jamas podran igualar. Menos overhead, mas seguridad.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceComponent;
