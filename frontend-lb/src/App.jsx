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
    <div className="min-h-screen">
      <Navbar />
      <main className="p-6">
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
  );
};

export default App;
