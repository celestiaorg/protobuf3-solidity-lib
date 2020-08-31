# protobuf3-solidity-lib

[![NPM Package](https://img.shields.io/npm/v/@lazyledger/protobuf3-solidity-lib)](https://www.npmjs.org/package/@lazyledger/protobuf3-solidity-lib)
![Node.js CI](https://github.com/lazyledger/protobuf3-solidity-lib/workflows/Node.js%20CI/badge.svg)

Codec library for [protobuf3](https://developers.google.com/protocol-buffers) in Solidity. This library provides [encoding and decoding functions for core protobuf3 types](https://developers.google.com/protocol-buffers/docs/encoding).

## Overview

### Installation

```sh
npm install --save @lazyledger/protobuf3-solidity-lib
```

### Usage

Import the library in Solidity:

```solidity
pragma solidity >=0.6.0 <8.0.0;

import "@lazyledger/protobuf3-solidity-lib/contracts/ProtobufLib.sol";
```

## Building from source

Install dependencies:

```sh
npm install
```

Build:

```sh
npm run build
```

Test:

```sh
npm run test
```

## Supported Features

| type                | decode | encode |
| ------------------- | :----: | :----: |
| key                 |   ✔️   |   ❌   |
| varint              |   ✔️   |   ❌   |
| `int32`             |   ❌   |   ❌   |
| `int64`             |   ❌   |   ❌   |
| `uint32`            |   ✔️   |   ❌   |
| `uint64`            |   ✔️   |   ❌   |
| `sint32`            |   ❌   |   ❌   |
| `sint64`            |   ❌   |   ❌   |
| `fixed32`           |   ✔️   |   ❌   |
| `sfixed32`          |   ❌   |   ❌   |
| `fixed64`           |   ✔️   |   ❌   |
| `sfixed64`          |   ❌   |   ❌   |
| `bool`              |   ✔️   |   ❌   |
| enum                |   ✔️   |   ❌   |
| `string`            |   ✔️   |   ❌   |
| `bytes`             |   ✔️   |   ❌   |
| embedded messages   |   ✔️   |   ❌   |
| `repeated int32`    |   ❌   |   ❌   |
| `repeated int64`    |   ❌   |   ❌   |
| `repeated uint32`   |   ❌   |   ❌   |
| `repeated uint64`   |   ❌   |   ❌   |
| `repeated sint32`   |   ❌   |   ❌   |
| `repeated sint64`   |   ❌   |   ❌   |
| `repeated fixed32`  |   ❌   |   ❌   |
| `repeated sfixed32` |   ❌   |   ❌   |
| `repeated fixed64`  |   ❌   |   ❌   |
| `repeated sfixed64` |   ❌   |   ❌   |
| `repeated bool`     |   ❌   |   ❌   |
| `repeated` enum     |   ❌   |   ❌   |

### Unsupported Features

Start and end group deprecated wire types, `float`, `double` field types.
