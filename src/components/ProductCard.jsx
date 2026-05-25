function ProductCard({
  producto,

  onAgregar,
}) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden w-72 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="overflow-hidden">
        <img
          src={producto.imagen}
          alt={producto.nombre_producto}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
          {producto.nombre_producto}
        </h2>

        <p className="text-gray-500 mt-2 text-sm leading-relaxed h-10 overflow-hidden">
          {producto.descripcion}
        </p>

        <div className="flex justify-between items-center mt-6">
          <p className="text-2xl font-extrabold text-emerald-600">
            Bs. {producto.precio}
          </p>

          <button
            onClick={() => onAgregar(producto)}
            className="bg-linear-to-r from-blue-600 to-emerald-500 text-white px-5 py-2 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-md"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
