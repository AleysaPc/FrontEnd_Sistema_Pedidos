import { useOrders } from "../hooks/useEntities";
import { OrdersApi } from "../api/order";

function OrderDetailRestaurant() {
  const { data: orders, isLoading } = useOrders({
    refetchInterval: 3000, // 🔥 polling cada 3 segundos
    refetchIntervalInBackground: true,
  });

  const cambiarEstado = async (id, estado) => {
    await OrdersApi.update(id, { estado });
  };

  if (isLoading) return <p>Cargando...</p>;

  const renderPedido = (order) => (
    <div className="bg-white border shadow p-3 rounded mb-3">
      <p className="font-bold">#{order.numero_orden}</p>
      <p>Total: Bs {order.total}</p>

      <p className="text-sm text-gray-600">
        Cliente: {order.cliente}
      </p>

      {/* BOTONES DINÁMICOS */}
      <div className="flex flex-col gap-1 mt-2">
        {order.estado === "PENDIENTE" && (
          <button
            onClick={() => cambiarEstado(order.id, "ACEPTADO")}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Aceptar
          </button>
        )}

        {order.estado === "ACEPTADO" && (
          <button
            onClick={() => cambiarEstado(order.id, "PREPARANDO")}
            className="bg-yellow-500 text-white px-2 py-1 rounded"
          >
            Preparar
          </button>
        )}

        {order.estado === "PREPARANDO" && (
          <button
            onClick={() => cambiarEstado(order.id, "LISTO")}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Marcar listo
          </button>
        )}
      </div>
    </div>
  );

  const pendientes = orders?.filter((o) => o.estado === "PENDIENTE");
  const aceptados = orders?.filter((o) => o.estado === "ACEPTADO");
  const preparando = orders?.filter((o) => o.estado === "PREPARANDO");
  const listos = orders?.filter((o) => o.estado === "LISTO");

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
              {pendientes?.map(renderPedido)}
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
              {aceptados?.map(renderPedido)}
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
              {preparando?.map(renderPedido)}
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
              {listos?.map(renderPedido)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailRestaurant;
