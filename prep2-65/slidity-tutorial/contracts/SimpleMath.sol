// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract SimpleMath {
  function sum(int [] memory deta) public pure returns (int){
    require(deta.length > 0,"Invalid data");
    int result = 0;
    for (uint i;i < deta.length;i++){
      result += deta[i];
    }
    return result;
  }
  function min(int [] memory deta) public pure returns (int){
  require(deta.length > 0,"Invalid data");
    int num = 0;
    for (uint i;i < deta.length;i++){
       if(num==0){
        num = deta[i];
      }
      else if (num >= deta[i]){
        num = deta[i];
      }
      continue;
    }
    return num;
  }
  function max(int [] memory deta) public pure returns (int){
    require(deta.length > 0,"Invalid data");
    int num = 0;
    for (uint i;i < deta.length;i++){

      if(num==0){
        num = deta[i];
      }
      else if  (num <= deta[i]){
        num = deta[i];
      }
      
      continue;
    }
    return num;
  }
  function mean(int [] memory deta) public pure returns (int){
      require(deta.length > 0,"Invalid data");
      int result = 0;
    for (uint i;i < deta.length;i++){
      result += deta[i];
    } 
    
     return result /int(deta.length);
  }
}
