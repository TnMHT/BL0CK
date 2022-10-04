// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorage {
    // DECLARING OUR VARIABLES/ TYPES
    uint256 favoriteNumber; // initialized to zero

    mapping(string => uint256) public nameToFavoriteNum;

    // STRUCT CREATES OUR OWN TYPES
    struct People {
        uint256 favoriteNumber;
        string name;
    }

    People[] public people;

    // FUNCTIONS
    function store(uint256 _favoriteNum) public virtual {
        favoriteNumber = _favoriteNum;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    // CREATING Person using Arrays
    function addPerson(string memory _name, uint256 _favoriteNum) public {
        People memory newPerson = People(_favoriteNum, _name);
        people.push(newPerson);
        nameToFavoriteNum[_name] = _favoriteNum;
    }
}
