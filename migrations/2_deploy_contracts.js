const MauElection = artifacts.require("MauElection");

module.exports = function (deployer) {
  deployer.deploy(MauElection);
};