const ProtobufLib = artifacts.require("ProtobufLib");
const TestFixture = artifacts.require("TestFixture");

module.exports = function (deployer) {
  deployer.deploy(ProtobufLib);
  deployer.link(ProtobufLib, TestFixture);
  deployer.deploy(TestFixture);
};
