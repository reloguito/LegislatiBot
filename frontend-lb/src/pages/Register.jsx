import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    try {
      const user = await register(form);
      console.log("Usuario registrado y logueado:", user);
      setSuccess(true);

      const completed = user?.has_completed_onboarding;
      
      setTimeout(() => {
        if (completed) {
          navigate("/");
        } else {
          navigate("/onboarding");
        }
      }, 1500);
    } catch (err) {
      console.error("Error en registro:", err);
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Error al registrar"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // CONTENEDOR PRINCIPAL
    <div className="w-full min-h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative">
        
        {/* Decoración de fondo sutil */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* ENCABEZADO MODIFICADO */}
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          
          {/* 1. ICONO DE LEGISBOT (Arriba) */}
          <img 
              src="/Legis_icon.png" 
              alt="Logo LegisBot" 
              className="h-16 w-auto object-contain transition-transform duration-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)] mb-4"
          />

          {/* 2. TÍTULO (Debajo del icono) */}
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Crear Cuenta
          </h2>
          
          {/* 3. LEYENDA ELIMINADA */}
        </div>

        {/* FORMULARIO */}
        <form onSubmit={onSubmit} className="space-y-5 relative z-10">
          
          <div className="space-y-4">
            {/* Input Email */}
            <div>
              <label className="block text-slate-300 text-xs font-bold mb-1 ml-1 uppercase tracking-wide">Email Institucional</label>
              <input
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="usuario@senado.gob.ar"
                type="email"
                className="w-full bg-slate-950/50 text-white placeholder-slate-600 border border-slate-700 rounded-lg p-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                required
              />
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-slate-300 text-xs font-bold mb-1 ml-1 uppercase tracking-wide">Contraseña</label>
              <input
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="Mínimo 6 caracteres"
                type="password"
                className="w-full bg-slate-950/50 text-white placeholder-slate-600 border border-slate-700 rounded-lg p-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                required
                minLength="6"
              />
            </div>
          </div>

          {/* MENSAJES DE ESTADO */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-lg text-sm flex items-start gap-2 animate-pulse">
              <span>⚠️</span> {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-300 p-3 rounded-lg text-sm flex items-center gap-2">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
               Registro exitoso. Redirigiendo...
            </div>
          )}

          {/* BOTÓN */}
          <button
            type="submit"
            className={`w-full font-bold py-3 px-4 rounded-lg shadow-lg transition-all transform flex justify-center items-center gap-2 ${
                !form.email || !form.password || isLoading
                ? "bg-slate-700 text-slate-500 cursor-not-allowed opacity-70"
                : "bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white hover:scale-[1.02] hover:shadow-cyan-500/25"
            }`}
            disabled={!form.email || !form.password || isLoading}
          >
            {isLoading ? (
               <>
                 <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
               </>
            ) : (
                "Registrarse"
            )}
          </button>
        </form>

        {/* FOOTER LINK */}
        <div className="mt-6 text-center border-t border-white/5 pt-4">
           <p className="text-slate-400 text-sm">
             ¿Ya tienes una cuenta?{" "}
             <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
               Inicia Sesión aquí
             </Link>
           </p>
        </div>

      </div>
    </div>
  );
};

export default Register;