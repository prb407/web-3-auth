import { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractAbi from './abi/abi.json';
export const App = () => {
  const contractAddress = '0x70FA561c681baCc151B349cdc9839702dBc0918B'
  let provider = undefined;
  const [status, setStatus] = useState('Not Connected');
  const [accountAddress, setAccountAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [statusIndicator, setstatusIndicator] = useState(null);
  useEffect(() => {
    intializaMetamaskWallet()
  }, []);
  const intializaMetamaskWallet = () => {
    if (window.ethereum) {
      try {
        provider = new ethers.providers.Web3Provider(window.ethereum)
        window.ethereum.request({
          method: "eth_requestAccounts",
        }).then(function (accounts) {
          if (accounts.length > 0) {
            setAccountAddress(accounts[0]);
            setstatusIndicator('success');
            getEtheriumContract()
          }
        });
      } catch (e) {
        setStatus('User has denied access to the dapp browser.');
        setstatusIndicator('error');
      }
    } else {
      setStatus('You have to install MetaMask !');
      setstatusIndicator('warning');
    }
  }
  const getEtheriumContract = async () => {
    if (window.ethereum) {

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const transactionContract = new ethers.Contract(
        contractAddress,
        contractAbi.abi,
        signer,
      )
      const contract = await transactionContract.getTransactionCount()
      const contract2 = await transactionContract.getTransactions()
      console.log(`contract : `, contract.toNumber())
      console.log(`contract2 : `, contract2)
      console.log(`ethers.utils.parseEther(amount) : `, ethers.utils.parseEther(contract)._hex)
      return transactionContract
    }
  }
  return (
    <div className=" mx-auto h-screen bg-gradient-to-r from-cyan-500 to-blue-500" >
      <div className="flex bg-red items-center w-full justify-center flex-col pt-10">
        <button className="bg-blue-200 text-blue-500 drop-shadow-xl delay-75 duration-100 ease-in-out hover:drop-shadow-lg hover:text-white rounded-xl p-5 cursor-pointer"
          onClick={accountAddress ? () => { return } : intializaMetamaskWallet}
        >
          Connected with metamask
        </button>

        {
          accountAddress ?
            <h3 className={`text-white p-5 mt-10 break-words`}>
              {accountAddress}
            </h3>
            : <h3 className={`text-white p-5 mt-10 ${statusIndicator === 'error' ? 'text-red-300' : statusIndicator === 'warning' ? 'text-orange-300' : ''}`}>
              {status}
            </h3>
        }
        {
          accountAddress &&
          <div>
            <input
              className="bg-blue-200 text-blue-500 drop-shadow-xl delay-75 duration-100 ease-in-out hover:drop-shadow-lg hover:text-white rounded-xl pr-5 pl-5 pt-2 pb-2 active:border-none"
              value={inputValue}
              placeholder="Enter something to sign new contract"
              onChange={e => setInputValue(e.target.value)}
            />
            <button
              className="bg-blue-200 text-blue-500 drop-shadow-xl delay-75 duration-100 ease-in-out hover:drop-shadow-lg hover:text-white rounded-xl pr-5 pl-5 pt-2 pb-2 ml-2 cursor-pointer"
              onClick={getEtheriumContract}
            >
              Sign
            </button>
          </div>
        }
      </div>
    </div >
  );
}