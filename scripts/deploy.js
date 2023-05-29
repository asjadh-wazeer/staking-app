
const hre = require("hardhat");

async function main() {
  

  const StakingToken = await hre.ethers.getContractFactory("StakingToken");
  const stakingToken = await StakingToken.deploy();

  await stakingToken.deployed();

  console.log(
    `Deployed contract address is ${stakingToken.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


//npx hardhat run scripts/deploy.js --network goerli 