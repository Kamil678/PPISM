import axios from "axios";

function createInstance() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const config = {
    baseURL,
    headers: {
      Accept: "application/ld+json",
    },
  };

  const instance = axios.create(config);

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
}

export default createInstance;
