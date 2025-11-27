import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await login(form.email, form.password);
      
      const returned = user; 
      
      const completed = returned?.has_completed_onboarding;
      console.log("Parsed user:", returned, "has_completed_onboarding:", completed);

      if (completed) navigate("/");
      else navigate("/onboarding");
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    // CONTENEDOR PRINCIPAL
    <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center">
    
      {/* TARJETA DE LOGIN */}
      <div className="relative z-10 w-full max-w-md p-8 mx-4 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)]">
        
        {/* LOGO LEGISBOT MODIFICADO */}
        {/* CAMBIO AQUÍ: Añadimos 'flex', 'flex-col', 'items-center' y 'justify-center' para centrar la imagen vertical y horizontalmente */}
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          
            <img 
                src="/Legis_icon.png" 
                alt="Logo LegisBot" 
                // CAMBIO AQUÍ: He aumentado un poco el tamaño (h-16 md:h-20) para que se vea mejor como icono principal
                className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)] mb-4"
            />
            
          <p className="text-slate-400 text-sm">Acceso al Sistema Legislativo Inteligente</p>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={onSubmit} className="space-y-6">
          
          <div className="space-y-4">
            {/* Input Email */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
              <input
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="Correo electrónico"
                className="relative w-full bg-slate-950 text-white placeholder-slate-500 border border-slate-700 rounded-lg p-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>

            {/* Input Password */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
              <input
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="Contraseña"
                type="password"
                className="relative w-full bg-slate-950 text-white placeholder-slate-500 border border-slate-700 rounded-lg p-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg text-center backdrop-blur-sm">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-lg shadow-lg shadow-cyan-500/20 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            &copy; 2025 Senado de la Nación - LegisBot System
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;