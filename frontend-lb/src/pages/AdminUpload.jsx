import React, { useState } from "react";
import api from "../api";

const AdminUpload = () => {
  const [file, setFile] = useState(null);
  const [contextName, setContextName] = useState("");
  const [message, setMessage] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Seleccioná un archivo PDF.");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("contextName", contextName);

    try {
      const { data } = await api.post("/documents/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Documento subido y contexto creado correctamente.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error al subir");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Subir documentos (Admin)</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input type="text" placeholder="Nombre del contexto" value={contextName} onChange={(e)=>setContextName(e.target.value)} className="w-full p-2 border rounded" />
        <input type="file" accept="application/pdf" onChange={(e)=>setFile(e.target.files[0])} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Subir y crear contexto</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
      <div className="mt-6 text-sm text-gray-600">
        <strong>Nota:</strong> El backend debe procesar el PDF, extraer embeddings, y crear/actualizar el RAG (ChromaDB + LangChain).
      </div>
    </div>
  );
};

export default AdminUpload;
