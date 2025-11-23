import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  zIndexclicked:""
};

const zIndexSlice = createSlice({
  initialState,
  name: "zIndexSlice",
  reducers: {
    clickedZIndex: (state, actions) => {
      state.zIndexclicked = actions.payload
    },
 
  },
});

export const { clickedZIndex } = zIndexSlice.actions;
export default zIndexSlice.reducer;
