import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  swapPoolInfo: ""
};

export const swapSlice = createSlice({
  name: "swap",
  initialState,
  reducers: {
    saveSwapPools: (state, action) => {
      state.swapPoolInfo = action.payload
    }
  },
});

export const { saveSwapPools } = swapSlice.actions;

export default swapSlice.reducer;
