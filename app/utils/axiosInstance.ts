// utils/axiosInstance.ts
import axios from "axios";
import { store } from "../store/store";
import {
  refreshAccessToken,
  logout,
  setCredentials,
} from "../store/slices/authSlice";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// Flag to prevent multiple token refreshes
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Function to add subscribers waiting for token refresh
const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

// Function to notify subscribers with the new token
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

// Request interceptor to add the access token to headers and refresh if expired
axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem("accessToken");
    const tokenExpiry = localStorage.getItem("tokenExpiry");

    // Check if token is about to expire (e.g., within the next minute)
    if (tokenExpiry && Date.now() > parseInt(tokenExpiry) - 60000) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          // Refresh the token
          await store.dispatch(refreshAccessToken());
          isRefreshing = false;
          accessToken = localStorage.getItem("accessToken");

          if (accessToken) {
            // Update Redux store with new access token
            store.dispatch(
              setCredentials({
                accessToken,
                refreshToken: localStorage.getItem("refreshToken"),
              })
            );
            onRefreshed(accessToken);
          } else {
            store.dispatch(logout());
            return Promise.reject(new Error("Failed to refresh token"));
          }
        } catch (error) {
          isRefreshing = false;
          store.dispatch(logout());
          return Promise.reject(error);
        }
      }

      // Wait for the token to be refreshed
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((token: string) => {
          if (config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
          resolve(config);
        });
      });
    }

    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
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
          await store.dispatch(refreshAccessToken());
          isRefreshing = false;
          const accessToken = localStorage.getItem("accessToken");

          if (accessToken) {
            // Update Redux store with new access token
            store.dispatch(
              setCredentials({
                accessToken,
                refreshToken: localStorage.getItem("refreshToken"),
                user: null,
              })
            );
            onRefreshed(accessToken);
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return axiosInstance(originalRequest);
          } else {
            store.dispatch(logout());
            return Promise.reject(new Error("Failed to refresh token"));
          }
        } catch (refreshError) {
          isRefreshing = false;
          store.dispatch(logout());
          return Promise.reject(refreshError);
        }
      }

      // Wait for the token to be refreshed
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((token: string) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          resolve(axiosInstance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
