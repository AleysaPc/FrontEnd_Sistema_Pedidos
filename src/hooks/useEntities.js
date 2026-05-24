import { UsersApi } from "../api/users.api";
import { useData } from "./useData";
import { useEntityMutations } from "./useEntityMutations";

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