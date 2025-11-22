import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  safari: false,
  trash: false,
  finder: false,
  contact: false,
  terminal: false,
  photos: false,
  resume: false
};

const dockSlice = createSlice({
  initialState,
  name: "dockSlice",
  reducers: {
    safariToggle: (state) => {
      state.safari = !state.safari;
    },
    TerminalToggle: (state) => {
      state.terminal = !state.terminal;
    },
    ContactToggle: (state) => {
      state.contact = !state.contact;
    },
    resumeToggle:(state)=>{
      state.resume = !state.resume;
    }
  },
});

export const { safariToggle,TerminalToggle,ContactToggle,resumeToggle } = dockSlice.actions;
export default dockSlice.reducer;
