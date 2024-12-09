// utils/axiosInstance.ts
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

// write here axiosInstance.interceptors.response.use and check if the response status is 401 then check if there is error?.response?.data?.requiresLogin === true then delete the cookies and redirect to login page else get the refresh token from the cookies and call the refresh token endpoint to get the new access token and refresh token and set the cookies with the new access token and refresh token and then retry the original request with the new access token

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401) {
      if (error?.response?.data?.requiresLogin === true) {
        // Delete cookies and redirect to login page
        deleteCookie("access_token");
        deleteCookie("refresh_token");
        deleteCookie("user");
        alert("Requires login. Please login again.");
        // router.push("/login");
        return Promise.reject(new Error("Requires login"));
      }

      if (!originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = getCookie("refresh_token");
        const response = await axiosInstance.post("/auth/refresh", {
          refresh_token: refreshToken,
        });
        const { access_token, refresh_token } = response.data;
        setCookie("access_token", access_token, { path: "/" });
        setCookie("refresh_token", refresh_token, { path: "/" });
        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
