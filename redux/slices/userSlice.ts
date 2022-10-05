import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scanUserId: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setScanUserId: (state, action) => {
      state.scanUserId = action.payload;
    },
  },
});

export const { setScanUserId } = userSlice.actions;
export default userSlice.reducer;
