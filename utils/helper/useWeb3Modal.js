import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccountDetails,
  toHex,
  walletConnectModal,
} from "./web3ModalConnector";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import {
  setMetaMaskToken,
  setChainId,
} from "../../store/Reducers/metamasktoken";
import { ChainID, NetworkProvider } from "../constans/appconstans";

const UseModalInjector = () => {
  const dispatch = useDispatch();
  const { metaMaskToken, chainId, webProvider, library } = useSelector(
    (state) => state.token
  );
  const { connector, deactivate, disconnect } = useWeb3React();


  const [error, setError] = useState();
  const isWrongNetwork = error && error instanceof UnsupportedChainIdError;
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [check, setCheck] = useState(false);

  // This function is used for the Mobile Menu toggle.

  const mobileMenuHandler = async () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };





  useEffect(() => {
    if (webProvider?.on) {
      const handleAccountsChanged = (accounts) => {
        dispatch(setMetaMaskToken(accounts[0]));
      };

      const handleChainChanged = async (chainId) => {
        const convertedChainId = parseInt(chainId, 16);
        dispatch(setChainId(convertedChainId));
        if (chainId !== ChainID) {
          switchNetwork();
        }
      };

      const handleDisconnect = async () => {
        await disconnect();
      };

      webProvider.on("accountsChanged", handleAccountsChanged);
      webProvider.on("chainChanged", handleChainChanged);
      webProvider.on("disconnect", handleDisconnect);

      return () => {
        if (webProvider.removeListener) {
          webProvider.removeListener("accountsChanged", handleAccountsChanged);
          webProvider.removeListener("chainChanged", handleChainChanged);
          webProvider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [webProvider]);

  const handleDisconnect = async () => {
    if (connector && connector.walletConnectProvider) {
      connector.walletConnectProvider = undefined;
    }
    try {
      await deactivate();
      dispatch(setMetaMaskToken(""));
      setCheck(false);
    } catch (ex) { }
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(ChainID) }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {

          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: NetworkProvider,
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const switchToNetwork = useCallback(
    async (chain = ChainID) => {
      if (window?.ethereum !== undefined) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: toHex(chain) }],
          });
        } catch (err) {

          // const networkObject = networks?.[Number(chain)];
          // This error code indicates that the chain has not been added to MetaMask
          if (err.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: NetworkProvider,
            });
          }
        }
      } else {
        try {
          await library.provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: toHex(chain) }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              // const networkObject = networks?.[Number(chain)];
              // const data = [
              //   {
              //     chainId: toHex(ChainID),
              //     chainName: "Base",
              //     nativeCurrency: {
              //       name: "ETH",
              //       symbol: "ETH",
              //       decimals: 18,
              //     },
              //     rpcUrls: [RPC_URL],
              //     blockExplorerUrls: [blockExplorerUrls],
              //   },
              // ];
              await library.provider.request({
                method: "wallet_addEthereumChain",
                params: NetworkProvider,
              });
            } catch (error) {
              setError(error);
            }
          }
        }
      }
    },
    [library]
  );
  // useEffect(async () => {
  //   await getAccountDetails();
  // }, []);
  const handleConnectModal = async () => {
    try {
      if (window?.ethereum === undefined) {
        if (
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          window.open(
            "https://metamask.app.link/dapp/"
          );
        } else {
          window
            .open(
              "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
              "_blank"
            )
            .focus();
        }
      } else if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        // open the deeplink page
        window.open("https://metamask.app.link/dapp/");
      } else {
        await walletConnectModal();
        await getAccountDetails();
      }
    } catch (error) {
      console.log(error, "wallet connect errors");
    }
  };

  const handleMobileConnectModal = async () => {
    try {
      // window.open(
      //   "https://metamask.app.link/dapp/https://coinofficial.io/"
      // );
      if (window?.ethereum !== undefined && window?.ethereum?.isMetaMask) {
        await walletConnectModal();
        await getAccountDetails();
      } else {
        await handleConnectModal();
        await walletConnectModal();
        await getAccountDetails();
      }
    } catch (error) {
      console.log(error, "wallet connect errors");
    }
  };

  useEffect(() => {
    metaMaskToken && switchNetwork();
  }, [metaMaskToken, chainId]);

  return {
    handleConnectModal,
    isMobileMenuOpen,
    mobileMenuHandler,
    metaMaskToken,
    chainId,
    connectModalOpen,
    isWrongNetwork,
    handleMobileConnectModal,
    check,
    handleDisconnect,
    walletConnectModal,
    getAccountDetails,
    switchToNetwork
  };
};

export default UseModalInjector;
