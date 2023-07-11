import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  baseUrl: "",
  genres: {},
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setBaseUrl: (state, action) => {
      state.baseUrl = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { setBaseUrl, getGenres } = homeSlice.actions;

export default homeSlice.reducer;
