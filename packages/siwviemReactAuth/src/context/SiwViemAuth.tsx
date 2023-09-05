import { createContext, useContext, useMemo } from "react";

import { useAccount } from "wagmi";

import { usePrepareAuth } from "./hooks";
import type { SiwViemAuthProps, SiwViemAuthState } from "./types";

const errorMsg =
  "You forgot to wrap your code in a provider <SiwViemAuth.Provider />";

const Context = createContext<SiwViemAuthState>({
  get message(): never {
    throw new Error(errorMsg);
  },
  get signature(): never {
    throw new Error(errorMsg);
  },
  status: "disabled",
  signMessage(): never {
    throw new Error(errorMsg);
  },
  verify(): never {
    throw new Error(errorMsg);
  },
  signOut(): never {
    throw new Error(errorMsg);
  },
});

function Provider({
  children,
  getMessageOptions,
  signOnConnect,
  initialMessage,
  initialSignature,
  onAuthenticated,
  onSignOut,
}: SiwViemAuthProps) {
  const { signMessage, message, signOut, verify, status, signature } =
    usePrepareAuth({
      getMessageOptions,
      initialMessage,
      initialSignature,
      onAuthenticated,
      onSignOut,
    });

  const { address, isConnecting, isReconnecting } = useAccount({
    onDisconnect: signOut,
    async onConnect({ address }) {
      if (signOnConnect) {
        if (initialSignature && initialMessage) {
          if (await verify(initialSignature, initialMessage)) {
            return;
          }
        }
        signMessage(address);
      }
    },
  });

  const value = useMemo<SiwViemAuthState>(
    () => ({
      signMessage: () => signMessage(address),
      signature,
      message: message,
      status: isConnecting || isReconnecting ? "loading" : status,
      verify: () => verify(signature, message),
      signOut,
    }),
    [
      signature,
      message,
      isConnecting,
      isReconnecting,
      status,
      signOut,
      signMessage,
      address,
      verify,
    ]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

const SiwViemAuth = {
  Provider,
  Context,
};

export const useSiwViemAuth = () => useContext(Context);

export default SiwViemAuth;
