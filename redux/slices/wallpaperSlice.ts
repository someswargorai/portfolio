import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 wallpaper:""
};

const wallpaperSlice = createSlice({
  initialState,
  name: "wallpaperSlice",
  reducers: {
    setWallpaper: (state,actions) => {
      state.wallpaper = actions.payload;
    },
    
  },
});

export const { setWallpaper } = wallpaperSlice.actions;
export default wallpaperSlice.reducer;
