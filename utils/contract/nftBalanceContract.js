import SWAP_CONTRACT_ABI from "../ABI/SWAP_CONTRACT_ABI.json";
import DEROCED_CONTRACT_ABI from "../ABI/DEROCED_ABI.json"
import DEFLI_CONTRACT_ABI from "../ABI/DEFLI_ABI.json"
import { DEFLI_CONTRACT, SWAP_CONTRACT } from "../constans/appconstans";
import { walletConnectModal } from "../helper/web3ModalConnector";

export async function GetProvider() {
  const web3 = await walletConnectModal();
  return web3;
}

export const GetSwapContract = async () => {
  try {
    let web3 = await GetProvider();
    if (web3.currentProvider) {
      const MyContract = new web3.eth.Contract(SWAP_CONTRACT_ABI, SWAP_CONTRACT);
      return MyContract;
    } else return null;
  } catch (error) { }
};


export const GetDefliContract = async () => {
  try {
    let web3 = await GetProvider();
    if (web3.currentProvider) {
      const MyContract = new web3.eth.Contract(DEFLI_CONTRACT_ABI, DEFLI_CONTRACT);
      return MyContract;
    } else return null;
  } catch (error) { }
};


export const GetCommonTokenContract = async (coinAddress) => {
  try {
    let web3 = await GetProvider();
    if (web3.currentProvider) {
      const MyContract = new web3.eth.Contract(DEROCED_CONTRACT_ABI, coinAddress);
      return MyContract;
    } else return null;
  } catch (error) { }
};

export const handleApproveFunction = async (findContractAddress, convertToWei) => {
  try {
    let web3 = await GetProvider();
    let gasPrice = await web3.eth.getGasPrice();
    let gasLimit = 21000;
    const contractApprove = await GetCommonTokenContract(findContractAddress)
    gasLimit = await contractApprove.methods.approve(SWAP_CONTRACT, convertToWei).estimateGas({ from: window.ethereum?.selectedAddress });
    await contractApprove.methods.approve(SWAP_CONTRACT, convertToWei).send({
      from: window.ethereum?.selectedAddress,
      gasLimit: gasLimit,
      gasPrice,
    })
  } catch (error) {
    return error;
  }
}

