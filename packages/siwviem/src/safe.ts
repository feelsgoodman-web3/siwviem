import {
  type Chain,
  hashMessage,
  type PublicClient,
  type Transport,
} from "viem";
import type { ByteArray, Hex } from "viem/src/types/misc";

import { SAFE_ABI } from "./abis";
import { SiwViemMessage } from "./client";
import { SAFE_TRANSACTION_URLS, SAFE_MAGICVALUE } from "./constants";
import { TransactionServiceSafeMessage } from "./types";

/**
 * Fetches the SafeMessage corresponding to the given hash and chain ID.
 * @param safeMessageHash The hash identifying the SafeMessage.
 * @param chainId The ID of the blockchain chain.
 * @returns {Promise<TransactionServiceSafeMessage>} The fetched SafeMessage.
 */
export const fetchSafeMessage = async (
  safeMessageHash: string,
  chainId: number
): Promise<TransactionServiceSafeMessage> => {
  const SAFE_TX_URL = SAFE_TRANSACTION_URLS[chainId];

  return fetch(`${SAFE_TX_URL}/v1/messages/${safeMessageHash}/`, {
    headers: { "Content-Type": "application/json" },
  }).then(res => res.json());
};

/**
 * Checks if a signature from a Safe wallet is valid for a given message.
 * @param message The message to check the signature against.
 * @param signature The signature provided by the Safe wallet.
 * @param publicClient Web3 public client able to perform a contract check.
 * @returns {Promise<boolean>} True if the signature is valid for the given message and wallet; otherwise false.
 */
export const checkSafeWalletSignature = async (
  message: SiwViemMessage,
  signature: Hex | ByteArray,
  publicClient: PublicClient<Transport, Chain>
): Promise<boolean> => {
  const { address, chainId } = message;
  const hashedMessage = hashMessage(message.prepareMessage());

  // Group the related contract reads
  const [threshold, safeHashMessage] = await Promise.all([
    publicClient.readContract({
      address,
      abi: SAFE_ABI,
      functionName: "getThreshold",
    }),
    publicClient.readContract({
      address,
      abi: SAFE_ABI,
      functionName: "getMessageHash",
      args: [hashedMessage],
    }),
  ]);

  const safeMessage = await fetchSafeMessage(
    safeHashMessage as string,
    Number(chainId)
  );

  // Check for sufficient confirmations
  if (!threshold || Number(threshold) > safeMessage.confirmations.length) {
    return false;
  }

  // Verify the validity of the signature
  const validityCheckResult = (await publicClient.readContract({
    address,
    abi: SAFE_ABI,
    functionName: "isValidSignature",
    args: [hashedMessage, safeMessage.preparedSignature],
  })) as string;

  // Compare against the SAFE_MAGICVALUE constant
  return SAFE_MAGICVALUE === validityCheckResult?.slice(0, 10).toLowerCase();
};
