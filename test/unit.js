const protobuf = require("protobufjs/light");
const truffleAssert = require("truffle-assertions");

const TestFixture = artifacts.require("TestFixture");

contract("TestFixture", async (accounts) => {
  it("[protobufjs] protobufjs encoding", async () => {
    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "uint64"));
    const message = Message.create({ field: 300 });
    const encoded = Message.encode(message).finish().toString("hex");

    // 300 -> ac 02
    assert.equal(encoded, "08ac02");
  });

  it("[constructor] should deploy", async () => {
    const instance = await TestFixture.deployed();
  });

  it("[decode] varint", async () => {
    const instance = await TestFixture.deployed();

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "uint64"));
    const message = Message.create({ field: 300 });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_varint.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, 3);
    assert.equal(val, 300);
  });

  it("[decode] key", async () => {
    const instance = await TestFixture.deployed();

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 2, "uint64"));
    const message = Message.create({ field: 3 });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_key.call(0, "0x" + encoded);
    const { 0: pos, 1: field, 2: type } = result;
    assert.equal(pos, 1);
    assert.equal(field, 2);
    assert.equal(type, 0);
  });

  it("[decode] uint32", async () => {
    const instance = await TestFixture.deployed();

    const v = 300;

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "uint32"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_uint32.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, 3);
    assert.equal(val, v);
  });

  it("[decode] uint32 max", async () => {
    const instance = await TestFixture.deployed();

    const v = 4294967295;

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "uint32"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_uint32.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, 6);
    assert.equal(val, v);
  });

  it("[decode] uint32 too large", async () => {
    const instance = await TestFixture.deployed();

    const v = 4294967296;

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "uint64"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    await truffleAssert.fails(instance.decode_uint32.call(1, "0x" + encoded));
  });

  it("[decode] uint64", async () => {
    const instance = await TestFixture.deployed();

    const v = 4294967296;

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "uint64"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_uint64.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, 6);
    assert.equal(val, v);
  });

  it("[decode] uint64 max", async () => {
    const instance = await TestFixture.deployed();

    const v = "18446744073709551615";

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "uint64"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_uint64.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos.toNumber(), 11);
    assert.equal(val, v);
  });

  it("[decode] uint64 too large", async () => {
    const instance = await TestFixture.deployed();

    await truffleAssert.reverts(
      instance.decode_uint64.call(1, "0x08ffffffffffffffffffff01"),
      "varint used more than MAX_VARINT_BYTES bytes"
    );
  });
});
