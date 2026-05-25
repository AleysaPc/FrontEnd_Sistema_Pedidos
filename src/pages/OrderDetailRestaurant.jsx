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

  const pendientes = orders?.filter(o => o.estado === "PENDIENTE");
  const aceptados = orders?.filter(o => o.estado === "ACEPTADO");
  const preparando = orders?.filter(o => o.estado === "PREPARANDO");
  const listos = orders?.filter(o => o.estado === "LISTO");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Panel del Restaurante
      </h1>

      <div className="grid grid-cols-4 gap-4">

        {/* PENDIENTE */}
        <div>
          <h2 className="font-bold text-red-500 mb-2">
            PENDIENTE
          </h2>
          {pendientes?.map(renderPedido)}
        </div>

        {/* ACEPTADO */}
        <div>
          <h2 className="font-bold text-blue-500 mb-2">
            ACEPTADO
          </h2>
          {aceptados?.map(renderPedido)}
        </div>

        {/* PREPARANDO */}
        <div>
          <h2 className="font-bold text-yellow-500 mb-2">
            PREPARANDO
          </h2>
          {preparando?.map(renderPedido)}
        </div>

        {/* LISTO */}
        <div>
          <h2 className="font-bold text-green-500 mb-2">
            LISTO
          </h2>
          {listos?.map(renderPedido)}
        </div>

      </div>
    </div>
  );
}

export default OrderDetailRestaurant;