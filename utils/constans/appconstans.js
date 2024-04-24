import WalletConnectProvider from "@walletconnect/web3-provider";

// ----- Cridentials for Live starts here-----//
export const ChainID = 8453;
export const RPC_URL = "https://mainnet.base.org/"
export const blockExplorerUrls = "https://basescan.org"
export const DEFLI_CONTRACT = "0x076Bf099C7aaBd0BC9bC37930113428906F51d89";
export const SWAP_CONTRACT = "0x08060895E8164fcB9892E14D00383dCd3acA88BB";

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        8453: `${RPC_URL}`,
      },
      chainId: `${ChainID}`,
      network: "Base",
    },
  },
};
export const BNB_NETWORK = {
  chainId: "0x2105",
};
export const NetworkProvider = [
  {
    chainId: "0x2105",
    chainName: "Base",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: [RPC_URL],
    blockExplorerUrls: [blockExplorerUrls],
  },
];
// ----- Cridentials for Live ends here-----//



