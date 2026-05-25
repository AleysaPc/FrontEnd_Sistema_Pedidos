import { useOrders } from "../hooks/useEntities";
import { OrdersApi } from "../api/order";

function RepartidorOrderDetail() {
  const { data: orders, isLoading } = useOrders({
    refetchInterval: 3000, // 🔥 polling
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

      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="font-bold text-blue-500 mb-2">
            LISTOS PARA RECOGER
          </h2>
          {disponibles?.map(renderPedido)}
        </div>

        <div>
          <h2 className="font-bold text-yellow-500 mb-2">
            EN CAMINO
          </h2>
          {enCamino?.map(renderPedido)}
        </div>

        <div>
          <h2 className="font-bold text-green-500 mb-2">
            ENTREGADOS
          </h2>
          {entregados?.map(renderPedido)}
        </div>
      </div>
    </div>
  );
}

export default RepartidorOrderDetail;
