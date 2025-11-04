import React, { useEffect, useState } from "react";
import api from "../api";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.get("/chat/history").then(res => setHistory(res.data.history || [])).catch(()=>{});
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Historial de consultas</h2>
      {history.length === 0 && <p>No tenés consultas todavía.</p>}
      <ul>
        {history.map(h => (
          <li key={h.id} className="mb-4 p-3 border rounded">
            <div className="text-sm text-gray-500">Pregunta: {new Date(h.createdAt).toLocaleString()}</div>
            <div className="mt-2"><strong>Q:</strong> {h.question}</div>
            <div className="mt-2"><strong>A:</strong> {h.answer}</div>
            {h.sourceDocs && <div className="mt-2 text-xs text-gray-600">Fuentes: {h.sourceDocs.map(s=>s.name).join(", ")}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
