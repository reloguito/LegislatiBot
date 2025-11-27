import React, { useState } from "react";
import api from "../api";

const AdminUpload = () => {
  const [file, setFile] = useState(null);
  const [contextName, setContextName] = useState("");
  const [message, setMessage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Manejador para cuando el usuario selecciona un archivo
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage(null); // Limpiar errores previos
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage({ type: "error", text: "Por favor, selecciona un archivo PDF." });
    if (!contextName.trim()) return setMessage({ type: "error", text: "El nombre del contexto es obligatorio." });

    setIsUploading(true);
    setMessage(null);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("contextName", contextName);

    try {
      // Simulación de espera si el backend es muy rápido (opcional, para UX)
      // await new Promise(r => setTimeout(r, 1000)); 
      
      const { data } = await api.post("/documents/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      setMessage({ type: "success", text: "Documento procesado e indexado en Vector Store exitosamente." });
      setFile(null);
      setContextName("");
      // Resetear el input file visualmente
      document.getElementById("file-upload").value = ""; 

    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Error al procesar el documento." });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    // CONTENEDOR PRINCIPAL
    <div className="max-w-2xl mx-auto bg-slate-900/60 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl">
      
      <div className="mb-8 border-b border-white/10 pb-4">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
             <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          </div>
          Gestión Documental
        </h2>
        <p className="text-slate-400 text-sm mt-2 ml-1">Panel de Administración para ingesta de datos (RAG)</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        
        {/* INPUT: NOMBRE DEL CONTEXTO */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-2">Nombre del Contexto / Expediente</label>
          <input 
            type="text" 
            placeholder="Ej: Sesión Ordinaria 24-11-2025" 
            value={contextName} 
            onChange={(e) => setContextName(e.target.value)} 
            className="w-full bg-slate-950 text-white placeholder-slate-600 border border-slate-700 rounded-lg p-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            disabled={isUploading}
          />
        </div>

        {/* INPUT: FILE UPLOAD (CUSTOM STYLE) */}
        <div>
           <label className="block text-slate-300 text-sm font-medium mb-2">Archivo Fuente (PDF)</label>
           
           <div className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all group ${
              file ? "border-green-500/50 bg-green-500/5" : "border-slate-600 hover:border-cyan-500 hover:bg-slate-800/50"
           }`}>
              <input 
                id="file-upload"
                type="file" 
                accept="application/pdf" 
                onChange={handleFileChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploading}
              />
              
              <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
                {file ? (
                  <>
                    <div className="text-green-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/></svg>
                    </div>
                    <div>
                      <p className="text-white font-medium text-lg">{file.name}</p>
                      <p className="text-slate-400 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">Listo para subir</span>
                  </>
                ) : (
                  <>
                     <div className="text-slate-500 group-hover:text-cyan-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="12" y2="12"/><line x1="15" y1="15" x2="12" y2="12"/></svg>
                     </div>
                     <p className="text-slate-300">Haz clic para seleccionar o arrastra el archivo aquí</p>
                     <p className="text-slate-500 text-xs">Soporta solo archivos PDF</p>
                  </>
                )}
              </div>
           </div>
        </div>

        {/* FEEDBACK MESSAGE */}
        {message && (
          <div className={`p-4 rounded-lg flex items-start gap-3 text-sm ${
             message.type === 'error' ? 'bg-red-500/10 text-red-200 border border-red-500/30' : 'bg-green-500/10 text-green-200 border border-green-500/30'
          }`}>
             <span className="text-xl mt-[-2px]">
               {message.type === 'error' ? '⚠️' : '✅'}
             </span>
             {message.text}
          </div>
        )}

        {/* BUTTON */}
        <button 
          className={`w-full py-3 px-4 rounded-lg font-bold text-white shadow-lg transition-all flex justify-center items-center gap-2 ${
            isUploading 
              ? "bg-slate-700 cursor-wait opacity-80" 
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-cyan-500/20 hover:scale-[1.01]"
          }`}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando Ingesta...
            </>
          ) : (
            "Subir Documento y Crear Vector Store"
          )}
        </button>
      </form>

      {/* TECH NOTE / FOOTER */}
      <div className="mt-8 pt-4 border-t border-slate-700/50">
        <div className="bg-black/30 p-3 rounded border border-slate-800 font-mono text-xs text-slate-500">
           <span className="text-green-500">$ system_log:</span> El backend procesará el PDF mediante <span className="text-cyan-500">LangChain</span>. 
           Se generarán embeddings y se almacenarán en <span className="text-purple-500">ChromaDB</span> para habilitar la búsqueda semántica.
        </div>
      </div>

    </div>
  );
};

export default AdminUpload;