import { useProducts } from "../hooks/useEntities";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Productos() {
  const { data, isLoading, error } = useProducts();

  const { carrito, agregarProducto } = useCart();

  if (isLoading) {
    return (
      <div className="p-10">
        <h1>Cargando productos...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10">
        <h1>Error al cargar productos</h1>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Menú de Productos</h1>

        <Link
          to="/carrito"
          className="bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
        >
          🛒 {carrito.reduce(
            (acc, item) => acc + item.cantidad,
            0
          )}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
