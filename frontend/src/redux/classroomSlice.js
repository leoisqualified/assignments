import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/classrooms";

// Create a classroom (Teacher Only)
export const createClassroom = createAsyncThunk(
  "classroom/create",
  async (classroomData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, classroomData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create classroom"
      );
    }
  }
);

// Fetch classrooms for the logged-in user
export const fetchClassrooms = createAsyncThunk(
  "classroom/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch classrooms"
      );
    }
  }
);

// Join a classroom (Student Only)
export const joinClassroom = createAsyncThunk(
  "classroom/join",
  async (classroomId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/join`,
        { classroomId },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to join classroom"
      );
    }
  }
);

// Initial State
const initialState = {
  classrooms: [],
  loading: false,
  error: null,
};

// Classroom Slice
const classroomSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createClassroom.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClassroom.fulfilled, (state, action) => {
        state.loading = false;
        state.classrooms.push(action.payload);
      })
      .addCase(createClassroom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchClassrooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClassrooms.fulfilled, (state, action) => {
        state.loading = false;
        state.classrooms = action.payload;
      })
      .addCase(fetchClassrooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(joinClassroom.pending, (state) => {
        state.loading = true;
      })
      .addCase(joinClassroom.fulfilled, (state, action) => {
        state.loading = false;
        state.classrooms.push(action.payload);
      })
      .addCase(joinClassroom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default classroomSlice.reducer;
