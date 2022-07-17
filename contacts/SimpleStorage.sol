// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15; // solidity 0.8.15

contract SimpleStorage {
    // boolean, unit, init, address, bytes
    uint256 farvoriteNumber;

    mapping(string => uint256) public nameToFavoriteNumber;

    struct People {
        uint256 farvoriteNumber;
        string name;
    }

    People[] public people;

    function setFavoriteNumber(uint256 _favoriteNumber) public {
        farvoriteNumber = _favoriteNumber;
        getFavoriteNumber();
    }

    // view, pure don't have to pay gas
    function getFavoriteNumber() public view returns (uint256) {
        return farvoriteNumber;
    }

    // calldata, memory, storage
    // calldata the variable can't be modify
    // memory: the value is stored in memory temporarily, and is lost when the contract ends.
    // storage: the value is stored in the contract's event outside function.
    // string actually is array of bytes, string is seceretly an array.

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}
