// frontend/src/pages/Dashboard_page.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Server, Trash2, Loader2, Plus, LayoutDashboard } from 'lucide-react';
import CreateSiteModal from '../components/modals/CreateSite_modal';
import DeleteSiteModal from '../components/modals/DeleteSite_modal';

interface MonitoredSite {
  id_site: number;
  site_name: string;
  url: string;
  status?: string;
}

const DashboardPage: React.FC = () => {
  const [sites, setSites] = useState<MonitoredSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [siteToManage, setSiteToManage] = useState<MonitoredSite | null>(null);

  const isAdmin = !!localStorage.getItem('nibalink_token');
  const token = localStorage.getItem('nibalink_token');

  const fetchSites = async () => {
    try {
      const res = await axios.get('http://localhost:8000/services/status');
      setSites(res.data);
    } catch (err) { 
      console.error("Error sync status:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { 
    fetchSites();
    const interval = setInterval(fetchSites, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCreate = async (data: any) => {
    try {
      await axios.post('http://localhost:8000/services/', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowCreate(false);
      fetchSites();
    } catch (err) { alert("Error al crear activo."); }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/services/${siteToManage?.id_site}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowDelete(false);
      fetchSites();
    } catch (err) { alert("Error al eliminar."); }
  };

  if (loading) return <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-blue-500" size={40} /></div>;

  return (
    <div className="py-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight uppercase flex items-center gap-3">
            <LayoutDashboard className="text-blue-500" size={36} />
            Infraestructura
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium italic">Panel de control de activos y monitoreo real-time.</p>
        </div>
        
        {isAdmin && (
          <button 
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-95"
          >
            <Plus size={20} /> NUEVO ACTIVO
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sites.map((site) => {
          const isOnline = site.status === 'online';
          return (
            <div key={site.id_site} className={`group relative p-8 bg-white dark:bg-slate-800/40 border rounded-[2rem] transition-all duration-500 hover:shadow-2xl ${isOnline ? 'border-slate-200 dark:border-slate-700 hover:border-blue-500/50' : 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]'}`}>
              {isAdmin && (
                <button onClick={() => { setSiteToManage(site); setShowDelete(true); }} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-red-500 transition-colors">
                  <Trash2 size={18} />
                </button>
              )}
              <div className={`w-14 h-14 mb-6 rounded-2xl flex items-center justify-center border transition-transform group-hover:scale-110 ${isOnline ? 'bg-blue-500/10 border-blue-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                <Server className={isOnline ? 'text-blue-600 dark:text-blue-400' : 'text-red-500'} size={28} />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 truncate uppercase">{site.site_name}</h3>
              <p className="text-slate-500 text-[10px] font-mono truncate mb-6 opacity-70">{site.url}</p>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${isOnline ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' : 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30 animate-pulse'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${isOnline ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'}`} />
                <span className="text-[9px] font-black uppercase tracking-wider">{isOnline ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          );
        })}
      </div>

      <CreateSiteModal isOpen={showCreate} onClose={() => setShowCreate(false)} onConfirm={handleCreate} />
      <DeleteSiteModal isOpen={showDelete} onClose={() => setShowDelete(false)} onConfirm={handleDelete} siteName={siteToManage?.site_name || ''} />
    </div>
  );
};

export default DashboardPage;
