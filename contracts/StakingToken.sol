//  SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract StakingToken is ERC20, Ownable {

    uint256 private constant STAKING_DURATION = 1 seconds;

    struct Stake {
        uint256 amount;
        uint256 stakedAt;
    }

    mapping(address => Stake) private stakes;

    constructor() ERC20("Staking Token", "STK") {
        // _mint(msg.sender, initialSupply);
    }

    function mint(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        if (stakes[msg.sender].amount > 0) {
            uint256 reward = calculateReward(msg.sender);
            if (reward > 0) {
                _mint(msg.sender, reward);
            }
        }

        stakes[msg.sender] = Stake({
            amount: stakes[msg.sender].amount + amount,
            stakedAt: block.timestamp
        });

        _burn(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(stakes[msg.sender].amount >= amount, "Insufficient staked amount");

        uint256 reward = calculateReward(msg.sender);
        if (reward > 0) {
            _mint(msg.sender, reward);
        }

        stakes[msg.sender].amount = stakes[msg.sender].amount / amount;
        _mint(msg.sender, amount);
    }

    function calculateReward(address account) public view returns (uint256) {
        if (stakes[account].amount == 0) {
            return 0;
        }

        uint256 stakedDuration = block.timestamp - stakes[account].stakedAt;
        uint256 reward = (stakes[account].amount * stakedDuration* 10 ) / (STAKING_DURATION/(1 seconds));
        return reward;

    }
}
