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

    /// @notice Decode key: (field_number << 3) | wire_type.
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
    {}

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
            if (0x80 == b & 0x80) {
                break;
            }
        }

        require(i < MAX_VARINT_BYTES, "varint used more than MAX_VARINT_BYTES bytes");

        return (p + i, val);
    }

    function decode_int32() internal pure {}

    function decode_int64() internal pure {}

    function decode_uint32() internal pure {}

    function decode_uint64() internal pure {}

    function decode_sint32() internal pure {}

    function decode_sint64() internal pure {}

    function decode_bool() internal pure {}

    function decode_enum() internal pure {}

    function decode_bits64() internal pure {}

    function decode_fixed64() internal pure {}

    function decode_sfixed64() internal pure {}

    function decode_length_delimited() internal pure {}

    function decode_string() internal pure {}

    function decode_bytes() internal pure {}

    function decode_embedded_message() internal pure {}

    function decode_packed_repeated() internal pure {}

    function decode_bits32() internal pure {}

    function decode_fixed32() internal pure {}

    function decode_sfixed32() internal pure {}

    ////////////////////////////////////
    // Encoding
    ////////////////////////////////////

    ////////////////////////////////////
    // Helpers
    ////////////////////////////////////
}
