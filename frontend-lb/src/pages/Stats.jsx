import React, { useEffect, useState } from "react";
import api from "../api";

const Stats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/stats").then(res => setStats(res.data)).catch(()=>{});
  }, []);

  if (!stats) return <div>Cargando estadísticas...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Estadísticas</h2>

      <section className="mb-6">
        <h3 className="font-semibold">Demografía</h3>
        <ul>
          <li>Usuarios totales: {stats.totalUsers}</li>
          <li>Por país: {Object.entries(stats.byCountry || {}).map(([k,v]) => `${k}: ${v}`).join(" • ")}</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold">Temas más consultados</h3>
        <ol className="list-decimal ml-6">
          {(stats.topTopics || []).map((t, i) => <li key={i}>{t.topic} — {t.count}</li>)}
        </ol>
      </section>

      <section className="mt-6">
        <h3 className="font-semibold">Reporte de uso del chatbot</h3>
        <p>Consultas totales: {stats.totalQueries}</p>
      </section>
    </div>
  );
};

export default Stats;
