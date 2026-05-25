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

      // 🔥 GUARDAR TOKEN Y USER
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      // 🔥 REDIRECCIÓN SEGÚN ROL
      if (res.user.rol === "CLIENT") navigate("/productos");
      if (res.user.rol === "REPARTIDOR") navigate("/repartidor");
      if (res.user.rol === "ADMIN_RESTAURANT") navigate("/productos");

    } catch (error) {
      console.log(error);
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-green-600">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-2 mb-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border p-2 mb-3"
          />

          <button className="bg-blue-500 text-white w-full p-2">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;