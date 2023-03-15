import { configureStore } from "@reduxjs/toolkit";
import feedbackSlice from "../feature/feedback.slice";
import userSlice from "../feature/user.slice";

export const store = configureStore({
  reducer: {
    feedback: feedbackSlice,
    user: userSlice,
  },
});

export default store;
