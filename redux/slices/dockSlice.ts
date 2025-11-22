import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  safari: false,
  settings: false,
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
    },
    settingsToggle:(state)=>{
      state.settings = !state.settings;
    },
    finderToggle:(state)=>{
      state.finder = !state.finder;
    }
  },
});

export const { safariToggle,TerminalToggle,ContactToggle,resumeToggle, settingsToggle,finderToggle } = dockSlice.actions;
export default dockSlice.reducer;
