import React, { useState, useEffect, useRef } from "react";
import api from "../api";

const ChatPage = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [contexts, setContexts] = useState([]);
  const [selectedContext, setSelectedContext] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Ref para el auto-scroll al final del chat
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);



  const submit = async (e) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;
    
    const userMsg = { role: "user", text: question };
    const loadingMsg = { role: "loading", text: "Analizando documentos legislativos..." };
    
    setMessages(m => [...m, userMsg, loadingMsg]);
    setQuestion("");
    setIsLoading(true);

    try {
      const quest = { query: question, history_id: null };
      const { data } = await api.post("/chat/query", quest);
      
      setMessages(m => m.map(msg => 
        msg.role === "loading" ? { role: "assistant", text: data.answer } : msg
      ));
      
    } catch (err) {
      setMessages(m => m.map(msg => 
        msg.role === "loading" ? { role: "assistant", text: "Error: No se pudo establecer conexión con la base de conocimiento." } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // CONTENEDOR PRINCIPAL (Glassmorphism + Altura fija para simular app)
    <div className="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl flex flex-col h-[80vh] overflow-hidden">
      
      {/* CABECERA DEL CHAT */}
      <div className="p-4 border-b border-white/10 bg-slate-900/50 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></span>
            Consulta Legislativa
          </h2>
          <p className="text-xs text-slate-400 mt-1">Base de conocimiento: Versión Taquigráfica</p>
        </div>
        {/* Decoración visual (Icono) */}
        <div className="text-cyan-400 opacity-50">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
      </div>

      {/* ÁREA DE MENSAJES (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {messages.length === 0 && (
           <div className="text-center text-slate-500 mt-20 opacity-70">
              <p className="mb-2 text-4xl">⚖️</p>
              <p>El sistema está listo.</p>
              <p className="text-sm">Haz una pregunta para comenzar el análisis.</p>
           </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            
            {/* AVATAR DE IA (Solo para mensajes del asistente) */}
            {m.role !== "user" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center mr-2 mt-1 shadow-lg shrink-0">
                    <span className="text-xs font-bold text-white">LB</span>
                </div>
            )}

            {/* BURBUJA DE MENSAJE */}
            <div 
              className={`max-w-[80%] p-3 rounded-2xl shadow-md text-sm md:text-base leading-relaxed ${
                m.role === "user" 
                  ? "bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-tr-none border border-cyan-500/30" 
                  : m.role === "loading"
                  ? "bg-slate-800/50 text-slate-300 border border-slate-700 animate-pulse rounded-tl-none"
                  : "bg-slate-800/80 text-slate-200 border border-slate-700/50 rounded-tl-none"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* ÁREA DE INPUT (Footer) */}
      <div className="p-4 bg-slate-900/80 border-t border-white/10">
        <form onSubmit={submit} className="relative flex items-center gap-2">
          
          <input 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)} 
            placeholder="Escribe tu consulta sobre los documentos..." 
            className="w-full bg-slate-950/50 text-white placeholder-slate-500 border border-slate-700 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
            disabled={isLoading}
          />
          
          <button 
            type="submit"
            className={`absolute right-2 p-2 rounded-lg transition-all ${
                isLoading || !question.trim() 
                ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                : "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:scale-105"
            }`}
            disabled={isLoading || !question.trim()}
          >
            {isLoading ? (
                // Spinner pequeño
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                // Icono Enviar
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            )}
          </button>
        </form>
        <p className="text-center text-[10px] text-slate-600 mt-2">
           LegisBot puede cometer errores. Verifica la información en la fuente oficial.
        </p>
      </div>
    </div>
  );
};

export default ChatPage;