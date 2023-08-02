# SiwViemAuth

Easily authenticate with Ethereum in your React applications using `@feelsgoodman/siwviem`.

SiwViemAuth provides a straightforward React context provider to integrate Ethereum-based user authentication into your app.

## Features

- Context-based Ethereum authentication.
- Seamless integration with `@feelsgoodman/siwviem`.
- Authentication status management.
- Optional hooks for post-authentication and sign-out actions.

## Installation

```bash
npm install @feelsgoodman/siwviem-react-auth @feelsgoodman/siwviem wagmi viem
```

## Usage

1. Wrap your app with `SiwViemAuth.Provider` bellow wagmi config.

```jsx
import { WagmiConfig } from "wagmi";
import { SiwViemAuth } from "@feelsgoodman/siwviem-react-auth";

function App() {
  return (
    <WagmiConfig config={config}>
      <SiwViemAuth.Provider>
        {/* Your components */}
      </SiwViemAuth.Provider>
    </WagmiConfig>
  );
}
```

2. Use the `useSiwViemAuth` hook to access authentication utilities.

```jsx
import { useSiwViemAuth } from "@feelsgoodman/siwviem-react-auth";

function Component() {
  const { signMessage, status } = useSiwViemAuth();

  if (status === "unauthenticated") {
    return <button onClick={signMessage}>Sign in with Ethereum</button>;
  }

  return <div>You are authenticated!</div>;
}
```

## Props

### `SiwViemAuthProps`

- `children`: The child components of the provider.
- `signOnConnect?`: Whether to automatically sign on connecting. Default is `false`.
- `getMessageOptions?`: A function that returns message options.
- `initialMessage?`: An initial message for the user to sign.
- `initialSignature?`: An initial signature associated with the message.
- `onAuthenticated?`: A callback function that gets triggered when the user is authenticated.
- `onSignOut?`: A callback function that gets triggered when the user signs out.

## Statuses

- `loading`: Authentication is in process.
- `unauthenticated`: The user is not authenticated.
- `authenticated`: The user is authenticated.
- `disabled`: Authentication functionality is disabled.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
