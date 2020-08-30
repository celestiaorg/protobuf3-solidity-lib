// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.6.0 <8.0.0;

library ProtobufLib {
    /// @notice Protobuf wire types.
    enum WireType { Varint, Bits64, LengthDelimited, StartGroup, EndGroup, Bits32 }

    /// @notice Maximum number of bytes for a varint.
    /// @notice 64 bits, in groups of base-128 (7 bits).
    uint256 public constant MAX_VARINT_BYTES = 10;

    ////////////////////////////////////
    // Decoding
    ////////////////////////////////////

    /// @notice Decode key.
    /// @dev https://developers.google.com/protocol-buffers/docs/encoding#structure
    /// @param p Position
    /// @param buf Buffer
    /// @return New position
    /// @return Field number
    /// @return Wire type
    function decode_key(uint256 p, bytes memory buf)
        internal
        pure
        returns (
            uint256,
            uint64,
            WireType
        )
    {
        uint256 pos = p;
        uint64 key;

        // The key is a varint with encoding
        // (field_number << 3) | wire_type
        (pos, key) = decode_varint(p, buf);
        uint64 field_number = key >> 3;
        WireType wire_type = WireType(key & 0x07);

        return (pos, field_number, wire_type);
    }

    /// @notice Decode varint.
    /// @dev https://developers.google.com/protocol-buffers/docs/encoding#varints
    /// @param p Position
    /// @param buf Buffer
    /// @return New position
    /// @return Decoded int
    function decode_varint(uint256 p, bytes memory buf) internal pure returns (uint256, uint64) {
        uint64 val;
        uint256 i;

        for (i = 0; i < MAX_VARINT_BYTES; i++) {
            uint8 b = uint8(buf[p + i]);

            // Highest bit is used to indicate if there are more bytes to come
            // Mask to get 7-bit value: 0111 1111
            uint8 v = b & 0x7F;

            // Groups of 7 bits are ordered least significant first
            val |= uint64(v) << uint64(i * 7);

            // Mask to get keep going bit: 1000 0000
            if (b & 0x80 == 0x80) {
                break;
            }
        }

        require(i < MAX_VARINT_BYTES, "varint used more than MAX_VARINT_BYTES bytes");

        return (p + i, val);
    }

    function decode_uint32(uint256 p, bytes memory buf) internal pure returns (uint256, uint32) {
        uint256 pos = p;
        uint64 decoded_val;
        uint32 val;

        (pos, decoded_val) = decode_varint(p, buf);

        // Highest 4 bytes must be 0
        require(decoded_val & 0xFFFFFFFF00000000 == 0);

        val = uint32(decoded_val);

        return (pos, val);
    }

    function decode_uint64(uint256 p, bytes memory buf) internal pure returns (uint256, uint64) {
        uint256 pos = p;
        uint64 decoded_val;

        (pos, decoded_val) = decode_varint(p, buf);

        return (pos, decoded_val);
    }

    function decode_bool(uint256 p, bytes memory buf) internal pure returns (uint256, bool) {}

    function decode_enum(uint256 p, bytes memory buf) internal pure returns (uint256, uint64) {}

    function decode_bits64(uint256 p, bytes memory buf) internal pure returns (uint256, uint64) {}

    function decode_fixed64(uint256 p, bytes memory buf) internal pure returns (uint256, uint64) {}

    function decode_length_delimited(uint256 p, bytes memory buf) internal pure {}

    function decode_string(uint256 p, bytes memory buf) internal pure {}

    function decode_bytes(uint256 p, bytes memory buf) internal pure {}

    function decode_embedded_message(uint256 p, bytes memory buf) internal pure {}

    function decode_packed_repeated(uint256 p, bytes memory buf) internal pure {}

    function decode_bits32(uint256 p, bytes memory buf) internal pure returns (uint256, uint32) {}

    function decode_fixed32(uint256 p, bytes memory buf) internal pure returns (uint256, uint32) {}

    ////////////////////////////////////
    // Encoding
    ////////////////////////////////////

    ////////////////////////////////////
    // Helpers
    ////////////////////////////////////
}
