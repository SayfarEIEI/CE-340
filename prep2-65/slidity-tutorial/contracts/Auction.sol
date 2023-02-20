// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

abstract contract Auction {

    address payable public auctionOwner;
    uint public auctionStart;
    uint public auctionEnd;
    uint public highesBid;
    address public highestBidder;

    enum AuctionState {STARTED,CANCELLED,ENDED,DESTRUCTED}
   
    AuctionState public STATE;

    struct Product{
      string Brand;
      string serialNumber;
    }
    
    // - Cancle auction
    function cancleAuction() virtual public returns(bool);
    // - End auction
    function  endAuction() virtual public returns(bool);
    // - Bid
     function  bid() virtual public returns(bool);
    // - getStatus
    function  getStatus() virtual public returns(uint);
    // - GetProductInfo
    function  getProductInfo() virtual public returns(string memory,string memory);
    
    function withdraw() virtual public returns (bool);

    function getMyBid(address bidder) virtual public returns (uint); 
}
