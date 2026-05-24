import { useOrders } from "../hooks/useEntities";
import OrderCard from "../components/OrderCard";

function RestaurantePanel() {
  const { data: orders, isLoading } = useOrders();

  if (isLoading) return <p>Cargando pedidos...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Panel del Restaurante
      </h1>

      <div className="grid gap-4">
        {orders?.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default RestaurantePanel;