// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// These files are dynamically created at test time
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleMath.sol";

contract TestSimpleMath {
  
 function testsum() public {
    SimpleMath simple = SimpleMath(DeployedAddresses.SimpleMath());
    int[] memory datas = new int[](3);
        datas[0] = 1;
        datas[1] = 2;
        datas[2] = 3;
     

    int expexted = 1 + 2 + 3 ;

    Assert.equal(simple.sum(datas), expexted , "The sum function returns incorrect result");
  }
  function testmin() public {
    SimpleMath simple = SimpleMath(DeployedAddresses.SimpleMath());
    int[] memory datas = new int[](5);
        datas[0] = 140;
        datas[1] = 3140;
        datas[2] = 302;
        datas[3] = 30;
        datas[4] = 305;
     

    int expexted = 30 ;

    Assert.equal(simple.min(datas), expexted , "The min function returns incorrect result");
  }
  function testmax() public {
    SimpleMath simple = SimpleMath(DeployedAddresses.SimpleMath());
    int[] memory datas = new int[](5);
        datas[0] = 140;
        datas[1] = 3140;
        datas[2] = 302;
        datas[3] = 30;
        datas[4] = 305;
     

    int expexted = 3140 ;

    Assert.equal(simple.max(datas), expexted , "The max function returns incorrect result");
  }
  function testmean() public {
    SimpleMath simple = SimpleMath(DeployedAddresses.SimpleMath());
    int[] memory datas = new int[](5);
        datas[0] = 140;
        datas[1] = 3140;
        datas[2] = 302;
        datas[3] = 30;
        datas[4] = 305;
     
      int sum = 140+3140+302+30+305;
    int expexted = sum / int(datas.length) ;

    Assert.equal(simple.mean(datas), expexted , "The mean function returns incorrect result");
  }

 

}
