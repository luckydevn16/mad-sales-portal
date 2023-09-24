import axios from "axios";

const apiClient = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "/api",
    withCredentials: true,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => error.response
  );

  return instance;
};

export default apiClient;
