import { useNotificaciones } from "../hooks/useEntities";

function Navbar() {
  const { data } = useNotificaciones();

  const noLeidas = data?.filter((n) => !n.leido).length || 0;

  return (
    <div className="bg-linear-to-r from-blue-700 to-emerald-500 shadow-xl px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* LOGO / TITULO */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-wide text-white">
            🍽 Sistema
          </h1>

          <p className="text-sm text-blue-100 mt-1">
            Panel de gestión y pedidos
          </p>
        </div>

        {/* NOTIFICACIONES */}
        <div className="relative group cursor-pointer">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-all duration-300">
            🔔
          </div>

          {noLeidas > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold min-w-[24px] h-6 px-2 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
              {noLeidas}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
