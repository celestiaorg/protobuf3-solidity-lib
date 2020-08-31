const protobuf = require("protobufjs/light");
const truffleAssert = require("truffle-assertions");

const TestFixture = artifacts.require("TestFixture");

contract("protobufjs", async (accounts) => {
  it("[protobufjs] protobufjs encoding", async () => {
    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "uint64"));
    const message = Message.create({ field: 300 });
    const encoded = Message.encode(message).finish().toString("hex");

    // field 1 -> 08
    // 300 -> ac 02
    assert.equal(encoded, "08ac02");
  });
});

contract("TestFixture", async (accounts) => {
  it("[constructor] should deploy", async () => {
    await TestFixture.deployed();
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

    await instance.decode_varint(1, "0x" + encoded);
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

    await instance.decode_key(0, "0x" + encoded);
  });

  it("[decode] int32 positive", async () => {
    const instance = await TestFixture.deployed();

    const v = 300;

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "int32"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_int32.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_int32(1, "0x" + encoded);
  });

  it("[decode] int32 negative", async () => {
    const instance = await TestFixture.deployed();

    const v = -300;

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "int32"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_int32.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_int32(1, "0x" + encoded);
  });

  it("[decode] int32 max", async () => {
    const instance = await TestFixture.deployed();

    const v = 2147483647;

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "int32"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_int32.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_int32(1, "0x" + encoded);
  });

  it("[decode] int32 min", async () => {
    const instance = await TestFixture.deployed();

    const v = -2147483648;

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "int32"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_int32.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_int32(1, "0x" + encoded);
  });

  it("[decode] uint32", async () => {
    const instance = await TestFixture.deployed();

    const v = 300;

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "uint32"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_uint32.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_uint32(1, "0x" + encoded);
  });

  it("[decode] uint32 max", async () => {
    const instance = await TestFixture.deployed();

    const v = 4294967295;

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "uint32"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_uint32.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_uint32(1, "0x" + encoded);
  });

  it("[decode] uint32 too large", async () => {
    const instance = await TestFixture.deployed();

    const v = "4294967296";

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "uint64"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    await truffleAssert.reverts(
      instance.decode_uint32.call(1, "0x" + encoded),
      "ProtobufLib/decode_uint32 - highest 4 bytes must be 0"
    );
  });

  it("[decode] uint64", async () => {
    const instance = await TestFixture.deployed();

    const v = "4294967296";

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "uint64"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_uint64.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_uint64(1, "0x" + encoded);
  });

  it("[decode] uint64 max", async () => {
    const instance = await TestFixture.deployed();

    const v = "18446744073709551615";

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "uint64"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_uint64.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos.toNumber(), encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_uint64(1, "0x" + encoded);
  });

  it("[decode] uint64 too large", async () => {
    const instance = await TestFixture.deployed();

    await truffleAssert.reverts(
      instance.decode_uint64.call(1, "0x08ffffffffffffffffffff01"),
      "ProtobufLib/decode_varint - uses more than MAX_VARINT_BYTES bytes"
    );
  });

  it("[decode] int64 max", async () => {
    const instance = await TestFixture.deployed();

    const v = "9223372036854775807";

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "int64"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_int64.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_int64(1, "0x" + encoded);
  });

  it("[decode] int64 min", async () => {
    const instance = await TestFixture.deployed();

    const v = "-9223372036854775808";

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "int64"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_int64.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_int64(1, "0x" + encoded);
  });

  it("[decode] sint32 max", async () => {
    const instance = await TestFixture.deployed();

    const v = 2147483647;

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "sint32"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_sint32.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_sint32(1, "0x" + encoded);
  });

  it("[decode] sint32 min", async () => {
    const instance = await TestFixture.deployed();

    const v = -2147483648;

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "sint32"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_sint32.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_sint32(1, "0x" + encoded);
  });

  it("[decode] sint64 max", async () => {
    const instance = await TestFixture.deployed();

    const v = "9223372036854775807";

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "sint64"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_sint64.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_sint64(1, "0x" + encoded);
  });

  it("[decode] sint64 min", async () => {
    const instance = await TestFixture.deployed();

    const v = "-9223372036854775808";

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "sint64"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_sint64.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_sint64(1, "0x" + encoded);
  });

  it("[decode] bool", async () => {
    const instance = await TestFixture.deployed();

    const v = true;

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "bool"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_bool.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, true);

    await instance.decode_bool(1, "0x" + encoded);
  });

  it("[decode] enum", async () => {
    const instance = await TestFixture.deployed();

    const EnumStruct = {
      ONE: 1,
      TWO: 2,
      THREE: 3,
    };

    const v = EnumStruct.THREE;

    const Message = new protobuf.Type("Message")
      .add(new protobuf.Field("field", 1, "bool"))
      .add(new protobuf.Field("field2", 2, "Enum"))
      .add(new protobuf.Enum("Enum", EnumStruct));
    const message = Message.create({ field: 1, field2: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_enum.call(3, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_enum(3, "0x" + encoded);
  });

  it("[decode] bits64", async () => {
    const instance = await TestFixture.deployed();

    const v = "4294967296";

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "fixed64"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_bits64.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_bits64(1, "0x" + encoded);
  });

  it("[decode] fixed64", async () => {
    const instance = await TestFixture.deployed();

    const v = "4294967296";

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "fixed64"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_fixed64.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_fixed64(1, "0x" + encoded);
  });

  it("[decode] sfixed64 max", async () => {
    const instance = await TestFixture.deployed();

    const v = "9223372036854775807";

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "sfixed64"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_sfixed64.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_sfixed64(1, "0x" + encoded);
  });

  it("[decode] sfixed64 min", async () => {
    const instance = await TestFixture.deployed();

    const v = "-9223372036854775808";

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "sfixed64"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_sfixed64.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_sfixed64(1, "0x" + encoded);
  });

  it("[decode] bits32", async () => {
    const instance = await TestFixture.deployed();

    const v = 300;

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "fixed32"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_bits32.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_bits32(1, "0x" + encoded);
  });

  it("[decode] fixed32", async () => {
    const instance = await TestFixture.deployed();

    const v = 300;

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "fixed32"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_fixed32.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_fixed32(1, "0x" + encoded);
  });

  it("[decode] sfixed32 max", async () => {
    const instance = await TestFixture.deployed();

    const v = 2147483647;

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "sfixed32"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_sfixed32.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_sfixed32(1, "0x" + encoded);
  });

  it("[decode] sfixed32 min", async () => {
    const instance = await TestFixture.deployed();

    const v = -2147483648;

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "sfixed32"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_sfixed32.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_sfixed32(1, "0x" + encoded);
  });

  it("[decode] length-delimited", async () => {
    const instance = await TestFixture.deployed();

    const v = Buffer.from("deadbeef", "hex");

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "bytes"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_length_delimited.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, "0x" + v.toString("hex"));

    await instance.decode_length_delimited(1, "0x" + encoded);
  });

  it("[decode] string", async () => {
    const instance = await TestFixture.deployed();

    const v = "foobar";

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "string"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_string.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, v);

    await instance.decode_string(1, "0x" + encoded);
  });

  it("[decode] bytes", async () => {
    const instance = await TestFixture.deployed();

    const v = Buffer.from("deadbeef", "hex");

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "bytes"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_bytes.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, "0x" + v.toString("hex"));

    await instance.decode_bytes(1, "0x" + encoded);
  });

  it("[decode] embedded message", async () => {
    const instance = await TestFixture.deployed();

    const v = 300;

    const EmbeddedMessage = new protobuf.Type("EmbeddedMessage").add(new protobuf.Field("field", 1, "uint64"));
    const embeddedMessage = EmbeddedMessage.create({ field: 300 });

    const Message = new protobuf.Type("Message")
      .add(new protobuf.Field("field", 1, "EmbeddedMessage"))
      .add(EmbeddedMessage);
    const message = Message.create({ field: embeddedMessage });

    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_embedded_message.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, "0x" + EmbeddedMessage.encode(embeddedMessage).finish().toString("hex"));

    await instance.decode_embedded_message(1, "0x" + encoded);
  });

  it("[decode] packed repeated", async () => {
    const instance = await TestFixture.deployed();

    const v = [300, 42, 69];

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "uint64", "repeated"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.decode_packed_repeated.call(1, "0x" + encoded);
    const { 0: pos, 1: val } = result;
    assert.equal(pos, encoded.length / 2);
    assert.equal(val, "0x" + encoded.slice(4));

    await instance.decode_packed_repeated(1, "0x" + encoded);
  });

  it("[encode] varint", async () => {
    const instance = await TestFixture.deployed();

    const v = 300;

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 1, "uint64"));
    const message = Message.create({ field: v });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.encode_varint.call(v);
    assert.equal(result, "0x" + encoded.slice(2));

    await instance.encode_varint(v);
  });

  it("[encode] key", async () => {
    const instance = await TestFixture.deployed();

    const Message = new protobuf.Type("Message").add(new protobuf.Field("field", 2, "uint64"));
    const message = Message.create({ field: 1 });
    const encoded = Message.encode(message).finish().toString("hex");

    const result = await instance.encode_key.call(2, 0);
    assert.equal(result, "0x" + encoded.slice(0, 2));

    await instance.encode_key(2, 0);
  });
});
