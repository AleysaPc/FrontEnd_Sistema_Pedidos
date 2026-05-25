import { createCrudOperations } from "./api.crud";
import { createApi } from "./api.config";

const ApiUsers = createApi("usuarios");
export const UsersApi = createCrudOperations(ApiUsers, "users");

export const login = (email, password) => request(ApiUsers, "post", "login/", { email, password });