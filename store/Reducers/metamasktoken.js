import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  metaMaskToken: null,
  webProvider: null,
  chainId: null,
  library: null,
  network: null,
  useMobileWallet: false,
  connectStatus: null
};
export const metaMaskTokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setMetaMaskToken(state, action) {
      state.metaMaskToken = action.payload;
    },
    setProvider(state, action) {
      state.webProvider = action.payload;
    },
    setChainId: (state, action) => {
      state.chainId = action.payload;
    },
    setMobileUIWallet: (state, action) => {
      state.useMobileWallet = action.payload;
    },
    setLibrary: (state, action) => {
      state.library = action.payload;
    },
    setNetwork: (state, action) => {
      state.network = action.payload;
    },
    setNetworkStatus: (state, action) => {
      state.connectStatus = action.payload
    }
  },
});
export const {
  setMetaMaskToken,
  setProvider,
  setAccount,
  setChainId,
  setLibrary,
  setNetwork,
  setMobileUIWallet,
  setNetworkStatus } = metaMaskTokenSlice.actions;
export default metaMaskTokenSlice.reducer;
