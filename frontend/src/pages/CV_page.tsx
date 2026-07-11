// frontend/src/pages/CV_page.tsx
import React, { useState, useEffect } from 'react';
import { 
  FileText, Download, ExternalLink, Eye, 
  User, MapPin, Mail, Globe, Linkedin, Github,
  DownloadCloud, Award, Briefcase, GraduationCap
} from 'lucide-react';

const CVPage: React.FC = () => {
  const [downloadCount, setDownloadCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('cv_downloads');
    if (stored) setDownloadCount(parseInt(stored));
  }, []);

  const handleDownload = () => {
    const newCount = downloadCount + 1;
    setDownloadCount(newCount);
    localStorage.setItem('cv_downloads', String(newCount));
  };

  const profile = {
    name: "Aníbal Caeiro",
    title: "Backend & Infrastructure Engineer | AI-Assisted Workflows Specialist",
    location: "Avellaneda, Buenos Aires, Argentina",
    email: "inbox.nibal.ink@gmail.com",
    web: "nibalink.com",
    linkedin: "linkedin.com/in/anibal-caeiro-dev",
    github: "github.com/anibaldi0"
  };

  return (
    <div className="py-10 animate-in fade-in duration-500 max-w-6xl mx-auto">
      
      {/* Header - usa clases dark: de Tailwind */}
      <div className="rounded-[2.5rem] p-6 md:p-8 mb-8 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-32 -mt-32 bg-blue-400/20 dark:bg-blue-500/10 transition-colors duration-300"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl -ml-32 -mb-32 bg-purple-400/20 dark:bg-purple-500/10 transition-colors duration-300"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center bg-blue-500/10 dark:bg-blue-500/20 border-blue-400/50 dark:border-blue-400/30 transition-colors duration-300">
                <User size={24} className="text-blue-600 dark:text-blue-400 transition-colors duration-300" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 transition-colors duration-300">
                  Curriculum Vitae
                </span>
                <h1 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
                  {profile.name}
                </h1>
              </div>
            </div>
            <p className="text-sm md:text-lg font-bold text-blue-700 dark:text-blue-300 transition-colors duration-300">
              {profile.title}
            </p>
            <div className="flex flex-wrap gap-3 mt-3 text-xs">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-white transition-colors duration-300">
                <MapPin size={14} className="text-blue-600 dark:text-blue-400" /> {profile.location}
              </span>
              <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-white hover:bg-slate-300/80 dark:hover:bg-white/20 transition-all duration-300">
                <Mail size={14} className="text-blue-600 dark:text-blue-400" /> {profile.email}
              </a>
              <a href={`https://${profile.web}`} target="_blank" rel="noopener" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-white hover:bg-slate-300/80 dark:hover:bg-white/20 transition-all duration-300">
                <Globe size={14} className="text-blue-600 dark:text-blue-400" /> {profile.web}
              </a>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2 w-full md:w-auto">
            <a 
              href="/CV_Anibal_Caeiro_English.pdf" 
              download="Anibal_Caeiro_CV_2026.pdf"
              onClick={handleDownload}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-blue-500/30 active:scale-95 w-full md:w-auto justify-center text-sm"
            >
              <DownloadCloud size={20} /> Descargar PDF
            </a>
            <div className="flex gap-4 text-xs text-slate-500 dark:text-white/60 transition-colors duration-300">
              <span className="flex items-center gap-1"><Eye size={12} /> {downloadCount} descargas</span>
              <span className="flex items-center gap-1"><FileText size={12} /> PDF • 2 páginas</span>
            </div>
          </div>
        </div>

        {/* Redes sociales */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-300/50 dark:border-white/10 transition-colors duration-300">
          <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener" className="flex items-center gap-2 text-xs text-slate-600 dark:text-white/70 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">
            <Linkedin size={16} /> LinkedIn
          </a>
          <a href={`https://${profile.github}`} target="_blank" rel="noopener" className="flex items-center gap-2 text-xs text-slate-600 dark:text-white/70 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">
            <Github size={16} /> GitHub
          </a>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-3 mb-6">
        <span className="flex items-center gap-2 px-4 py-2 border rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 transition-colors duration-300">
          <Award size={14} /> UTN Avellaneda - Final stage
        </span>
        <span className="flex items-center gap-2 px-4 py-2 border rounded-full text-xs font-bold bg-green-100 dark:bg-green-500/10 border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 transition-colors duration-300">
          <Briefcase size={14} /> 3+ años de formación
        </span>
        <span className="flex items-center gap-2 px-4 py-2 border rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20 text-purple-700 dark:text-purple-400 transition-colors duration-300">
          <GraduationCap size={14} /> Especialista en Infraestructura
        </span>
      </div>

      {/* Visor PDF */}
      <div className="border rounded-[2.5rem] p-3 md:p-4 shadow-xl transition-colors duration-300 bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center mb-3 px-2 text-slate-500 dark:text-slate-400 transition-colors duration-300">
          <span className="text-xs font-bold flex items-center gap-2">
            <FileText size={16} /> Vista previa
          </span>
          <a 
            href="/CV_Anibal_Caeiro_English.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 text-xs font-bold hover:underline flex items-center gap-1"
          >
            <ExternalLink size={14} /> Abrir en nueva pestaña
          </a>
        </div>
        <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border transition-colors duration-300 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800" style={{ minHeight: '70vh', aspectRatio: '1/1.4' }}>
          <iframe 
            src="/CV_Anibal_Caeiro_English.pdf#toolbar=0" 
            className="w-full h-full"
            title="CV Aníbal Caeiro - Nibalink"
          />
        </div>
      </div>

      {/* CTA final */}
      <div className="mt-8 text-center p-4 md:p-6 rounded-[2.5rem] border transition-colors duration-300 bg-blue-50 dark:bg-blue-500/5 border-blue-200 dark:border-blue-500/20">
        <p className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-400 transition-colors duration-300">
          ¿Interesado en mi perfil?{' '}
          <a href="https://wa.me/5491127900298" className="text-green-600 dark:text-green-400 font-bold hover:underline">
            Hablemos
          </a>
          {' '}o conéctate en{' '}
          <a href={`https://${profile.linkedin}`} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            LinkedIn
          </a>
        </p>
      </div>
    </div>
  );
};

export default CVPage;