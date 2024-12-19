import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import sidebarReducer from "./slices/sidebarSlice";
import authReducer from "./slices/authSlice";
import allCoursesReducer from "./slices/allCoursesSlice";
import userProfileReducer from "./slices/userProfileSlice";
import subscribedCoursesSliceReducer from "./slices/subscribedCoursesSlice";
import courseVideosReducer from "./slices/courseVideosSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const rootReducer = combineReducers({
  auth: authReducer,
  subscribedCourses: subscribedCoursesSliceReducer,
  allCourses: allCoursesReducer,
  sidebar: sidebarReducer,
  userProfile: userProfileReducer,
  courseVideos: courseVideosReducer,
  // Add other reducers here
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only persist the 'auth' slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
