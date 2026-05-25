import { createCrudOperations } from "./api.crud";
import { createApi } from "./api.config";


//BASE:
// /api/restaurante

const ApiRestaurant = createApi("restaurante"); //De la URL PRINCIPAL
// /api/restaurante/restaurantes                                    de la url de la app
export const RestaurantsApi = createCrudOperations(ApiRestaurant, "restaurantes");

// /api/restaurante/productos
const ApiProduct = createApi("restaurante");
export const ProductsApi = createCrudOperations(ApiProduct, "productos");