import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HistorialOrdersApi } from "../api/order";

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
    <div className="p-6">
      <h1 className="text-xl font-bold">Historial</h1>

      {data.map((item) => (
        <div key={item.id} className="border p-3 mt-2">
          <p>{item.estado}</p>
          <p>{item.usuario_nombre}</p>
          <p>{item.fecha}</p>
        </div>
      ))}
    </div>
  );
}

export default Historial;