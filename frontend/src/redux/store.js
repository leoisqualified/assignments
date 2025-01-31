import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import classroomReducer from "./classroomSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    classroom: classroomReducer,
  },
});

export default store;
