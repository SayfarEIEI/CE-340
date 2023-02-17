// const ConvertLib = artifacts.require("ConvertLib");
// const MetaCoin = artifacts.require("MetaCoin");
const BasicMath = artifacts.require("BasicMath");
const SimpleMath = artifacts.require("SimpleMath");

module.exports = function(deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(BasicMath);
  deployer.deploy(SimpleMath);
};
