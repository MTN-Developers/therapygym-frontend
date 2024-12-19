import axiosInstance from "@/app/utils/axiosInstance";
import { UserData } from "@/types/profile";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface IInitialState {
  userData: UserData;
  loading: boolean;
  error: string | null;
}

const initialState: IInitialState = {
  userData: null,
  loading: false,
  error: null,
};

export const fetchUserProfile = createAsyncThunk<
  UserData,
  void,
  { rejectValue: string }
>("user-profile", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("user/me");

    console.log("user data profile response is ", response);
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = "an error occurred while fetching";

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return rejectWithValue(errorMessage);
  }
});

const UserProfileSlice = createSlice({
  name: "userProfile",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default UserProfileSlice.reducer;
