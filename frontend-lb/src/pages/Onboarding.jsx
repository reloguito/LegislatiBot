import React, { useState } from "react";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({    
   
  });
  const [error, setError] = useState(null);

  const onChange = e => setForm({ ...form, [e.target.nombre]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/onboarding", form);
      // backend should return updated user
      setUser(data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error en onboarding");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Completar onboarding</h2>
      <form onSubmit={onSubmit} className="grid gap-3">
        <input name="firstName" value={form.nombre} onChange={onChange} placeholder="Nombre" className="p-2 border rounded" />
        <input name="lastName" value={form.apellido} onChange={onChange} placeholder="Apellido" className="p-2 border rounded" />
        <input name="country" value={form.pais} onChange={onChange} placeholder="País" className="p-2 border rounded" />
        <input name="province" value={form.provincia} onChange={onChange} placeholder="Provincia" className="p-2 border rounded" />
        <input name="city" value={form.localidad} onChange={onChange} placeholder="Localidad" className="p-2 border rounded" />
        <input name="age" value={form.edad} onChange={onChange} placeholder="Edad" type="number" className="p-2 border rounded" />
        <input name="profession" value={form.profesion} onChange={onChange} placeholder="Profesión" className="p-2 border rounded" />
        {error && <div className="text-red-500">{error}</div>}
        <button className="bg-green-600 text-white p-2 rounded">Guardar</button>
      </form>
    </div>
  );
};

export default Onboarding;
