// frontend/src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout_component'; 
import BitacoraPage from './pages/Bitacora_page';
import ServicesPage from './pages/Services_page';
import HomePage from './pages/Home_page';
import MetricsPage from './pages/Metrics_page';
import LoginPage from './pages/Login_page';
import DashboardPage from './pages/Dashboard_page'; // NUEVO

const App: React.FC = () => {
  return (
    <Router>
      <Layout loading={false}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bitacora" element={<BitacoraPage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} /> {/* NUEVO */}
          <Route path="/metrics" element={<MetricsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;