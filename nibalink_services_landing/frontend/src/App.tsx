// frontend/src/App.tsx

import HeroComponent from './components/hero_component';
import ServiceComponent from './components/service_component';
import ContactComponent from './components/contact_component';

function App() {
  return (
      <main className="bg-slate-950 min-h-screen selection:bg-blue-500/30">
      <HeroComponent />
      <ServiceComponent />
      <ContactComponent />
    </main>
  );
}

export default App;
