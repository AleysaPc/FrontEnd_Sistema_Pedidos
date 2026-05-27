import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Productos from "../pages/Products";
import OrderDetail from "../pages/OderDetail";
import Cart from "../pages/Cart";
import RestaurantePanel from "../pages/RestaurantDashboard";
import RepartidorPanel from "../pages/RepartidorPanel";
import RepartidorOrderDetail from "../pages/RepartidorOrderDetail";
import OrderDetailRestaurante from "../pages/OrderDetailRestaurant";
import HistorialOrden from "../pages/HistorialOrden";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Productos />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/productos" element={<Productos />} />

        <Route path="/carrito" element={<Cart />} />
        <Route path="/orderDetail/:id" element={<OrderDetail />} />

        <Route path="/panelRestaurante" element={<RestaurantePanel />} />

        <Route
          path="/panelRestaurante/:id"
          element={<OrderDetailRestaurante />}
        />
        <Route path="/repartidor" element={<RepartidorPanel /> } />
        <Route path="/repartidor/pedido/:id" element={<RepartidorOrderDetail />} />
        
        <Route path="/historial/" element={<HistorialOrden />} />
      </Routes>
      
        
    </BrowserRouter>
  );
}

export default AppRoutes;
