
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  supportedNetworks: string[];
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
    supportedNetworks: ["Cosmos", "Osmosis", "Juno"]
  },
  {
    id: "metamask",
    name: "MetaMask",
    icon: "🦊",
    supportedNetworks: ["Ethereum", "BSC", "Base"]
  },
  {
    id: "trustwallet",
    name: "Trust Wallet",
    icon: "🛡️",
    supportedNetworks: ["Cosmos", "Ethereum", "BSC"]
  },
  {
    id: "leap",
    name: "Leap Cosmos",
    icon: "🪐",
    supportedNetworks: ["Cosmos", "Osmosis", "Juno", "Secret"]
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "📱",
    supportedNetworks: ["Ethereum", "BSC", "Polygon"]
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "📊",
    supportedNetworks: ["Ethereum", "BSC", "Base"]
  }
];

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({ isOpen, onClose, onConnect }) => {
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
            Connect your wallet to access all features of CrossFlip and start staking across multiple chains.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {walletOptions.map((wallet) => (
              <Button
                key={wallet.id}
                onClick={() => onConnect(wallet.id)}
                className="flex items-center justify-start space-x-3 p-4 h-auto border border-white/5 hover:border-primary/50 bg-muted/30 hover:bg-muted/50 transition-all"
              >
                <div className="text-2xl">{wallet.icon}</div>
                <div className="flex flex-col items-start">
                  <span className="font-medium">{wallet.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {wallet.supportedNetworks.slice(0, 2).join(", ")}
                    {wallet.supportedNetworks.length > 2 ? "..." : ""}
                  </span>
                </div>
              </Button>
            ))}
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
