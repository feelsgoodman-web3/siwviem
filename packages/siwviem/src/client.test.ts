/* eslint @typescript-eslint/no-explicit-any: 0 */
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import parsingPositive from "../test/parsing_positive.json";
import parsingNegative from "../test/parsing_negative.json";
import parsingNegativeObjects from "../test/parsing_negative_objects.json";
import verificationPositive from "../test/verification_positive.json";
import verificationNegative from "../test/verification_negative.json";

import { describe, test, expect } from "vitest";

import { SiwViemMessage } from "./client";
import { SiwViemErrorType } from "./types";
import { createPublicClient, http } from "viem";
import { foundry } from "viem/chains";
import { erc1271Address } from "../test/generated";

// describe(`Message Generation`, () => {
//   test.concurrent.each(Object.entries(parsingPositive))(
//     "Generates message successfully: %s",
//     (_, test: any) => {
//       const msg = new SiwViemMessage(test.fields);
//       expect(msg.toMessage()).toBe(test.message);
//     }
//   );
//
//   test.concurrent.each(Object.entries(parsingNegative))(
//     "Fails to generate message: %s",
//     (n, test) => {
//       try {
//         new SiwViemMessage(test);
//       } catch (error) {
//         expect(
//           Object.values(SiwViemErrorType).includes(error as SiwViemErrorType)
//         );
//       }
//     }
//   );
//
//   test.concurrent.each(Object.entries(parsingNegativeObjects))(
//     "Fails to generate message: %s",
//     (n, test) => {
//       try {
//         new SiwViemMessage(test as any);
//       } catch (error) {
//         expect(
//           Object.values(SiwViemErrorType).includes(error as SiwViemErrorType)
//         );
//       }
//     }
//   );
// });
//
// describe(`Message verification without suppressExceptions`, () => {
//   test.concurrent.each(Object.entries(verificationPositive))(
//     "Verifies message successfully: %s",
//     async (_, test_fields: any) => {
//       const msg = new SiwViemMessage(test_fields);
//       await expect(
//         msg
//           .verify({
//             signature: test_fields.signature,
//             time: (test_fields as any).time || test_fields.issuedAt,
//             domain: (test_fields as any).domainBinding,
//             nonce: (test_fields as any).matchNonce,
//           })
//           .then(({ success }) => success)
//       ).resolves.toBeTruthy();
//     }
//   );
//
//   test.concurrent.each(Object.entries(verificationNegative))(
//     "Fails to verify message: %s and rejects the promise",
//     async (n, test_fields: any) => {
//       try {
//         const msg = new SiwViemMessage(test_fields);
//         await expect(
//           msg
//             .verify({
//               signature: test_fields.signature,
//               time: (test_fields as any).time || test_fields.issuedAt,
//               domain: (test_fields as any).domainBinding,
//               nonce: (test_fields as any).matchNonce,
//             })
//             .then(({ success }) => success)
//         ).rejects.toBeFalsy();
//       } catch (error) {
//         expect(
//           Object.values(SiwViemErrorType).includes(error as SiwViemErrorType)
//         );
//       }
//     }
//   );
// });
//
// describe(`Message verification with suppressExceptions`, () => {
//   test.concurrent.each(Object.entries(verificationNegative))(
//     "Fails to verify message: %s but still resolves the promise",
//     async (n, test_fields: any) => {
//       try {
//         const msg = new SiwViemMessage(test_fields);
//         await expect(
//           msg
//             .verify(
//               {
//                 signature: test_fields.signature,
//                 time: (test_fields as any).time || test_fields.issuedAt,
//                 domain: (test_fields as any).domainBinding,
//                 nonce: (test_fields as any).matchNonce,
//               },
//               { suppressExceptions: true }
//             )
//             .then(({ success }) => success)
//         ).resolves.toBeFalsy();
//       } catch (error) {
//         expect(
//           Object.values(SiwViemErrorType).includes(error as SiwViemErrorType)
//         );
//       }
//     }
//   );
// });
//
// describe(`Round Trip`, () => {
//   const privateKey = generatePrivateKey();
//   const account = privateKeyToAccount(privateKey);
//
//   test.concurrent.each(Object.entries(parsingPositive))(
//     "Generates a Successfully Verifying message: %s",
//     async (_, test: any) => {
//       const msg = new SiwViemMessage(test.fields);
//       msg.address = account.address;
//       const signature = await account.signMessage({
//         message: msg.toMessage(),
//       });
//       await expect(
//         msg.verify({ signature }).then(({ success }) => success)
//       ).resolves.toBeTruthy();
//     }
//   );
// });

describe("ERC1271", () => {
  test("Generates a Successfully Verifying message: ERC1271", async () => {
    const account = privateKeyToAccount(
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
    );

    const publicClient = createPublicClient({
      chain: foundry,
      transport: http("http://127.0.0.1:8545"),
    });

    const msg = new SiwViemMessage({
      domain: "service.org",
      address: erc1271Address[foundry.id],
      uri: "https://service.org/login",
      version: "1",
    });

    const signature = await account.signMessage({
      message: msg.toMessage(),
    });

    await expect(
      msg.verify({ signature }, { publicClient }).then(({ success }) => success)
    ).resolves.toBeTruthy();
  });
});
//
// describe(`Unit`, () => {
//   test("Should not throw if params are valid.", async () => {
//     const privateKey = generatePrivateKey();
//     const account = privateKeyToAccount(privateKey);
//     const msg = new SiwViemMessage({
//       address: account.address,
//       domain: "login.xyz",
//       statement: "Sign-In With Ethereum Example Statement",
//       uri: "https://login.xyz",
//       version: "1",
//       nonce: "bTyXgcQxn2htgkjJn",
//       issuedAt: "2022-01-27T17:09:38.578Z",
//       chainId: 1,
//       expirationTime: "2100-01-07T14:31:43.952Z",
//     });
//     const signature = await account.signMessage({
//       message: msg.toMessage(),
//     });
//     const result = await (msg as any).verify({ signature });
//     expect(result.success).toBeTruthy();
//   });
//
//   test("Should throw if params are invalid.", async () => {
//     const privateKey = generatePrivateKey();
//     const account = privateKeyToAccount(privateKey);
//     const msg = new SiwViemMessage({
//       address: account.address,
//       domain: "login.xyz",
//       statement: "Sign-In With Ethereum Example Statement",
//       uri: "https://login.xyz",
//       version: "1",
//       nonce: "bTyXgcQxn2htgkjJn",
//       issuedAt: "2022-01-27T17:09:38.578Z",
//       chainId: 1,
//       expirationTime: "2100-01-07T14:31:43.952Z",
//     });
//     const signature = await account.signMessage({
//       message: msg.toMessage(),
//     });
//     try {
//       await (msg as any).verify({
//         signature,
//         invalidKey: "should throw",
//       });
//     } catch (e: any) {
//       expect(e.success).toBeFalsy();
//       expect(e).toEqual(
//         new Error("invalidKey is/are not valid key(s) for VerifyParams.")
//       );
//     }
//   });
//
//   test("Should throw if opts are invalid.", async () => {
//     const privateKey = generatePrivateKey();
//     const account = privateKeyToAccount(privateKey);
//     const msg = new SiwViemMessage({
//       address: account.address,
//       domain: "login.xyz",
//       statement: "Sign-In With Ethereum Example Statement",
//       uri: "https://login.xyz",
//       version: "1",
//       nonce: "bTyXgcQxn2htgkjJn",
//       issuedAt: "2022-01-27T17:09:38.578Z",
//       chainId: 1,
//       expirationTime: "2100-01-07T14:31:43.952Z",
//     });
//     const signature = await account.signMessage({
//       message: msg.toMessage(),
//     });
//     try {
//       await (msg as any).verify(
//         { signature },
//         { suppressExceptions: true, invalidKey: "should throw" }
//       );
//     } catch (e: any) {
//       expect(e.success).toBeFalsy();
//       expect(e.error).toEqual(
//         new Error("invalidKey is/are not valid key(s) for VerifyOpts.")
//       );
//     }
//   });
// });
