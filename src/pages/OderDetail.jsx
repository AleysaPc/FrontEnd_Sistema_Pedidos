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
        navigate(`/historial?orden_id=${order?.numero_orden}`, { replace: true });
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
      navigate(`/historial?orden_id=${order?.numero_orden}`, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  // if (isLoading) return <p>Cargando...</p>;
  // if (isError) return <p>Error cargando orden</p>;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-emerald-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* ===================== */}
        {/* HEADER */}
        {/* ===================== */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 mb-8">
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-blue-700 to-emerald-500 bg-clip-text text-transparent">
            📦 Orden #{order?.numero_orden}
          </h1>

          <div className="mt-5 space-y-2">
            <p className="text-lg text-gray-700">
              Estado:
              <span className="ml-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                {order?.estado}
              </span>
            </p>

            <p className="text-2xl font-bold text-blue-700">
              Total: Bs. {order?.total}
            </p>
          </div>
        </div>

        {/* ===================== */}
        {/* PRODUCTOS */}
        {/* ===================== */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            🍔 Productos
          </h2>

          <div className="space-y-4">
            {order?.detalles_orden?.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-800">
                      {item.producto.nombre_producto}
                    </p>

                    <p className="text-gray-500 mt-2">
                      Cantidad:
                      <span className="font-semibold ml-2 text-gray-700">
                        {item.cantidad}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center">
                    <p className="text-2xl font-extrabold text-emerald-600">
                      Bs. {item.precio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===================== */}
        {/* BOTONES DE PAGO */}
        {/* ===================== */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            💳 Método de Pago
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => seleccionarMetodoPago("EFECTIVO")}
              className="flex-1 bg-linear-to-r from-emerald-500 to-green-600 text-white py-4 rounded-2xl text-lg font-bold shadow-lg hover:scale-105 transition-all duration-300"
            >
              💵 Efectivo
            </button>

            <button
              onClick={() => seleccionarMetodoPago("QR")}
              className="flex-1 bg-linear-to-r from-blue-600 to-blue-800 text-white py-4 rounded-2xl text-lg font-bold shadow-lg hover:scale-105 transition-all duration-300"
            >
              📱 QR
            </button>
          </div>
        </div>

        {/* ===================== */}
        {/* MODAL QR */}
        {/* ===================== */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 text-center w-full max-w-md animate-fade-in">
              <h2 className="text-3xl font-extrabold text-blue-700 mb-2">
                Pago con QR
              </h2>

              <p className="text-gray-500 mb-6">
                Escanea el código para completar el pago
              </p>

              <div className="bg-gray-50 p-6 rounded-2xl shadow-inner">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=orden123"
                  alt="QR"
                  className="mx-auto rounded-xl"
                />
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={confirmarPagoQR}
                  className="flex-1 bg-linear-to-r from-emerald-500 to-green-600 text-white py-3 rounded-2xl font-bold hover:scale-105 transition-all duration-300"
                >
                  Confirmar
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-2xl font-bold transition-all duration-300"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderDetail;
