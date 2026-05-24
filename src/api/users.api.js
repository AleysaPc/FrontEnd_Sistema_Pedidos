import { createCrudOperations } from "./api.crud";
import { createApi } from "./api.confing";

const ApiUsers = createApi("usuarios");

export const UsersApi = createCrudOperations(ApiUsers, "users");