import { useOrders } from "../hooks/useEntities";
import { OrdersApi } from "../api/order";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function RepartidorPanel() {
  const navigate = useNavigate();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders-listos"],
    queryFn: () => OrdersApi.getFiltered({ estado: "LISTO" }),
  });

  const aceptarPedido = async (order) => {
    navigate(`/repartidor/pedido/${order.id}`);
  };

  if (isLoading) return <p>Cargando pedidos...</p>;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-emerald-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-blue-700 to-emerald-500 bg-clip-text text-transparent">
            📦 Pedidos Disponibles
          </h1>

          <p className="text-gray-500 mt-2">
            Acepta pedidos listos para entregar
          </p>
        </div>

        {/* LISTA DE PEDIDOS */}
        <div className="space-y-5">
          {orders?.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                {/* INFO */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Pedido #{order.numero_orden}
                  </h2>

                  <p className="text-gray-500 mt-2">Total del pedido</p>

                  <p className="text-3xl font-extrabold text-emerald-600 mt-1">
                    Bs {order.total}
                  </p>
                </div>

                {/* BOTÓN */}
                <button
                  onClick={() => aceptarPedido(order)}
                  className="bg-linear-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all duration-300"
                >
                  ✅ Aceptar pedido
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RepartidorPanel;
