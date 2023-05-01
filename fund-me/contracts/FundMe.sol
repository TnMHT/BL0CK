// SPDX-License-Identifier: MIT
// PRAGMA:
pragma solidity ^0.8.9;
// IMPORTS
import "./PriceConverter.sol";
// ERROR CODES
error FundMe__NotOwner();

// INTERFACES, LIBRARIES, CONTRACTS

/**
 * @title A Contact for crown funding
 * @author 0013
 * @notice This contract is to demo a sample funding contract
 * @dev this implements price feeds as our library
 */

contract FundMe {
    // TYPE DELCARATIONS
    using PriceConverter for uint256;
    // STATE VARIABLES
    mapping(address => uint256) public s_addressToAmountFunded;
    address[] public s_funders;
    address public s_owner;
    AggregatorV3Interface public s_priceFeed;

    // MODIFIERS

    modifier onlyOwner() {
        //require(msg.sender == s_owner);
        if (msg.sender != s_owner) revert FundMe__NotOwner();
        _;
    }

    // FUNCTIONS
    constructor(address priceFeed) {
        s_priceFeed = AggregatorV3Interface(priceFeed);
        s_owner = msg.sender;
    }

    /**
     * @notice this function funds this contract
     * @dev this implements price feeds as our library
     */

    function fund() public payable {
        uint256 minimumUSD = 50 * 10 ** 18;
        require(
            msg.value.getConversionRate(s_priceFeed) >= minimumUSD,
            "You need to spend more ETH!"
        );
        // require(PriceConverter.getConversionRate(msg.value) >= minimumUSD, "You need to spend more ETH!");
        s_addressToAmountFunded[msg.sender] += msg.value;
        s_funders.push(msg.sender);
    }

    function getVersion() public view returns (uint256) {
        return s_priceFeed.version();
    }

    function withdraw() public payable onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
        for (
            uint256 funderIndex = 0;
            funderIndex < s_funders.length;
            funderIndex++
        ) {
            address funder = s_funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
    }

    function cheaperWithdraw() public payable onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
        address[] memory funders = s_funders;
        // mappings can't be in memory, sorry!
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
    }
}
