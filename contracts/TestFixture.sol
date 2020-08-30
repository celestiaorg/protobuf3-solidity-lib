// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.6.0 <8.0.0;

import "./ProtobufLib.sol";

contract TestFixture {
    function decode_key(uint256 p, bytes memory buf)
        public
        pure
        returns (
            uint256,
            uint64,
            ProtobufLib.WireType
        )
    {
        return decode_key(p, buf);
    }

    function decode_varint(uint256 p, bytes memory buf) public pure returns (uint256, uint64) {
        return decode_varint(p, buf);
    }

    function decode_uint32(uint256 p, bytes memory buf) public pure returns (uint256, uint32) {
        return decode_uint32(p, buf);
    }

    function decode_uint64(uint256 p, bytes memory buf) public pure returns (uint256, uint64) {
        return decode_uint64(p, buf);
    }

    function decode_bool(uint256 p, bytes memory buf) public pure returns (uint256, bool) {
        return decode_bool(p, buf);
    }

    function decode_enum(uint256 p, bytes memory buf) public pure returns (uint256, uint64) {
        return decode_enum(p, buf);
    }

    function decode_bits64(uint256 p, bytes memory buf) public pure returns (uint256, uint64) {
        return decode_bits64(p, buf);
    }

    function decode_fixed64(uint256 p, bytes memory buf) public pure returns (uint256, uint64) {
        return decode_fixed64(p, buf);
    }

    function decode_bits32(uint256 p, bytes memory buf) public pure returns (uint256, uint32) {
        return decode_bits32(p, buf);
    }

    function decode_fixed32(uint256 p, bytes memory buf) public pure returns (uint256, uint32) {
        return decode_fixed32(p, buf);
    }

    function decode_length_delimited(uint256 p, bytes memory buf) public pure returns (uint256, bytes memory) {
        return decode_length_delimited(p, buf);
    }

    function decode_string(uint256 p, bytes memory buf) public pure returns (uint256, string memory) {
        return decode_string(p, buf);
    }

    function decode_bytes(uint256 p, bytes memory buf) public pure returns (uint256, bytes memory) {
        return decode_bytes(p, buf);
    }

    function decode_embedded_message(uint256 p, bytes memory buf) public pure returns (uint256, bytes memory) {
        return decode_embedded_message(p, buf);
    }
}
