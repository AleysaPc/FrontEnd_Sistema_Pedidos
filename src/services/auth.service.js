import { createApi } from "../api/api.config"; // OJO: corregido nombre

const ApiUsers = createApi("usuarios");

export const login = async (email, password) => {
  const response = await ApiUsers.post("login/", {
    email,
    password,
  });

  return response.data; // 🔥 IMPORTANTE
};