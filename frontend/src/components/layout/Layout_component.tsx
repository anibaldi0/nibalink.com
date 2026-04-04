
// frontend/src/components/layout/Layout_component.tsx

import React from 'react';
import Header from './Header_component';
import Footer from './Footer_component';

interface LayoutProps {
  children: React.ReactNode;
  loading: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, loading }) => {
  return (
    /* 
       IMPORTANTE: Quitamos bg-slate-900 fijo. 
       Usamos bg-white para Light y dark:bg-slate-900 para Dark.
    */
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <Header loading={loading} />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;