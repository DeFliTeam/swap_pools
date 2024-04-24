import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React as useWeb3ReactCore } from "@web3-react/core";

export const injected = new InjectedConnector({
  supportedChainIds: [97, 43113, 56],
});


export function useActiveWeb3React() {
  const context = useWeb3ReactCore();
  const contextNetwork = useWeb3ReactCore("Network");
  return context.active ? context : contextNetwork;
}
export const walletconnect = new WalletConnectConnector({
  infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
  qrcode: true,
});
export function resetWalletConnector(connector) {
  if (connector && connector instanceof WalletConnectConnector) {
    connector.walletConnectProvider = undefined;
  }
}
