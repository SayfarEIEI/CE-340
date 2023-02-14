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
    require(y!=0,"devide by zero");
    return x/y;
  }
  function sum(int [] memory deta) public pure returns (int){
    require(deta.length > 0,"Invalid data");
    int result = 0;
    for (uint i;i <= deta.length;i++){
      result += deta[i];
    }
    return result;
  }
  function min(int [] memory deta) public pure returns (int){
    require(deta.length > 0,"Invalid data");
    int num1 = 0;
    int num2 = 0;
    int result = 0;
    bool ck = true;
    for (uint i ; i <= deta.length; i++){
    //   num2 = deta[i];
    //  ck =  num1.min(num2);
    }
    return result;
  }
  function max(int [] memory deta) public pure returns (int){
    require(deta.length > 0,"Invalid data");
    int num = 0;
    for (uint i;i <= deta.length;i++){
      if (num < deta[i]){
        num = deta[i];
      }
      continue;
    }
    return num;
  }
  function mean(int [] memory deta) public pure returns (int){
      require(deta.length > 0,"Invalid data");
      int result = 0;
    for (uint i;i <= deta.length;i++){
      result += deta[i];
    } 
    
     return result /int(deta.length);
  }
}
