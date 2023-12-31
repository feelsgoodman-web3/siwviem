import { useCallback, useMemo, useState } from "react";

import { SiwViemMessage } from "@feelsgoodman/siwviem";
import { Address, useChainId, usePublicClient, useSignMessage } from "wagmi";

import type { MessageOptions, Status, SiwViemAuthProps } from "./types";

export function usePrepareAuth({
  initialMessage,
  getMessageOptions,
  onAuthenticated,
  onSignOut,
  onSigning,
  initialSignature,
}: Omit<SiwViemAuthProps, "children">) {
  const chainId = useChainId();
  const [signature, setSignature] = useState(initialSignature);
  const [status, setStatus] = useState<Status>("loading");
  const publicClient = usePublicClient();

  const signOut = useCallback(() => {
    setSignature(undefined);
    setStatus("unauthenticated");
    onSignOut?.();
  }, [setSignature, setStatus, onSignOut]);

  const verify = useCallback(
    async (sig?: `0x${string}`, msg?: string) => {
      if (!sig || !msg) return;
      const message = new SiwViemMessage(msg);
      const { success } = await message.verify(
        { signature: sig },
        { suppressExceptions: true, publicClient }
      );
      if (success) {
        setSignature(sig);
        setStatus("authenticated");
        onAuthenticated?.(sig, msg);
      } else {
        signOut();
      }

      return success;
    },
    [publicClient, onAuthenticated, signOut]
  );

  const { signMessageAsync, variables, isLoading } = useSignMessage({
    onSuccess: (sig, vars) => {
      verify(sig, vars.message);
    },
    onError: () => {
      signOut();
    },
  });

  const signMessage = useCallback(
    (address?: Address) => {
      if (!address) return;
      const defaultOptions: MessageOptions = {
        domain: window.location.host,
        statement: "Sign in with Ethereum.",
        uri: window.location.origin,
        version: "1",
      };

      const message = new SiwViemMessage({
        ...defaultOptions,
        ...getMessageOptions?.(),
        address,
        chainId,
      });

      onSigning?.(message);

      signMessageAsync({ message: message.prepareMessage() }).catch(signOut);
    },
    [getMessageOptions, chainId, signMessageAsync]
  );

  return useMemo(
    () => ({
      signature,
      status: isLoading ? "loading" : status,
      signMessage,
      verify,
      signOut,
      message: variables?.message || initialMessage,
    }),
    [
      signature,
      isLoading,
      status,
      signMessage,
      verify,
      signOut,
      variables?.message,
    ]
  );
}
