const Petshop = artifacts.require("Petshop");
const petPrices = require("../migrations/petPrices.json")
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Petshop", function ( accounts ) {
  it("Petshop should assert true", async function () {
    await Petshop.deployed();
    return assert.isTrue(true);
  });
  it("should return the address of shop owner", async function () {
    const petshop = await Petshop.deployed();
    const owner = accounts[0]
    const shopOwner = await petshop.shopOwner.call()
    return assert.equal(owner,shopOwner,"The shop owner must be the default account");
  });
  it("should return number of pet for sales", async function () {
    const petshop = await Petshop.deployed();
    const totalPets = petPrices.length
    const pTotalPets = (await petshop.getTotalPets.call()).toString();
    return assert.equal(totalPets,pTotalPets,"The total number of pets is incorrect");
  });
  it("should return all pet prices as array", async function () {
    const petshop = await Petshop.deployed();
    const prices = []
    for(let i = 0; i < petPrices.length; i++){
      prices[i] = web3.utils.fromWei(await petshop.getPrice(i))
    }
    const expected = petPrices.every((val,index)=> String(val) == prices[index])
    return assert.isTrue(expected,"Some or all prices are incorrect");
  });

  const targetPetId = 6 
  const shopOwner = accounts[0]
  it("should buy a pet", async function () {
    const petshop = await Petshop.deployed();
    const prevBal = await petshop.getBalance({from: shopOwner});
    const buyer = accounts[1];
    let currentBal;
    const petPrice = await petshop.getPrice(targetPetId);
    try{
      await petshop.buy(targetPetId, {from : buyer, value: petPrice});
    }catch (err){
      console.log(err)
    }
    currentBal = await petshop.getBalance({from : shopOwner});
    const diff = currentBal.sub(prevBal);
    assert.equal(diff.toString(), petPrice.toString(), "the balance is incorrect");

    const expectedBuyer = await petshop.getBuyer(targetPetId);

    return assert.equal(expectedBuyer , buyer, "buyer info is incorrect");
  }); 
  it("should allow shopOwner to withdraw", async function () {
    const petshop =  await Petshop.deployed();
    const prevBal = await petshop.getBalance({from:shopOwner})
    try {
      await petshop.withdraw(prevBal,{from:shopOwner})
    } catch (error) {
      console.log(error)
    }
    const currentBal = await petshop.getBalance({from:shopOwner})
    return assert.isTrue(prevBal.gt(currentBal) && currentBal.eq(new web3.utils.BN(0)),"the contract balance is incorrect" );
  });
});
