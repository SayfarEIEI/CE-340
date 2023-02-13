// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// These files are dynamically created at test time
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BasicMath.sol";

contract TestBasicMathCoin {

  
  function testAdd() public {
    BasicMath ba = BasicMath(DeployedAddresses.BasicMath());

    int x =7;
    int y = 5;

    int expexted = x + y ;

    Assert.equal(ba.add(x,y), expexted , "The add function returns incorrect result");
  }
   function testSubtract() public {
    BasicMath ba = BasicMath(DeployedAddresses.BasicMath());

    int x =7;
    int y = 5;

    int expexted = x - y ;

    Assert.equal(ba.subtract(x, y), expexted , "The subtract function returns incorrect result");
  }
  function testMultiply() public {
    BasicMath ba = BasicMath(DeployedAddresses.BasicMath());

    int x =7;
    int y = 5;

    int expexted = x * y ;

    Assert.equal(ba.multiply(x,y), expexted , "The multiply function returns incorrect result");
   
  }
  function testDivide() public {
    BasicMath ba = BasicMath(DeployedAddresses.BasicMath());

    int x =7;
    int y = 5;

    int expexted = x / y ;

    Assert.equal(ba.divide(x,y), expexted , "The Divide function returns incorrect result");
  }
 
 

}
