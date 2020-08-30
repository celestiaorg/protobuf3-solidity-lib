// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.6.0 <8.0.0;

library ProtobufLib {
    enum WireType { Varint, Bits64, LengthDelimited, StartGroup, EndGroup, Bits32 }

    ////////////////////////////////////
    // Decoding
    ////////////////////////////////////

    /// @notice Decode key: (field_number << 3) | wire_type.
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

    function decode_varint() internal pure {}

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
