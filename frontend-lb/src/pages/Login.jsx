import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form.email, form.password);
      if (user.onboardingComplete) navigate("/");
      else navigate("/onboarding");
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Iniciar sesión</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="email" value={form.email} onChange={onChange} placeholder="Email" className="w-full p-2 border rounded" />
        <input name="password" value={form.password} onChange={onChange} placeholder="Contraseña" type="password" className="w-full p-2 border rounded" />
        {error && <div className="text-red-500">{error}</div>}
        <button className="w-full bg-blue-600 text-white p-2 rounded">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
