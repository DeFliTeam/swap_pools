import Modal from "../../Modal";

import styles from "./walletConnect.module.scss";
import React, { useCallback, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
// import { setMetaMaskToken } from "../../../../store/Reducers/metamasktoken";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { accountChange, injected } from "../../../../utils/helper/connector";
import metamaskBig from "../../../Assests/metamask-big.png";
import walletConnectBig from "../../../Assests/wallet-connect-big.png";
import metamaskSmall from "../../../Assests/metamask-small.png";
import walletConnectSmall from "../../../Assests/wallet-connect-small.png";
import {
  resetWalletConnector,
  walletconnect,
} from "../../../../utils/helper/connector";

import {
  AVALANCHE_TESTNET_PARAMS,
  BNB_NETWORK,
  RINK_NETWORK,
} from "../../../../utils/constans/appconstans";
import { toast, ToastContainer } from "react-toastify";
import { setMetaMaskToken } from "../../../../store/Reducers/metamasktoken";

const WalletConnect = ({ setPopupVisible, popupVisible, togglePopup }) => {
  const [connect, setConnect] = useState(null);
  const dispatch = useDispatch();

  const { account, connector, activate, deactivate, } =
    useWeb3React();
  const metaMaskToken = useSelector((state) => state.token.metaMaskToken);
  const listeners = useCallback(async () => {
    window.ethereum.on("chainChanged", (chainId) => {
      if (chainId != "0xa869" && chainId != "0x61") {
        deactivate();
        dispatch(setMetaMaskToken(""));
        setCheck(false);
        toast.error("unsupported network!");
      }
    });
  }, [deactivate, dispatch]);

  const [check, setCheck] = useState(false);
  // const web3reactContext = useWeb3React();

  const changeNetwork = async () => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [BNB_NETWORK],
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const connectHandler = async () => {
    setConnect(0);

    // debugger;
    if (metaMaskToken) {
      setCheck(!check);
      return;
    }
    if (connector && connector.walletConnectProvider) {
      connector.walletConnectProvider = undefined;
    }
    // const injected = accountChange("binance");
    try {
      await activate(injected);
      changeNetwork();
      setPopupVisible(false);
    } catch (ex) { }
  };
  useEffect(() => {
    listeners();
  }, []);

  useEffect(() => {
    // listeners();
    if (account) {
      dispatch(setMetaMaskToken(account));
    }
  }, [account]);

  const connectWallectconnect = async () => {
    setConnect(1);
    try {
      resetWalletConnector(walletconnect);
      await activate(walletconnect);
    } catch (ex) {
    }
  };

  return (
    <div className="w-1/2">
      <Modal
        visible={popupVisible}
        btn
        onClose={() => setPopupVisible(false)}
        togglepopup={togglePopup}
      >
        <div className={styles.wrapper}>
          <div className={styles.heading}>Connect Your Wallet</div>
          <div
            className={styles.connectCard}
            onClick={() =>
              window.ethereum === undefined
                ? window
                  .open(
                    "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
                    "_blank"
                  )
                  .focus()
                : connectHandler(0)
            }
          >
            <img className={styles.iconBig} src={metamaskBig} alt="icon" />
            <div className={styles.buttonInfo}>
              <img className={styles.icon} src={metamaskSmall} alt="icon" />
              <div className={styles.text}>
                {window.ethereum === undefined
                  ? "Install MetaMask Extension"
                  : "Connect to Meta Mask"}
              </div>
            </div>
            <div className={styles.connectCircle}>
              {connect === 0 && <div className={styles.connected} />}
            </div>
          </div>
          <div className={styles.connectCard} onClick={connectWallectconnect}>
            <img className={styles.iconBig} src={walletConnectBig} alt="icon" />
            <div className={styles.buttonInfo}>
              <img
                className={styles.icon}
                src={walletConnectSmall}
                alt="icon"
              />
              <div className={styles.text}>Use WalletConnect</div>
            </div>
            <div className={styles.connectCircle}>
              {connect === 1 && <div className={styles.connected} />}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WalletConnect;
