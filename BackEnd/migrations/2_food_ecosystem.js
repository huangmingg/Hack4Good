const FoodChainEcosystem = artifacts.require("FoodChainEcosystem")

module.exports = function(deployer) {
  deployer.then(() => {
      return deployer.deploy(FoodChainEcosystem);
  }).then((FoodChainEcosystem) => {
      console.log(`Address of Ecosystem Contract : ${FoodChainEcosystem.address}`);
    })
};
