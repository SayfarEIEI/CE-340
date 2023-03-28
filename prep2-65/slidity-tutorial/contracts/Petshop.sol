// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Petshop {
  address payable public shopOwner;
  uint public petCount;

  struct PetInfo {
    uint price;
    address buyer;
  }

  PetInfo [] public petInfos;

  constructor(uint[] memory petPrice){
    shopOwner = payable(msg.sender);
    for(uint i = 0; i < petPrice.length;i++){
      PetInfo memory info = PetInfo(petPrice[i] * 1 ether,address(0));
      petInfos.push(info);
    }
    petCount = petPrice.length;
  }
  modifier onlyOwner{
    require(msg.sender == shopOwner,"Only owner can call function");
    _;
  }
  modifier notAnOwner{
    require(msg.sender == shopOwner,"Owner can not call this function");
    _;
  }
  function buy(uint petId) external payable notAnOwner{

  }
  function getPetInfo(uint petId) external view returns (uint,address){

  }
  function getBuyer(uint petId) external view returns(address){
    
  }
  function getPrice(uint petId) external view returns(uint){
    return petInfos[petId].price;
  }
  function getBalance() external view onlyOwner returns(uint){

  }
  function withdraw(uint amount) external onlyOwner{

  }
  function getTotalPets() external view returns (uint){
    return petCount;
  }

  event Sold(uint petId, address indexed buyer,uint price,uint time);
  event Withdrawn(uint amount,uint indexed time);

}
