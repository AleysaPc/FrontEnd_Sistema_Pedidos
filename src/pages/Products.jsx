import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useProducts } from "../hooks/useEntities";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";

function Productos() {
  const { data, isLoading, error } = useProducts();
  const { carrito, agregarProducto } = useCart();

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const rol = user?.rol;

  // =========================
  // BUSCAR ORDEN
  // =========================
  const buscarOrden = () => {
    if (!search.trim()) return;
    navigate(`/historial?orden_id=${search.trim()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      buscarOrden();
    }
  };

  if (isLoading) return <h1 className="p-6">Cargando...</h1>;
  if (error) return <h1 className="p-6 text-red-500">Error</h1>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <p className="text-sm text-gray-500">
              Rol actual:
              <span className="ml-1 font-semibold text-emerald-600">{rol}</span>
            </p>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-1">
              Menú de Productos
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Explora y agrega productos rápidamente
            </p>
          </div>

          {/* BUSCADOR */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Buscar orden..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full lg:w-80 bg-white border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
            />

            <button
              onClick={buscarOrden}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-medium transition-all"
            >
              Buscar
            </button>
          </div>
        </div>

        {/* CARRITO */}
        <div className="flex justify-end mb-6">
          <Link
            to="/carrito"
            className="relative flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl shadow-sm transition-all"
          >
            REALIZAR PEDIDO 🛒
            <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
              {carrito.reduce((a, i) => a + i.cantidad, 0)}
            </span>
          </Link>
        </div>

        {/* PRODUCTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data?.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onAgregar={agregarProducto}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Productos;
