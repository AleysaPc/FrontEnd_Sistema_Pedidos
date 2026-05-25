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
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-emerald-50">
      {/* ========================= */}
      {/* NAVBAR */}
      {/* ========================= */}
      <div className="bg-linear-to-r from-blue-700 to-emerald-500 shadow-lg px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-white">
              🍽 Menú de Productos
            </h1>

            {rol && (
              <p className="text-blue-100 mt-1">
                Rol: <span className="font-bold">{rol}</span>
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Navbar />

            <Link
              to="/carrito"
              className="bg-white text-blue-700 font-bold px-5 py-3 rounded-2xl shadow-lg hover:scale-105 hover:bg-gray-100 transition-all duration-300"
            >
              🛒 {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
            </Link>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* PRODUCTOS */}
      {/* ========================= */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((producto) => (
            <div
              key={producto.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {producto.nombre}
                </h2>

                <p className="text-gray-500 mt-2">{producto.descripcion}</p>

                <div className="flex justify-between items-center mt-6">
                  <span className="text-2xl font-extrabold text-emerald-600">
                    Bs. {producto.precio}
                  </span>

                  <button
                    onClick={() => agregarProducto(producto)}
                    className="bg-linear-to-r from-blue-600 to-emerald-500 text-white px-5 py-2 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Productos;
