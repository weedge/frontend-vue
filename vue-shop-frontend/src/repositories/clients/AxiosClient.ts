import axios from "axios";

const baseDomain = "http://127.0.0.1:2021";
const baseURL = `${baseDomain}`;

const httpsClient = axios.create({
  baseURL,
});

httpsClient.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpsClient;
