import React, { useEffect, useState } from "react";
import api from "../api";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/chat/history")
      .then(res => {
        setHistory(res.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    // CONTENEDOR PRINCIPAL: Glassmorphism sobre el fondo del Congreso
    <div className="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl min-h-[500px]">
      
      <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
        <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
            </span>
            Historial de Consultas
        </h2>
        <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700">
            {history.length} Sesiones
        </span>
      </div>

      {/* ESTADO DE CARGA O VACÍO */}
      {!loading && history.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 opacity-70">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <p className="text-lg font-medium">No hay consultas registradas.</p>
          <p className="text-sm">Tus interacciones con LegisBot aparecerán aquí.</p>
        </div>
      )}

      {/* LISTA DE HISTORIAL */}
      <ul className="space-y-8">
        {history.map((chat) => (
          <li key={chat.id} className="relative pl-6 border-l-2 border-slate-700 hover:border-cyan-500 transition-colors duration-300">
            
            {/* PUNTO DE TIEMPO (Timeline Dot) */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>

            {/* ENCABEZADO DE LA SESIÓN (FECHA) */}
            <div className="mb-4 flex items-center gap-2">
               <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/30 px-2 py-1 rounded">
                 Sesión Registrada
               </span>
               <span className="text-sm text-slate-400 font-mono">
                 {new Date(chat.created_at).toLocaleString()}
               </span>
            </div>

            {/* CONTENEDOR DE MENSAJES DE LA SESIÓN */}
            <div className="space-y-4 bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 md:p-6">
              {chat.messages.map((msg, idx) => (
                <div key={msg.id || idx} className="group">
                  
                  {msg.sender === "user" ? (
                    // MENSAJE USUARIO
                    <div className="flex gap-3 items-start justify-end ml-auto max-w-[90%]">
                      <div className="bg-gradient-to-br from-slate-700 to-slate-800 text-slate-200 p-3 rounded-2xl rounded-tr-none border border-slate-600 shadow-sm">
                        <div className="text-xs text-cyan-400 font-bold mb-1 opacity-75">TÚ</div>
                        {msg.content}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0 border border-slate-600">
                        <span className="text-xs">👤</span>
                      </div>
                    </div>
                  ) : (
                    // MENSAJE BOT
                    <div className="flex gap-3 items-start max-w-[95%]">
                       <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-600 flex items-center justify-center shrink-0 shadow-lg">
                        <span className="text-xs font-bold text-white">LB</span>
                      </div>
                      <div className="flex-1">
                        <div className="bg-slate-900/50 text-slate-300 p-4 rounded-2xl rounded-tl-none border border-white/5">
                           {msg.content}
                           
                           {/* FUENTES / CITAS */}
                           {msg.sources && msg.sources.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-white/5">
                              <div className="flex items-center gap-2 mb-2 text-xs text-purple-400 uppercase font-bold tracking-wider">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                                Fuentes Referenciadas
                              </div>
                              <div className="grid gap-2">
                                {msg.sources.map((s, i) => (
                                  <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-black/20 p-2 rounded hover:bg-black/40 transition-colors">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                    <span className="truncate flex-1" title={s.source}>{s.source}</span>
                                    <span className="whitespace-nowrap bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">Pág. {s.page}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;