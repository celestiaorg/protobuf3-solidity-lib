// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.6.0 <8.0.0;

import "./ProtobufLib.sol";

contract TestFixture {
    // Functions are not pure so that we can measure gas

    function decode_key(uint256 p, bytes memory buf)
        public
        returns (
            uint256,
            uint64,
            ProtobufLib.WireType
        )
    {
        return ProtobufLib.decode_key(p, buf);
    }

    function decode_varint(uint256 p, bytes memory buf) public returns (uint256, uint64) {
        return ProtobufLib.decode_varint(p, buf);
    }

    function decode_int32(uint256 p, bytes memory buf) public returns (uint256, int32) {
        return ProtobufLib.decode_int32(p, buf);
    }

    function decode_int64(uint256 p, bytes memory buf) public returns (uint256, int64) {
        return ProtobufLib.decode_int64(p, buf);
    }

    function decode_uint32(uint256 p, bytes memory buf) public returns (uint256, uint32) {
        return ProtobufLib.decode_uint32(p, buf);
    }

    function decode_uint64(uint256 p, bytes memory buf) public returns (uint256, uint64) {
        return ProtobufLib.decode_uint64(p, buf);
    }

    function decode_sint32(uint256 p, bytes memory buf) public returns (uint256, int32) {
        return ProtobufLib.decode_sint32(p, buf);
    }

    function decode_sint64(uint256 p, bytes memory buf) public returns (uint256, int64) {
        return ProtobufLib.decode_sint64(p, buf);
    }

    function decode_bool(uint256 p, bytes memory buf) public returns (uint256, bool) {
        return ProtobufLib.decode_bool(p, buf);
    }

    function decode_enum(uint256 p, bytes memory buf) public returns (uint256, uint64) {
        return ProtobufLib.decode_enum(p, buf);
    }

    function decode_bits64(uint256 p, bytes memory buf) public returns (uint256, uint64) {
        return ProtobufLib.decode_bits64(p, buf);
    }

    function decode_fixed64(uint256 p, bytes memory buf) public returns (uint256, uint64) {
        return ProtobufLib.decode_fixed64(p, buf);
    }

    function decode_sfixed64(uint256 p, bytes memory buf) public returns (uint256, int64) {
        return ProtobufLib.decode_sfixed64(p, buf);
    }

    function decode_bits32(uint256 p, bytes memory buf) public returns (uint256, uint32) {
        return ProtobufLib.decode_bits32(p, buf);
    }

    function decode_fixed32(uint256 p, bytes memory buf) public returns (uint256, uint32) {
        return ProtobufLib.decode_fixed32(p, buf);
    }

    function decode_sfixed32(uint256 p, bytes memory buf) public returns (uint256, int32) {
        return ProtobufLib.decode_sfixed32(p, buf);
    }

    function decode_length_delimited(uint256 p, bytes memory buf) public returns (uint256, bytes memory) {
        return ProtobufLib.decode_length_delimited(p, buf);
    }

    function decode_string(uint256 p, bytes memory buf) public returns (uint256, string memory) {
        return ProtobufLib.decode_string(p, buf);
    }

    function decode_bytes(uint256 p, bytes memory buf) public returns (uint256, bytes memory) {
        return ProtobufLib.decode_bytes(p, buf);
    }

    function decode_embedded_message(uint256 p, bytes memory buf) public returns (uint256, bytes memory) {
        return ProtobufLib.decode_embedded_message(p, buf);
    }
}
