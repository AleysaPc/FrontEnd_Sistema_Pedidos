import { useOrders } from "../hooks/useEntities";
import { OrdersApi } from "../api/order";

function RepartidorOrderDetail() {
  const {
    data: orders,
    isLoading,
    refetch,
  } = useOrders({
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
  });

  // 🔥 ACTUALIZA Y REFRESCA INMEDIATAMENTE
  const cambiarEstado = async (id, estado) => {
    try {
      await OrdersApi.update(id, { estado });

      // Refresca instantáneamente
      await refetch();
    } catch (error) {
      console.error("Error actualizando pedido:", error);
    }
  };

  if (isLoading) return <p>Cargando...</p>;

  // 🔥 CARD PEDIDO
  const renderPedido = (order) => (
    <div key={order.id} className="bg-white border shadow p-3 rounded mb-3">
      <p className="font-bold">#{order.numero_orden}</p>

      <p>Total: Bs {order.total}</p>

      <p className="text-sm text-gray-600">Cliente: {order.cliente}</p>

      {/* BOTONES DINÁMICOS */}
      <div className="flex flex-col gap-1 mt-2">
        {order.estado === "LISTO" && (
          <button
            onClick={() => cambiarEstado(order.id, "EN_CAMINO")}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
          >
            Tomar pedido
          </button>
        )}

        {order.estado === "EN_CAMINO" && (
          <button
            onClick={() => cambiarEstado(order.id, "ENTREGADO")}
            className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition"
          >
            Marcar entregado
          </button>
        )}
      </div>
    </div>
  );

  // 🔥 FILTROS
  const disponibles = orders?.filter((o) => o.estado === "LISTO") || [];

  const enCamino = orders?.filter((o) => o.estado === "EN_CAMINO") || [];

  const entregados = orders?.filter((o) => o.estado === "ENTREGADO") || [];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-blue-700 to-emerald-500 bg-clip-text text-transparent">
            🛵 Panel del Repartidor
          </h1>

          <p className="text-gray-500 mt-2">Gestiona entregas en tiempo real</p>
        </div>

        {/* COLUMNAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LISTOS */}
          <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
            <div className="bg-linear-to-r from-blue-500 to-blue-700 p-4">
              <h2 className="font-extrabold text-white text-xl text-center tracking-wide">
                📦 LISTOS
              </h2>
            </div>

            <div className="p-4 space-y-4 min-h-[500px] bg-blue-50/40">
              {disponibles.length > 0 ? (
                disponibles.map(renderPedido)
              ) : (
                <p className="text-center text-gray-400">Sin pedidos</p>
              )}
            </div>
          </div>

          {/* EN CAMINO */}
          <div className="bg-white rounded-3xl shadow-xl border border-yellow-100 overflow-hidden">
            <div className="bg-linear-to-r from-yellow-400 to-yellow-500 p-4">
              <h2 className="font-extrabold text-white text-xl text-center tracking-wide">
                🚚 EN CAMINO
              </h2>
            </div>

            <div className="p-4 space-y-4 min-h-[500px] bg-yellow-50/40">
              {enCamino.length > 0 ? (
                enCamino.map(renderPedido)
              ) : (
                <p className="text-center text-gray-400">Sin pedidos</p>
              )}
            </div>
          </div>

          {/* ENTREGADOS */}
          <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden">
            <div className="bg-linear-to-r from-emerald-500 to-green-600 p-4">
              <h2 className="font-extrabold text-white text-xl text-center tracking-wide">
                ✅ ENTREGADOS
              </h2>
            </div>

            <div className="p-4 space-y-4 min-h-[500px] bg-emerald-50/40">
              {entregados.length > 0 ? (
                entregados.map(renderPedido)
              ) : (
                <p className="text-center text-gray-400">Sin pedidos</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepartidorOrderDetail;
