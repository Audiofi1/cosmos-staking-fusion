
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PortfolioOverview from '../components/PortfolioOverview';
import StakingPools from '../components/StakingPools';
import NetworksOverview from '../components/NetworksOverview';
import RewardsTracker from '../components/RewardsTracker';
import WalletConnectModal from '../components/WalletConnectModal';
import StakingModal from '../components/StakingModal';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWallet } from "@/contexts/WalletContext";

const Index = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isStakingModalOpen, setIsStakingModalOpen] = useState(false);
  const [selectedPoolId, setSelectedPoolId] = useState<string | null>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { wallet } = useWallet();
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    // We don't force redirect here, but will show connect wallet UI instead
  }, [wallet]);

  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  const openStakeModal = (poolId: string) => {
    if (!wallet) {
      toast({
        title: "Wallet connection required",
        description: "Please connect your wallet first to stake tokens.",
      });
      openWalletModal();
      return;
    }
    setSelectedPoolId(poolId);
    setIsStakingModalOpen(true);
  };

  const closeStakeModal = () => {
    setIsStakingModalOpen(false);
    setSelectedPoolId(null);
  };

  const handleWalletConnect = (walletId: string) => {
    toast({
      title: "Wallet connected",
      description: `${walletId.charAt(0).toUpperCase() + walletId.slice(1)} wallet connected successfully.`,
    });
    closeWalletModal();
  };

  return (
    <div className="min-h-screen">
      <Navbar openWalletModal={openWalletModal} />
      
      <main className="container mx-auto px-4 py-8">
        {!wallet ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-20 h-20 mb-6 bg-primary/10 rounded-full flex items-center justify-center">
              <Wallet className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Connect Your Wallet</h1>
            <p className="text-muted-foreground max-w-md mb-8">
              You need to connect your wallet to access Omnia Protocol features and start swapping, staking, and earning rewards.
            </p>
            <Button 
              onClick={openWalletModal} 
              className="cosmic-button text-lg py-6 px-8 transition-all duration-300"
            >
              Connect Wallet <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <Link to="/swap" className="w-full sm:w-auto">
                  <Button className="cosmic-button w-full transition-all duration-300">
                    Swap Tokens <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/stake" className="w-full sm:w-auto">
                  <Button className="cosmic-button w-full transition-all duration-300">
                    Stake <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 gap-6">
                  <PortfolioOverview />
                  <StakingPools openStakeModal={openStakeModal} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <NetworksOverview />
                <RewardsTracker />
              </div>
            </div>
          </>
        )}
      </main>
      
      {/* Background particles */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-48 h-48 bg-glow-purple opacity-30 rounded-full filter blur-3xl fade-pulse"></div>
        <div className="absolute top-[40%] right-[15%] w-64 h-64 bg-glow-blue opacity-20 rounded-full filter blur-3xl fade-pulse"></div>
        <div className="absolute bottom-[15%] left-[30%] w-56 h-56 bg-glow-green opacity-25 rounded-full filter blur-3xl fade-pulse"></div>
        
        {/* Floating elements */}
        <div className="absolute top-[30%] right-[20%] w-2 h-2 bg-white rounded-full opacity-60 animate-float"></div>
        <div className="absolute top-[15%] left-[40%] w-3 h-3 bg-white rounded-full opacity-60 animate-float"></div>
        <div className="absolute bottom-[25%] right-[35%] w-2 h-2 bg-white rounded-full opacity-60 animate-float"></div>
        <div className="absolute top-[60%] left-[15%] w-3 h-3 bg-white rounded-full opacity-60 animate-float"></div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] opacity-20 [background-size:30px_30px]"></div>
      </div>
      
      {/* Modals */}
      <WalletConnectModal 
        isOpen={isWalletModalOpen}
        onClose={closeWalletModal}
        onConnect={handleWalletConnect}
      />
      
      <StakingModal 
        isOpen={isStakingModalOpen}
        onClose={closeStakeModal}
        poolId={selectedPoolId}
      />
    </div>
  );
};

export default Index;
