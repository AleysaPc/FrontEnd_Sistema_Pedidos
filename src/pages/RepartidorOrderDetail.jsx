import { useOrders } from "../hooks/useEntities";
import { OrdersApi } from "../api/order";
import Navbar from "../components/Navbar";

function RepartidorOrderDetail() {
  const {
    data: orders,
    isLoading,
    refetch,
  } = useOrders({
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
  });

  // =========================
  // CAMBIAR ESTADO + REFRESH
  // =========================
  const cambiarEstado = async (id, estado) => {
    try {
      await OrdersApi.update(id, { estado });
      await refetch(); // 🔥 refresco inmediato
    } catch (error) {
      console.error("Error actualizando pedido:", error);
    }
  };

  if (isLoading) return <p className="p-6">Cargando...</p>;

  // =========================
  // CARD PEDIDO
  // =========================
  const renderPedido = (order) => (
    <div
      key={order.id}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition"
    >
      <p className="font-bold text-gray-800">
        #{order.numero_orden}
      </p>

      <p className="text-gray-700 mt-1">
        Total: <span className="font-semibold">Bs {order.total}</span>
      </p>

      <p className="text-sm text-gray-500 mt-1">
        Cliente: {order.cliente}
      </p>

      {/* BOTONES */}
      <div className="flex flex-col gap-2 mt-3">
        {order.estado === "LISTO" && (
          <button
            onClick={() => cambiarEstado(order.id, "EN_CAMINO")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-xl transition"
          >
            Tomar pedido
          </button>
        )}

        {order.estado === "EN_CAMINO" && (
          <button
            onClick={() => cambiarEstado(order.id, "ENTREGADO")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-xl transition"
          >
            Marcar entregado
          </button>
        )}
      </div>
    </div>
  );

  // =========================
  // FILTROS SEGURIZADOS
  // =========================
  const disponibles = orders?.filter((o) => o.estado === "LISTO") || [];
  const enCamino = orders?.filter((o) => o.estado === "EN_CAMINO") || [];
  const entregados = orders?.filter((o) => o.estado === "ENTREGADO") || [];

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Panel del Repartidor
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Gestiona entregas y pedidos en tiempo real
          </p>
        </div>

        {/* COLUMNAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* LISTOS */}
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="bg-blue-600 px-4 py-3">
              <h2 className="text-white font-semibold text-center">
                LISTOS PARA RECOGER
              </h2>
            </div>

            <div className="p-4 space-y-4 min-h-[500px] bg-gray-50">
              {disponibles.length > 0 ? (
                disponibles.map(renderPedido)
              ) : (
                <p className="text-center text-gray-400">Sin pedidos</p>
              )}
            </div>
          </div>

          {/* EN CAMINO */}
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="bg-yellow-500 px-4 py-3">
              <h2 className="text-white font-semibold text-center">
                EN CAMINO
              </h2>
            </div>

            <div className="p-4 space-y-4 min-h-[500px] bg-gray-50">
              {enCamino.length > 0 ? (
                enCamino.map(renderPedido)
              ) : (
                <p className="text-center text-gray-400">Sin pedidos</p>
              )}
            </div>
          </div>

          {/* ENTREGADOS */}
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="bg-emerald-500 px-4 py-3">
              <h2 className="text-white font-semibold text-center">
                ENTREGADOS
              </h2>
            </div>

            <div className="p-4 space-y-4 min-h-[500px] bg-gray-50">
              {entregados.length > 0 ? (
                entregados.map(renderPedido)
              ) : (
                <p className="text-center text-gray-400">Sin pedidos</p>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default RepartidorOrderDetail;