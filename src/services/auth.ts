import { API } from "../config/axios";

export interface LoginInput {
  email: string;
  password: string;
}
export interface RegisInput extends LoginInput {
  fullname: string;
}
export type LoginResponse = {
  id: string;
  role: number;
  fullname: string;
  email: string;
  images: string;
};

export const login = (user: LoginInput): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    API.post("login", user)
      .then((res) => {
        resolve(res.data.user);
        localStorage.setItem("_user", JSON.stringify(res.data));
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export const register = (user: RegisInput): Promise<any> => {
  return new Promise((resolve, reject) => {
    API.post("register", user)
      .then((res) => {
        resolve(res.data.message);
      })
      .catch((err) => {
        reject(err.response.data.message);
      });
  });
};

export interface ProfileType {
  id: string;

  email: string;

  profile: {
    fullname: string;
    image: string;
  };
}

export const profile = (): Promise<ProfileType> => {
  return new Promise((resolve, reject) => {
    API.get("profile")
      .then((res) => {
        resolve(res.data.users);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
export const editProfile = (obj: FormData): Promise<ProfileType> => {
  return new Promise((resolve, reject) => {
    API.patch("user", obj, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res.data);
        resolve(res.data.users);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
