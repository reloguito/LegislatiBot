import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold">Bienvenido {user?.name}</h1>
      <p className="mt-4">Usa el chat para consultar documentos oficiales subidos por el administrador.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Acceso rápido</h3>
          <ul className="mt-2">
            <li>- Ir al Chat para consultar documentos</li>
            <li>- Ver historial de consultas</li>
          </ul>
        </div>
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Privacidad</h3>
          <p className="text-sm mt-2">Tus datos están cifrados y solo se usan para personalizar tu experiencia.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
