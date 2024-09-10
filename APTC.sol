// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract APTC is ERC20 {
    constructor(uint256 initialSupply) ERC20("APTC", "APTC") {
        _mint(msg.sender, initialSupply * (10 ** decimals()));
    }

    // Function to mint new tokens
    function mint(address to, uint256 amount) external {
        // Ensure only the contract deployer or an authorized account can mint tokens
        require(msg.sender == address(this), "Only contract itself can mint tokens");
        _mint(to, amount * (10 ** decimals()));
    }

    // Function to burn tokens
    function burn(address from, uint256 amount) external {
        // Ensure only the contract deployer or an authorized account can burn tokens
        require(msg.sender == address(this), "Only contract itself can burn tokens");
        _burn(from, amount * (10 ** decimals()));
    }
}

