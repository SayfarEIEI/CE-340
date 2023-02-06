// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract BasicMath {
  function add(int x,int y)public pure returns (int){
    return x+y;
  }
  function subtract(int x,int y)public pure returns (int){
    return x-y;
  }
  function multiply(int x,int y)public pure returns (int){
    return x*y;
  }
  function divide(int x,int y)public pure returns (int){
    return x/y;
  }
}
