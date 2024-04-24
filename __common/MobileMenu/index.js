import React, { useCallback } from "react";
import styles from "./mobileMenu.module.scss";
// import { motion } from "framer-motion";
// import animations from "./MobileMenu.animate";
import { CgClose } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import Cart from "../../Assests/cart.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import WalletConnect from "../Popups/WalletConnect";
import UseModalInjector from "../../../utils/helper/useWeb3Modal";
import { ChainID } from "../../../utils/constans/appconstans";
import { setMobileUIWallet } from "../../../store/Reducers/metamasktoken";


const MobileMenu = ({ mobileMenuHandler }) => {
  const dispatch = useDispatch()
  const { handleMobileConnectModal, chainId, isWrongNetwork, walletConnectModal,
    getAccountDetails, } = UseModalInjector()
  const [popupVisible, setPopupVisible] = useState(false);
  const metaMaskToken = useSelector((state) => state.token.metaMaskToken);

  const togglePopup = (e, num) => {
    setPopupVisible((preview) => !preview);
  };

  const openMobileUIWallet = useCallback(async () => {
    if (metaMaskToken) {
      await walletConnectModal();
      await getAccountDetails();
    } else {
      await dispatch(setMobileUIWallet(true));
    }
  }, [dispatch, getAccountDetails, metaMaskToken, walletConnectModal]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.closeRow} onClick={mobileMenuHandler}>
          <CgClose className={styles.closeIcon} />
        </div>
        <div className={styles.linksContainer}>
          <div className={styles.links}>
            <button className={styles.button} onClick={openMobileUIWallet}>
              <span className="text-black">
                {metaMaskToken ? (
                  chainId === ChainID ? (
                    `${metaMaskToken?.substring(0, 6)}...${metaMaskToken?.substring(
                      metaMaskToken?.length - 4
                    )}`
                  ) : (
                    <span style={{ color: "#D33B44" }}>Wrong Network</span>
                  )
                ) : isWrongNetwork ? (
                  <span style={{ color: "#D33B44" }}>Wrong Network</span>
                ) : (
                  "Connect Wallet"
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default MobileMenu;
