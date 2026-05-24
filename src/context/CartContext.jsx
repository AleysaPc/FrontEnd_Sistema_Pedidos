import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // AGREGAR PRODUCTO
  const agregarProducto = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);

    if (existe) {
      const nuevoCarrito = carrito.map((item) =>
        item.id === producto.id
          ? {
              ...item,
              cantidad: item.cantidad + 1,
            }
          : item,
      );

      setCarrito(nuevoCarrito);
    } else {
      setCarrito([
        ...carrito,
        {
          ...producto,
          cantidad: 1,
        },
      ]);
    }
  };

  // ELIMINAR PRODUCTO
  const eliminarProducto = (id) => {
    const producto = carrito.find((item) => item.id === id);

    if (producto.cantidad > 1) {
      const nuevoCarrito = carrito.map((item) =>
        item.id === id
          ? {
              ...item,
              cantidad: item.cantidad - 1,
            }
          : item,
      );

      setCarrito(nuevoCarrito);
    } else {
      setCarrito(carrito.filter((item) => item.id !== id));
    }
  };

  // LIMPIAR CARRITO
  const limpiarCarrito = () => {
    setCarrito([]);
  };

  // TOTAL
  const total = carrito.reduce(
    (acc, item) => acc + Number(item.precio) * item.cantidad,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarProducto,
        eliminarProducto,
        limpiarCarrito,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
