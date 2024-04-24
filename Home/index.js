import React, { useState } from 'react'
import styles from "./home.module.scss"
import WalletGenerator from '../walletGenerate'
import Swap from '../Swap'
import { useDispatch } from 'react-redux'
import { saveSwapPools } from '../../store/Reducers/swapReducer'
const Home = () => {
  const dispatch = useDispatch()
  const btnArray = [
    {
      name: 'baseDEFLI',
      link: "",
      contractAddress: "0xe9d8108db53428a0e577e9a3f28d950c3e6ae1e1",
      coinImage: "/defli token.png"
    },
    {
      name: 'baseDESKY',
      link: "",
      contractAddress: "0x3ce13deddea2f51826ee1f33ee9db5227bfc8fe1",
      coinImage: "/desky token.png"
    },
    {
      name: 'baseDACARS',
      link: "",
      coinImage: "/dacars token.png",
      contractAddress: "0x9b8850ed1a59f63dfc0069a4be0fc3a6b1a1305f"
    },
    {
      name: 'bDECHARGE',
      link: "",
      coinImage: "/dECHARGE token.png",
      contractAddress: "0x7c5cf42bc0a59bb91589dcf663a42e6668e4a57b"
    },
    {
      name: 'DRODEC',
      link: "",
      coinImage: "/DRODEC token.png",
      contractAddress: "0x5a01bdaa010938eb7615c63cb22cf3e94e8505df"
    },
    {
      name: 'DELINK',
      link: "",
      coinImage: "/DELINK token.png",
      contractAddress: "0x54c0d0CAb37677c85E08C3A5C2cB1700bc58BCaD"
    },
    {
      name: 'Trade $FLI',
      link: "",
      coinImage: "/IMG_5198 (1).avif",
      contractAddress: "0x076Bf099C7aaBd0BC9bC37930113428906F51d89"
    },
    {
      name: 'Staking',
      link: "https://www.team.finance/view-all-coins",
      Image: "",
      contractAddress: ""
    }
  ]
  const [swapScreen, setSwapScreen] = useState(false)

  const handleSwap = (item) => {
    if (item.name === "Staking") {
      window.open(item.link, "_blank");
      return;
    }
    dispatch(saveSwapPools(item))
    setSwapScreen(true)
  }

  return (
    <div className={styles.wrapper}>
      {swapScreen ?
        <Swap setSwapScreen={setSwapScreen} />
        :
        <div className={styles.container}>
          <div className={styles.headerSection}>
            <div className={styles.heading}>Wallet Info</div>
          </div>
          <div className={styles.btnSection}>
            <WalletGenerator />
          </div>
          <div className={styles.swapSection}>Swap With These Tokens</div>
          <div className={styles.btnSection}>
            {btnArray.map((item, key) => (
              <button onClick={() => handleSwap(item)} key={key}>
                {item.name}
              </button>
            ))}
          </div>
        </div>
      }
    </div>
  )
}

export default Home