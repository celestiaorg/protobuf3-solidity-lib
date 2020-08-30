const truffleAssert = require("truffle-assertions");

const TestFixture = artifacts.require("TestFixture");

contract("TestFixture", async (accounts) => {
  it("[constructor] should deploy", async () => {
    const instance = await TestFixture.deployed();
  });

  it("[decode] varint", async () => {
    const instance = await TestFixture.deployed();

    // 300 -> 0xac02 : 1010 1100 0000 0010
    const result = await instance.decode_varint.call(0, "0xac02");
    const { 0: pos, 1: val } = result;
    assert.equal(pos, 2);
    assert.equal(val, 300);
  });

  it("[decode] key", async () => {
    const instance = await TestFixture.deployed();

    // 0x09 : 0000 1001
    const result = await instance.decode_key.call(0, "0x09");
    const { 0: pos, 1: key, 2: type } = result;
    assert.equal(pos, 1);
    assert.equal(key, 1);
    assert.equal(type, 1);
  });
});
