import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Productos from "../pages/Products";
import OrderDetail from "../pages/OderDetail";
import Cart from "../pages/Cart";

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/productos"
          element={<Productos />}
        />

        <Route
          path="/carrito"
          element={<Cart />}
        />
        <Route
          path="/orderDetail/:id"
          element={<OrderDetail />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;