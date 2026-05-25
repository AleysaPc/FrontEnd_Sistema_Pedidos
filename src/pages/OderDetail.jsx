import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useOrder } from "../hooks/useEntities";
import { OrdersApi } from "../api/order";

function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: order, isLoading, isError } = useOrder(id);

  const [showModal, setShowModal] = useState(false);
  const [metodoPago, setMetodoPago] = useState("");

  // =========================
  // SELECCIONAR MÉTODO
  // =========================
  const seleccionarMetodoPago = async (tipo) => {
    try {
      // 💵 EFECTIVO → pago directo
      if (tipo === "EFECTIVO") {
        await OrdersApi.update(id, {
          metodo_pago: "EFECTIVO",
          estado_pago: "PAGADO",
        });

        alert("Pago en efectivo confirmado");

        // 🔥 REDIRECCIÓN
        navigate("/productos", { replace: true });
        return;
      }

      // 📱 QR → abrir modal + marcar pendiente
      if (tipo === "QR") {
        setMetodoPago("QR");
        setShowModal(true);

        await OrdersApi.update(id, {
          metodo_pago: "QR",
          estado_pago: "PENDIENTE",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // CONFIRMAR PAGO QR
  // =========================
  const confirmarPagoQR = async () => {
    try {
      await OrdersApi.update(id, {
        estado_pago: "PAGADO",
      });

      setShowModal(false);
      alert("Pago QR confirmado");

      // 🔥 REDIRECCIÓN
      navigate("/productos", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error cargando orden</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Orden #{order?.numero_orden}
      </h1>

      <p>Estado: {order?.estado}</p>
      <p>Total: Bs. {order?.total}</p>

      {/* ===================== */}
      {/* PRODUCTOS */}
      {/* ===================== */}
      <h2 className="mt-4 text-xl font-bold">Productos</h2>

      {order?.detalles_orden?.map((item) => (
        <div key={item.id} className="border p-3 mt-2">
          <p>Producto: {item.producto.nombre_producto}</p>
          <p>Cantidad: {item.cantidad}</p>
          <p>Precio: Bs. {item.precio}</p>
        </div>
      ))}

      {/* ===================== */}
      {/* BOTONES DE PAGO */}
      {/* ===================== */}
      <div className="mt-6">
        <button
          onClick={() => seleccionarMetodoPago("EFECTIVO")}
          className="bg-green-500 text-white px-4 py-2 mr-2"
        >
          Efectivo
        </button>

        <button
          onClick={() => seleccionarMetodoPago("QR")}
          className="bg-blue-500 text-white px-4 py-2"
        >
          QR
        </button>
      </div>

      {/* ===================== */}
      {/* MODAL QR */}
      {/* ===================== */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg text-center">
            <h2 className="text-xl font-bold mb-4">
              Pago con QR
            </h2>

            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=orden123"
              alt="QR"
              className="mx-auto"
            />

            <button
              onClick={confirmarPagoQR}
              className="bg-green-500 text-white px-4 py-2 mt-4"
            >
              Confirmar pago
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="ml-2 bg-gray-400 px-4 py-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetail;