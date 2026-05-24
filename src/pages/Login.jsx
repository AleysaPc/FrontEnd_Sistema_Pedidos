import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { login } from "../services/auth.service";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await login(
        formData.username,

        formData.password,
      );

      navigate("/productos");
    } catch (error) {
      console.log(error);

      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-green-700 via-green-600 to-green-500">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
        {/* Logo */}

        <div className="flex flex-col items-center mb-6">
          <img src="/logo.png" alt="Logo" className="h-16 mb-2" />

          <h1 className="text-center text-xl font-bold text-green-700">
            Sistema de Pedidos
          </h1>
        </div>

        <h2 className="text-3xl text-center font-bold text-blue-600 mb-6">
          Iniciar Sesión
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500 text-white rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Usuario"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
