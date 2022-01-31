import { useEffect, useState } from "react";

export const App = () => {
  const [status, setStatus] = useState('Not Connected');
  const [accountAddress, setAccountAddress] = useState(null);
  const [statusIndicator, setstatusIndicator] = useState(null);
  useEffect(() => {
    if (window.ethereum) {
      console.log(window.ethereum)
      try {
        window.ethereum.enable().then(function () {
          setStatus('Enabled, Now you can connect metamask.');
          window.ethereum.request({
            method: "eth_requestAccounts",
          }).then(function (accounts) {
            if (accounts.length > 0) {
              setAccountAddress(accounts[0]);
              setstatusIndicator('success');
            }
          });
        });
      } catch (e) {
        console.log(e)
        setStatus('User has denied access to the dapp browser.');
        setstatusIndicator('error');
      }
    } else {
      setStatus('You have to install MetaMask !');
      setstatusIndicator('warning');
    }
  }, []);
  const connectEthereum = () => {
    window.ethereum.enable().then(function () {
      setStatus('Enabled, Now you can connect metamask.');
    });
  };
  return (
    <div className=" mx-auto h-screen bg-gradient-to-r from-cyan-500 to-blue-500" >
      <div className="flex bg-red items-center w-full justify-center flex-col pt-10">
        <button className="bg-blue-200 text-blue-500 drop-shadow-xl delay-75 duration-100 ease-in-out hover:drop-shadow-lg hover:text-white rounded-xl p-5 cursor-pointer"
          onClick={accountAddress ? () => { return } : connectEthereum}
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
      </div>
    </div >
  );
}