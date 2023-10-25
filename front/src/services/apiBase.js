import axios from "axios";
import { useUserStore } from "../store/user";

function createInstance() {
  const userStore = useUserStore();
  const baseURL = import.meta.env.VITE_BASE_URL;
  const config = {
    baseURL,
    headers: {
      Accept: "application/ld+json",
      Authorization: "Bearer " + userStore.token,
    },
  };

  const instance = axios.create(config);

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 401 || error.response.status === 500) {
        userStore.clearToken();
        userStore.clearUser();
        window.location.href = "/auth";
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

export default createInstance;
