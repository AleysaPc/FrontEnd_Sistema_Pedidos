import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { HistorialOrdersApi } from "../api/order";
import Navbar from "../components/Navbar";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Historial() {
  const [data, setData] = useState([]);
  const [params] = useSearchParams();
  const ordenId = params.get("orden_id");

  const printRef = useRef();

  // =========================
  // FORMATEAR FECHA
  // =========================
  const formatearFecha = (fecha) => {
    if (!fecha) return "-";

    const date = new Date(fecha);

    return new Intl.DateTimeFormat("es-BO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // =========================
  // CARGAR DATOS
  // =========================
  const cargar = async () => {
    try {
      const res = await HistorialOrdersApi.getFiltered({
        orden_id: ordenId,
      });

      const historial = res.results || res;

      setData([...historial].reverse());
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // EFFECT (ESTABLE)
  // =========================
  useEffect(() => {
    if (!ordenId) return;

    let interval;

    const init = async () => {
      await cargar();
      interval = setInterval(cargar, 3000);
    };

    init();

    return () => clearInterval(interval);
  }, [ordenId]);

  // =========================
  // GENERAR PDF (FIX COMPLETO)
  // =========================
  const generarPDF = async () => {
    const input = printRef.current;

    if (!input) return;

    const clone = input.cloneNode(true);

    try {
      // 🔥 eliminar estilos incompatibles (oklch + tailwind moderno)
      clone.querySelectorAll("*").forEach((el) => {
        el.style.color = "#111";
        el.style.backgroundColor = "#fff";
        el.style.borderColor = "#ddd";
        el.style.boxShadow = "none";
        el.style.backgroundImage = "none";
      });

      clone.style.background = "#fff";
      clone.style.padding = "20px";

      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);

      heightLeft -= 297;

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= 297;
      }

      pdf.save(`resumen-transaccion-${ordenId}.pdf`);
    } catch (error) {
      console.error("Error generando PDF:", error);
    } finally {
      document.body.removeChild(clone);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* HEADER */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              📜 Historial
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Historial de movimientos y estados del pedido
            </p>
          </div>

          {/* BOTÓN PDF */}

          <button
            onClick={generarPDF}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-2xl font-medium shadow-md transition-all"
          >
            📄 Descargar PDF
          </button>
        </div>

        {/* ========================= */}
        {/* CONTENIDO EXPORTABLE */}
        {/* ========================= */}
        <div ref={printRef} className="space-y-4 bg-white p-4 rounded-2xl">
          {data.length === 0 ? (
            <div className="border border-gray-200 rounded-2xl p-6 text-center text-gray-500 shadow-sm">
              No hay registros disponibles
            </div>
          ) : (
            data.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="font-bold text-gray-800 text-lg">
                      {item.estado}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Número de pedido: {item.orden_numero}
                    </p>

                    <div className="mt-3 text-sm text-gray-700 space-y-1">
                      <p>
                        👤 Cliente:{" "}
                        {item.cliente?.nombre_completo ||
                          item.cliente?.username}
                      </p>

                      <p>📞 Celular: {item.cliente?.telefono}</p>

                      <p>📍 Dirección: {item.cliente?.direccion}</p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200 flex items-center gap-2">
                    📅 {formatearFecha(item.fecha)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Historial;
