import { useProducts } from "../hooks/useEntities";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navar";

function Productos() {
  const { data, isLoading, error } = useProducts();
  const { carrito, agregarProducto } = useCart();

  // =========================
  // 🔥 OBTENER USUARIO Y ROL
  // =========================
  const user = JSON.parse(localStorage.getItem("user"));
  const rol = user?.rol;
  console.log("ROL:", rol);

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
      
      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}
      <div className="flex justify-between items-center mb-8">
        
        <div>
          <h1 className="text-4xl font-bold">
            Menú de Productos
          </h1>

          {/* 🔥 MOSTRAR ROL */}
          {rol && (
            <p className="text-sm text-gray-600">
              Rol: <span className="font-bold">{rol}</span>
            </p>
          )}
        </div>

        <Navbar />

        <Link
          to="/carrito"
          className="bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
        >
          🛒 {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
        </Link>
      </div>

      {/* ========================= */}
      {/* PRODUCTOS */}
      {/* ========================= */}
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