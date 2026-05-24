import { createApiInstance } from "./api.Base";
import { createCrudOperations } from "./api.crud";


const ApiUsers = createApi("usuarios");

export const UsersApi = createCrudOperations(ApiUsers, "users");