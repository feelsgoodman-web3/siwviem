export const EIP1271_ABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "_hash", internalType: "bytes32", type: "bytes32" },
      { name: "_signature", internalType: "bytes", type: "bytes" },
    ],
    name: "isValidSignature",
    outputs: [{ name: "magicValue", internalType: "bytes4", type: "bytes4" }],
  },
]

export const SAFE_ABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "message", internalType: "bytes", type: "bytes" }],
    name: "getMessageHash",
    outputs: [
      { name: "messageHash", internalType: "bytes32", type: "bytes32" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "getThreshold",
    outputs: [{ name: "threshold", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "_data", internalType: "bytes", type: "bytes" },
      { name: "_signature", internalType: "bytes", type: "bytes" },
    ],
    name: "isValidSignature",
    outputs: [{ name: "magicValue", internalType: "bytes4", type: "bytes4" }],
  },
]
