import React from "react";
import { ethers } from "ethers";

function Navigation ({account, setAccount, tokenBalance, stakingAppData, setTokenBalance}) {

  async function connectHandler () {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
    // console.log("account", account);

    const tokenBalance = await stakingAppData.balanceOf(account);
    setTokenBalance(tokenBalance);
  };

  return (
    <nav className="mb-4">
      {account ? (
        <div className="flex justify-end mr-4 mt-4">
          <button
            type="button"
            className="bg-black text-white font-bold py-4 px-8 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
          >
            {account.slice(0, 6) + "..." + account.slice(38, 42)}
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="bg-gray-800 hover:bg-black text-white font-semibold text-2xl py-2 px-8 rounded focus:outline-none focus:shadow-outline mt-24"
          onClick={connectHandler}
        >
          Click here to connect your MetaMask wallet
        </button>
      )}

      {account && (
        <button className="bg-blue-800 text-white font-bold py-2 px-6 min-w-96 rounded focus:outline-none focus:shadow-outline cursor-wait">
          {tokenBalance && `Token balance is ${tokenBalance}`}
        </button>
      )}
    </nav>
  );
};

export default Navigation;
