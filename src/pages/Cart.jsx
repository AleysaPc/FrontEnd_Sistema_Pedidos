import { useCart } from "../context/CartContext";
import { OrdersApi, DetalleOrdersApi } from "../api/order";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { carrito, eliminarProducto, limpiarCarrito, total } = useCart();
  const navigate = useNavigate();

  const crearOrden = async () => {
    try {
      if (!carrito.length) {
        alert("El carrito está vacío");
        return;
      }

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Usuario no autenticado");
        return;
      }

      const restauranteId = carrito[0].restaurante;

      // =========================
      // CREAR ORDEN
      // =========================
      const responseOrden = await OrdersApi.create({
        estado: "PENDIENTE",
        total: total,
        metodo_pago: "EFECTIVO",
        ESTADOS_PAGO: "PENDIENTE",
        cliente: user.user_id,
        restaurante: restauranteId,
      });

      const ordenId = responseOrden.id;

      // =========================
      // CREAR DETALLES
      // =========================
      for (const item of carrito) {
        await DetalleOrdersApi.create({
          orden: ordenId,
          producto_id: item.id,
          cantidad: item.cantidad,
          precio: item.precio,
        });
      }

      // Limpiar carrito
      limpiarCarrito();

      alert("Pedido realizado con éxito");

      // =========================
      // REDIRECCIÓN A DETALLE
      // =========================
      navigate(`/orderDetail/${ordenId}`);

    } catch (error) {
      console.log("ERROR COMPLETO:", error);

      const mensaje =
        error?.detail ||
        error?.message ||
        "Error al crear la orden";

      alert(mensaje);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Carrito</h1>

      {carrito.map((item) => (
        <div
          key={item.id}
          className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center"
        >
          <div>
            <h2 className="font-bold">{item.nombre_producto}</h2>
            <p>Bs. {item.precio}</p>
            <p className="text-gray-600">
              Cantidad: {item.cantidad}
            </p>

            <p className="font-bold text-green-600">
              Subtotal: Bs.{" "}
              {(Number(item.precio) * item.cantidad).toFixed(2)}
            </p>
          </div>

          <button
            onClick={() => eliminarProducto(item.id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Eliminar
          </button>
        </div>
      ))}

      <div className="mt-6">
        <h2 className="text-2xl font-bold">
          Total: Bs. {total.toFixed(2)}
        </h2>

        <button
          onClick={crearOrden}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Realizar Pedido
        </button>
      </div>
    </div>
  );
}

export default Cart;