import { useCart } from "../context/CartContext";
import { OrdersApi, DetalleOrdersApi } from "../api/order";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";

function Cart() {
  const { carrito, eliminarProducto, limpiarCarrito, total } = useCart();

  const navigate = useNavigate();

  // 🔒 BLOQUEAR DOBLE CLICK
  const [loading, setLoading] = useState(false);

  const crearOrden = async () => {
    // 🚫 evita múltiples clicks
    if (loading) return;

    setLoading(true);

    try {
      // 🛒 VALIDAR CARRITO
      if (!carrito.length) {
        await Swal.fire({
          icon: "warning",
          title: "Carrito vacío",
          text: "Debes agregar productos antes de continuar.",
          confirmButtonColor: "#f59e0b",
        });

        return;
      }

      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      // 🔐 VALIDAR LOGIN
      if (!user || !token) {
        await Swal.fire({
          icon: "info",
          title: "Inicio de sesión requerido",
          text: "Para continuar con tu pedido debes iniciar sesión o crear una cuenta.",
          confirmButtonText: "Ir al Login",
          confirmButtonColor: "#2563eb",
        });

        navigate("/login", {
          state: {
            from: "/carrito",
          },
        });

        return;
      }

      const restauranteId = carrito[0].restaurante;

      // 📦 CREAR ORDEN
      const responseOrden = await OrdersApi.create({
        estado: "PENDIENTE",
        total: total,
        metodo_pago: "EFECTIVO",
        ESTADOS_PAGO: "PENDIENTE",
        cliente: user.id,
        restaurante: restauranteId,
      });

      const ordenId = responseOrden.id;

      // 🧾 DETALLES
      for (const item of carrito) {
        await DetalleOrdersApi.create({
          orden: ordenId,
          producto_id: item.id,
          cantidad: item.cantidad,
          precio: item.precio,
        });
      }

      limpiarCarrito();

      // ✅ ÉXITO
      await Swal.fire({
        icon: "success",
        title: "Pedido realizado",
        text: "Tu pedido fue registrado correctamente.",
        confirmButtonColor: "#10b981",
      });

      navigate(`/orderDetail/${ordenId}`);
    } catch (error) {
      console.log("ERROR COMPLETO:", error);

      const mensaje =
        error?.detail || error?.message || "Error al crear la orden";

      await Swal.fire({
        icon: "error",
        title: "Ocurrió un error",
        text: mensaje,
        confirmButtonColor: "#ef4444",
      });
    } finally {
      // 🔓 volver a habilitar botón
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-emerald-50">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-blue-700 to-emerald-500 bg-clip-text text-transparent">
            🛒 Carrito de Compras
          </h1>

          <p className="text-gray-500 mt-2">
            Revisa tus productos antes de realizar el pedido
          </p>
        </div>

        {/* PRODUCTOS */}
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

        {/* TOTAL */}
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
              disabled={loading}
              className={`px-8 py-4 rounded-2xl text-lg font-bold shadow-xl transition-all duration-300
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-linear-to-r from-blue-700 to-emerald-500 text-white hover:scale-105"
                }`}
            >
              {loading ? "Procesando..." : "Realizar Pedido"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
