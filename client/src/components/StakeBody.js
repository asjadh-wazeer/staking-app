import React, { useState } from "react";
import "../styles/NumberInput.css";

function StakeBody({ account, stakingAppData, setTokenBalance }) {
  const [mintToken, setMintToken] = useState("");
  const [stakeToken, setStakeToken] = useState("");
  const [unStakeToken, setUnStakeToken] = useState("");

  /** Mint token **/

  async function onClickMintToken(e) {
    try {
      e.preventDefault();
      const mintTokenResponse = await stakingAppData.mint(account, mintToken);

      if (mintTokenResponse.data) {
        alert(`${mintToken} tokens have been successfully minted`);
        const tokenBalance = await stakingAppData.balanceOf(account);
        setTokenBalance(tokenBalance);
        setMintToken("");
      }
    } catch (e) {
      alert(`The token minting process has failed`);

      setMintToken("");
      // console.log(e);
    }
  }

  const onChangeMintToken = (e) => {
    setMintToken(e.target.value);
  };


  /** Stake token **/

  async function onClickStakeToken() {
    try {
      const stake = await stakingAppData.stake(stakeToken);

      if (stake.data) {
        alert(`${stakeToken} tokens have been successfully staked`);
        const tokenBalance = await stakingAppData.balanceOf(account);
        setTokenBalance(tokenBalance);
        setStakeToken("");
      }
    } catch (e) {
      alert("The token staking process has failed");
      setStakeToken("");
      // console.log(e);
    }
  }

  function onChangeStakeToken(e) {
    setStakeToken(e.target.value);
  }


  /** Unstake token **/

  async function onClickUnStakeToken() {
    try {
      const unStake = await stakingAppData.unstake(unStakeToken);

      if (unStake.data) {
        alert(`${unStakeToken} tokens have been successfully unstaked`);

        const tokenBalance = await stakingAppData.balanceOf(account);
        setTokenBalance(tokenBalance);
        setUnStakeToken("");
      }
    } catch (e) {
      alert("The token unstaking process has failed");
      setUnStakeToken("");
      // console.log(e);
    }
  }

  function onChangeUnStakeToken(e) {
    setUnStakeToken(e.target.value);
  }


  /** Refresh token balance **/

  async function onClickRefreshTokenBalance() {
    const tokenBalance = await stakingAppData.balanceOf(account);
    setTokenBalance(tokenBalance);
  }


  /** Calculate reward **/

  async function onClickCalculateReward() {
    try {
      const calculateReward = await stakingAppData.calculateReward(account);

      if (calculateReward._hex) {
        alert(`You have been rewarded ${parseInt(calculateReward?._hex, 16)} tokens`);
      }
    } catch (e) {
      // console.log(e);
    }
  }

  return (
    <div>
      <div className="flex  justify-center h-fit">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div>
            {/* <label htmlFor="mintToken">Mint token</label> */}
            <input
              id="mintToken"
              className="number-input shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              onChange={onChangeMintToken}
              placeholder="Mint Token"
              value={mintToken}
            />
            <button
              onClick={onClickMintToken}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Mint token
            </button>
          </div>

          <div className="mt-10">
            {/* <label htmlFor="stakeToken">Stake token</label> */}
            <input
              className="number-input shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="stakeToken"
              type="number"
              onChange={onChangeStakeToken}
              value={stakeToken}
              placeholder="Stake Token"
            />
            <button
              onClick={onClickStakeToken}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Stake token
            </button>
          </div>

          <div className="mt-10">
            {/* <label htmlFor="unStakeToken">Unstake token</label> */}
            <input
              className="number-input shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="unStakeToken"
              type="number"
              onChange={onChangeUnStakeToken}
              value={unStakeToken}
              placeholder="Unstake Token"
            />
            <button
              onClick={onClickUnStakeToken}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Unstake token
            </button>
          </div>

          <button
            onClick={onClickRefreshTokenBalance}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-16"
          >
            Refresh Token Balance
          </button>

          <div>
            <button
              onClick={onClickCalculateReward}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-10"
            >
              Calculate Reward
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StakeBody;
