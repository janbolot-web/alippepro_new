import axios from "axios";

const instance = axios.create({
  baseURL: "https://fierce-crow-jumper.cyclic.app/api",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

// instance.interceptors.response.use(undefined, (error) => {
//   return error.response.data && error.response.data.message
// });

export default instance;

// https://evrika-backend.vercel.app/api
// http://localhost:5000/api
