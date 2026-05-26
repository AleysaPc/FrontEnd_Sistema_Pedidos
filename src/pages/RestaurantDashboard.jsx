import { useOrders } from "../hooks/useEntities";
import OrderCard from "../components/OrderCard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function RestaurantePanel() {
  const navigate = useNavigate();

  const {
    data: orders,
    isLoading,
    refetch,
  } = useOrders({
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
  });

  if (isLoading) {
    return <p className="p-6">Cargando pedidos...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* HEADER */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              🍽 Panel del Restaurante
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Administra y supervisa todos los pedidos en tiempo real
            </p>
          </div>

          {/* BOTÓN PRODUCTOS */}
          <button
            onClick={() => navigate("/productos")}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow-sm hover:bg-blue-700 transition"
          >
            🍝 Productos
          </button>
        </div>

        {/* LISTA DE PEDIDOS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orders?.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-all"
              >
                <OrderCard order={order} refetchOrders={refetch} />
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-2xl border shadow-sm p-10 text-center">
              <p className="text-gray-400">No existen pedidos registrados</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default RestaurantePanel;
