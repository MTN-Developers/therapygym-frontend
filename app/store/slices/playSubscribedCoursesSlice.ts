import { IChapter, IVideo, SubscribedCourse } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  course: SubscribedCourse | null;
  chapters: IChapter[] | null;
  currentVideo: IVideo | null; // This is to keep track of the current video being played.
}

const initialState: IInitialState = {
  course: null,
  chapters: [],
  currentVideo: null,
};

const playSubscribedCourseSlice = createSlice({
  name: "playSubscribedCourse",
  initialState,
  reducers: {
    setCourse: (state, action: PayloadAction<SubscribedCourse | null>) => {
      state.course = action.payload;
    },
    setChapters: (state, action: PayloadAction<IChapter[]>) => {
      state.chapters = action.payload;
    },
    setCurrentVideo: (state, action: PayloadAction<IVideo | null>) => {
      state.currentVideo = action.payload;
    },
  },
});

export const { setCourse, setChapters, setCurrentVideo } =
  playSubscribedCourseSlice.actions;

export default playSubscribedCourseSlice.reducer;
