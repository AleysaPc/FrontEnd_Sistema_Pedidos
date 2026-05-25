import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useProducts } from "../hooks/useEntities";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navar";

function Productos() {
  const { data, isLoading, error } = useProducts();
  const { carrito, agregarProducto } = useCart();

  const navigate = useNavigate();

  // 🔥 BUSCADOR DE ORDEN
  const [search, setSearch] = useState("");

  // 🔥 OBTENER USUARIO
  const user = JSON.parse(localStorage.getItem("user"));
  const rol = user?.rol;

  // =========================
  // BUSCAR ORDEN EN HISTORIAL
  // =========================
  const buscarOrden = () => {
    if (!search.trim()) return;

    navigate(`/historial?orden_id=${search.trim()}`);
  };

  // ENTER PARA BUSCAR
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      buscarOrden();
    }
  };

  if (isLoading) return <h1>Cargando...</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* 🔥 ROL */}
      <div className="mb-3 text-sm text-gray-600">
        Rol actual: <b>{rol}</b>
      </div>

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">
          Menú de Productos
        </h1>

        <Navbar />

        <Link to="/carrito">
          🛒 {carrito.reduce((a, i) => a + i.cantidad, 0)}
        </Link>
      </div>

      {/* ========================= */}
      {/* 🔥 BUSCADOR DE ORDEN */}
      {/* ========================= */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Buscar orden (ej: 21 o ORD-ABC123)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border p-2 rounded w-80"
        />

        <button
          onClick={buscarOrden}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>

      {/* ========================= */}
      {/* PRODUCTOS */}
      {/* ========================= */}
      <div className="grid grid-cols-3 gap-6">
        {data?.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            onAgregar={agregarProducto}
          />
        ))}
      </div>
    </div>
  );
}

export default Productos;