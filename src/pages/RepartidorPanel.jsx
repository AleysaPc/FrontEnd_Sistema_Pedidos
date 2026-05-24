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
    <div className="p-6">
      <h1 className="text-2xl font-bold">Pedidos disponibles</h1>

      {orders?.map((order) => (
        <div key={order.id} className="border p-4 mt-3">
          <p>Pedido #{order.numero_orden}</p>
          <p>Total: Bs {order.total}</p>

          <button
            onClick={() => aceptarPedido(order)}
            className="bg-green-500 text-white px-3 py-1 mt-2"
          >
            Aceptar pedido
          </button>
        </div>
      ))}
    </div>
  );
}

export default RepartidorPanel;
