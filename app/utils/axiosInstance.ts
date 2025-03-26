import axios, { InternalAxiosRequestConfig } from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
// import { cookies } from "next/headers";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async function (config: InternalAxiosRequestConfig) {
    if (typeof window === "undefined") {
      // const access_token = cookies().get("access_token");
      // config.headers["Authorization"] = `Bearer ${access_token}`;
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
      if (
        error?.response?.data?.requiresLogin === true &&
        window.location.pathname !== "/ar/videos-list"
      ) {
        deleteCookie("access_token");
        deleteCookie("refresh_token");
        deleteCookie("user");
        // console.log("Redirecting to login page 2");
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
