import axios from "axios";

const ApiBaseURL = import.meta.env.VITE_API_BASE_URL;

// Crear instancia base de Axios
const createApiInstance = (baseURL = ApiBaseURL) => {
  const apiInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      Accept: "application/json",
    },
  });

  // Interceptor de solicitud
  apiInstance.interceptors.request.use(
    (config) => {
      // Obtener token guardado
      const token = localStorage.getItem("token");

      // Agregar Authorization
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      console.log("Token agregado:", config.headers.Authorization);

      return config;
    },

    (error) => {
      return Promise.reject(error);
    },
  );

  // Interceptor de respuesta
  apiInstance.interceptors.response.use(
    (response) => {
      return response;
    },

    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");

        console.error("Sesión expirada.");
      }

      return Promise.reject(error);
    },
  );

  return apiInstance;
};

// Función genérica request
const request = async (apiInstance, method, url, data = null) => {
  try {
    const response = await apiInstance.request({
      method,
      url,
      data,
    });

    console.log("Petición exitosa:", response);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error del servidor:", error.response.data);

      throw error.response.data;
    } else if (error.request) {
      console.error("Sin respuesta del servidor:", error.request);

      throw new Error("El servidor no está respondiendo.");
    } else {
      console.error("Error desconocido:", error.message);

      throw new Error(error.message);
    }
  }
};

export { createApiInstance, request };
