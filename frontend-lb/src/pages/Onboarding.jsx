import React, { useState } from "react";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Listas constantes de datos
const PROVINCIAS_ARGENTINA = [
  "Buenos Aires", "CABA", "Catamarca", "Chaco", "Chubut", "Córdoba", 
  "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", 
  "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", 
  "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", 
  "Tierra del Fuego", "Tucumán"
];

const PROFESIONES_COMUNES = [
  "Desarrollador/a", "Diseñador/a", "Estudiante", "Docente", 
  "Médico/a", "Abogado/a", "Contador/a", "Ingeniero/a", "Comerciante", 
  "Administrativo/a", "Otro"
];

const Onboarding = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({    
    pais: "Argentina", 
    provincia: "",
    localidad: "",
    edad: "",
    nombre: "",
    apellido: "",
    profesion: ""
  });
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Estado para controlar visualmente qué opción del select está elegida
  const [seleccionProfesion, setSeleccionProfesion] = useState("");

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleProfesionSelect = (e) => {
    const valor = e.target.value;
    setSeleccionProfesion(valor);

    if (valor === "Otro") {
      setForm({ ...form, profesion: "" });
    } else {
      setForm({ ...form, profesion: valor });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Onboarding response form:", form);
      const { data } = await api.post("/auth/onboarding", form);
      console.log("Onboarding response dataUser:", data);
      setUser(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error al guardar el perfil");
    } finally {
        setLoading(false);
    }
  };

  // Clases reutilizables para inputs
  const inputClass = "w-full bg-slate-950/50 text-white placeholder-slate-500 border border-slate-700 rounded-lg p-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all";
  const labelClass = "block text-slate-400 text-xs font-bold mb-1 ml-1 uppercase tracking-wide";

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      
      {/* CARD PRINCIPAL */}
      <div className="max-w-2xl w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        
        {/* Decoración superior */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"></div>

        <div className="mb-8 flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-xl shadow-lg text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-white">Configuración de Perfil</h2>
                <p className="text-slate-400 text-sm">Completa tus datos para personalizar LegisBot</p>
            </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          
          {/* SECCIÓN 1: DATOS PERSONALES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className={labelClass}>Nombre</label>
                <input 
                  name="nombre" 
                  value={form.nombre} 
                  onChange={onChange} 
                  placeholder="Tu nombre" 
                  className={inputClass} 
                  required
                />
            </div>
            <div>
                <label className={labelClass}>Apellido</label>
                <input 
                  name="apellido" 
                  value={form.apellido} 
                  onChange={onChange} 
                  placeholder="Tu apellido" 
                  className={inputClass} 
                  required
                />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div>
                <label className={labelClass}>Edad</label>
                <input 
                  name="edad" 
                  value={form.edad} 
                  onChange={onChange} 
                  placeholder="Ej: 30" 
                  type="number" 
                  className={inputClass} 
                  required
                />
             </div>
             
             {/* País (Readonly estilizado) */}
             <div className="md:col-span-2">
                <label className={labelClass}>País de Residencia</label>
                <div className="relative">
                    <input 
                    name="pais" 
                    value={form.pais} 
                    readOnly 
                    className={`${inputClass} opacity-70 cursor-not-allowed bg-slate-800`}
                    />
                    <div className="absolute right-3 top-3 text-slate-500">🇦🇷</div>
                </div>
             </div>
          </div>

          <div className="border-t border-white/5 my-4"></div>

          {/* SECCIÓN 2: UBICACIÓN Y PROFESIÓN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* Provincia */}
             <div>
                <label className={labelClass}>Provincia</label>
                <div className="relative">
                    <select 
                      name="provincia" 
                      value={form.provincia} 
                      onChange={onChange} 
                      className={`${inputClass} appearance-none cursor-pointer`}
                      required
                    >
                      <option value="" className="bg-slate-900">Seleccione provincia...</option>
                      {PROVINCIAS_ARGENTINA.map((prov) => (
                        <option key={prov} value={prov} className="bg-slate-900 text-slate-200 hover:bg-slate-800">{prov}</option>
                      ))}
                    </select>
                    {/* Flecha custom para el select */}
                    <div className="absolute right-3 top-3.5 pointer-events-none text-slate-400">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                </div>
             </div>

             {/* Localidad */}
             <div>
                <label className={labelClass}>Localidad / Ciudad</label>
                <input 
                  name="localidad" 
                  value={form.localidad} 
                  onChange={onChange} 
                  placeholder="Ej: Lanús" 
                  className={inputClass} 
                  required
                />
             </div>
          </div>

          {/* Profesión */}
          <div>
            <label className={labelClass}>Profesión / Ocupación</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <select 
                    value={seleccionProfesion} 
                    onChange={handleProfesionSelect} 
                    className={`${inputClass} appearance-none cursor-pointer`}
                    required
                    >
                    <option value="" className="bg-slate-900">Seleccione profesión...</option>
                    {PROFESIONES_COMUNES.map((prof) => (
                        <option key={prof} value={prof} className="bg-slate-900 text-slate-200">{prof}</option>
                    ))}
                    </select>
                     <div className="absolute right-3 top-3.5 pointer-events-none text-slate-400">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                </div>

                {/* Input condicional con animación */}
                {seleccionProfesion === "Otro" && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                    <input 
                        name="profesion" 
                        value={form.profesion} 
                        onChange={onChange} 
                        placeholder="Especifique su profesión" 
                        className={`${inputClass} border-purple-500/50 focus:border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.1)]`} 
                        autoFocus
                        required
                    />
                </div>
                )}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-lg text-sm flex items-center gap-2">
                <span>⚠️</span> {error}
            </div>
          )}
          
          <button 
             disabled={loading}
             className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-green-900/20 transition-all transform hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
             {loading ? (
                 <>
                   <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                   Guardando Perfil...
                 </>
             ) : (
                 "Finalizar Configuración"
             )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Onboarding;