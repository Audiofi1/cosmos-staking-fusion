import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowDownUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/contexts/WalletContext";
import WalletConnectModal from '@/components/WalletConnectModal';

const Swap: React.FC = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { toast } = useToast();
  const { wallet } = useWallet();

  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  const handleWalletConnect = (walletId: string) => {
    toast({
      title: "Wallet connected",
      description: `${walletId.charAt(0).toUpperCase() + walletId.slice(1)} wallet connected successfully.`,
    });
    closeWalletModal();
  };

  const [fromToken, setFromToken] = useState('Cosmos');
  const [toToken, setToToken] = useState('Ethereum');
  const [amount, setAmount] = useState('');
  const [estimatedOutput, setEstimatedOutput] = useState('');

  const handleSwap = () => {
    if (!wallet) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to perform a swap.",
        variant: "destructive",
      });
      openWalletModal();
      return;
    }

    if (!amount) {
      toast({
        title: "Invalid amount",
        description: "Please enter the amount you wish to swap.",
        variant: "destructive",
      });
      return;
    }

    // Simulate swap logic
    const rate = 0.98; // Example rate
    const output = parseFloat(amount) * rate;
    setEstimatedOutput(output.toFixed(2));

    toast({
      title: "Swap initiated",
      description: `Swapping ${amount} ${fromToken} for ${output.toFixed(2)} ${toToken}.`,
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar openWalletModal={openWalletModal} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-background/90 glass-card rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Token Swap</h1>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">From</label>
            <div className="flex items-center space-x-3">
              <select
                className="flex-1 bg-muted border border-input rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
              >
                <option>Cosmos</option>
                <option>Ethereum</option>
                <option>Binance Coin</option>
              </select>
              <input
                type="number"
                className="flex-1 bg-muted border border-input rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <ArrowDownUp className="h-6 w-6 text-muted-foreground" />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">To (Estimated)</label>
            <div className="flex items-center space-x-3">
              <select
                className="flex-1 bg-muted border border-input rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
              >
                <option>Ethereum</option>
                <option>Cosmos</option>
                <option>Binance Coin</option>
              </select>
              <input
                type="text"
                className="flex-1 bg-muted border border-input rounded-md py-2 px-3 text-sm text-muted-foreground"
                placeholder="Estimated Output"
                value={estimatedOutput}
                readOnly
              />
            </div>
          </div>

          <Button className="w-full cosmic-button" onClick={handleSwap}>
            Swap Tokens
          </Button>
        </div>
      </main>
      
      <WalletConnectModal 
        isOpen={isWalletModalOpen}
        onClose={closeWalletModal}
        onConnect={handleWalletConnect}
      />
    </div>
  );
};

export default Swap;
