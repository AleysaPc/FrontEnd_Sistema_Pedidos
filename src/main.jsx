import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import { CartProvider } from "./context/CartContext";
// REACT QUERY
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Crear cliente
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </QueryClientProvider>
  </StrictMode>,
);
