import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useOrder } from "../hooks/useEntities";
import { OrdersApi } from "../api/order";
import Navbar from "../components/Navbar";

function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: order, isLoading, isError } = useOrder(id);

  const [showModal, setShowModal] = useState(false);
  const [metodoPago, setMetodoPago] = useState("");

  const seleccionarMetodoPago = async (tipo) => {
    try {
      if (tipo === "EFECTIVO") {
        await OrdersApi.update(id, {
          metodo_pago: "EFECTIVO",
          estado_pago: "PAGADO",
        });

        alert("Pago en efectivo confirmado");

        navigate(`/historial?orden_id=${order?.numero_orden}`, { replace: true });
        return;
      }

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

  const confirmarPagoQR = async () => {
    try {
      await OrdersApi.update(id, {
        estado_pago: "PAGADO",
      });

      setShowModal(false);
      alert("Pago QR confirmado");

      navigate(`/historial?orden_id=${order?.numero_orden}`, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-emerald-50">

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-6">

        {/* ===================== */}
        {/* HEADER */}
        {/* ===================== */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-8 mb-8">

          <h1 className="text-3xl md:text-4xl font-extrabold bg-linear-to-r from-blue-700 to-emerald-500 bg-clip-text text-transparent">
            📦 Orden #{order?.numero_orden}
          </h1>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="bg-emerald-50 border border-emerald-100 px-5 py-3 rounded-2xl">
              <p className="text-xs text-emerald-600">Estado</p>
              <span className="font-bold text-emerald-700">
                {order?.estado}
              </span>
            </div>

            <div className="bg-blue-50 border border-blue-100 px-5 py-3 rounded-2xl">
              <p className="text-xs text-blue-600">Total</p>
              <p className="text-2xl font-extrabold text-blue-700">
                Bs. {order?.total}
              </p>
            </div>

          </div>
        </div>

        {/* ===================== */}
        {/* PRODUCTOS */}
        {/* ===================== */}
        <section className="mb-8">

          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold text-gray-800">
              🍔 Productos
            </h2>

            <span className="text-sm text-gray-500">
              {order?.detalles_orden?.length || 0} items
            </span>
          </div>

          <div className="space-y-4">

            {order?.detalles_orden?.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 p-6"
              >
                <div className="flex flex-col md:flex-row justify-between gap-5">

                  <div>
                    <p className="text-xl font-bold text-gray-800">
                      {item.producto.nombre_producto}
                    </p>

                    <p className="text-gray-500 mt-2">
                      Cantidad:
                      <span className="ml-2 font-semibold text-gray-700">
                        {item.cantidad}
                      </span>
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-sm text-gray-500">Subtotal</p>
                    <p className="text-2xl font-extrabold text-emerald-600">
                      Bs. {item.precio}
                    </p>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </section>

        {/* ===================== */}
        {/* BOTONES DE PAGO */}
        {/* ===================== */}
        <section className="bg-white border border-gray-100 rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            💳 Método de Pago
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <button
              onClick={() => seleccionarMetodoPago("EFECTIVO")}
              className="bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg transition-all hover:scale-105"
            >
              💵 Efectivo
            </button>

            <button
              onClick={() => seleccionarMetodoPago("QR")}
              className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-lg transition-all hover:scale-105"
            >
              📱 QR
            </button>

          </div>
        </section>

        {/* ===================== */}
        {/* MODAL QR */}
        {/* ===================== */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">

            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">

              <h2 className="text-3xl font-bold text-blue-700 mb-2">
                Pago con QR
              </h2>

              <p className="text-gray-500 mb-6">
                Escanea el código para completar el pago
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=orden123"
                  alt="QR"
                  className="mx-auto rounded-xl"
                />
              </div>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={confirmarPagoQR}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-2xl font-bold"
                >
                  Confirmar
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-2xl font-bold"
                >
                  Cancelar
                </button>

              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}

export default OrderDetail;