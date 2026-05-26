function ProductCard({
  producto,

  onAgregar,
}) {
  return (
  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">

    <img
      src={producto.imagen}
      alt={producto.nombre_producto}
      className="w-full h-44 object-cover"
    />

    <div className="p-5">

      <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
        {producto.nombre_producto}
      </h2>

      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
        {producto.descripcion}
      </p>

      <div className="flex items-center justify-between mt-6">

        <p className="text-xl font-bold text-emerald-600">
          Bs. {producto.precio}
        </p>

        <button
          onClick={() => onAgregar(producto)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-all"
        >
          Agregar
        </button>
      </div>
    </div>
  </div>
);
}

export default ProductCard;
