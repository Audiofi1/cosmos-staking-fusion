
interface KeplrAccount {
  address: string;
  algo: string;
  pubkey: Uint8Array;
}

interface KeplrOfflineSigner {
  getAccounts(): Promise<KeplrAccount[]>;
  signDirect(signerAddress: string, signDoc: any): Promise<any>;
}

interface Keplr {
  enable(chainId: string): Promise<void>;
  getOfflineSigner(chainId: string): KeplrOfflineSigner;
  getKey(chainId: string): Promise<any>;
}

interface Window {
  keplr?: Keplr;
}
