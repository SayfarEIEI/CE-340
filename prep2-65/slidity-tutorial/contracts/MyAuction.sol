// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Auction.sol";
  contract MyAuction is Auction{
    Product public myProduct;
    mapping(address => uint) bids;
    address [] bidders;
   constructor(string memory brand,string memory serial,uint period){
    auctionOwner = payable(msg.sender);
    auctionStart = block.timestamp;
    auctionEnd = auctionStart + period * 1 hours;
    STATE = AuctionState.STARTED;
    myProduct = Product(brand,serial);
   }

    modifier onlyOwner{
      require(msg.sender == auctionOwner);
      _;
    }
       modifier onGoingAuction{
      require(STATE == AuctionState.STARTED);
      _;
    }

   // - Cancle auction
    function cancleAuction() public virtual override onlyOwner returns(bool){

    }
    // - End auction
    function  endAuction() public virtual override onlyOwner returns(bool){

    }
    // - Bid
     function  bid() public virtual override onGoingAuction returns(bool){

     }
    // - getStatus
    function  getStatus() virtual override public returns(uint){

    }
    // - GetProductInfo
    function  getProductInfo() virtual override public returns(string memory,string memory){

    }
    
    function withdraw() virtual override public returns (bool){

    }

    function getMyBid(address bidder) virtual override public returns (uint){

    }
}
