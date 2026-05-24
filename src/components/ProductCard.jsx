function ProductCard({

  producto,

  onAgregar

}) {

  return (

    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-64">

      <img
        src={producto.imagen}
        alt={producto.nombre_producto}
        className="w-full h-32 object-cover"
      />

      <div className="p-4">

        <h2 className="text-lg font-bold">

          {producto.nombre_producto}

        </h2>

        <p className="text-gray-600 mt-2 text-sm">

          {producto.descripcion}

        </p>

        <p className="text-green-600 font-bold text-lg mt-4">

          Bs. {producto.precio}

        </p>

        <button
          onClick={() => onAgregar(producto)}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
        >

          Agregar al carrito

        </button>

      </div>

    </div>
  );
}

export default ProductCard;