import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  
  return (
    // CAMBIOS AQUI:
    // 1. bg-white -> bg-slate-900/60 (Fondo oscuro semitransparente)
    // 2. backdrop-blur-md (Efecto vidrio esmerilado)
    // 3. border-b border-white/10 (Una linea sutil abajo para separar)
    // 4. text-white (Para que las letras se vean sobre el fondo oscuro)
    <nav className="bg-slate-900/60 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center sticky top-0 z-50">
      
      <div className="flex items-center space-x-6">
        <Link to="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
           {/* Efecto de gradiente en el texto del logo */}
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
             LegisBot
           </span>
        </Link>
        
        {/* Enlaces de navegación con efecto hover */}
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