// frontend/src/pages/Metrics_page.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Cpu, Database, Activity, Clock, RefreshCw, Globe, AlertTriangle } from 'lucide-react';

// Interfaces actualizadas para coincidir con tu nuevo Backend Dinamico
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

  const fetchData = async () => {
    try {
      const [resHistory, resCurrent, resSites] = await Promise.all([
        axios.get('http://localhost:8000/metrics/history'),
        axios.get('http://localhost:8000/metrics/current'),
        axios.get('http://localhost:8000/services/status') // Endpoint dinamico
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
      
      {/* SECCION 1: WEB MONITOR (DINAMICO) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black flex items-center gap-2">
            <Globe className="text-blue-500" size={24} />
            Web Assets & Uptime
          </h2>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
            DB_SOURCE: monitored_sites
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sites.length === 0 && (
            <div className="col-span-full p-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-center">
              <AlertTriangle className="mx-auto mb-2 text-yellow-500" />
              <p className="text-slate-500 text-sm">No hay sitios registrados en la base de datos.</p>
            </div>
          )}
          

          {sites.map((site) => {
            const isOnline = site.status === 'online';
            const ms = site.response_time * 1000;
            
            // 1. Logica de colores de texto para latencia
            let latencyTextColor = "text-slate-400";
            if (!isOnline) latencyTextColor = "text-red-600 font-bold";
            else if (site.response_time < 0.3) latencyTextColor = "text-green-500";
            else if (site.response_time < 0.8) latencyTextColor = "text-yellow-500 font-medium";
            else latencyTextColor = "text-red-500 font-bold";

            // 2. Logica de colores de BORDE (Para que la card online resalte como la offline)
            let borderColor = "border-slate-200 dark:border-slate-700"; // Default
            if (!isOnline) {
              borderColor = "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]";
            } else if (site.response_time < 0.3) {
              borderColor = "border-green-500/30 dark:border-green-500/20"; // Borde sutil verde si es veloz
            } else if (site.response_time > 0.8) {
              borderColor = "border-red-400/40 animate-pulse"; // Pulsa en rojo si está muy lento aunque esté online
            }

            return (
              <div 
                key={site.id_site} 
                className={`group p-6 bg-white dark:bg-slate-800/40 border rounded-[2rem] transition-all duration-500 hover:shadow-xl hover:scale-[1.02] shadow-sm ${borderColor}`}
              >
                <div className="flex justify-between items-start mb-4">
                  {/* Badge de Estado con Glow */}
                  <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter flex items-center gap-1.5 ${
                    isOnline 
                      ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                      : 'bg-red-500/20 text-red-500 border border-red-500/30 animate-pulse'
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${isOnline ? 'bg-green-500 shadow-[0_0_5px_#22c55e]' : 'bg-red-500 shadow-[0_0_5px_#ef4444]'}`} />
                    {isOnline ? 'system_online' : 'system_offline'}
                  </div>
                  {/* <div className="text-[10px] font-mono text-slate-500 opacity-50">ID_{site.id_site}</div> */}
                </div>
                
                <h3 className="font-black text-slate-900 dark:text-white truncate uppercase tracking-tight text-lg">
                  {site.site_name}
                </h3>
                <p className="text-[11px] text-slate-500 font-mono truncate mb-6 opacity-70 group-hover:opacity-100 transition-opacity">
                  {site.url}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Telemetry</span>
                    <span className="text-[10px] text-slate-500 font-bold">Latency_ms</span>
                  </div>
                  <span className={`font-mono text-sm ${latencyTextColor}`}>
                    {isOnline ? `${ms.toFixed(0)}ms` : 'CRITICAL_TIMEOUT'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECCION 2: HARDWARE (CPU/RAM) */}
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="text-2xl font-black flex items-center gap-2 text-slate-900 dark:text-white">
            <Cpu className="text-purple-500" size={24} />
            Host Node Telemetry
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card CPU */}
          <div className="p-8 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[2rem] shadow-xl hover:border-blue-500/30 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-blue-500/10 rounded-2xl">
                <Cpu className="text-blue-500" size={28} />
              </div>
              <RefreshCw className="text-slate-400 animate-spin-slow" size={16} />
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">CPU Load</p>
            <h3 className="text-5xl font-black tracking-tighter italic">
              {current?.cpu_usage_metrics.toFixed(1)}%
            </h3>
          </div>

          {/* Card RAM */}
          <div className="p-8 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[2rem] shadow-xl hover:border-purple-500/30 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-purple-500/10 rounded-2xl">
                <Database className="text-purple-500" size={28} />
              </div>
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">RAM Usage</p>
            <h3 className="text-5xl font-black tracking-tighter italic">
              {current?.ram_usage_metrics.toFixed(1)}%
            </h3>
          </div>
        </div>
      </section>

      {/* SECCION 3: HISTORIAL (AREA CHART) */}
      <section className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="text-green-500" size={20} />
          <h3 className="text-lg font-bold">Telemetry History</h3>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="timestamp_metrics" hide />
              <YAxis tick={{fontSize: 10}} unit="%" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="cpu_usage_metrics" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
              <Area type="monotone" dataKey="ram_usage_metrics" stroke="#a855f7" fill="#a855f7" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

    </div>
  );
};

export default MetricsPage;