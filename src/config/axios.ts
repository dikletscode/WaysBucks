import axios from "axios";

export const API = axios.create({
  baseURL: "https://waysbuck.herokuapp.com/api/v1/",
});

API.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (err) => {
    console.log(err, "Err");
    if (err.response && err.response!.status === 403) {
      localStorage.removeItem("_user");
      window.location.reload();
    } else if (err.response && err.response!.status === 500) {
      window.location.replace("/error");
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
