import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./contractJson/StakingToken.json";

import "./App.css";
import Navigation from "./components/Navigation";
import StakeBody from "./components/StakeBody";

function App() {
  const [account, setAccount] = useState(null);
  const [stakingAppData, setStakingAppData] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);

  const template = async () => {
    const contractAddres = "0xc25bEcE9135B16cCD1c516dc3a12c7F968868188";
    const contractABI = abi.abi;

    try {
      const { ethereum } = window;
      // const account = await ethereum.request({
      //   method: "eth_requestAccounts",
      // });

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddres, contractABI, signer);

      setStakingAppData(contract);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    template();
  }, []);

  useEffect(() => {
    console.log(account);
  }, [account]);

  // useEffect(() => {
  //   console.log("state", state);
  // }, [state]);

  return (
    <div className="App">
      <Navigation
        account={account}
        setAccount={setAccount}
        tokenBalance={tokenBalance}
        stakingAppData={stakingAppData}
        setTokenBalance={setTokenBalance}
      />
      {account && (
        <StakeBody
          account={account}
          stakingAppData={stakingAppData}
          setTokenBalance={setTokenBalance}
        />
      )}
    </div>
  );
}

export default App;
