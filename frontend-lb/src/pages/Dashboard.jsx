import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    // 1. Contenedor Principal con efecto Glass (Vidrio)
    <div className="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
      
      {/* Efecto decorativo de luz superior */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

      {/* ENCABEZADO */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Bienvenido, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">{user?.name || user?.email}</span>
        </h1>
        <p className="mt-2 text-slate-300 text-lg">
          Panel de Control del Sistema Legislativo Inteligente.
        </p>
      </div>

      {/* GRID DE PANELES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* TARJETA 1: Acceso Rápido (Ahora con botones reales) */}
        <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl hover:bg-slate-800/60 transition-all group">
          <div className="flex items-center gap-3 mb-4">
            {/* Icono Rayo (SVG Inline) */}
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <h3 className="font-semibold text-xl text-white">Acceso Rápido</h3>
          </div>
          
          <div className="space-y-3">
            <Link to="/chat" className="block w-full p-3 rounded-lg bg-slate-700/50 hover:bg-gradient-to-r hover:from-cyan-600/80 hover:to-cyan-500/80 text-slate-200 hover:text-white transition-all flex items-center justify-between group-hover:translate-x-1 duration-300">
              <span>Iniciar consulta en Chat</span>
              <span className="opacity-50 group-hover:opacity-100">→</span>
            </Link>
            
            <Link to="/history" className="block w-full p-3 rounded-lg bg-slate-700/50 hover:bg-slate-600 text-slate-200 transition-all flex items-center justify-between group-hover:translate-x-1 duration-300 delay-75">
              <span>Ver historial de consultas</span>
              <span className="opacity-50 group-hover:opacity-100">→</span>
            </Link>
          </div>
        </div>

        {/* TARJETA 2: Privacidad y Estado */}
        <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl hover:bg-slate-800/60 transition-all">
          <div className="flex items-center gap-3 mb-4">
             {/* Icono Escudo (SVG Inline) */}
             <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 className="font-semibold text-xl text-white">Seguridad y Privacidad</h3>
          </div>
          
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/30">
            <p className="text-sm text-slate-400 leading-relaxed">
              <span className="text-green-400 font-bold">● Conexión Segura: </span>
              Tus interacciones con LegisBot están cifradas de extremo a extremo. Los documentos consultados se procesan en un entorno aislado para garantizar la confidencialidad legislativa.
            </p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center text-sm">
            <span className="text-slate-500">Estado del sistema:</span>
            <span className="text-green-400 flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Operativo
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;