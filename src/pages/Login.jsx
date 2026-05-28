import { useState } from "react";
import { login } from "../services/auth.service";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
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

      const res = await login(formData.email, formData.password);

      if (!res?.user) {
        throw new Error("Respuesta inválida del servidor");
      }

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      const rol = res.user.rol;

      if (rol === "CLIENT") {
        const redirectTo = location.state?.from || "/productos";
        navigate(redirectTo);
      }

      if (rol === "REPARTIDOR") navigate("/repartidor");

      if (rol === "ADMIN_RESTAURANT") navigate("/panelRestaurante");
    } catch (error) {
      console.log(error);
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-emerald-50 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-[32px] p-8 border border-gray-100">
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-5 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 flex items-center justify-center text-white text-4xl shadow-lg">
            🍽
          </div>

          <h2 className="text-4xl font-extrabold text-gray-800">Bienvenido</h2>

          <p className="text-gray-500 mt-3">Inicia sesión para continuar</p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl mb-5 text-sm text-center">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Correo electrónico
            </label>

            <input
              type="email"
              name="email"
              placeholder="correo@gmail.com"
              onChange={handleChange}
              className="w-full px-4 py-4 rounded-2xl border border-gray-200 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-sm"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Contraseña
            </label>

            <input
              type="password"
              name="password"
              placeholder="********"
              onChange={handleChange}
              className="w-full px-4 py-4 rounded-2xl border border-gray-200 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
            />
          </div>

          {/* BUTTON */}
          <button className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-xl">
            Ingresar
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">© 2026 Sistema de Gestión</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
