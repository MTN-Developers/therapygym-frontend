// import { AxiosError } from 'axios';
// import axiosInstance from "@/app/utils/axiosInstance";
// import { IChapter, ICourseVideosResponse, IVideo, SubscribedCourse } from "@/interfaces";
// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// // interface IInitialState {
// //   course: SubscribedCourse | null;
// //   chapters: IChapter[] | null;
// //   currentVideo: IVideo | null; // This is to keep track of the current video being played.
// // }

// interface IInitialState {
//   courseVideos: ICourseVideosResponse | null;
//   currentVideo: IVideo | null;
//   loading: 'idle' | 'pending' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: IInitialState = {
//   courseVideos: null,
//   currentVideo: null,
//   loading: 'idle',
//   error: null,
// };

// // Async thunk to fetch course videos
// export const fetchCourseVideos = createAsyncThunk(
//   'courseVideos/fetchCourseVideos',
//   async (courseId: string, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get<ICourseVideosResponse>(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/video/subscription/course/${courseId}`
//       );
//       return response.data;
//     } catch (error: unknown) {
//       let errorMessage = "An unknown error occurred";

//       if (error instanceof AxiosError) {
//         errorMessage = error.response?.data?.message || error.message;
//       } else if (error instanceof Error) {
//         errorMessage = error.message;
//       }

//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// const playSubscribedCourseSlice = createSlice({
//   name: "playSubscribedCourse",
//   initialState,
//   reducers: {
//     setCourse: (state, action: PayloadAction<SubscribedCourse | null>) => {
//       state.
//     },
//     setChapters: (state, action: PayloadAction<IChapter[]>) => {
//       state.chapters = action.payload;
//     },
//     setCurrentVideo: (state, action: PayloadAction<IVideo | null>) => {
//       state.currentVideo = action.payload;
//     },
//   },
// });

// export const { setCourse, setChapters, setCurrentVideo } =
//   playSubscribedCourseSlice.actions;

// export default playSubscribedCourseSlice.reducer;
