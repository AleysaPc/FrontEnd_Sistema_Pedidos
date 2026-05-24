import { useNotificaciones } from "../hooks/useEntities";

function Navbar() {
  const { data } = useNotificaciones();

  const noLeidas = data?.filter(n => !n.leido).length || 0;

  return (
    <div className="flex justify-between p-4 bg-gray-800 text-white">
      <h1>Sistema</h1>

      <div className="relative cursor-pointer">
        🔔

        {noLeidas > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
            {noLeidas}
          </span>
        )}
      </div>
    </div>
  );
}

export default Navbar;