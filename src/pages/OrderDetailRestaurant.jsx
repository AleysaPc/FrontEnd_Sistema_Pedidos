import { useOrders } from "../hooks/useEntities";
import { OrdersApi } from "../api/order";
import Navbar from "../components/Navbar";

function OrderDetailRestaurant() {
  const {
    data: orders,
    isLoading,
    refetch,
  } = useOrders({
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
  });

  const cambiarEstado = async (id, estado) => {
    try {
      await OrdersApi.update(id, { estado });
      await refetch();
    } catch (error) {
      console.error("Error actualizando pedido:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Cargando pedidos...</p>
      </div>
    );
  }

  const renderPedido = (order) => (
    <div
      key={order.id}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-4"
    >
      <p className="font-bold text-gray-800">#{order.numero_orden}</p>

      <p className="text-sm text-gray-600 mt-1">
        Cliente: <span className="font-medium">{order.cliente?.nombre_completo || order.cliente?.username}</span>
      </p>

      <p className="text-sm text-gray-600">
        Total: <span className="font-semibold">Bs {order.total}</span>
      </p>

      {/* BOTONES */}
      <div className="flex flex-col gap-2 mt-3">

        {order.estado === "PENDIENTE" && (
          <button
            onClick={() => cambiarEstado(order.id, "ACEPTADO")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-xl text-sm font-semibold transition-all"
          >
            Aceptar
          </button>
        )}

        {order.estado === "ACEPTADO" && (
          <button
            onClick={() => cambiarEstado(order.id, "PREPARANDO")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-xl text-sm font-semibold transition-all"
          >
            Preparar
          </button>
        )}

        {order.estado === "PREPARANDO" && (
          <button
            onClick={() => cambiarEstado(order.id, "LISTO")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-xl text-sm font-semibold transition-all"
          >
            Marcar listo
          </button>
        )}

      </div>
    </div>
  );

  const pendientes = orders?.filter((o) => o.estado === "PENDIENTE") || [];
  const aceptados = orders?.filter((o) => o.estado === "ACEPTADO") || [];
  const preparando = orders?.filter((o) => o.estado === "PREPARANDO") || [];
  const listos = orders?.filter((o) => o.estado === "LISTO") || [];

  const Column = ({ title, color, items, bg, border }) => (
    <div className={`rounded-3xl shadow-xl overflow-hidden border ${border} bg-white`}>

      <div className={`${color} p-4`}>
        <h2 className="text-white font-extrabold text-center text-lg tracking-wide">
          {title}
        </h2>
      </div>

      <div className={`p-4 space-y-4 min-h-[500px] ${bg}`}>
        {items.length > 0 ? (
          items.map(renderPedido)
        ) : (
          <p className="text-center text-gray-400 text-sm">
            Sin pedidos
          </p>
        )}
      </div>

    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-emerald-50">

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-blue-700 to-emerald-500 bg-clip-text text-transparent">
            🍽 Panel del Restaurante
          </h1>

          <p className="text-gray-500 mt-2">
            Gestiona pedidos en tiempo real
          </p>
        </div>

        {/* COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <Column
            title="🔴 PENDIENTE"
            color="bg-gradient-to-r from-red-500 to-red-600"
            items={pendientes}
            bg="bg-red-50/40"
            border="border-red-100"
          />

          <Column
            title="🔵 ACEPTADO"
            color="bg-gradient-to-r from-blue-500 to-blue-700"
            items={aceptados}
            bg="bg-blue-50/40"
            border="border-blue-100"
          />

          <Column
            title="🟡 PREPARANDO"
            color="bg-gradient-to-r from-yellow-400 to-yellow-500"
            items={preparando}
            bg="bg-yellow-50/40"
            border="border-yellow-100"
          />

          <Column
            title="🟢 LISTO"
            color="bg-gradient-to-r from-emerald-500 to-green-600"
            items={listos}
            bg="bg-emerald-50/40"
            border="border-emerald-100"
          />

        </div>

      </main>
    </div>
  );
}

export default OrderDetailRestaurant;