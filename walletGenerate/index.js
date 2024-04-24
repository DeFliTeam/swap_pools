import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import styles from "./walletGenerate.module.scss"
import { toast } from "react-toastify";
import Button from "../__common/Button"
import UseModalInjector from '../../utils/helper/useWeb3Modal';
import { useSelector } from 'react-redux';
import { ChainID } from '../../utils/constans/appconstans';
import { GetProvider } from '../../utils/contract/nftBalanceContract';
// import WalletConnectProvider from '@walletconnect/web3-provider';
const WalletGenerator = () => {
  const [wallet, setWallet] = useState(null);
  const metaMaskToken = useSelector((state) => state.token.metaMaskToken);
  const {
    check,
    handleDisconnect,
    handleConnectModal,
    isWrongNetwork,
    chainId,
  } = UseModalInjector();


  const generateWallet = async () => {
    // Create new wallet
    const web3 = new Web3();
    const newWallet = web3.eth.accounts.create();

    // Set the generated wallet in state
    setWallet(newWallet);

    // Connect to MetaMask
    await handleConnectModal()


    // Import generated address into MetaMask as main wallet
    importToMetaMask(newWallet.address);
  };


  const importToMetaMask = async (address) => {
    // Import the generated address into MetaMask

    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: address,
              symbol: 'ETH', // Change symbol if needed
              decimals: 18, // Change decimals if needed
              image: '', // Add image URL if available
            },
          },
        });
        toast.success("Address imported to MetaMask")
        console.log('Address imported to MetaMask');
      } catch (error) {
        toast.error(`${error}`);
        console.error('Error importing address to MetaMask:', error);
      }
    } else {
      toast.error('MetaMask not installed or not detected');
      // handleConnectModal()
    }
  };
  const [deviceId, setDeviceId] = useState("")
  const sendTransaction = async () => {
    if (!deviceId) {
      toast.info("Please enter device iD")
      return;
    }
    if (metaMaskToken) {
      try {
        let web3 = await GetProvider();
        const convertAmount = web3.utils.toWei("0.0000032", "ether")
        // let gasPrice = await web3.eth.getGasPrice();
        // let gasLimit = 21000;
        const params = {
          from: metaMaskToken,
          to: "0xEB011594F5324eB9590DF88545db1F8077d43419",
          value: convertAmount
        };
        const response = await web3.eth.sendTransaction(params);
        if (response?.status) {
          toast.success('Transaction sent successfully');
        }
        console.log('Transaction sent successfully');
      } catch (error) {
        console.log("🚀 ~ sendTransaction ~ error:", error)
        toast.error(error?.message);
      }
    } else {
      console.error('Wallet not generated');
    }
  };


  return (
    <div className={styles.walletGenerate}>
      <div className={styles.btnSection}>
        <button onClick={handleConnectModal}>
          <span>
            {wallet ? (
              chainId === ChainID ? (
                `${wallet?.address?.substring(
                  0,
                  6
                )}...${wallet?.address?.substring(
                  wallet?.address?.length - 4
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
        <button onClick={() => generateWallet()}><span>Generate Wallet</span></button>

      </div>
      {wallet && (
        <div className={styles.infoHeading}>
          <h2>New Wallet Generated:</h2>
          <p><label>User Address:</label> {wallet.address}</p>
          <p><label>User Private Key:</label> {wallet.privateKey}</p>
        </div>
      )}



      <div className={styles.headerSection}>
        <div className={styles.heading}>Link Device</div>
      </div>
      <div className={styles.btnSection}>
        <input type="text" placeholder='Enter device id' value={deviceId} onChange={(e) => setDeviceId(e.target.value)} />
        <button onClick={() => sendTransaction()}><span>Link Device</span></button>
      </div>


    </div>
  );
};

export default WalletGenerator;
