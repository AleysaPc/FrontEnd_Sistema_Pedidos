import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { OrdersApi } from "../api/order";
import Navbar from "../components/Navbar";

function RepartidorPanel() {
  const navigate = useNavigate();

  // =========================
  // QUERY LISTA LISTOS
  // =========================
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders-listos"],
    queryFn: () =>
      OrdersApi.getFiltered({
        estado: "LISTO",
      }),
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
  });

  // =========================
  // ACEPTAR PEDIDO
  // =========================
  const aceptarPedido = async (order) => {
    try {
      await OrdersApi.update(order.id, {
        estado: "EN_CAMINO",
      });

      await refetch(); // refresco inmediato
      navigate(`/repartidor/pedido/${order.id}`);
    } catch (error) {
      console.error("Error aceptando pedido:", error);
    }
  };

  if (isLoading) {
    return <p className="p-6">Cargando pedidos...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-6">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Pedidos Disponibles
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Acepta pedidos listos para entregar
          </p>
        </div>

        {/* LISTA */}
        <div className="space-y-5">

          {orders?.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-all"
              >

                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                  {/* INFO */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Pedido #{order.numero_orden}
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                      Total del pedido
                    </p>

                    <p className="text-2xl font-bold text-emerald-600 mt-1">
                      Bs {order.total}
                    </p>
                  </div>

                  {/* BOTÓN */}
                  <button
                    onClick={() => aceptarPedido(order)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium transition-all"
                  >
                    Aceptar pedido
                  </button>

                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl border shadow-sm p-10 text-center">
              <p className="text-gray-400">
                No hay pedidos disponibles
              </p>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}

export default RepartidorPanel;