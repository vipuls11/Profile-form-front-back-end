import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./src/features/profile/profileSlice.js";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});
