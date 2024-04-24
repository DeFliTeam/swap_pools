import React, { useCallback } from "react";
import UseModalInjector from "../../../utils/helper/useWeb3Modal";

export const useMobileUIWallet = () => {
  const { walletConnectModal, getAccountDetails } = UseModalInjector();

  const connectModal = useCallback(async () => {
    await walletConnectModal();
    await getAccountDetails();
  }, [getAccountDetails, walletConnectModal]);

  const handleWalletClick = useCallback(
    async (walletName) => {
      const walletConfig = {
        metamask:
          "https://metamask.app.link/dapp/https://coinofficial.io/",
        trustwallet:
          "https://link.trustwallet.com/open_url?coin_id=20000714&url=https://coinofficial.io/",
      };

      if (window.ethereum === undefined) {
        if (walletName === "walletconnect") {
          await connectModal();
        } else {
          window.open(walletConfig?.[walletName]);
        }
      } else {
        await connectModal();
      }
    },
    [connectModal]
  );

  const handlers = { handleWalletClick };
  const states = {};

  return {
    handlers,
    states,
  };
};
