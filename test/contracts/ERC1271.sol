// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

interface IERC1271 {
    function isValidSignature(bytes32 _hash, bytes memory _signature) external view returns (bytes4 magicValue);
}

contract ERC1271 is IERC1271 {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function isValidSignature(
        bytes32 _hash,
        bytes calldata _signature
    ) external override view returns (bytes4) {
        if (recoverSigner(_hash, _signature) == owner) {
            return 0x1626ba7e;
        } else {
            return 0xffffffff;
        }
    }

    function recoverSigner(bytes32 messageHash, bytes memory signature) internal pure returns (address) {
        bytes32 r;
        bytes32 s;
        uint8 v;

        if (signature.length != 65) {
            return address(0);
        }

        assembly {
            r := mload(add(signature, 32))
            s := mload(add(signature, 64))
            v := byte(0, mload(add(signature, 96)))
        }

        if (v < 27) {
            v += 27;
        }

        if (v != 27 && v != 28) {
            return address(0);
        }

        return ecrecover(messageHash, v, r, s);
    }
}
