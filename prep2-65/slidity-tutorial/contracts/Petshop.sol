// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Petshop {
    //ประกาศตัวแปร
    address payable public shopOwner;
    uint public petCount;
    //สร้าง interface
    struct PetInfo {
        uint price;
        address buyer;
    }
    //สร้างตัวแปรที่มี type เป็น interface
    PetInfo[] public petInfos;

    constructor(uint[] memory petPrices) {
        shopOwner = payable(msg.sender);
        for (uint i = 0; i < petPrices.length; i++) {
            PetInfo memory info = PetInfo(petPrices[i] * 1 ether, address(0));
            petInfos.push(info);
        }
        petCount = petPrices.length;
    }

    modifier onlyOwner() {
        require(msg.sender == shopOwner, "Only owner can call this function");
        _;
    }
    modifier notAnOwner() {
        require(msg.sender != shopOwner, "Only owner can call this function");
        _;
    }

    function buy(uint petId) external payable notAnOwner {
        require(petId >= 0 && petId < petCount, "Invalid pet id");
        require(msg.value >= petInfos[petId].price, "Insufficient fund");
        require(petInfos[petId].buyer == address(0), "This one is already sold");

        petInfos[petId].buyer = msg.sender;
        emit Sold(petId, msg.sender , petInfos[petId].price , block.timestamp);
    }

    function getPetInfo(uint petId) external view returns (uint,address) {
        return (petInfos[petId].price,petInfos[petId].buyer);
    }

    function getBuyer(uint petId) external view returns (address) {
        return petInfos[petId].buyer;
    }

    function getPrice(uint petId) external view returns (uint) {
        return petInfos[petId].price;
    }

    function getBalance() external view onlyOwner returns (uint) {
        return address(this).balance;
    }

    function withdraw(uint amount) external onlyOwner {
      require(amount <= address(this).balance);
      shopOwner.transfer(amount);
      emit Withdrawn(amount, block.timestamp);
    }

    function getTotalPets() external view returns (uint) {
        return petCount;
    }

    event Sold(uint petId, address indexed buyer, uint price, uint time);
    event Withdrawn(uint amount, uint indexed time);
}