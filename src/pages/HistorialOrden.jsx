import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HistorialOrdersApi } from "../api/order";
import Navbar from "../components/Navbar";

function Historial() {
  const [data, setData] = useState([]);
  const [params] = useSearchParams();

  const ordenId = params.get("orden_id");

  const cargar = async () => {
    try {
      const res = await HistorialOrdersApi.getFiltered({
        orden_id: ordenId,
      });

      setData(res.results || res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!ordenId) return;

    cargar();

    const interval = setInterval(cargar, 3000);

    return () => clearInterval(interval);
  }, [ordenId]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-6">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            📜 Historial
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Historial de movimientos y estados del pedido
          </p>
        </div>

        {/* LISTA */}
        <div className="space-y-4">

          {data.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center text-gray-500 shadow-sm">
              No hay registros disponibles
            </div>
          ) : (
            data.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  {/* ESTADO + USUARIO */}
                  <div>
                    <p className="font-bold text-gray-800 text-lg">
                      {item.estado}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.usuario_nombre}
                    </p>
                  </div>

                  {/* FECHA */}
                  <div className="text-sm text-gray-400 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                    {item.fecha}
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