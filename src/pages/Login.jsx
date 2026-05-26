import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";

function Login() {
  const navigate = useNavigate();

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

      console.log("LOGIN RESPONSE:", res);

      if (!res?.user) {
        throw new Error("Respuesta inválida del servidor");
      }

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      const rol = res.user.rol;

      if (rol === "CLIENT") navigate("/productos");
      if (rol === "REPARTIDOR") navigate("/repartidor");
      if (rol === "ADMIN_RESTAURANT") navigate("/panelRestaurante");

    } catch (error) {
      console.log(error);
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-700 via-blue-600 to-emerald-500 px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8">

        {/* HEADER */}
        <div className="text-center mb-8">

          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center text-white text-3xl shadow-lg">
            🔐
          </div>

          <h2 className="text-3xl font-extrabold text-white">
            Bienvenido
          </h2>

          <p className="text-white/70 mt-2 text-sm">
            Inicia sesión para continuar
          </p>

        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-2 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="block text-white text-sm mb-2">
              Correo electrónico
            </label>

            <input
              type="email"
              name="email"
              placeholder="correo@gmail.com"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-emerald-300 transition-all"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-white text-sm mb-2">
              Contraseña
            </label>

            <input
              type="password"
              name="password"
              placeholder="********"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-emerald-300 transition-all"
            />
          </div>

          {/* BUTTON */}
          <button className="w-full bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-emerald-900/30">
            Ingresar
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-center text-white/60 text-sm mt-6">
          © 2026 Sistema de Gestión
        </p>

      </div>
    </div>
  );
}

export default Login;