const { expect } = require("chai");

describe("StakingToken", function () {
  let stakingToken;
  let owner;
  let user1;

  it("should stake tokens", async function () {
    const StakingToken = await ethers.getContractFactory("StakingToken");
    stakingToken = await StakingToken.deploy();
    [owner, user1] = await ethers.getSigners();

    await stakingToken.mint(owner.address, ethers.utils.parseEther("1000"));

    const initialBalance = await stakingToken.balanceOf(owner.address);
    const amountToStake = ethers.utils.parseEther("100");

    await stakingToken.connect(owner).stake(amountToStake);

    const finalBalance = await stakingToken.balanceOf(owner.address);
    expect(finalBalance).to.equal(initialBalance.sub(amountToStake));
  });
});
