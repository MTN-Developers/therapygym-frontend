// hooks/useAxiosInterceptors.ts
"use client"; // Ensure this hook runs on the client side

import { useEffect } from "react";
import axiosInstance from "@/app/utils/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  refreshAccessToken,
  logout,
  setCredentials,
} from "@/app/store/slices/authSlice";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const useAxiosInterceptors = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        if (typeof window === "undefined") {
          return config;
        }

        let token = accessToken;
        const tokenExpiry = localStorage.getItem("tokenExpiry");

        // Check if token is about to expire
        if (tokenExpiry && Date.now() > parseInt(tokenExpiry) - 60000) {
          if (!isRefreshing) {
            isRefreshing = true;
            try {
              await dispatch(refreshAccessToken());
              isRefreshing = false;
              token = localStorage.getItem("accessToken");

              if (token) {
                dispatch(
                  setCredentials({
                    accessToken: token,
                    refreshToken: localStorage.getItem("refreshToken"),
                  })
                );
                onRefreshed(token);
              } else {
                dispatch(logout());
                return Promise.reject(new Error("Failed to refresh token"));
              }
            } catch (error) {
              isRefreshing = false;
              dispatch(logout());
              return Promise.reject(error);
            }
          }

          // Wait for the token to be refreshed
          return new Promise((resolve) => {
            subscribeTokenRefresh((newToken: string) => {
              if (config.headers) {
                config.headers["Authorization"] = `Bearer ${newToken}`;
              }
              resolve(config);
            });
          });
        }

        if (token && config.headers) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url.includes("/login") &&
          !originalRequest.url.includes("/refresh")
        ) {
          originalRequest._retry = true;

          if (!isRefreshing) {
            isRefreshing = true;
            try {
              await dispatch(refreshAccessToken());
              isRefreshing = false;
              const newToken = localStorage.getItem("accessToken");

              if (newToken) {
                dispatch(
                  setCredentials({
                    accessToken: newToken,
                    refreshToken: localStorage.getItem("refreshToken"),
                  })
                );
                onRefreshed(newToken);
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
              } else {
                dispatch(logout());
                return Promise.reject(new Error("Failed to refresh token"));
              }
            } catch (refreshError) {
              isRefreshing = false;
              dispatch(logout());
              return Promise.reject(refreshError);
            }
          }

          // Wait for the token to be refreshed
          return new Promise((resolve, reject) => {
            subscribeTokenRefresh((newToken: string) => {
              originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
              resolve(axiosInstance(originalRequest));
            });
          });
        }

        return Promise.reject(error);
      }
    );

    // Cleanup function to eject interceptors when component unmounts
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, dispatch]);
};

export default useAxiosInterceptors;
