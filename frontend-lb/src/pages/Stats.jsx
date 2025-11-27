import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2'; 
import {
  Chart as ChartJS,
  ArcElement, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import api from "../api";

// 2. Registramos los elementos
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// --- CONFIGURACIÓN GLOBAL DE CHART.JS PARA MODO OSCURO ---
// Esto es vital para que los textos no se vean negros sobre fondo oscuro
ChartJS.defaults.color = '#94a3b8'; // Texto Slate-400
ChartJS.defaults.borderColor = 'rgba(255, 255, 255, 0.1)'; // Líneas de grilla sutiles

const AdminCharts = () => {
  const [pieChartData, setPieChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [queriesChartData, setQueriesChartData] = useState(null); 
  
  const [pieLoading, setPieLoading] = useState(true);
  const [barLoading, setBarLoading] = useState(true);
  const [queriesLoading, setQueriesLoading] = useState(true); 

  // PALETA DE COLORES "LEGISBOT"
  const neonPalette = [
    'rgba(34, 211, 238, 0.7)',  // Cyan
    'rgba(168, 85, 247, 0.7)',  // Purple
    'rgba(59, 130, 246, 0.7)',  // Blue
    'rgba(244, 63, 94, 0.7)',   // Pink
    'rgba(34, 197, 94, 0.7)',   // Green
    'rgba(251, 191, 36, 0.7)',  // Amber
  ];
  const neonBorders = [
    '#22d3ee', '#a855f7', '#3b82f6', '#f43f5e', '#22c55e', '#fbbf24'
  ];

  // 4. useEffect: Demographics (Pie)
  useEffect(() => {
    api.get("/admin/stats/demographics")
      .then((res) => {
        const apiData = res.data || [];
        const labels = apiData.map(item => item.group);
        const counts = apiData.map(item => item.count);

        setPieChartData({
          labels: labels,
          datasets: [{
            label: '# de Usuarios',
            data: counts,
            backgroundColor: neonPalette,
            borderColor: neonBorders,
            borderWidth: 1,
          }],
        });
        setPieLoading(false);
      })
      .catch((err) => {
        console.error("Error demografía:", err);
        setPieLoading(false);
      });
  }, []);

  // 5. useEffect: Usage (Bar)
  useEffect(() => {
    api.get("/admin/stats/usage")
      .then((res) => {
        const apiData = res.data || [];
        const labels = apiData.map(item => {
          try { return new Date(item.date).toLocaleDateString(); } 
          catch (e) { return item.date; }
        });
        const counts = apiData.map(item => item.count);

        setBarChartData({
          labels: labels,
          datasets: [{
            label: 'Uso por Día',
            data: counts,
            backgroundColor: 'rgba(34, 211, 238, 0.6)', // Cyan
            borderColor: '#22d3ee',
            borderWidth: 1,
          }],
        });
        setBarLoading(false);
      })
      .catch((err) => {
        console.error("Error uso:", err);
        setBarLoading(false);
      });
  }, []);

  // 6. useEffect: Top Queries (Horizontal Bar)
  useEffect(() => {
    api.get("/admin/stats/top-queries")
      .then((res) => {
        const apiData = res.data || [];
        const labels = apiData.map(item => item.group);
        const counts = apiData.map(item => item.count);

        setQueriesChartData({
          labels: labels,
          datasets: [{
            label: 'Consultas',
            data: counts,
            backgroundColor: 'rgba(168, 85, 247, 0.6)', // Purple
            borderColor: '#a855f7',
            borderWidth: 1,
          }],
        });
        setQueriesLoading(false);
      })
      .catch((err) => {
        console.error("Error queries:", err);
        setQueriesLoading(false);
      });
  }, []);


  // --- OPCIONES DE ESTILO COMUNES ---
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false, // Importante para que se adapte al contenedor CSS
    plugins: {
      legend: {
        labels: { color: '#cbd5e1', font: { family: 'sans-serif' } } // Texto blanco
      },
      title: {
        display: true,
        color: '#fff',
        font: { size: 16, weight: 'bold' },
        padding: { bottom: 20 }
      }
    }
  };

  const axisOptions = {
      scales: {
          x: {
              ticks: { color: '#94a3b8' },
              grid: { color: 'rgba(255,255,255,0.05)' }
          },
          y: {
              beginAtZero: true,
              ticks: { color: '#94a3b8' },
              grid: { color: 'rgba(255,255,255,0.05)' }
          }
      }
  };

  // 7. Opciones Específicas fusionadas con las comunes
  const pieOptions = {
    ...commonOptions,
    plugins: { ...commonOptions.plugins, title: { ...commonOptions.plugins.title, text: 'Distribución Demográfica' } },
  };

  const barOptions = {
    ...commonOptions,
    ...axisOptions,
    plugins: { ...commonOptions.plugins, title: { ...commonOptions.plugins.title, text: 'Actividad Diaria' } },
  };

  const queriesOptions = {
    indexAxis: 'y', // Horizontal
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { ...commonOptions.plugins.title, text: 'Top Consultas Frecuentes' },
    },
    scales: {
        x: { ...axisOptions.scales.x, beginAtZero: true },
        y: { ...axisOptions.scales.y }
    }
  };

  // Componente de Carga
  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center h-64 text-slate-500 animate-pulse">
        <svg className="w-10 h-10 mb-2 animate-spin text-cyan-500" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <span className="text-sm">Analizando datos...</span>
    </div>
  );

  // 9. RENDERIZADO
  return (
    <div className="w-full max-w-7xl mx-auto pb-12">
      
      {/* HEADER */}
      <div className="mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
         <div className="p-2 bg-slate-800 rounded-lg text-cyan-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
         </div>
         <h2 className="text-3xl font-bold text-white">Dashboard de Métricas</h2>
      </div>

      {/* GRID SUPERIOR (PIE + BAR) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

        {/* --- DEMOGRAFIA --- */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl min-h-[400px] flex flex-col">
          {pieLoading ? <LoadingSpinner /> : 
           !pieChartData ? <div className="m-auto text-slate-500">Sin datos disponibles.</div> : 
           <div className="flex-1 relative">
             <Pie data={pieChartData} options={pieOptions} />
           </div>
          }
        </div>

        {/* --- USO DIARIO --- */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl min-h-[400px] flex flex-col">
          {barLoading ? <LoadingSpinner /> : 
           !barChartData ? <div className="m-auto text-slate-500">Sin datos disponibles.</div> : 
           <div className="flex-1 relative">
             <Bar data={barChartData} options={barOptions} />
           </div>
          }
        </div>
      
      </div>

      {/* --- TOP QUERIES (ANCHO COMPLETO) --- */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl min-h-[400px] flex flex-col">
        {queriesLoading ? <LoadingSpinner /> : 
         !queriesChartData || queriesChartData.labels.length === 0 ? <div className="m-auto text-slate-500">No hay consultas registradas.</div> : 
         <div className="flex-1 relative">
            <Bar data={queriesChartData} options={queriesOptions} />
         </div>
        }
      </div>

    </div>
  );
};

export default AdminCharts;