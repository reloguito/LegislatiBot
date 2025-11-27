import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  
  return (
    <nav className="bg-slate-900/60 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center sticky top-0 z-50">
      
      <div className="flex items-center space-x-6">
        {/* MODIFICACIÓN: Invertimos el orden (Texto -> Imagen) */}
        <Link to="/" className="flex items-center gap-2 group">
           
          <img 
             src="/Legis_icon.png" 
             alt="Logo LegisBot" 
             className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12 drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]"
           />

        </Link>
        
        {/* Enlaces de navegación */}
        {user && <Link to="/chat" className="text-sm text-slate-300 hover:text-cyan-400 transition-colors">Chat</Link>}
        {user && <Link to="/history" className="text-sm text-slate-300 hover:text-cyan-400 transition-colors">Historial</Link>}
        {user?.role === "admin" && <Link to="/admin/upload" className="text-sm text-slate-300 hover:text-purple-400 transition-colors">Admin Upload</Link>}
        {user?.role === "admin" && <Link to="/admin/stats" className="text-sm text-slate-300 hover:text-purple-400 transition-colors">Estadísticas</Link>}
      </div>

      <div>
        {!user ? (
          <div className="space-x-4">
            <Link to="/login" className="text-slate-300 hover:text-white transition-colors">Iniciar sesión</Link>
            <Link to="/register" className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity">Registrarse</Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">Hola, <span className="text-slate-200">{user.email}</span></span>
            <button 
                onClick={logout} 
                className="bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/50 px-3 py-1 rounded text-sm transition-all"
            >
                Salir
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;