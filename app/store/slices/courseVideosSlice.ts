import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";
import { ICourseVideosResponse, IVideo } from "@/interfaces";
import axiosInstance from "@/app/utils/axiosInstance";
import { getCookie } from "cookies-next"; // Import cookies-next library
import { AxiosError } from "axios";

interface IInitialState {
  courseVideos: ICourseVideosResponse | null;
  currentVideo: IVideo | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: IInitialState = {
  courseVideos: null,
  currentVideo: null,
  loading: "idle",
  error: null,
};

// Async thunk to fetch course videos
export const fetchCourseVideos = createAsyncThunk(
  "courseVideos/fetchCourseVideos",
  async (courseId: string, { rejectWithValue }) => {
    try {
      // Retrieve the access_token from cookies
      const accessToken = getCookie("access_token");
      // console.log(accessToken);
      if (!accessToken) {
        throw new Error("No access token found in cookies");
      }

      const { data } = await axiosInstance.get<ICourseVideosResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/video/subscription/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the token in the Authorization header
          },
        }
      );
      // console.log(data);
      return data;
      // return response.data;
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

const courseVideosSlice = createSlice({
  name: "courseVideos",
  initialState,
  reducers: {
    setCurrentVideo: (state, action: PayloadAction<IVideo | null>) => {
      state.currentVideo = action.payload;
    },
    resetCourseVideos: (state) => {
      state.courseVideos = null;
      state.currentVideo = null;
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseVideos.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchCourseVideos.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.courseVideos = action.payload;

        // Automatically select first video if available
        const allVideos = [
          ...(Array.isArray(action.payload.data.introVideos)
            ? action.payload.data.introVideos
            : []),
          ...(Array.isArray(action.payload.data.giftVideos)
            ? action.payload.data.giftVideos
            : []),
          ...action.payload.data.packageVideos,
          ...(Array.isArray(action.payload.data.endVideos)
            ? action.payload.data.endVideos
            : []),
        ];

        state.currentVideo = allVideos.length > 0 ? allVideos[0] : null;
      })
      .addCase(fetchCourseVideos.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentVideo, resetCourseVideos } = courseVideosSlice.actions;

export default courseVideosSlice.reducer;

// Selectors
export const selectCourseVideos = (state: RootState) =>
  state.courseVideos.courseVideos;
export const selectCurrentVideo = (state: RootState) =>
  state.courseVideos.currentVideo;
export const selectVideoLoading = (state: RootState) =>
  state.courseVideos.loading;
export const selectVideoError = (state: RootState) => state.courseVideos.error;
