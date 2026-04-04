
// frontend/src/components/layout/Footer_component.tsx

import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="max-w-4xl mx-auto mt-20 pb-10 border-t border-slate-200 dark:border-slate-800 pt-8 text-center">
      <p className="text-slate-400 dark:text-slate-50 text-sm">
        &copy; {year} <span className="text-blue-600 dark:text-blue-400 font-semibold">Anibal</span> - NIBALINK.COM
      </p>
      <div className="mt-4 flex justify-center gap-4">
        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">Ubuntu Server</span>
        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">Oracle Cloud Instance</span>
      </div>
    </footer>
  );
};

export default Footer;