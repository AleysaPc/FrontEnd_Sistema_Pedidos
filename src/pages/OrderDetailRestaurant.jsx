import { useOrders } from "../hooks/useEntities";
import { OrdersApi } from "../api/order";

function OrderDetailRestaurant() {
  const {
    data: orders,
    isLoading,
    refetch,
  } = useOrders({
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
  });

  // 🔥 ACTUALIZA Y REFRESCA AUTOMÁTICAMENTE
  const cambiarEstado = async (id, estado) => {
    try {
      await OrdersApi.update(id, { estado });

      // Refresca inmediatamente
      await refetch();
    } catch (error) {
      console.error("Error actualizando pedido:", error);
    }
  };

  if (isLoading) return <p>Cargando...</p>;

  // 🔥 FUNCIÓN PARA RENDERIZAR CADA CARD
  const renderPedido = (order) => (
    <div key={order.id} className="bg-white border shadow p-3 rounded mb-3">
      <p className="font-bold">#{order.numero_orden}</p>

      <p>Total: Bs {order.total}</p>

      <p className="text-sm text-gray-600">Cliente: {order.cliente}</p>

      {/* BOTONES DINÁMICOS */}
      <div className="flex flex-col gap-1 mt-2">
        {order.estado === "PENDIENTE" && (
          <button
            onClick={() => cambiarEstado(order.id, "ACEPTADO")}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
          >
            Aceptar
          </button>
        )}

        {order.estado === "ACEPTADO" && (
          <button
            onClick={() => cambiarEstado(order.id, "PREPARANDO")}
            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
          >
            Preparar
          </button>
        )}

        {order.estado === "PREPARANDO" && (
          <button
            onClick={() => cambiarEstado(order.id, "LISTO")}
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
          >
            Marcar listo
          </button>
        )}
      </div>
    </div>
  );

  // 🔥 FILTROS
  const pendientes = orders?.filter((o) => o.estado === "PENDIENTE") || [];

  const aceptados = orders?.filter((o) => o.estado === "ACEPTADO") || [];

  const preparando = orders?.filter((o) => o.estado === "PREPARANDO") || [];

  const listos = orders?.filter((o) => o.estado === "LISTO") || [];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-blue-700 to-emerald-500 bg-clip-text text-transparent">
            🍽 Panel del Restaurante
          </h1>

          <p className="text-gray-500 mt-2">
            Gestiona los pedidos en tiempo real
          </p>
        </div>

        {/* COLUMNAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* PENDIENTE */}
          <div className="bg-white rounded-3xl shadow-xl border border-red-100 overflow-hidden">
            <div className="bg-linear-to-r from-red-500 to-red-600 p-4">
              <h2 className="font-extrabold text-white text-xl text-center tracking-wide">
                🔴 PENDIENTE
              </h2>
            </div>

            <div className="p-4 space-y-4 min-h-[500px] bg-red-50/40">
              {pendientes.length > 0 ? (
                pendientes.map(renderPedido)
              ) : (
                <p className="text-center text-gray-400">Sin pedidos</p>
              )}
            </div>
          </div>

          {/* ACEPTADO */}
          <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
            <div className="bg-linear-to-r from-blue-500 to-blue-700 p-4">
              <h2 className="font-extrabold text-white text-xl text-center tracking-wide">
                🔵 ACEPTADO
              </h2>
            </div>

            <div className="p-4 space-y-4 min-h-[500px] bg-blue-50/40">
              {aceptados.length > 0 ? (
                aceptados.map(renderPedido)
              ) : (
                <p className="text-center text-gray-400">Sin pedidos</p>
              )}
            </div>
          </div>

          {/* PREPARANDO */}
          <div className="bg-white rounded-3xl shadow-xl border border-yellow-100 overflow-hidden">
            <div className="bg-linear-to-r from-yellow-400 to-yellow-500 p-4">
              <h2 className="font-extrabold text-white text-xl text-center tracking-wide">
                🟡 PREPARANDO
              </h2>
            </div>

            <div className="p-4 space-y-4 min-h-[500px] bg-yellow-50/40">
              {preparando.length > 0 ? (
                preparando.map(renderPedido)
              ) : (
                <p className="text-center text-gray-400">Sin pedidos</p>
              )}
            </div>
          </div>

          {/* LISTO */}
          <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden">
            <div className="bg-linear-to-r from-emerald-500 to-green-600 p-4">
              <h2 className="font-extrabold text-white text-xl text-center tracking-wide">
                🟢 LISTO
              </h2>
            </div>

            <div className="p-4 space-y-4 min-h-[500px] bg-emerald-50/40">
              {listos.length > 0 ? (
                listos.map(renderPedido)
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

export default OrderDetailRestaurant;
