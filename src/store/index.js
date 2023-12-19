import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { courseReducer } from "./slices/course";

export default configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
  },
});
