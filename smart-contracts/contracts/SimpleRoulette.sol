// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

/**
 * @title Simple Roulette Contract
 * @notice A simplified contract for a roulette game using Chainlink VRF V2.
 */
contract SimpleRoulette is
    VRFConsumerBaseV2,
    ConfirmedOwner,
    AutomationCompatibleInterface
{
    VRFCoordinatorV2Interface immutable COORDINATOR;
    IERC20 public linkToken;

    uint64 immutable s_subscriptionId;
    bytes32 immutable s_keyHash;
    uint32 public callbackGasLimit = 200000;
    uint16 public requestConfirmations = 3;
    uint32 public numWords = 1;

    // Player's bets and winnings
    mapping(address => uint256) public playerBets;
    mapping(address => uint256) public playerWinnings;

    // Chainlink Automation
    bool private upkeepNeeded;
    address private currentPlayer;
    uint256 private lastRequestId;

    event BetPlaced(address indexed player, uint256 amount);
    event DiceRolled(uint256 indexed requestId, address indexed player);
    event RandomNumberFulfilled(uint256 indexed requestId, uint256 randomNumber, address indexed player, uint256 winnings);
    event WinningsWithdrawn(address indexed player, uint256 amount);

    constructor(
        uint64 subscriptionId,
        address vrfCoordinator,
        bytes32 keyHash,
        address _linkToken
    ) VRFConsumerBaseV2(vrfCoordinator) ConfirmedOwner(msg.sender) {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_keyHash = keyHash;
        s_subscriptionId = subscriptionId;
        linkToken = IERC20(_linkToken);
    }

    function placeBet(uint256 amount) external {
        require(amount > 0, "Bet amount must be greater than 0");

        // Ensure the player has approved the contract to spend their LINK tokens
        require(linkToken.allowance(msg.sender, address(this)) >= amount, "Insufficient allowance");
        require(linkToken.balanceOf(msg.sender) >= amount, "Insufficient balance");

        // Transfer LINK Tokens from the player to the contract
        require(linkToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        playerBets[msg.sender] = amount;
        currentPlayer = msg.sender;
        upkeepNeeded = true;

        emit BetPlaced(msg.sender, amount);
    }

    function rollDice() public {
        require(playerBets[currentPlayer] > 0, "No bet placed");

        uint256 requestId = COORDINATOR.requestRandomWords(
            s_keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );

        lastRequestId = requestId;
        emit DiceRolled(requestId, currentPlayer);

        // Reset upkeep needed flag
        upkeepNeeded = false;
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal override {
        require(requestId == lastRequestId, "Unexpected requestId");
        uint256 randomNumber = (randomWords[0] % 36) + 1;
        uint256 betAmount = playerBets[currentPlayer];
        uint256 winnings = 0;

        // Example payout logic: 35:1 payout for a straight bet
        if (betAmount > 0) {
            winnings = betAmount * 35;
        }

        playerWinnings[currentPlayer] += winnings;

        emit RandomNumberFulfilled(requestId, randomNumber, currentPlayer, winnings);
    }

    function withdrawWinnings() external {
        uint256 amount = playerWinnings[msg.sender];
        require(amount > 0, "No winnings to withdraw");

        playerWinnings[msg.sender] = 0;
        require(linkToken.transfer(msg.sender, amount), "Transfer failed");

        emit WinningsWithdrawn(msg.sender, amount);
    }

    function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory /* performData */){
        upkeepNeeded = this._upkeepNeeded();
    }
    
    function performUpkeep(bytes calldata /* performData */) external override {
        if (_upkeepNeeded()) {  // not `this._upkeepNeeded()` because it's a state variable, no need to call it like a function
            rollDice();
        }
    }
    
    // Helper function to get the upkeep status
    function _upkeepNeeded() public view returns (bool) {  // notice the underscore prefix for clarity
        return upkeepNeeded;
    }
}
