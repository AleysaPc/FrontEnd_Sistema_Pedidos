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
        cliente: user.id,
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
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-emerald-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-blue-700 to-emerald-500 bg-clip-text text-transparent">
            🛒 Carrito de Compras
          </h1>

          <p className="text-gray-500 mt-2">
            Revisa tus productos antes de realizar el pedido
          </p>
        </div>

        <div className="space-y-5">
          {carrito.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-100 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row justify-between items-center gap-6"
            >
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800">
                  {item.nombre_producto}
                </h2>

                <div className="mt-3 space-y-1">
                  <p className="text-gray-600 text-lg">
                    Precio:
                    <span className="font-semibold text-blue-700 ml-2">
                      Bs. {item.precio}
                    </span>
                  </p>

                  <p className="text-gray-600">
                    Cantidad:
                    <span className="font-semibold ml-2">{item.cantidad}</span>
                  </p>

                  <p className="font-bold text-emerald-600 text-lg mt-2">
                    Subtotal: Bs.{" "}
                    {(Number(item.precio) * item.cantidad).toFixed(2)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => eliminarProducto(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition-all duration-300"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-800">Total:</h2>

              <p className="text-4xl font-black text-emerald-600 mt-2">
                Bs. {total.toFixed(2)}
              </p>
            </div>

            <button
              onClick={crearOrden}
              className="bg-linear-to-r from-blue-700 to-emerald-500 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl hover:scale-105 transition-all duration-300"
            >
              Realizar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
