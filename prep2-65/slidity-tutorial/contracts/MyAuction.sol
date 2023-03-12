// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Auction.sol";

contract MyAuction is Auction {
    Product public myProduct;
    mapping (address => uint) bids;
    address [] bidders;

    constructor(string memory brand, string memory serial, uint period) {
        auctionOwner = payable(msg.sender); // address => address payable
        auctionStart = block.timestamp;
        auctionEnd = auctionStart + period * 1 hours;
        STATE = AuctionState.STARTED;
        myProduct = Product(brand, serial);
    }

    modifier onlyOwner {
        require(msg.sender == auctionOwner);
        _;
    }

    modifier onGoingAuction {
        require(STATE == AuctionState.STARTED);
        _;
    }
    event CancelEvent(uint timestamp);
    function cancelAuction() public  override onlyOwner returns (bool) {
        STATE = AuctionState.CANCELLED;
        emit CancelEvent(block.timestamp);
        return true;
    }
    event EndEvent(address highestBidder,uint highestBid,uint timestamp);
    function endAuction() public  override onlyOwner returns (bool) {
        STATE = AuctionState.ENDED;
        emit EndEvent(highestBidder,highestBid,block.timestamp);
        return true;
    }
    event BidEvent (address highestBidder,uint highestBid,uint timestamp);
    function bid() public  payable override  onGoingAuction returns (bool) {
        require(highestBidder != msg.sender,"alreadly a current highest bidder");
        require(msg.value > highestBid,"Only higher bid is allowed");
        highestBidder = msg.sender;
        highestBid = msg.value;
        bids[msg.sender] = msg.value;
        bidders.push(msg.sender);
        emit BidEvent(msg.sender, msg.value, block.timestamp);
        return true;
    }

    function getStatus() public virtual override returns (int256) {}

    function getProductInfo()
        public
        view
        override
        returns (string memory, string memory)
    {
        return (myProduct.Brand, myProduct.SerialNum);
    }
    event withdrawEvent(address bidder,uint amount,uint timestampe);
    function withdraw() public  override returns (bool) {
        require(msg.sender != highestBidder,"The winner can not withdraw");
        require(STATE != AuctionState.STARTED,"Can not witdraw from ongoing auction");
        require(STATE != AuctionState.DESTRUCTED,"Can not withdraw from destroted contract");
      
        uint amount = bids[msg.sender];
        delete bids[msg.sender];
        payable(msg.sender).transfer(amount);
        emit withdrawEvent(msg.sender, amount,block.timestamp);
        return true;
    }

    function getMyBid(
        address bidder
    ) public view override returns (uint256) {
        return bids[bidder];
    }
}
