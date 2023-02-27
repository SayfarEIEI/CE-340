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
