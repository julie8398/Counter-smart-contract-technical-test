// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;


contract Counter {
    uint256 public count;
    address public owner;

    constructor() {
        owner = msg.sender;
    }


    event Incremented(uint value);
    event Decremented(uint value);
    event IncrementedBy(uint value);
    event DecrementedBy(uint value);
    event Reseted();
     
    function increment() public {
        count += 1;
        emit Incremented(count);
    }

    function decrement() public {
        require(count > 0, "Counter: count is already 0");
        count -= 1;
        emit Decremented(count);
    }

    function incrementBy(uint value) public {
        count += value;
        emit IncrementedBy(count);
    }

    function decrementBy(uint value) public {
        require(count >= value, "Counter: value is greater than count");
        count -= value;
        emit DecrementedBy(count);
    }

    function reset() public {
        count = 0;
        emit Reseted();
    }


}
