
interface KeplrAccount {
  address: string;
  algo: string;
  pubkey: Uint8Array;
}

interface SignDoc {
  bodyBytes: Uint8Array;
  authInfoBytes: Uint8Array;
  chainId: string;
  accountNumber: string;
}

interface StdSignDoc {
  chain_id: string;
  account_number: string;
  sequence: string;
  fee: any;
  msgs: any[];
  memo: string;
}

interface StdSignature {
  pub_key: {
    type: string;
    value: string;
  };
  signature: string;
}

interface SignResponse {
  signed: SignDoc | StdSignDoc;
  signature: StdSignature;
}

interface KeplrOfflineSigner {
  getAccounts(): Promise<KeplrAccount[]>;
  signDirect(signerAddress: string, signDoc: SignDoc): Promise<SignResponse>;
  signAmino?(signerAddress: string, stdSignDoc: StdSignDoc): Promise<SignResponse>;
}

interface KeplrIntereactionOptions {
  sign?: {
    preferNoSetFee?: boolean;
    preferNoSetMemo?: boolean;
  };
}

interface ChainInfo {
  chainId: string;
  chainName: string;
  rpc: string;
  rest: string;
  stakeCurrency: {
    coinDenom: string;
    coinMinimalDenom: string;
    coinDecimals: number;
  };
  bip44: {
    coinType: number;
  };
  currencies: Array<{
    coinDenom: string;
    coinMinimalDenom: string;
    coinDecimals: number;
  }>;
  feeCurrencies: Array<{
    coinDenom: string;
    coinMinimalDenom: string;
    coinDecimals: number;
  }>;
}

interface Keplr {
  enable(chainId: string): Promise<void>;
  getOfflineSigner(chainId: string): KeplrOfflineSigner;
  getOfflineSignerOnlyAmino(chainId: string): KeplrOfflineSigner;
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
  getEnigmaUtils?(chainId: string): {
    getPubkey: () => Promise<Uint8Array>;
    getTxEncryptionKey: (nonce: Uint8Array) => Promise<Uint8Array>;
    encrypt: (contractCodeHash: string, msg: object) => Promise<Uint8Array>;
  };
  getSecret20ViewingKey?(
    chainId: string,
    contractAddress: string
  ): Promise<string>;
  interactionOptions?: KeplrIntereactionOptions;
}

interface Window {
  keplr?: Keplr;
}
