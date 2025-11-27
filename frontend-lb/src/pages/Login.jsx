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
      console.log("Logged in user 1111:", user);
      
      const returned = user; // Asumiendo que user es el objeto directo
      // const returned = user.data?.user ?? user; // Descomentar si la estructura cambia
      
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
    // CONTENEDOR PRINCIPAL: Fondo con gradiente y estilo "Tech"
    <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center">
    
      {/* TARJETA DE LOGIN: Efecto Glassmorphism */}
      <div className="relative z-10 w-full max-w-md p-8 mx-4 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)]">
        
        {/* LOGO LEGISBOT */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-tight flex items-center justify-center gap-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            Legis<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_5px_rgba(192,38,211,0.8)]">Bot</span>
            {/* Icono de Mazo SVG Inline */}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#gradient-icon)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-12">
              <defs>
                <linearGradient id="gradient-icon" x1="0" y1="0" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <path d="m13 14 8-8" />
              <path d="M16 16 9 9" />
              <path d="M18.54 13.09a2.76 2.76 0 0 0 0-3.9 2.76 2.76 0 0 0-3.9 0l-7.7 7.7a2.76 2.76 0 0 0 0 3.9 2.76 2.76 0 0 0 3.9 0l7.7-7.7Z" />
              <path d="M14 18h7" />
            </svg>
          </h1>
          <p className="text-slate-400 text-sm mt-2">Acceso al Sistema Legislativo Inteligente</p>
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