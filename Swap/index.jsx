import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MdOutlineSettings } from "react-icons/md";
import { MdSwapVerticalCircle } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../__common/Button";
import Input from "../__common/input/input";
import { CompLoader } from "../__common/loader/Loader";
import UseModalInjector from "../../utils/helper/useWeb3Modal";
import { ChainID, DEFLI_CONTRACT } from "../../utils/constans/appconstans";
import { GetCommonTokenContract, GetDefliContract, GetProvider, GetSwapContract, handleApproveFunction } from "../../utils/contract/nftBalanceContract";
import { saveSwapPools } from "../../store/Reducers/swapReducer";
import { toast } from "react-toastify";
import { Bars } from "react-loader-spinner";

const Swap = ({ setSwapScreen }) => {
  const dispatch = useDispatch()
  const { handleConnectModal, chainId, switchToNetwork } = UseModalInjector();
  const { swapPoolInfo } = useSelector((state) => state.swap);
  const [loading, setLoading] = useState(false)
  const [swapLoading, setSwapLoading] = useState(false)
  const metaMaskToken = useSelector((state) => state.token.metaMaskToken);
  const [getValue, setValue] = useState("")
  const [calRate, setCalRate] = useState("")
  const [findOutPutAmount, setFindOutPutAmount] = useState("")
  const [userBalance, setUserBalance] = useState("")
  const [secondTokenBalance, setSecondTokenBalance] = useState("")

  const handleCalculateValue = async () => {
    try {
      // debugger
      setLoading(true)
      let web3 = await GetProvider();
      let findContractAddress = swapPoolInfo?.contractAddress ? swapPoolInfo?.contractAddress : "";

      const fliTokenContract = await GetDefliContract()
      const fliGetBalance = await fliTokenContract.methods.balanceOf(metaMaskToken).call()
      const FliparsedBalance = await web3.utils.fromWei(fliGetBalance, "ether")
      setSecondTokenBalance(FliparsedBalance)


      const getContract = await GetCommonTokenContract(findContractAddress)
      // const getContract = await GetDerocedContract()
      const findTotalSupply = await getContract.methods.totalSupply().call()
      const getBalance = await getContract.methods.balanceOf(metaMaskToken).call()
      const parsedBalance = await web3.utils.fromWei(getBalance, "ether")
      setUserBalance(parsedBalance)
      // console.log("🚀 ~ handleCalculateValue ~ findTotalSupply:", findTotalSupply)

      const findHeldTokens = await GetSwapContract()
      const findHeldTokensBalance = await findHeldTokens.methods.heldTokens(findContractAddress, DEFLI_CONTRACT).call()
      // console.log("🚀 ~ handleCalculateValue ~ findHeldTokensBalance:", findHeldTokensBalance)

      const calculateRate = findTotalSupply / findHeldTokensBalance;
      // console.log("🚀 ~ handleCalculateValue ~ calculateRate:", calculateRate)
      // const parsedBalance = web3.utils.fromWei(String(calculateRate), "ether");
      // console.log("🚀 ~ handleCalculateValue ~ parsedBalance:", parsedBalance)
      setCalRate(calculateRate)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("🚀 ~ handleCalculateValue ~ error:", error)
    }
  }

  const handleFormulaValue = async () => {
    try {
      debugger
      let web3 = await GetProvider();
      const convertToWei = await web3.utils.toWei(String(getValue), "ether");
      const findOutPutAmount = convertToWei / calRate
      const convetToOutputAmount = await web3.utils.fromWei(findOutPutAmount?.toFixed(0), "ether")
      setFindOutPutAmount(convetToOutputAmount)
    } catch (error) {
      console.log("🚀 ~ handleFormulaValue ~ error:", error)

    }

  }

  useEffect(() => {
    setTimeout(() => {
      getValue !== "" && handleFormulaValue()
    }, 2000)
  }, [getValue])

  useEffect(() => {
    if (metaMaskToken) handleCalculateValue()
  }, [metaMaskToken])



  const handleSwap = async () => {
    try {
      if (getValue === "" || getValue === 0) {
        toast.info("Please enter amount!")
        return;
      }
      setSwapLoading(true)
      let web3 = await GetProvider();
      let gasPrice = await web3.eth.getGasPrice();
      let gasLimit = 21000;
      // let gasLimits = 21000;
      const convertToWei = await web3.utils.toWei(String(getValue), "ether");
      let findContractAddress = swapPoolInfo?.contractAddress ? swapPoolInfo?.contractAddress : "";

      await handleApproveFunction(findContractAddress, convertToWei)
      // console.log("🚀 ~ approveAmount ~ approveAmount:", approveAmount)

      const contractSwap = await GetSwapContract()
      gasLimit = await contractSwap.methods.buy(findContractAddress, DEFLI_CONTRACT, convertToWei).estimateGas({
        from: window.ethereum?.selectedAddress
      });

      // console.log("🚀 ~ handleSwap ~ convertToWei:", convertToWei)
      const callTransaction = await contractSwap.methods.buy(findContractAddress, DEFLI_CONTRACT, convertToWei).send({
        from: window.ethereum?.selectedAddress,
        gasLimit: gasLimit,
        gasPrice,
      })
      if (callTransaction?.status) {
        toast.success("Token swap successfully!")
        setTimeout(() => {
          setSwapLoading(false)
          setSwapScreen(false)
          dispatch(saveSwapPools(""))
        }, 2000)
      }
    } catch (error) {
      toast.error(error?.message);
      setSwapLoading(false)
      console.log("🚀 ~ handleSwap ~ error:", error)

    }
  }

  return (
    <>

      {loading ? (
        <div className="flex min-h-[70vh] justify-center items-center custom-class">
          <CompLoader />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center custom-class">
          {/* <div className="w-[320px] sm:w-[480px]  max-w-[500px]"> */}
          <div className="w-full md:w-[480px]  md:max-w-[500px]">
            <div className="w-full flex flex-col gap-[0.625rem] pt-[20px] md:pt-[40px] 3xl:pt-[100px]  sm:pb-[226px] pb-[100px] box-border">
              <div className="w-[95%]  flex justify-between">
                <div className="leading-[24px] sm:leading-[32px] text-[16px] sm:text-[24px] font-[700]">
                  Swap
                </div>
                <div className=" w-[50px] sm:w-[60px] flex flex-row gap-[5px] sm:gap-[10px] justify-between items-center">
                  <MdOutlineSettings

                    className="w-[18px]  h-[18px] sm:w-[24px] sm:h-[24px] cursor-pointer"
                  // onClick={() => handleOpenModal()}
                  />
                </div>
              </div>
              {/* send block */}
              <div className="w-full  flex flex-col rounded-lg shadow-1 px-[20px] py-[20px]">
                <div className="w-full justify-between items-center flex cursor-pointer pb-[10px]">
                  <h3 className="leading-[18px] text-[17px] font-[500]">
                    Send  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="font-bold" >{swapPoolInfo?.name}</span>
                  </h3>
                  <div
                    onClick={() => {
                      // setClickType(1);
                      // handleTokenSidebar();
                    }}
                    className="flex"
                  >
                    <span
                      className={
                        "bg-[#ECEFF0] rounded-xl flex"
                      }
                    >
                      <img
                        src={swapPoolInfo?.coinImage}
                        alt="no-icon"
                        className="w-[28px] h-[28px]"
                      />
                    </span>
                  </div>
                </div>
                <div className={false ? `pb-[10px]` : null}>
                  <Input
                    placeholder="0.0"
                    onChange={(e) => {
                      setValue(e.target.value)


                    }}
                    type="number"
                    swap={true}
                    value={getValue}
                    disabled={metaMaskToken && chainId === ChainID ? false : true}
                  />
                </div>
                {metaMaskToken && (
                  <>
                    <div className="w-full justify-between flex cursor-pointer pb-[10px] pt-[10px]">
                      <h3 className="leading-[22px] text-[14px] text-[#777] font-[400]">

                      </h3>
                      <h3 className="leading-[18px] text-[12px] font-[500] sm:font-[400]">
                        Balance: &nbsp;{userBalance ? userBalance : "0"}
                      </h3>
                    </div>
                  </>
                )}

                <div className="w-full  flex sm:flex-row  xs:gap-2 justify-between">
                  <Button
                    variant="swap"
                    className={` w-[66px] sm:w-[98px] h-[28px] leading-[18px]`}
                  // onClick={() => handleGetpercentageValue("25%")}
                  >
                    25%
                  </Button>
                  <Button
                    variant="swap"
                    className={` w-[66px] sm:w-[98px] h-[28px] leading-[18px]`}
                  // onClick={() => handleGetpercentageValue("50%")}
                  >
                    50%
                  </Button>
                  <Button
                    variant="swap"
                    className={` w-[66px] sm:w-[98px] h-[28px] leading-[18px]`}
                  // onClick={() => handleGetpercentageValue("75%")}
                  >
                    75%
                  </Button>
                  <Button
                    variant="swap"
                    className={` w-[66px] sm:w-[98px] h-[28px] leading-[18px]`}
                  // onClick={() => handleGetpercentageValue("100%")}
                  >
                    100%
                  </Button>
                </div>
              </div>
              {/* convert block */}
              <div
                // onClick={() =>
                //   !metaMaskToken || wrongNetwork ? null : switchTokens()
                // }
                style={{
                  height: "50px",
                  width: "100%",
                  zIndex: 4,
                  marginTop: "-25px",
                  marginBottom: "-45px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <MdSwapVerticalCircle
                  // src="./icons/converticon.svg"
                  // alt="no-icon"
                  className="text-4xl text-blue-700"
                // width={40}
                // height={40}
                />
              </div>
              {/* receive block  */}
              <div className="w-full flex flex-col bg-[#FDFDFD] rounded-lg shadow-1 px-[20px] py-[20px] mt-[20px]">
                <div className="w-full justify-between items-center flex cursor-pointer pb-[10px]">
                  <h3 className="leading-[18px] text-[17px] font-[500]">
                    Receive &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="font-bold">FLI Token</span>
                  </h3>
                  <div
                    onClick={() => {
                      // setClickType(0);
                      // handleTokenSidebar();
                    }}
                    className=""
                  >
                    <img
                      src={"/IMG_5198 (1).avif"}
                      alt="no-icon"
                      className="w-[30px] h-[30px] min-w-[18px] min-h-[18px]"
                    />
                  </div>

                </div>
                <div className={false ? `pb-[10px]` : null}>
                  {false ? (
                    <Skeleton baseColor="#DDDDDD" height="22px" width={100} />
                  ) : (
                    <Input
                      value={findOutPutAmount ? findOutPutAmount :
                        "0.0"
                      }
                      placeholder="0.0"
                      // onChange={(e) => setToken2Value(e.target.value)}
                      type="number"
                      swap={true}
                      disabled={true}
                    />
                  )}
                </div>
                {metaMaskToken && (
                  <>
                    <div className="w-full justify-between flex cursor-pointer pb-[10px] pt-[10px]">
                      <h3 className="leading-[22px] text-[14px] text-[#777] font-[400]">

                      </h3>
                      <h3 className="leading-[18px] text-[12px] font-[500] sm:font-[400]">
                        Balance: &nbsp;{secondTokenBalance ? secondTokenBalance : "0"}
                      </h3>
                    </div>
                  </>
                )}
                {false && (
                  <>
                    <div className="w-full justify-between flex cursor-pointer  pt-[10px]">
                      {false ? (
                        <h3>
                          <Skeleton
                            baseColor="#DDDDDD"
                            height="22px"
                            width={100}
                          />
                        </h3>
                      ) : (
                        <>
                          <h3 className="leading-[22px] text-[14px] text-[#777] font-[400]">
                            ~$
                            {/* {+token1Price && +token1Value
                      ? Number(+token1Value * token1Price).toFixed(4)
                      : "0"} */}
                            {"0"}
                            {false ? (
                              <>
                                {" "}
                                {false > 0 ? (
                                  <>
                                    {" "}
                                    <span className="leading-[22px] text-[14px] text-[#12BB6A] font-[400] pl-[6px]">
                                      {/* {estimateValue
                                        ? `(${toRoundNumber(
                                          estimateValue,
                                          4
                                        )}%)`
                                        : null} */}
                                    </span>
                                  </>
                                ) : (
                                  <span className="leading-[22px] text-[14px] text-[#FF0000] font-[400] pl-[6px]">
                                    {/* {estimateValue
                                      ? `(${toRoundNumber(
                                        estimateValue,
                                        4
                                      )}%)`
                                      : null} */}
                                  </span>
                                )}
                              </>
                            ) : null}
                          </h3>
                        </>
                      )}

                      <h3 className="leading-[18px] text-[12px] text-[#777] font-[500] sm:font-[400]">
                        Balance{" "}
                        {"0"}
                      </h3>
                    </div>
                  </>
                )}
              </div>

              {/* button wrapper  */}
              <div className="w-full">
                {metaMaskToken && chainId !== ChainID ? (
                  <Button
                    primary={true}
                    onClick={() => switchToNetwork()}
                    className={`w-[100%] h-[42px] text-[14px] leading-[22px]`}
                  >
                    Wrong Network
                  </Button>
                ) : (
                  <Button
                    primary={true}

                    disabled={swapLoading ? true : false}
                    onClick={
                      metaMaskToken
                        ? () => handleSwap()
                        : () => handleConnectModal()
                    }
                    className={`w-[100%] h-[42px] text-[14px] leading-[22px]`}
                  >
                    {swapLoading ?
                      <Bars
                        height={20}
                        width={40}
                        color={"white"}
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      /> : metaMaskToken ? "Swap" : "Connect Wallet"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <TokenSidebar
        tokens={tokens}
        open={tokenSidebarOpen}
        handleClose={handleTokenSidebar}
        handleSetToken={handleSetToken}
      />
      <SwapSetting
        handleClose={() => setOpenApproveModal(false)}
        Open={openApproveModal}
        slipageValue={slipageValue}
      /> */}
      {/* <ConnectWalletPopup
        Open={sliderBoolean}
        handleClose={() => dispatch(setSliderBoolean(false))}
        connectToWallet={connectToWallet}
      /> */}
    </>
  );
};

export default Swap;
