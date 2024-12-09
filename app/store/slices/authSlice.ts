// store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/interfaces";
// import * as jwt_decode from "jwt-decode";
import axiosInstance from "@/app/utils/axiosInstance";
import { deleteCookie } from "cookies-next";
import { AxiosError } from "axios";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean | undefined;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: undefined,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        credentials
      );

      console.log("response is ", response);

      const { access_token, refresh_token, user, expires_at } =
        response.data.data;

      const tokenExpirey = new Date(expires_at).getTime();

      // Store tokens and expiration
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      localStorage.setItem("tokenExpiry", tokenExpirey.toString());

      // console.log("localStorage", localStorage);

      return { user, access_token, refresh_token };
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (_, { rejectWithValue }) => {
    console.log("refreshAccessToken Function (TEST)");
    try {
      // console.log("SDSd");
      const refreshToken = localStorage.getItem("refreshToken");
      // console.log(refreshToken);
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
        { refresh_token: refreshToken }
      );

      // console.log(response, "response");

      const { access_token } = response.data?.data;
      console.log(access_token);
      // const decodedToken: { exp: number } = jwt_decode(access_token);
      // const tokenExpirey = decodedToken.exp * 1000;

      // Update tokens and expiration
      localStorage.setItem("accessToken", access_token);

      // localStorage.setItem("tokenExpiry", tokenExpirey.toString());

      return { access_token };
    } catch (error: unknown) {
      console.log("error", error);
      // localStorage.removeItem("accessToken");
      // localStorage.removeItem("refreshToken");
      // localStorage.removeItem("tokenExpiry");
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      deleteCookie("user");
      console.log("Delete Cookie from authSlice");
      let errorMessage = "An unknown error occurred";

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeAuthState(state) {
      const accessToken = localStorage.getItem("accessToken");
      const tokenExpiry = localStorage.getItem("tokenExpiry");

      if (accessToken && tokenExpiry) {
        const expiryTime = parseInt(tokenExpiry);
        if (expiryTime > Date.now()) {
          state.accessToken = accessToken;
          state.isAuthenticated = true;
        } else {
          // Token has expired
          state.isAuthenticated = false;
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("tokenExpiry");
        }
      } else {
        state.isAuthenticated = false;
      }
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      // Clear tokens and expiration
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpiry");

      // Delete cookies
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      deleteCookie("user");
      console.log("Delete Cookie from authSlice - 2");
    },
    setCredentials(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      // state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.accessToken;
    },
  },
  extraReducers: (builder) => {
    // Handle login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle token refresh
    builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
      state.accessToken = action.payload.access_token;
      state.isAuthenticated = true;
    });
    builder.addCase(refreshAccessToken.rejected, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    });
  },
});

export const { logout, setCredentials, initializeAuthState } =
  authSlice.actions;

export default authSlice.reducer;
