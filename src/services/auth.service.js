import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/token/`, {
    username,
    password,
  });

  localStorage.setItem("access", response.data.access);

  localStorage.setItem("refresh", response.data.refresh);

  // DECODIFICAR TOKEN
  const decoded = jwtDecode(response.data.access);
  console.log(decoded);
  localStorage.setItem("user", JSON.stringify(decoded));

  return response.data;
};