const MyAuction = artifacts.require("MyAuction");
const product = require('../migrations/product.json')
const BN = require('bn.js')
contract("MyAuction", function (accounts) {
    // should return the correct auction owner (address)
    it("should return the correct auction owner (address)", async function () {
      const auction = await MyAuction.deployed();
      const owner = await auction.auctionOwner.call(); // เรียกใช้งานตัวแปรที่เป็น public
      return assert.equal(owner, accounts[0], "The account owner must be the same as account#0");
    });
  
    // should return the information of product/merchandise(สินค้า)
    it("should return the information of product/merchandise(สินค้า)", async function () {
      const auction = await MyAuction.deployed();
      const info = await auction.getProductInfo();
      const brand = info['0'];
      const serial = info['1'];
      const result = (brand == product.brand) && (serial == product.serial)
      return assert.isTrue(result, `Product infomation is incorrect ${serial} - ${brand}`);
    });
  
    // should make some bids
    const sampleBidAmount = [1, 1.2, 1.5, 2, 2.31];
    const sampleBidAmountBN = sampleBidAmount.map(amount => web3.utils.toWei(String(amount)));
    const bidders = accounts.slice(1); // เอา account ตั้งแต่ 1 ~ 9 เพราะ 0 เป็นคน deploy
    it("should make some bids", async function () {
      const auction = await MyAuction.deployed();
      let i = 0;
      for (i; i < sampleBidAmountBN.length; i++) {
        await auction.bid({from: bidders[i], value: sampleBidAmountBN[i]});
      }
  
      const madeBid = [];
      for (i = 0;i< sampleBidAmountBN.length; i++) {
        madeBid.push(await auction.getMyBid(bidders[i]));
      }
      const compareResult = madeBid.every((bid,i) => bid.toString() == sampleBidAmountBN[i].toString());
      assert.isTrue(compareResult,"All or some of bid amount are incorrect")
    });
  
    // should return the highest bidder
    it("should return the highest bidder", async function () {
      const auction =  await MyAuction.deployed();
      const highestBidder = await auction.highestBidder.call();
      return assert.equal(highestBidder , bidders[sampleBidAmount.length - 1],"The highest bidder info is incorrect");
    });
  
    // should return the highest bid
    it("should return the highest bid", async function () {
      const auction =  await MyAuction.deployed();
      const highestBid = await auction.highestBid.call();
      return assert.equal(highestBid.toString() , sampleBidAmountBN[sampleBidAmount.length - 1 ].toString(),"The highest bidder info is incorrect");
    });
  
    // should not allow a bid with same amount again
    it("should not allow a bid with same amount again", async function () {
      const auction =  await MyAuction.deployed();
      const bidAmount = sampleBidAmountBN[sampleBidAmount.length - 1 ];
      let bidFailed = false;
      try{
        await auction.bid({from:bidders[sampleBidAmountBN.length],value:bidAmount})
      }
      catch(err){
        bidFailed = true;
        console.log(err.data.reason)
      }
      return assert.isTrue(bidFailed,"The orther bidder must not be able to bid with the preavious amount");
    });
  
    // should not allow to withdraw during the ongoing auction
    it("should not allow to withdraw during the ongoing auction", async function () {
      const auction = await MyAuction.deployed();
      let withdrawFail = false;
      try {
        await auction.withdraw({from:bidders[0]});
      } catch (error) {
        withdrawFail = true;
        console.log(error.data.reason)
      }
      return assert.isTrue(withdrawFail,"Any bidder must not be able to withdraw during ongoing auction");
    });
    const auctionStates = [ "STARTED","CANCELLED","ENDED","DESTRUCTED"]
    // should close the auction properly
    it("should close the auction properly", async function () {
      const auction = await MyAuction.deployed();
      await auction.endAuction({from:accounts[0]});
      const currentState = await auction.STATE.call();
      return assert.equal(currentState,auctionStates.indexOf("ENDED"),"The auction is still not ended!");
    });
  
    // should allow any withdrawal after the auction has ended
    it("should allow any withdrawal after the auction has ended", async function () {
      const auction =  await MyAuction.deployed();
      let i ;
      let success =true;
      try {
        for(i = 0;i<sampleBidAmountBN.length-1;i++){
          await auction.withdraw({from:bidders[i]});
        }
      } catch (error) {
        success = false;
        console.log(error.data.reason);
      }
      return assert.isTrue(success,"Some bidders can not withdraw!!!!");
    });
  
    // should not allow to bid ager the auction has ended
    it("should not allow to bid ager the auction has ended", async function () {
      const auction =  await MyAuction.deployed();
      let bidAmount = sampleBidAmountBN[sampleBidAmountBN.length-1];
      let bidFail = false;
      bidAmount = new BN(bidAmount).add(new BN(1));
      try {
        await auction.bid({from:bidders[sampleBidAmountBN.length],value:bidAmount});
      } catch (error) {
        console.log(error.data.reason);
        bidFail = true;
      }
      return assert.isTrue(bidFail,"No one must not be able to bid after auction has ended");
    });
  });