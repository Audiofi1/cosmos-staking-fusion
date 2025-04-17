
interface LeapAccount {
  address: string;
  algo: string;
  pubkey: Uint8Array;
}

interface LeapOfflineSigner {
  getAccounts(): Promise<LeapAccount[]>;
  signDirect(signerAddress: string, signDoc: SignDoc): Promise<SignResponse>;
  signAmino?(signerAddress: string, stdSignDoc: StdSignDoc): Promise<SignResponse>;
}

interface Leap {
  enable(chainId: string): Promise<void>;
  getOfflineSigner(chainId: string): LeapOfflineSigner;
  getOfflineSignerOnlyAmino(chainId: string): LeapOfflineSigner;
  getKey(chainId: string): Promise<{
    name: string;
    algo: string;
    pubKey: Uint8Array;
    address: Uint8Array;
    bech32Address: string;
    isNanoLedger: boolean;
  }>;
  signArbitrary(chainId: string, signer: string, data: string | Uint8Array): Promise<{
    signature: StdSignature;
    pub_key: {
      type: string;
      value: string;
    };
  }>;
  verifyArbitrary(
    chainId: string,
    signer: string,
    data: string | Uint8Array,
    signature: StdSignature
  ): Promise<boolean>;
  suggestChain(chainInfo: ChainInfo): Promise<void>;
  experimentalSuggestChain?(chainInfo: ChainInfo): Promise<void>;
}

interface Window {
  leap?: Leap;
}
