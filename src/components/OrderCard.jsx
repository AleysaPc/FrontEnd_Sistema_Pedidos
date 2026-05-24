import { useNavigate } from "react-router-dom";

function OrderCard({ order }) {
  const navigate = useNavigate();

  return (
    <div
      className="border p-4 rounded shadow cursor-pointer"
      onClick={() => navigate(`/panelRestaurante/${order.id}`)}
    >
      <h2>Pedido #{order.numero_orden}</h2>
      <p>Estado: {order.estado}</p>
      <p>Total: Bs {order.total}</p>
    </div>
  );
}

export default OrderCard;