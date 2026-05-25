import { useOrders } from "../hooks/useEntities";
import OrderCard from "../components/OrderCard";

function RestaurantePanel() {
  const { data: orders, isLoading } = useOrders();

  if (isLoading) return <p>Cargando pedidos...</p>;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-blue-700 to-emerald-500 bg-clip-text text-transparent">
            🍽 Panel del Restaurante
          </h1>

          <p className="text-gray-500 mt-2">
            Administra y supervisa todos los pedidos
          </p>
        </div>

        {/* PEDIDOS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orders?.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <OrderCard order={order} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RestaurantePanel;
