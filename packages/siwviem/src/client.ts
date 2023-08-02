import {
  isEIP55Address,
  ParsedMessage,
  parseIntegerNumber,
} from "@spruceid/siwe-parser";
import * as uri from "valid-url";
import {
  SiwViemError,
  SiwViemErrorType,
  SiwViemResponse,
  VerifyOpts,
  VerifyOptsKeys,
  VerifyParams,
  VerifyParamsKeys,
} from "./types";
import {
  Address,
  bytesToHex,
  getAddress,
  recoverMessageAddress,
  zeroAddress,
} from "viem";
import {
  checkContractWalletSignature,
  checkInvalidKeys,
  exists,
  generateNonce,
  isValidISO8601Date,
} from "./utils";
import { checkSafeWalletSignature } from "./safe";

export class SiwViemMessage {
  /**RFC 4501 dns authority that is requesting the signing. */
  domain: string;
  /**Ethereum address performing the signing conformant to capitalization
   * encoded checksum specified in EIP-55 where applicable. */
  address: Address;
  /**Human-readable ASCII assertion that the user will sign, and it must not
   * contain `\n`. */
  statement?: string | null;
  /**RFC 3986 URI referring to the resource that is the subject of the signing
   *  (as in the __subject__ of a claim). */
  uri: string;
  /**Current version of the message. */
  version: string;
  /**EIP-155 Chain ID to which the session is bound, and the network where
   * Contract Accounts must be resolved. */
  chainId: number | string;
  /**Randomized token used to prevent replay attacks, at least 8 alphanumeric
   * characters. */
  nonce?: string | null;
  /**ISO 8601 datetime string of the current time. */
  issuedAt?: string;
  /**ISO 8601 datetime string that, if present, indicates when the signed
   * authentication message is no longer valid. */
  expirationTime?: string | null;
  /**ISO 8601 datetime string that, if present, indicates when the signed
   * authentication message will become valid. */
  notBefore?: string | null;
  /**System-specific identifier that may be used to uniquely refer to the
   * sign-in request. */
  requestId?: string | null;
  /**List of information or references to information the user wishes to have
   * resolved as part of authentication by the relying party. They are
   * expressed as RFC 3986 URIs separated by `\n- `. */
  resources?: Array<string> | null;

  /**
   * Creates a parsed Sign-In with Ethereum Message (EIP-4361) object from a
   * string or an object. If a string is used an ABNF parser is called to
   * validate the parameter, otherwise the fields are attributed.
   * @param param {string | SiwViemMessage} Sign message as a string or an object.
   */
  constructor(param: string | Partial<SiwViemMessage>) {
    if (typeof param === "string") {
      const parsedMessage = new ParsedMessage(param);
      this.domain = parsedMessage.domain;
      this.address = parsedMessage.address as `0x${string}`;
      this.statement = parsedMessage.statement;
      this.uri = parsedMessage.uri;
      this.version = parsedMessage.version;
      this.nonce = parsedMessage.nonce;
      this.issuedAt = parsedMessage.issuedAt;
      this.expirationTime = parsedMessage.expirationTime;
      this.notBefore = parsedMessage.notBefore;
      this.requestId = parsedMessage.requestId;
      this.chainId = parsedMessage.chainId;
      this.resources = parsedMessage.resources;
    } else {
      this.domain = param.domain || "";
      this.address = param.address || zeroAddress;
      this.statement = param?.statement;
      this.uri = param.uri || "";
      this.version = param.version || "1";
      this.chainId = param.chainId || 1;
      this.nonce = param.nonce;
      this.issuedAt = param?.issuedAt;
      this.expirationTime = param?.expirationTime;
      this.notBefore = param?.notBefore;
      this.requestId = param?.requestId;
      this.resources = param?.resources;

      if (typeof this.chainId === "string") {
        this.chainId = parseIntegerNumber(this.chainId);
      }
    }
    this.nonce = this.nonce || generateNonce();
    this.validateMessage();
  }

  /**
   * This function can be used to retrieve an EIP-4361 formated message for
   * signature, although you can call it directly it's advised to use
   * [prepareMessage()] instead which will resolve to the correct method based
   * on the [type] attribute of this object, in case of other formats being
   * implemented.
   * @returns {string} EIP-4361 formated message, ready for EIP-191 signing.
   */
  toMessage(): string {
    /** Validates all fields of the object */
    this.validateMessage();

    const header = `${this.domain} wants you to sign in with your Ethereum account:`;
    const uriField = `URI: ${this.uri}`;
    let prefix = [header, this.address].join("\n");
    const versionField = `Version: ${this.version}`;

    if (!this.nonce) {
      this.nonce = generateNonce();
    }

    const chainField = `Chain ID: ` + this.chainId || "1";

    const nonceField = `Nonce: ${this.nonce}`;

    const suffixArray = [uriField, versionField, chainField, nonceField];

    this.issuedAt = this.issuedAt || new Date().toISOString();

    suffixArray.push(`Issued At: ${this.issuedAt}`);

    if (this.expirationTime) {
      const expiryField = `Expiration Time: ${this.expirationTime}`;

      suffixArray.push(expiryField);
    }

    if (this.notBefore) {
      suffixArray.push(`Not Before: ${this.notBefore}`);
    }

    if (this.requestId) {
      suffixArray.push(`Request ID: ${this.requestId}`);
    }

    if (this.resources) {
      suffixArray.push(
        [`Resources:`, ...this.resources.map(x => `- ${x}`)].join("\n")
      );
    }

    const suffix = suffixArray.join("\n");
    prefix = [prefix, this.statement].join("\n\n");
    if (this.statement) {
      prefix += "\n";
    }
    return [prefix, suffix].join("\n");
  }

  /**
   * This method parses all the fields in the object and creates a messaging for signing
   * message according with the type defined.
   * @returns {string} Returns a message ready to be signed according with the
   * type defined in the object.
   */
  prepareMessage(): string {
    return this.toMessage();
  }

  /**
   * Verifies the integrity of the object by matching its signature.
   * @param params Parameters to verify the integrity of the message, signature is required.
   * @param opts Options to be used for verification.
   * @returns {Promise<SiwViemMessage>} This object if valid.
   */
  async verify(
    params: VerifyParams,
    opts: VerifyOpts = { suppressExceptions: false }
  ): Promise<SiwViemResponse> {
    try {
      this.validateParams(params);
      this.validateOpts(opts);
      this.validateDomainBinding(params.domain);
      this.validateNonceBinding(params.nonce);
      this.validateMessageTime(params.time);
      await this.validateSignature(params, opts);
    } catch (error) {
      if (opts.suppressExceptions) {
        return { success: false, data: this, error: error as SiwViemError };
      } else {
        throw error;
      }
    }

    return { success: true, data: this };
  }

  /**
   * Validates the parameters provided for the verification process.
   * @param params The parameters to be validated.
   * @throws {Error} Throws an error if the provided keys in params are invalid.
   */
  private validateParams(params: VerifyParams): void {
    const invalidParams: Array<keyof VerifyParams> =
      checkInvalidKeys<VerifyParams>(params, VerifyParamsKeys);
    if (invalidParams.length > 0) {
      throw new Error(
        `${invalidParams.join(", ")} is/are not valid key(s) for VerifyParams.`
      );
    }
  }

  /**
   * Validates the options provided for the verification process.
   * @param opts The options to be validated.
   * @throws {Error} Throws an error if the provided keys in opts are invalid.
   */
  private validateOpts(opts: VerifyOpts): void {
    const invalidOpts: Array<keyof VerifyOpts> = checkInvalidKeys<VerifyOpts>(
      opts,
      VerifyOptsKeys
    );
    if (invalidOpts.length > 0) {
      throw new Error(
        `${invalidOpts.join(", ")} is/are not valid key(s) for VerifyOpts.`
      );
    }
  }

  /**
   * Checks the domain binding of the object against the provided domain.
   * @param domain The domain to be checked.
   * @throws {SiwViemError} Throws an error if the domain doesn't match the object's domain.
   */
  private validateDomainBinding(domain?: string): void {
    if (domain && domain !== this.domain) {
      throw new SiwViemError(
        SiwViemErrorType.DOMAIN_MISMATCH,
        domain,
        this.domain
      );
    }
  }

  /**
   * Checks the nonce binding of the object against the provided nonce.
   * @param nonce The nonce to be checked.
   * @throws {SiwViemError} Throws an error if the nonce doesn't match the object's nonce.
   */
  private validateNonceBinding(nonce?: string): void {
    if (exists(nonce) && nonce !== this.nonce) {
      throw new SiwViemError(
        SiwViemErrorType.NONCE_MISMATCH,
        nonce,
        this.nonce || ""
      );
    }
  }

  /**
   * Validates if the provided message time is within the valid range.
   * @param time The time of the message to be validated.
   * @throws {Error} Throws an error if the provided time is not valid.
   * @throws {SiwViemError} Throws an error if the time is either not yet valid or expired.
   */
  private validateMessageTime(time?: string): void {
    const isValidDateObj = (d: Date | unknown) =>
      d instanceof Date &&
      typeof d.getTime === "function" &&
      !isNaN(d.getTime());

    const checkTime = new Date(time || new Date());

    if (!isValidDateObj(checkTime)) {
      throw new Error(`${checkTime} is not a valid date object`);
    }

    if (this.expirationTime) {
      const expirationTime = new Date(this.expirationTime);
      if (!isValidDateObj(expirationTime)) {
        throw new Error(`${expirationTime} is not a valid date object`);
      }

      if (checkTime.getTime() >= expirationTime.getTime()) {
        throw new SiwViemError(
          SiwViemErrorType.EXPIRED_MESSAGE,
          checkTime.toISOString(),
          this.expirationTime
        );
      }
    }
    if (this.notBefore) {
      const notBefore = new Date(this.notBefore);

      if (!isValidDateObj(notBefore)) {
        throw new Error(`${notBefore} is not a valid date object`);
      }
      if (checkTime.getTime() < notBefore.getTime()) {
        throw new SiwViemError(
          SiwViemErrorType.NOT_YET_VALID_MESSAGE,
          checkTime.toISOString(),
          this.notBefore
        );
      }
    }
  }

  /**
   * Validates the provided signature against the message.
   * @param params Parameters to verify the integrity of the message, signature is required.
   * @param opts Options to be used for verification.
   * @throws {SiwViemError} Throws an error if the signature is invalid or the recovered address doesn't match.
   */
  private async validateSignature(
    params: VerifyParams,
    opts: VerifyOpts = { suppressExceptions: false }
  ): Promise<void> {
    const EIP4361Message = this.prepareMessage();
    const hexedSignature =
      typeof params.signature === "string"
        ? params.signature
        : bytesToHex(params.signature);

    const normalizedSignatureBuf = Buffer.alloc(65);
    normalizedSignatureBuf.write(hexedSignature.substring(2), "hex");
    const normalizedSignature: `0x${string}` = `0x${normalizedSignatureBuf.toString(
      "hex"
    )}`;

    const recoveredAddress = await recoverMessageAddress({
      message: EIP4361Message,
      signature: normalizedSignature,
    });

    if (recoveredAddress === this.address) {
      return;
    }

    if (opts?.publicClient) {
      const success = (isValid: boolean) => {
        if (!isValid) {
          return {
            success: false,
            data: this,
            error: new SiwViemError(
              SiwViemErrorType.INVALID_SIGNATURE,
              recoveredAddress,
              `Resolved address to be ${this.address}`
            ),
          };
        }
        return {
          success: true,
          data: this,
        };
      };

      const fail = (error: SiwViemError) => ({
        success: false,
        data: this,
        error,
      });

      const EIP1271Promise = checkContractWalletSignature(
        this,
        normalizedSignature,
        opts.publicClient
      )
        .then(success)
        .catch(fail);

      const SafePromise = checkSafeWalletSignature(
        this,
        normalizedSignature,
        opts.publicClient
      )
        .then(success)
        .catch(fail);

      const isValid = await Promise.all([
        EIP1271Promise,
        SafePromise,
        opts
          ?.verificationFallback?.(params, opts, this, EIP1271Promise)
          ?.then(res => res)
          ?.catch((res: SiwViemResponse) => res),
      ]).then(([EIP1271Response, SafeResponse, fallbackResponse]) => {
        if (fallbackResponse) {
          return fallbackResponse.success;
        } else {
          return EIP1271Response.success || SafeResponse.success;
        }
      });
      if (isValid) return;
    }

    throw new SiwViemError(
      SiwViemErrorType.INVALID_SIGNATURE,
      recoveredAddress,
      `Resolved address to be ${this.address}`
    );
  }

  /**
   * Validates the values of this object fields.
   * @throws Throws an {ErrorType} if a field is invalid.
   */
  private validateMessage() {
    /** `domain` check. */
    if (
      !this.domain ||
      this.domain.length === 0 ||
      !/[^#?]*/.test(this.domain)
    ) {
      throw new SiwViemError(
        SiwViemErrorType.INVALID_DOMAIN,
        `${this.domain} to be a valid domain.`
      );
    }

    /** EIP-55 `address` check. */
    if (!isEIP55Address(this.address) || this.address === zeroAddress) {
      throw new SiwViemError(
        SiwViemErrorType.INVALID_ADDRESS,
        getAddress(this.address),
        this.address
      );
    }

    /** Check if the URI is valid. */
    if (!uri.isUri(this.uri)) {
      throw new SiwViemError(
        SiwViemErrorType.INVALID_URI,
        `${this.uri} to be a valid uri.`
      );
    }

    /** Check if the version is 1. */
    if (this.version !== "1") {
      throw new SiwViemError(
        SiwViemErrorType.INVALID_MESSAGE_VERSION,
        "1",
        this.version
      );
    }

    /** Check if the nonce is alphanumeric and bigger then 8 characters */
    const nonce = this?.nonce?.match(/[a-zA-Z0-9]{8,}/);
    if (!nonce || (this.nonce?.length || 0) < 8 || nonce[0] !== this.nonce) {
      throw new SiwViemError(
        SiwViemErrorType.INVALID_NONCE,
        `Length > 8 (${nonce?.length}). Alphanumeric.`,
        this.nonce || ""
      );
    }

    /** `issuedAt` conforms to ISO-8601 and is a valid date. */
    if (this.issuedAt) {
      if (!isValidISO8601Date(this.issuedAt)) {
        throw new Error(SiwViemErrorType.INVALID_TIME_FORMAT);
      }
    }

    /** `expirationTime` conforms to ISO-8601 and is a valid date. */
    if (this.expirationTime) {
      if (!isValidISO8601Date(this.expirationTime)) {
        throw new Error(SiwViemErrorType.INVALID_TIME_FORMAT);
      }
    }

    /** `notBefore` conforms to ISO-8601 and is a valid date. */
    if (this.notBefore) {
      if (!isValidISO8601Date(this.notBefore)) {
        throw new Error(SiwViemErrorType.INVALID_TIME_FORMAT);
      }
    }
  }
}
