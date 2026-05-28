import { useNavigate } from "react-router-dom";

function OrderCard({ order }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
      onClick={() => navigate(`/panelRestaurante/${order.id}`)}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Pedido #{order.numero_orden}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Estado: {order.estado} <br />
            Cliente: {order.cliente?.nombre_completo ||
              order.cliente?.username}{" "}
            <br />
            Celular: {order.cliente?.telefono} <br />
            Dirección: {order.cliente?.direccion}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">Total</p>

          <p className="text-xl font-bold text-emerald-600">Bs {order.total}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
