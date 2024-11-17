// subscribedCoursesSlice.tsx
import axiosInstance from "@/app/utils/axiosInstance";
import { SubscribedCourseApi } from "@/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface SubscribedCoursesState {
  courses: SubscribedCourseApi[];
  loading: boolean;
  error: string | null;
}

const initialState: SubscribedCoursesState = {
  courses: [],
  loading: false,
  error: null,
};

export const fetchSubscribedCourses = createAsyncThunk<
  SubscribedCourseApi[],
  void,
  { rejectValue: string }
>("subscribedCourses/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/user/approved-courses");
    return response.data.courses;
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return rejectWithValue(errorMessage);
  }
});

const SubscribedCoursesSlice = createSlice({
  name: "subscribedCourses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscribedCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscribedCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchSubscribedCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default SubscribedCoursesSlice.reducer;
