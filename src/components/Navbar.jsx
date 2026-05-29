import { Link, useNavigate } from "react-router-dom";
import { useNotificaciones } from "../hooks/useEntities";

function Navbar() {
  const { data } = useNotificaciones();

  const navigate = useNavigate();

  const noLeidas = data?.filter((n) => !n.leido).length || 0;

  // 🔐 usuario logueado
  const user = JSON.parse(localStorage.getItem("user"));

  // 🚪 cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

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
        <div className="flex items-center gap-3">
          {/* VOLVER */}
          <Link
            to="/productos"
            className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-2xl font-medium shadow-md transition-all"
          >
            🏠 Volver
          </Link>

          {/* NOTIFICACIONES */}
          <div className="relative">
            <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-2xl transition-all">
              🔔
            </button>

            {noLeidas > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {noLeidas}
              </span>
            )}
          </div>

          {/* LOGIN / LOGOUT */}
          {user ? (
            <button
              onClick={cerrarSesion}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-2xl font-medium shadow-md transition-all"
            >
              🚪 Cerrar sesión
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-2xl font-medium shadow-md transition-all"
            >
              🔐 Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
