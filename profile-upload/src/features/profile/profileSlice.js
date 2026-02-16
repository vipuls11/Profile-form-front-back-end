import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const submitProfile = createAsyncThunk(
  "profile/submit",
  async (formData) => {
    const res = await axios.post(
      "http://localhost:8000/api/profile",
      formData,
      {
       headers: {
   "Content-Type": "multipart/form-data"
       }
 }
    );
    console.log(res.data)
    return res.data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    success: false,
  },
  reducers: {
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(submitProfile.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitProfile.rejected, (state) => {
        state.loading = false;
      });
  },
});

// 👇 THIS LINE IS REQUIRED
export const { clearSuccess } = profileSlice.actions;

// 👇 This is already correct in your store
export default profileSlice.reducer;
