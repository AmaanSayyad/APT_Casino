// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SimpleRoulette {
    ERC20 public aptcToken;

    uint256 public rollDiceRequestId;
    address private newRoller;
    
    mapping(uint256 => address) private s_rollers;
    mapping(address => uint256) private s_results;
    mapping(address => uint256) public winnings;

    mapping(address => uint256[157]) public playerBets;

    uint8[] private redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    uint8[] private blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

    event BetPlaced(address indexed player, uint256 totalBetAmount);
    event DiceRolled(uint256 indexed requestId, address indexed roller);
    event RandomNumberFulfilled(uint256 indexed requestId, uint256 randomResult, address indexed roller, uint256 totalWinnings);
    event WinningsWithdrawn(address indexed player, uint256 amount);

    constructor(address _aptcToken) {
        aptcToken = ERC20(_aptcToken);
    }

    function placeBets(uint256[157] calldata betAmounts) external {
        uint256 totalBetAmount = 0;
        for (uint i = 0; i < betAmounts.length; i++) {
            totalBetAmount += betAmounts[i];
        }

        require(totalBetAmount > 0, "Total bet amount must be greater than 0");

        require(
            aptcToken.allowance(msg.sender, address(this)) >= totalBetAmount,
            "Contract is not allowed to spend enough APTC tokens."
        );
        require(
            aptcToken.balanceOf(msg.sender) >= totalBetAmount,
            "Insufficient APTC balance"
        );

        require(
            aptcToken.transferFrom(msg.sender, address(this), totalBetAmount),
            "Failed to transfer APTC tokens"
        );

        playerBets[msg.sender] = betAmounts;
        newRoller = msg.sender;

        emit BetPlaced(newRoller, totalBetAmount);
    }

    function rollDice() public {
        require(playerBets[newRoller].length > 0, "No bet placed");

        uint256 requestId = uint256(keccak256(abi.encodePacked(block.timestamp, newRoller)));
        s_rollers[requestId] = newRoller;

        emit DiceRolled(requestId, newRoller);
        rollDiceRequestId = requestId;
    }

    function fulfillRandomWords(uint256 requestId, uint256 randomResult) public {
        address roller = s_rollers[requestId];
        uint256[157] storage betsArray = playerBets[roller];
        uint256 totalWinnings = 0;

        uint256 result = (randomResult % 36) + 1;

        if (betsArray[result] > 0) {
            totalWinnings += (betsArray[result] * 35) + betsArray[result];
        }

        for (uint256 i = 37; i <= 96; i++) {
            if (betsArray[i] > 0) {
                (uint256 number1, uint256 number2) = getSplitBetNumbers(i);
                if (result == number1 || result == number2) {
                    totalWinnings += (betsArray[i] * 17) + betsArray[i];
                    break;
                }
            }
        }

        if (result != 0) {
            for (uint256 i = 0; i < 14; i++) {
                uint256 betIndex = 97 + i;
                uint256 lowerBound = 1 + (i * 3);
                uint256 upperBound = lowerBound + 2;

                if (result >= lowerBound && result <= upperBound && betsArray[betIndex] > 0) {
                    totalWinnings += (betsArray[betIndex] * 11) + betsArray[betIndex];
                    break;
                }
            }
        }

        for (uint256 i = 0; i < 23; i++) {
            uint256 betIndex = 111 + i;
            uint256 num1 = (i / 4) * 3 + (i % 4) + 1;
            uint256 num2 = num1 + 1;
            uint256 num3 = num1 + 3;
            uint256 num4 = num3 + 1;

            if (i == 0) {
                num1 = 0;
                num3 = 1;
                num4 = 2;
            }

            if ((result == num1 || result == num2 || result == num3 || result == num4) && betsArray[betIndex] > 0) {
                totalWinnings += (betsArray[betIndex] * 8) + betsArray[betIndex];
            }
        }

        if (result != 0) {
            for (uint256 i = 0; i < 11; i++) {
                uint256 betIndex = 134 + i;
                uint256 lowerBound = 1 + (i * 3);
                uint256 upperBound = lowerBound + 5;

                if (result >= lowerBound && result <= upperBound && betsArray[betIndex] > 0) {
                    totalWinnings += (betsArray[betIndex] * 5) + betsArray[betIndex];
                    break;
                }
            }
        }

        if (result != 0) {
            if (result % 3 == 1 && betsArray[145] > 0) {
                totalWinnings += (betsArray[145] * 2) + betsArray[145];
            } else if (result % 3 == 2 && betsArray[146] > 0) {
                totalWinnings += (betsArray[146] * 2) + betsArray[146];
            } else if (result % 3 == 0 && betsArray[147] > 0) {
                totalWinnings += (betsArray[147] * 2) + betsArray[147];
            }
        }

        if (result >= 1 && result <= 12 && betsArray[148] > 0) {
            totalWinnings += (betsArray[148] * 2) + betsArray[148];
        } else if (result >= 13 && result <= 24 && betsArray[149] > 0) {
            totalWinnings += (betsArray[149] * 2) + betsArray[149];
        } else if (result >= 25 && result <= 36 && betsArray[150] > 0) {
            totalWinnings += (betsArray[150] * 2) + betsArray[150];
        }

        if (result != 0) {
            if (isInArray(redNumbers, uint8(result)) && betsArray[151] > 0) {
                totalWinnings += betsArray[151] * 2;
            } else if (isInArray(blackNumbers, uint8(result)) && betsArray[152] > 0) {
                totalWinnings += betsArray[152] * 2;
            }
        }

        if (result >= 1 && result <= 18 && betsArray[154] > 0) {
            totalWinnings += betsArray[154] * 2;
        } else if (result >= 19 && result <= 36 && betsArray[153] > 0) {
            totalWinnings += betsArray[153] * 2;
        }

        if (result != 0) {
            if (result % 2 == 0 && betsArray[155] > 0) {
                totalWinnings += betsArray[155] * 2;
            } else if (result % 2 != 0 && betsArray[156] > 0) {
                totalWinnings += betsArray[156] * 2;
            }
        }

        winnings[roller] = totalWinnings;

        emit RandomNumberFulfilled(requestId, result, roller, totalWinnings);
    }

    function withdrawWinnings() external {
        uint256 amount = winnings[msg.sender];
        require(amount > 0, "No winnings to withdraw");

        winnings[msg.sender] = 0;

        require(aptcToken.transfer(msg.sender, amount), "Failed to transfer APTC tokens");

        emit WinningsWithdrawn(msg.sender, amount);
    }

    function getSplitBetNumbers(uint256 betIndex) private pure returns (uint256, uint256) {
        if (betIndex == 37) return (1, 2);
        if (betIndex == 38) return (2, 3);
        if (betIndex == 39) return (4, 5);
        if (betIndex == 40) return (5, 6);
        if (betIndex == 41) return (7, 8);
        if (betIndex == 42) return (8, 9);
        if (betIndex == 43) return (10, 11);
        if (betIndex == 44) return (11, 12);
        if (betIndex == 45) return (13, 14);
        if (betIndex == 46) return (14, 15);
        if (betIndex == 47) return (16, 17);
        if (betIndex == 48) return (17, 18);
        if (betIndex == 49) return (19, 20);
        if (betIndex == 50) return (20, 21);
        if (betIndex == 51) return (22, 23);
        if (betIndex == 52) return (23, 24);
        if (betIndex == 53) return (25, 26);
        if (betIndex == 54) return (26, 27);
        if (betIndex == 55) return (28, 29);
        if (betIndex == 56) return (29, 30);
        if (betIndex == 57) return (31, 32);
        if (betIndex == 58) return (32, 33);
        if (betIndex == 59) return (34, 35);
        if (betIndex == 60) return (35, 36);
        return (0, 0);
    }

    function isInArray(uint8[] memory array, uint8 value) private pure returns (bool) {
        for (uint i = 0; i < array.length; i++) {
            if (array[i] == value) {
                return true;
            }
        }
        return false;
    }
}

