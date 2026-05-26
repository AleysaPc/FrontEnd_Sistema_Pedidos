import { useNotificaciones } from "../hooks/useEntities";

function Navbar() {
  const { data } = useNotificaciones();

  const noLeidas = data?.filter((n) => !n.leido).length || 0;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
            🍽
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-800">Sistema</h1>

            <p className="text-xs text-gray-500">Gestión de pedidos</p>
          </div>
        </div>

        {/* DERECHA */}
        <div className="flex items-center gap-3">{/* botones */}</div>
      </div>
    </header>
  );
}

export default Navbar;
