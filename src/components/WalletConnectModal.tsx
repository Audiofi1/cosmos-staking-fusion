
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, AlertCircle } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { useToast } from "@/hooks/use-toast";

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  supportedNetworks: string[];
  primary: boolean;
}

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletId: string) => void;
}

const walletOptions: WalletOption[] = [
  {
    id: "keplr",
    name: "Keplr Wallet",
    icon: "🛸",
    supportedNetworks: ["Cosmos", "Osmosis", "Juno"],
    primary: true
  },
  {
    id: "leap",
    name: "Leap Cosmos",
    icon: "🪐",
    supportedNetworks: ["Cosmos", "Osmosis", "Juno", "Secret"],
    primary: true
  },
  {
    id: "metamask",
    name: "MetaMask",
    icon: "🦊",
    supportedNetworks: ["Ethereum", "BSC", "Base"],
    primary: false
  },
  {
    id: "trustwallet",
    name: "Trust Wallet",
    icon: "🛡️",
    supportedNetworks: ["Cosmos", "Ethereum", "BSC"],
    primary: false
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "📱",
    supportedNetworks: ["Ethereum", "BSC", "Polygon"],
    primary: false
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "📊",
    supportedNetworks: ["Ethereum", "BSC", "Base"],
    primary: false
  }
];

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({ isOpen, onClose, onConnect }) => {
  const { connectKeplr, connectLeap, isConnecting } = useWallet();
  const { toast } = useToast();

  const handleConnect = async (walletId: string) => {
    if (walletId === "keplr") {
      const success = await connectKeplr();
      if (success) {
        onConnect(walletId);
      }
    } else if (walletId === "leap") {
      const success = await connectLeap();
      if (success) {
        onConnect(walletId);
      }
    } else {
      toast({
        title: "Coming soon",
        description: `${walletId.charAt(0).toUpperCase() + walletId.slice(1)} wallet integration coming soon.`,
      });
    }
  };

  const checkKeplrInstalled = () => {
    return typeof window !== 'undefined' && window.keplr !== undefined;
  };

  const checkLeapInstalled = () => {
    return typeof window !== 'undefined' && window.leap !== undefined;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card sm:max-w-md">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-xl font-bold">Connect Wallet</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 rounded-full">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="py-4">
          <div className="text-sm text-muted-foreground mb-4">
            Connect your wallet to access all features of Omnia Protocol and start staking across multiple chains.
          </div>
          
          {!checkKeplrInstalled() && !checkLeapInstalled() && (
            <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-500">No wallet extensions detected</p>
                <p className="text-muted-foreground">Please install a Cosmos wallet extension to connect:</p>
                <div className="flex gap-3 mt-2">
                  <a 
                    href="https://www.keplr.app/download" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-crossflip-purple hover:underline inline-block"
                  >
                    Download Keplr
                  </a>
                  <a 
                    href="https://www.leapwallet.io/download" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-crossflip-purple hover:underline inline-block"
                  >
                    Download Leap
                  </a>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {walletOptions
              .sort((a, b) => (a.primary === b.primary ? 0 : a.primary ? -1 : 1))
              .map((wallet) => {
                const isWalletAvailable = 
                  (wallet.id === "keplr" && checkKeplrInstalled()) || 
                  (wallet.id === "leap" && checkLeapInstalled()) || 
                  (wallet.id !== "keplr" && wallet.id !== "leap");
                  
                return (
                  <Button
                    key={wallet.id}
                    onClick={() => handleConnect(wallet.id)}
                    disabled={isConnecting || !isWalletAvailable}
                    className={`flex items-center justify-start space-x-3 p-4 h-auto 
                      ${wallet.primary 
                        ? 'border border-primary/30 bg-primary/10 hover:bg-primary/20'
                        : 'border border-white/5 hover:border-white/10 bg-muted/30 hover:bg-muted/50'
                      } transition-all relative`}
                  >
                    {(wallet.id === "keplr" || wallet.id === "leap") && isConnecting && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-md">
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <div className="text-2xl">{wallet.icon}</div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{wallet.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {wallet.supportedNetworks.slice(0, 2).join(", ")}
                        {wallet.supportedNetworks.length > 2 ? "..." : ""}
                      </span>
                    </div>
                  </Button>
                );
              })}
          </div>
          <div className="mt-6 text-xs text-muted-foreground text-center">
            By connecting your wallet, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectModal;
