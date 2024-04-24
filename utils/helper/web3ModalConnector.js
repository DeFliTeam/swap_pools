import Web3 from "web3";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { store } from "../../store";
import {
  setMetaMaskToken,
  setChainId,
  setLibrary,
  setNetwork,
  setProvider,
  setNetworkStatus,
} from "../../store/Reducers/metamasktoken";
import { providerOptions } from "../constans/appconstans";

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions, // required
});

export const getAccountDetails = async () => {
  if (web3Modal.providerController.cachedProvider !== "") {
    const result = await walletConnectModal();
    const account = await result.eth.getAccounts();
    const chainId = await result.eth.getChainId();
    store.dispatch(setMetaMaskToken(account[0]));
    store.dispatch(setChainId(chainId));
  }
  return { account: null, chainId: null };
};
export const walletConnectModal = async () => {
  const provider = await web3Modal.connect();
  const library = new ethers.providers.Web3Provider(provider);
  const network = await library.getNetwork();
  store.dispatch(setNetworkStatus(library?.provider?.wc?._peerMeta?.name))
  store.dispatch(setProvider(provider));
  store.dispatch(setLibrary(library));
  store.dispatch(setNetwork(network));

  await web3Modal.toggleModal();
  const newWeb3 = new Web3(provider);
  // console.log(newWeb3, "newWeb3");

  const account = await newWeb3.eth.getAccounts();
  const chainId = await newWeb3.eth.getChainId();
  store.dispatch(setMetaMaskToken(account[0]));
  store.dispatch(setChainId(chainId));
  return newWeb3;
};

export const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};

const refreshState = async () => {
  // const metaMaskToken = store.getState()?.token?.metaMaskToken;

  store.dispatch(setMetaMaskToken(""));
  store.dispatch(setChainId(""));
  store.dispatch(setNetwork(""));
};

export const disconnect = async () => {
  await web3Modal.clearCachedProvider();
  refreshState();
};
