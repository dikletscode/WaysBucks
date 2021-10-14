import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:2021/api/v1/",
});

API.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (err) => {
    if (err.response!.status === 403) {
      localStorage.removeItem("_user");
      window.location.reload();
    } else {
      return Promise.reject(err);
    }
  }
);

export const setAuthToken = (token: string | null) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
