import { UsersApi } from "../api/users.api";
import { RestaurantsApi } from "../api/restaurant.api";
import { ProductsApi } from "../api/restaurant.api";
import { OrdersApi, DetalleOrdersApi, HistorialOrdersApi } from "../api/order";
import { useEntityMutations } from "./useEntityMutations";
import  useData  from "./useData";
import { useQuery } from "@tanstack/react-query";
import { NotificacionesApi } from "../api/order";

/////////////////////
//USUARIOS
//////////////////////

//OBTENIENDO LA LISTA DE USUARIOS
export const useUsers = (
  params = {},
  enable = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(UsersApi, "users", null, mergedParams, staleTime, enable);
};

export const useUser = (id) =>
  useData(UsersApi, "users", id, {}, 1000 * 60 * 5, !!id);
export const useUserMutations = () => useEntityMutations(UsersApi, "Usuario");

/////////////////////
//RESTAURANTES
//////////////////////

//OBTENIENDO LA LISTA DE RESTAURANTES
export const useRestaurants = (
  params = {},
  enable = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(RestaurantsApi, "restaurants", null, mergedParams, staleTime, enable);
};

export const useRestaurant = (id) =>
  useData(RestaurantsApi, "restaurants", id, {}, 1000 * 60 * 5, !!id);
export const useRestaurantMutations = () => useEntityMutations(RestaurantsApi, "Restaurante");

//OBTENIENDO LA LISTA PRODUCTOS
export const useProducts = (
  params = {},
  enable = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(ProductsApi, "products", null, mergedParams, staleTime, enable);
};

export const useProduct = (id) =>
  useData(ProductsApi, "products", id, {}, 1000 * 60 * 5, !!id);
export const useProductMutations = () => useEntityMutations(ProductsApi, "Producto");

/////////////////////
//ORDENES
//////////////////////

//OBTENIENDO LA LISTA DE ORDENES
export const useOrders = (
  params = {},
  enable = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(OrdersApi, "orders", null, mergedParams, staleTime, enable);
};

export const useOrder = (id) =>
  useData(OrdersApi, "order", id, {}, 1000 * 60 * 5, !!id);
export const useOrderMutations = () => useEntityMutations(OrdersApi, "Orden");

//OBTENIENDO DETALLE DE ORDEN
export const useDetalleOrders = (
  params = {},
  enable = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(DetalleOrdersApi, "detalleOrders", null, mergedParams, staleTime, enable);
};

export const useDetalleOrder = (id) =>
  useData(DetalleOrdersApi, "detalleOrder", id, {}, 1000 * 60 * 5, !!id);
export const useDetalleOrderMutations = () => useEntityMutations(DetalleOrdersApi, "DetalleOrden");


//OBTENIENDO HISTORIAL DE ORDEN
export const useHistorialOrders = (
  params = {},
  enable = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(HistorialOrdersApi, "historialOrders", null, mergedParams, staleTime, enable);
};

export const useHistorialOrder = (id) =>
  useData(HistorialOrdersApi, "historialOrder", id, {}, 1000 * 60 * 5, !!id);
export const useHistorialOrderMutations = () => useEntityMutations(HistorialOrdersApi, "HistorialOrden");


export const useNotificaciones = () => {
  return useQuery({
    queryKey: ["notificaciones"],
    queryFn: () => NotificacionesApi.getAll(),
  });
};