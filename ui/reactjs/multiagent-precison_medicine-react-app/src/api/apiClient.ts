import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000000,
});

apiClient.interceptors.request.use(
  (config) => {
    console.info(
      `[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`,
    );

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[API ERROR]", error);
    return Promise.reject(error);
  },
);

export default apiClient;