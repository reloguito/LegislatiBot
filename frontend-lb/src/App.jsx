import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import AdminUpload from "./pages/AdminUpload";
import Stats from "./pages/Stats";
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    // 1. Contenedor Maestro: Define la imagen de fondo y el color de texto base (blanco)
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed text-slate-200 relative"
      style={{ backgroundImage: "url('/congreso_bg.jpg')" }} 
    >
      
      {/* 2. Capa Oscura (Overlay): Esencial para que el texto resalte sobre la foto */}
      <div className="absolute inset-0 bg-slate-950/85 z-0"></div>

      {/* 3. Contenedor de Contenido: z-10 para que flote SOBRE la capa oscura */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow p-6 container mx-auto">
          <Routes>
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
            <Route path="/admin/upload" element={<ProtectedRoute adminOnly={true}><AdminUpload /></ProtectedRoute>} />
            <Route path="/admin/stats" element={<ProtectedRoute adminOnly={true}><Stats /></ProtectedRoute>} />
            <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;