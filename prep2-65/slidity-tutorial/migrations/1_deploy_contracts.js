// const ConvertLib = artifacts.require("ConvertLib");
// const MetaCoin = artifacts.require("MetaCoin");
// const BasicMath = artifacts.require("BasicMath");
// const SimpleMath = artifacts.require("SimpleMath");
const MyAuction = artifacts.require("MyAuction")
const product = require('./product.json')
module.exports = function(deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(BasicMath);
  // deployer.deploy(SimpleMath);
  deployer.deploy(MyAuction,product.brand,product.serial,product.period)
};
const Petshop = artifacts.require("Petshop")
const petPrices = require('./petPrices.json')
const CinemaTicket = artifacts.require("CinemaTicket")
module.exports = function(deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(BasicMath);
  // deployer.deploy(SimpleMath);
  deployer.deploy(Petshop,petPrices)
  deployer.deploy(CinemaTicket,20,2000)
};
