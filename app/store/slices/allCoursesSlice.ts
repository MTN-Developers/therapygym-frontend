import axiosInstance from "@/app/utils/axiosInstance";
import { Course } from "@/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const fetchAllCourses = createAsyncThunk<Course[]>(
  "allCourses",
  async (_, { rejectWithValue }) => {
    // fetch all courses
    try {
      const response = await axiosInstance.get("/getAllCourses");
      return response.data;
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

interface AllCoursesState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: AllCoursesState = {
  courses: [],
  loading: false,
  error: null,
};

const AllCourses = createSlice({
  name: "AllCourses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default AllCourses.reducer;
