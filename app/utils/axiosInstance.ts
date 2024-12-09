import axios, { InternalAxiosRequestConfig } from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async function (config: InternalAxiosRequestConfig) {
    if (typeof window === "undefined") {
      return config;
    } else {
      if (config.headers)
        config.headers["Authorization"] = `Bearer ${getCookie("access_token")}`;
      return config;
    }
  },
  function (error: unknown) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401) {
      // Refresh Token is Expired
      if (error?.response?.data?.requiresLogin === true) {
        deleteCookie("access_token");
        deleteCookie("refresh_token");
        deleteCookie("user");
        window.location.href = "/login";
        return Promise.reject(new Error("Requires login"));
      } else {
        // Refresh Token Not Expired
        const refreshToken = getCookie("refresh_token");
        const response = await axiosInstance.post("/auth/refresh", {
          refresh_token: refreshToken,
        });
        const { access_token } = response.data.data;
        setCookie("access_token", access_token);
        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
