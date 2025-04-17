
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

// Define the wallet interface
interface WalletInfo {
  address: string;
  chainId: string;
  walletType: string;
  isConnected: boolean;
}

interface WalletContextType {
  wallet: WalletInfo | null;
  isConnecting: boolean;
  connectKeplr: () => Promise<boolean>;
  connectLeap: () => Promise<boolean>;
  disconnectWallet: () => void;
  getOfflineSigner: (chainId?: string) => any;
}

const WalletContext = createContext<WalletContextType>({
  wallet: null,
  isConnecting: false,
  connectKeplr: async () => false,
  connectLeap: async () => false,
  disconnectWallet: () => {},
  getOfflineSigner: () => null,
});

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  // Check for existing connection on startup
  useEffect(() => {
    const savedWallet = localStorage.getItem('omniaWallet');
    if (savedWallet) {
      try {
        const parsedWallet = JSON.parse(savedWallet);
        setWallet(parsedWallet);
        // Verify connection is still valid
        if (parsedWallet.walletType === 'keplr') {
          verifyKeplrConnection(parsedWallet);
        } else if (parsedWallet.walletType === 'leap') {
          verifyLeapConnection(parsedWallet);
        }
      } catch (error) {
        console.error('Failed to parse saved wallet data', error);
        localStorage.removeItem('omniaWallet');
      }
    }
  }, []);

  // Verify Keplr connection is still valid
  const verifyKeplrConnection = async (walletInfo: WalletInfo) => {
    if (walletInfo.walletType === 'keplr') {
      try {
        if (!window.keplr) {
          setWallet(null);
          localStorage.removeItem('omniaWallet');
          return;
        }
        
        await window.keplr.enable(walletInfo.chainId);
        // Connection still valid, no action needed
      } catch (error) {
        console.error('Keplr connection no longer valid', error);
        setWallet(null);
        localStorage.removeItem('omniaWallet');
      }
    }
  };

  // Verify Leap connection is still valid
  const verifyLeapConnection = async (walletInfo: WalletInfo) => {
    if (walletInfo.walletType === 'leap') {
      try {
        if (!window.leap) {
          setWallet(null);
          localStorage.removeItem('omniaWallet');
          return;
        }
        
        await window.leap.enable(walletInfo.chainId);
        // Connection still valid, no action needed
      } catch (error) {
        console.error('Leap connection no longer valid', error);
        setWallet(null);
        localStorage.removeItem('omniaWallet');
      }
    }
  };

  // Get offline signer for transaction signing
  const getOfflineSigner = (chainId?: string) => {
    if (!wallet) return null;
    
    try {
      if (wallet.walletType === 'keplr' && window.keplr) {
        return window.keplr.getOfflineSigner(chainId || wallet.chainId);
      } else if (wallet.walletType === 'leap' && window.leap) {
        return window.leap.getOfflineSigner(chainId || wallet.chainId);
      }
      return null;
    } catch (error) {
      console.error('Failed to get offline signer', error);
      return null;
    }
  };

  // Connect to Leap wallet
  const connectLeap = async (): Promise<boolean> => {
    setIsConnecting(true);
    
    try {
      // Check if Leap is installed
      if (!window.leap) {
        toast({
          title: "Leap wallet not found",
          description: "Please install Leap wallet extension and refresh the page.",
          variant: "destructive",
        });
        setIsConnecting(false);
        return false;
      }

      // Default to Cosmos Hub chain ID
      const chainId = "cosmoshub-4";
      
      // Request connection to Leap
      await window.leap.enable(chainId);
      const offlineSigner = window.leap.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      
      if (accounts && accounts.length > 0) {
        const newWalletInfo: WalletInfo = {
          address: accounts[0].address,
          chainId: chainId,
          walletType: 'leap',
          isConnected: true,
        };
        
        setWallet(newWalletInfo);
        localStorage.setItem('omniaWallet', JSON.stringify(newWalletInfo));
        
        toast({
          title: "Wallet connected",
          description: `Connected to ${accounts[0].address.substring(0, 8)}...${accounts[0].address.substring(accounts[0].address.length - 4)}`,
        });
        
        setIsConnecting(false);
        return true;
      }
      
      throw new Error("No accounts found in Leap");
    } catch (error) {
      console.error("Failed to connect to Leap wallet:", error);
      toast({
        title: "Connection failed",
        description: "Failed to connect to Leap wallet. Please try again.",
        variant: "destructive",
      });
      setIsConnecting(false);
      return false;
    }
  };

  // Connect to Keplr wallet
  const connectKeplr = async (): Promise<boolean> => {
    setIsConnecting(true);
    
    try {
      // Check if Keplr is installed
      if (!window.keplr) {
        toast({
          title: "Keplr wallet not found",
          description: "Please install Keplr wallet extension and refresh the page.",
          variant: "destructive",
        });
        setIsConnecting(false);
        return false;
      }

      // Default to Cosmos Hub chain ID
      const chainId = "cosmoshub-4";
      
      // Request connection to Keplr
      await window.keplr.enable(chainId);
      const offlineSigner = window.keplr.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      
      if (accounts && accounts.length > 0) {
        const newWalletInfo: WalletInfo = {
          address: accounts[0].address,
          chainId: chainId,
          walletType: 'keplr',
          isConnected: true,
        };
        
        setWallet(newWalletInfo);
        localStorage.setItem('omniaWallet', JSON.stringify(newWalletInfo));
        
        toast({
          title: "Wallet connected",
          description: `Connected to ${accounts[0].address.substring(0, 8)}...${accounts[0].address.substring(accounts[0].address.length - 4)}`,
        });
        
        setIsConnecting(false);
        return true;
      }
      
      throw new Error("No accounts found in Keplr");
    } catch (error) {
      console.error("Failed to connect to Keplr wallet:", error);
      toast({
        title: "Connection failed",
        description: "Failed to connect to Keplr wallet. Please try again.",
        variant: "destructive",
      });
      setIsConnecting(false);
      return false;
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWallet(null);
    localStorage.removeItem('omniaWallet');
    toast({
      title: "Wallet disconnected",
      description: "You've been disconnected from your wallet.",
    });
  };

  return (
    <WalletContext.Provider value={{ wallet, isConnecting, connectKeplr, connectLeap, disconnectWallet, getOfflineSigner }}>
      {children}
    </WalletContext.Provider>
  );
};
