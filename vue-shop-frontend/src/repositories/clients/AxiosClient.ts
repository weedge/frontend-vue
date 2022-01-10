import axios from "axios";

//const baseDomain = "http://127.0.0.1:3333";
const baseDomain = "http://127.0.0.1:2021";
const baseURL = `${baseDomain}`;

const httpsClient = axios.create({
  baseURL,
});

// 添加请求拦截器
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

// 添加响应拦截器
httpsClient.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  console.log('response', response)
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default httpsClient;
