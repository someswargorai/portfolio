import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  zIndex:1
};

const zIndexSlice = createSlice({
  initialState,
  name: "zIndexSlice",
  reducers: {
    increaseZIndex: (state) => {
      state.zIndex = state.zIndex+1;
    },
 
  },
});

export const { increaseZIndex } = zIndexSlice.actions;
export default zIndexSlice.reducer;
