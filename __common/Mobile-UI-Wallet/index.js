import React, { useRef, useEffect, useCallback } from "react";
import styles from "./mobile-ui.module.scss";
import WalletConnect from "../../Assests/walletconnect.svg";
import TrustWallet from "../../Assests/trustWallet.png";
import Metamask from "../../Assests/metamaskMobileView.svg";
import { useMobileUIWallet } from "./useMobileUIWallet";
import { useDispatch, useSelector } from "react-redux";
import { setMobileUIWallet } from "../../../store/Reducers/metamasktoken";

function MobileUIWalletModal() {
  const dispatch = useDispatch();
  const { states, handlers } = useMobileUIWallet();
  const { handleWalletClick } = handlers;
  const useMobileWallet = useSelector((state) => state.token.useMobileWallet);

  // this function helps handle clicks outside a specific component (referenced by uiwalletRef) and triggers a state update (setMobileUIWallet(false)) based on the useMobileWallet flag if such a click occurs. It's commonly used to close dropdowns, modals, or other UI elements when a user clicks outside of them.

  const uiwalletRef = useRef();
  const handleClickOutside = useCallback(
    async (event) => {
      if (uiwalletRef?.current && !uiwalletRef.current.contains(event.target)) {
        if (useMobileWallet) {
          await dispatch(setMobileUIWallet(false));
        }
      }
    },
    [dispatch, useMobileWallet]
  );

  // This useEffect sets up an event listener on the document that listens for "click" events during the capturing phase. When a click occurs, it calls the handleClickOutside function to determine if the clicked element is outside the uiwalletRef element and handles it accordingly. When the component unmounts or when handleClickOutside changes, the event listener is removed as part of the cleanup process.

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className={styles.boxModal} ref={uiwalletRef}>
      <div className={styles.notetxt}>
        Start by connecting with one of the wallets below. Be sure to store your
        private keys or seed phrase securely, Never share them with anyone.
      </div>
      <div className={styles.walletbox}>
        <div
          className={styles.boxImg}
          onClick={() => handleWalletClick("metamask")}
        >
          <img className={styles.img} src={Metamask} alt="wallet connect" />
          <div className={styles.txt}>Metamask</div>
        </div>
        <div
          className={styles.boxImg}
          onClick={() => handleWalletClick("trustwallet")}
        >
          <img className={styles.img} src={TrustWallet} alt="wallet connect" />
          <div className={styles.txt}>Trust Wallet</div>
        </div>
        <div
          className={styles.boxImg}
          onClick={() => handleWalletClick("walletconnect")}
        >
          <img
            className={styles.img}
            src={WalletConnect}
            alt="wallet connect"
          />
          <div className={styles.txt}>WalletConnect</div>
        </div>
      </div>
    </div>
  );
}

export default MobileUIWalletModal;
