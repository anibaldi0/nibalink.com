// frontend/src/pages/Metrics_page.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Cpu, Database, Activity, Globe, Link2, ExternalLink } from 'lucide-react';

interface WebSiteStatus {
  id_site: number;
  site_name: string;
  url: string;
  status: string;
  response_time: number;
}

interface SystemMetric {
  id_metrics: number;
  cpu_usage_metrics: number;
  ram_usage_metrics: number;
  timestamp_metrics: string;
}

const MetricsPage: React.FC = () => {
  const [history, setHistory] = useState<SystemMetric[]>([]);
  const [current, setCurrent] = useState<SystemMetric | null>(null);
  const [sites, setSites] = useState<WebSiteStatus[]>([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const fetchData = async () => {
    try {
      const [resHistory, resCurrent, resSites] = await Promise.all([
        axios.get(`${apiUrl}/metrics/history`),
        axios.get(`${apiUrl}/metrics/current`),
        axios.get(`${apiUrl}/services/status`) 
      ]);
      setHistory(resHistory.data.reverse());
      setCurrent(resCurrent.data);
      setSites(resSites.data);
      setLoading(false);
    } catch (error) {
      console.error("Error en telemetria:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); 
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="py-20 text-center animate-pulse font-mono uppercase tracking-widest text-blue-500">Sincronizando con Oracle Cloud...</div>;

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      
      {/* SECCION 1: WEB MONITOR - SEMAFORO DE LATENCIA */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black flex items-center gap-3">
            <Globe className="text-blue-500" size={32} />
            Ecosistema Digital
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => {
            const isOnline = site.status === 'online';
            const ms = site.response_time * 1000;
            const fullUrl = site.url.startsWith('http') ? site.url : `https://${site.url}`;

            // LOGICA NINJA DE COLORES POR LATENCIA
            let statusColor = "text-red-500";
            let statusBg = "bg-red-500/10";
            let borderColor = "border-red-500/30";

            if (isOnline) {
              if (site.response_time < 0.3) {
                statusColor = "text-green-500";
                statusBg = "bg-green-500/10";
                borderColor = "border-slate-100 dark:border-slate-800 hover:border-green-500";
              } else if (site.response_time < 0.8) {
                statusColor = "text-yellow-500";
                statusBg = "bg-yellow-500/10";
                borderColor = "border-slate-100 dark:border-slate-800 hover:border-yellow-500";
              } else {
                statusColor = "text-red-500";
                statusBg = "bg-red-500/10";
                borderColor = "border-slate-100 dark:border-slate-800 hover:border-red-500";
              }
            } else {
              borderColor = "border-red-500/50 animate-pulse bg-red-500/5";
            }

            return (
              <a 
                key={site.id_site} 
                href={fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-8 bg-white dark:bg-slate-800/40 border-2 rounded-[2rem] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between ${borderColor}`}
              >
                <div className="absolute top-6 right-8 text-slate-300 group-hover:text-blue-500 transition-colors">
                  <ExternalLink size={20} />
                </div>

                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-12 ${
                    isOnline ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-red-600 text-white'
                  }`}>
                    <Link2 size={24} />
                  </div>

                  <h3 className="font-black text-slate-900 dark:text-white truncate uppercase tracking-tight text-xl mb-1">
                    {site.site_name}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-mono truncate mb-8 opacity-60">
                    {site.url}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${isOnline ? (site.response_time < 0.3 ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : site.response_time < 0.8 ? 'bg-yellow-500 shadow-[0_0_8px_#eab308]' : 'bg-red-500') : 'bg-red-500 animate-ping'}`} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${statusColor}`}>
                      {isOnline ? (site.response_time < 0.3 ? 'Fast' : site.response_time < 0.8 ? 'Average' : 'Slow') : 'Offline'}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-slate-400 font-bold uppercase">Latencia</p>
                    <p className={`font-mono text-sm font-bold ${statusColor}`}>
                      {isOnline ? `${ms.toFixed(0)}ms` : 'TIMEOUT'}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* SECCION 2: HARDWARE */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[2.5rem]">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="text-blue-500" size={24} />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CPU Usage</span>
          </div>
          <h3 className="text-5xl font-black italic tracking-tighter text-slate-900 dark:text-white">
            {current?.cpu_usage_metrics.toFixed(1)}%
          </h3>
        </div>

        <div className="p-8 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[2.5rem]">
          <div className="flex items-center gap-3 mb-4">
            <Database className="text-purple-500" size={24} />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">RAM Usage</span>
          </div>
          <h3 className="text-5xl font-black italic tracking-tighter text-slate-900 dark:text-white">
            {current?.ram_usage_metrics.toFixed(1)}%
          </h3>
        </div>
      </section>

      {/* SECCION 3: HISTORIAL */}
      <section className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem]">
        <div className="flex items-center gap-2 mb-8">
          <Activity className="text-green-500" size={20} />
          <h3 className="text-lg font-black uppercase tracking-tight">Telemetría de Red</h3>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <defs>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.1} />
              <XAxis dataKey="timestamp_metrics" hide />
              <YAxis tick={{fontSize: 10}} unit="%" stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff' }} />
              <Area type="monotone" dataKey="cpu_usage_metrics" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCpu)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

    </div>
  );
};

export default MetricsPage;