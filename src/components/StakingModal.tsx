
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { X, Info, ArrowRight, BadgePercent, Clock, Lock, Unlock, Wallet } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Pool {
  id: string;
  name: string;
  icon: string;
  network: string;
  networkColor: string;
  apy: string;
  apyValue: number;
  autoCompound: boolean;
  lockPeriod: string;
  lockDays: number;
}

const poolsData: Record<string, Pool> = {
  "atom-1": {
    id: "atom-1",
    name: "ATOM",
    icon: "⚛️",
    network: "Cosmos",
    networkColor: "cosmos",
    apy: "14.2%",
    apyValue: 14.2,
    autoCompound: true,
    lockPeriod: "14 days",
    lockDays: 14
  },
  "osmo-1": {
    id: "osmo-1",
    name: "OSMO",
    icon: "🌌",
    network: "Osmosis",
    networkColor: "cosmos",
    apy: "21.4%",
    apyValue: 21.4,
    autoCompound: true,
    lockPeriod: "14 days",
    lockDays: 14
  },
  "eth-1": {
    id: "eth-1",
    name: "ETH",
    icon: "Ξ",
    network: "Ethereum",
    networkColor: "ethereum",
    apy: "5.8%",
    apyValue: 5.8,
    autoCompound: true,
    lockPeriod: "No lock",
    lockDays: 0
  },
  "bnb-1": {
    id: "bnb-1",
    name: "BNB",
    icon: "₿",
    network: "BNB Chain",
    networkColor: "bnb",
    apy: "9.3%",
    apyValue: 9.3,
    autoCompound: true,
    lockPeriod: "7 days",
    lockDays: 7
  }
};

interface StakingModalProps {
  isOpen: boolean;
  onClose: () => void;
  poolId: string | null;
}

const StakingModal: React.FC<StakingModalProps> = ({ isOpen, onClose, poolId }) => {
  const [amount, setAmount] = useState("");
  const [enableAutoCompound, setEnableAutoCompound] = useState(true);
  const [lockupPeriod, setLockupPeriod] = useState<number[]>([14]);
  const { toast } = useToast();
  
  const pool = poolId ? poolsData[poolId] : null;
  
  if (!pool) {
    return null;
  }
  
  const handleStake = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to stake.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Staking initiated",
      description: `You are staking ${amount} ${pool.name} for ${lockupPeriod[0]} days with auto-compound ${enableAutoCompound ? 'enabled' : 'disabled'}.`,
    });
    
    // Simulate successful staking after 2 seconds
    setTimeout(() => {
      toast({
        title: "Staking successful!",
        description: `You have successfully staked ${amount} ${pool.name}.`,
      });
      onClose();
    }, 2000);
  };
  
  const calculateAPY = () => {
    // Add bonus APY for longer lockup
    const lockupBonus = lockupPeriod[0] > 0 ? (lockupPeriod[0] / 7) * 0.5 : 0;
    // Add bonus for auto-compound
    const autoCompoundBonus = enableAutoCompound ? 1.2 : 0;
    
    return (pool.apyValue + lockupBonus + autoCompoundBonus).toFixed(1) + "%";
  };
  
  const calculateRewards = () => {
    const amountNum = parseFloat(amount) || 0;
    const apy = parseFloat(calculateAPY()) / 100;
    
    // Calculate daily rewards
    const dailyRate = apy / 365;
    const days = lockupPeriod[0] || 14;
    
    // Simple interest calculation for example purposes
    let totalReward = amountNum * dailyRate * days;
    
    if (enableAutoCompound) {
      // Rough compound interest approximation
      totalReward = amountNum * (Math.pow(1 + (dailyRate / days), days) - 1);
    }
    
    return totalReward.toFixed(6);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card sm:max-w-md">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-xl font-bold flex items-center">
            <div className={`w-8 h-8 rounded-full mr-2 text-xl flex items-center justify-center network-${pool.networkColor}`}>
              {pool.icon}
            </div>
            Stake {pool.name}
          </DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 rounded-full">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg border border-white/5 bg-muted/30">
              <div className="text-xs text-muted-foreground mb-1 flex items-center">
                <BadgePercent className="h-3 w-3 mr-1" /> Current APY
              </div>
              <div className="font-medium text-green-400">{pool.apy}</div>
            </div>
            <div className="p-3 rounded-lg border border-white/5 bg-muted/30">
              <div className="text-xs text-muted-foreground mb-1 flex items-center">
                <BadgePercent className="h-3 w-3 mr-1" /> Your APY
              </div>
              <div className="font-medium text-green-400">{calculateAPY()}</div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="amount" className="text-sm text-muted-foreground">
              Amount to Stake
            </Label>
            <div className="relative mt-1.5">
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pr-16 bg-muted/30 border-white/5"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setAmount("100")} // Example max amount
              >
                MAX
              </Button>
            </div>
            <div className="text-xs text-muted-foreground mt-1 flex justify-between">
              <span>Available: 100 {pool.name}</span>
              <span>≈ $1,500.00</span>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm text-muted-foreground">Lock Period</Label>
              <span className="text-sm font-medium">{lockupPeriod[0]} days</span>
            </div>
            <Slider
              defaultValue={[14]}
              max={30}
              step={1}
              value={lockupPeriod}
              onValueChange={setLockupPeriod}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span className="flex items-center">
                <Unlock className="h-3 w-3 mr-1" /> No lock
              </span>
              <span className="flex items-center">
                <Lock className="h-3 w-3 mr-1" /> 30 days
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Label htmlFor="auto-compound" className="text-sm">Enable Auto-Compound</Label>
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
            </div>
            <Switch
              id="auto-compound"
              checked={enableAutoCompound}
              onCheckedChange={setEnableAutoCompound}
            />
          </div>
          
          {amount && parseFloat(amount) > 0 && (
            <div className="p-3 rounded-lg border border-white/5 bg-muted/30">
              <div className="text-sm mb-2">Estimated Rewards</div>
              <div className="font-medium text-green-400 text-xl">{calculateRewards()} {pool.name}</div>
              <div className="text-xs text-muted-foreground mt-1">Over {lockupPeriod[0]} days with {enableAutoCompound ? 'auto-compound' : 'simple interest'}</div>
            </div>
          )}
          
          <Button 
            className="cosmic-button w-full py-6 text-white"
            onClick={handleStake}
          >
            <Wallet className="mr-2 h-4 w-4" />
            Stake {pool.name}
          </Button>
          
          <div className="text-xs text-muted-foreground text-center">
            By staking, you agree to the terms of service and understand the risks associated with staking.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StakingModal;
