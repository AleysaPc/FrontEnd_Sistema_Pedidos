import { createCrudOperations } from "./api.crud";
import { createApi } from "./api.config";

const ApiOrder = createApi("ordenes"); //url principal
export const OrdersApi = createCrudOperations(ApiOrder, "ordenes"); //url de la app

const ApiDettalleOrder = createApi("ordenes"); //url principal
export const DetalleOrdersApi = createCrudOperations(ApiDettalleOrder, "detalleordenes"); //url de la app

const ApiHistorialOrder = createApi("ordenes"); //url principal
export const HistorialOrdersApi = createCrudOperations(ApiHistorialOrder, "historialordenes"); //url de la app

const ApiNotificaciones = createApi("notificaciones"); //url principal
export const NotificacionesApi = createCrudOperations(ApiNotificaciones, "notificaciones"); //url de la app