import { useOrders } from "../hooks/useEntities";
import { OrdersApi } from "../api/order";

function RepartidorOrderDetail() {
  const { data: orders, isLoading } = useOrders();

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

      <div className="flex flex-col gap-1 mt-2">

        {order.estado === "LISTO" && (
          <button
            onClick={() => cambiarEstado(order.id, "EN_CAMINO")}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Tomar pedido
          </button>
        )}

        {order.estado === "EN_CAMINO" && (
          <button
            onClick={() => cambiarEstado(order.id, "ENTREGADO")}
            className="bg-green-600 text-white px-2 py-1 rounded"
          >
            Marcar entregado
          </button>
        )}

      </div>
    </div>
  );

  const disponibles = orders?.filter((o) => o.estado === "LISTO");
  const enCamino = orders?.filter((o) => o.estado === "EN_CAMINO");
  const entregados = orders?.filter((o) => o.estado === "ENTREGADO");

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-blue-700 to-emerald-500 bg-clip-text text-transparent">
            🛵 Panel del Repartidor
          </h1>

          <p className="text-gray-500 mt-2">
            Gestiona las entregas y pedidos en ruta
          </p>
        </div>

        {/* COLUMNAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* LISTOS */}
          <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
            <div className="bg-linear-to-r from-blue-500 to-blue-700 p-4">
              <h2 className="font-extrabold text-white text-xl text-center tracking-wide">
                📦 LISTOS PARA RECOGER
              </h2>
            </div>

            <div className="p-4 space-y-4 min-h-[550px] bg-blue-50/40">
              {disponibles?.map(renderPedido)}
            </div>
          </div>

          {/* EN CAMINO */}
          <div className="bg-white rounded-3xl shadow-xl border border-yellow-100 overflow-hidden">
            <div className="bg-linear-to-r from-yellow-400 to-yellow-500 p-4">
              <h2 className="font-extrabold text-white text-xl text-center tracking-wide">
                🚚 EN CAMINO
              </h2>
            </div>

            <div className="p-4 space-y-4 min-h-[550px] bg-yellow-50/40">
              {enCamino?.map(renderPedido)}
            </div>
          </div>

          {/* ENTREGADOS */}
          <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden">
            <div className="bg-linear-to-r from-emerald-500 to-green-600 p-4">
              <h2 className="font-extrabold text-white text-xl text-center tracking-wide">
                ✅ ENTREGADOS
              </h2>
            </div>

            <div className="p-4 space-y-4 min-h-[550px] bg-emerald-50/40">
              {entregados?.map(renderPedido)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepartidorOrderDetail;
