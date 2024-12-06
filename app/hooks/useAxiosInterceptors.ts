// hooks/useAxiosInterceptors.ts
"use client"; // Ensure this hook runs on the client side

import { useEffect } from "react";
import axiosInstance from "@/app/utils/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import {
  refreshAccessToken,
  logout,
  setCredentials,
} from "@/app/store/slices/authSlice";
import { deleteCookie } from "cookies-next";

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
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        if (typeof window === "undefined") {
          return config;
        }

        let token = accessToken;

        // If accessToken exists in the cookies, use it
        if (!token) {
          token =
            document?.cookie
              .split("; ")
              .find((row) => row.startsWith("accessToken="))
              ?.split("=")[1] || null;
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

        // Check if the error response includes requiresLogin
        if (error?.response?.data?.requiresLogin === true) {
          // Delete cookies and logout
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          deleteCookie("tokenExpiry");
          dispatch(logout()); // Clear user session from Redux
          return Promise.reject(new Error("Requires login"));
        }

        // If token is expired (401) and requires login is false
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          if (!isRefreshing) {
            isRefreshing = true;
            try {
              // Dispatch the refresh token action
              console.log("refreshing token");
              await dispatch(refreshAccessToken());
              isRefreshing = false;

              // Retrieve the new access token from Redux or cookies
              const newToken =
                localStorage.getItem("accessToken") ||
                document.cookie
                  .split("; ")
                  .find((row) => row.startsWith("accessToken="))
                  ?.split("=")[1];

              if (newToken) {
                dispatch(
                  setCredentials({
                    accessToken: newToken,
                    refreshToken:
                      localStorage.getItem("refreshToken") ||
                      document.cookie
                        .split("; ")
                        .find((row) => row.startsWith("refreshToken="))
                        ?.split("=")[1],
                  })
                );
                onRefreshed(newToken);
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
              } else {
                dispatch(logout());
                deleteCookie("accessToken");
                deleteCookie("refreshToken");
                deleteCookie("tokenExpiry");
                return Promise.reject(new Error("Failed to refresh token"));
              }
            } catch (error) {
              isRefreshing = false;
              dispatch(logout());
              deleteCookie("accessToken");
              deleteCookie("refreshToken");
              deleteCookie("tokenExpiry");
              return Promise.reject(error);
            }
          }

          // Wait for the token to be refreshed
          return new Promise((resolve) => {
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
