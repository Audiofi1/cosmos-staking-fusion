
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, Cpu, Wifi, Zap, Globe, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/contexts/WalletContext";

interface Network {
  id: string;
  name: string;
  icon: string;
  color: string;
  validators: number;
  apr: string;
  totalStaked: string;
  yourStake: string;
  percentage: number;
  status: "active" | "inactive" | "syncing";
}

const defaultNetworks: Network[] = [
  {
    id: "cosmos",
    name: "Cosmos Hub",
    icon: "⚛️",
    color: "cosmos",
    validators: 175,
    apr: "14.2%",
    totalStaked: "$1.2B",
    yourStake: "$2,452.75",
    percentage: 85,
    status: "active"
  },
  {
    id: "ethereum",
    name: "Ethereum",
    icon: "Ξ",
    color: "ethereum",
    validators: 543256,
    apr: "5.8%",
    totalStaked: "$23.5B",
    yourStake: "$1,845.12",
    percentage: 72,
    status: "active"
  },
  {
    id: "bnb",
    name: "BNB Chain",
    icon: "₿",
    color: "bnb",
    validators: 21,
    apr: "9.3%",
    totalStaked: "$4.7B",
    yourStake: "$875.38",
    percentage: 54,
    status: "active"
  },
  {
    id: "osmosis",
    name: "Osmosis",
    icon: "🌌",
    color: "cosmos",
    validators: 150,
    apr: "21.4%",
    totalStaked: "$580M",
    yourStake: "$1,245.87",
    percentage: 68,
    status: "active"
  }
];

// Icons for network selection
const networkIcons = [
  { icon: "⚛️", label: "Cosmos" },
  { icon: "Ξ", label: "Ethereum" },
  { icon: "₿", label: "Bitcoin" },
  { icon: "🌌", label: "Osmosis" },
  { icon: "🌟", label: "Star" },
  { icon: "🔗", label: "Chain" },
  { icon: "🪐", label: "Planet" },
  { icon: "💫", label: "Sparkle" }
];

const NetworksOverview = () => {
  const [networks, setNetworks] = useState<Network[]>(() => {
    // Try to load from local storage first
    const savedNetworks = localStorage.getItem('userNetworks');
    if (savedNetworks) {
      try {
        return JSON.parse(savedNetworks);
      } catch (e) {
        console.error("Failed to parse saved networks", e);
        return defaultNetworks;
      }
    }
    return defaultNetworks;
  });
  
  const [isAddNetworkOpen, setIsAddNetworkOpen] = useState(false);
  const [newNetwork, setNewNetwork] = useState({
    name: '',
    chainId: '',
    rpc: '',
    selectedIcon: '🔗',
    validators: Math.floor(Math.random() * 200) + 50,
    apr: `${(Math.random() * 20 + 5).toFixed(1)}%`,
    totalStaked: `$${(Math.random() * 5 + 0.5).toFixed(1)}B`,
    yourStake: '$0',
    percentage: 0
  });
  
  const { toast } = useToast();
  const { wallet } = useWallet();

  const openAddNetworkModal = () => {
    if (!wallet) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to add a network.",
        variant: "destructive",
      });
      return;
    }
    setIsAddNetworkOpen(true);
  };

  const closeAddNetworkModal = () => {
    setIsAddNetworkOpen(false);
    // Reset form
    setNewNetwork({
      name: '',
      chainId: '',
      rpc: '',
      selectedIcon: '🔗',
      validators: Math.floor(Math.random() * 200) + 50,
      apr: `${(Math.random() * 20 + 5).toFixed(1)}%`,
      totalStaked: `$${(Math.random() * 5 + 0.5).toFixed(1)}B`,
      yourStake: '$0',
      percentage: 0
    });
  };

  const handleAddNetwork = () => {
    if (!newNetwork.name || !newNetwork.chainId) {
      toast({
        title: "Missing information",
        description: "Please provide a network name and chain ID.",
        variant: "destructive",
      });
      return;
    }

    // Check if network already exists
    if (networks.some(network => network.id === newNetwork.chainId.toLowerCase())) {
      toast({
        title: "Network already exists",
        description: `A network with chain ID ${newNetwork.chainId} is already added.`,
        variant: "destructive",
      });
      return;
    }

    try {
      // In a real app, we would try to connect to the network via the wallet here
      // For demo purposes, we'll just add it to our list
      
      const colorOptions = ["cosmos", "ethereum", "bnb"];
      const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      
      const newNetworkEntry: Network = {
        id: newNetwork.chainId.toLowerCase(),
        name: newNetwork.name,
        icon: newNetwork.selectedIcon,
        color: randomColor,
        validators: newNetwork.validators,
        apr: newNetwork.apr,
        totalStaked: newNetwork.totalStaked,
        yourStake: newNetwork.yourStake,
        percentage: newNetwork.percentage,
        status: "active"
      };
      
      const updatedNetworks = [...networks, newNetworkEntry];
      setNetworks(updatedNetworks);
      
      // Save to local storage
      localStorage.setItem('userNetworks', JSON.stringify(updatedNetworks));
      
      toast({
        title: "Network added",
        description: `${newNetwork.name} has been added to your networks.`,
      });
      
      closeAddNetworkModal();
    } catch (error) {
      console.error("Failed to add network:", error);
      toast({
        title: "Failed to add network",
        description: "There was an error adding the network. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveNetwork = (networkId: string) => {
    // Only allow removing custom networks, not default ones
    if (defaultNetworks.some(n => n.id === networkId)) {
      toast({
        title: "Cannot remove default network",
        description: "Default networks cannot be removed.",
        variant: "destructive",
      });
      return;
    }

    const updatedNetworks = networks.filter(network => network.id !== networkId);
    setNetworks(updatedNetworks);
    
    // Save to local storage
    localStorage.setItem('userNetworks', JSON.stringify(updatedNetworks));
    
    toast({
      title: "Network removed",
      description: "The network has been removed from your list.",
    });
  };

  return (
    <Card className="glass-card h-full">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Connected Networks</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-muted/30 border-white/5"
          onClick={openAddNetworkModal}
        >
          <Plus className="h-4 w-4 mr-1" /> Add Network
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {networks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Globe className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No networks connected yet</p>
            <Button 
              variant="link" 
              onClick={openAddNetworkModal} 
              className="mt-2"
            >
              Add your first network
            </Button>
          </div>
        ) : (
          networks.map((network) => (
            <div 
              key={network.id} 
              className="rounded-lg border border-white/5 bg-muted/30 p-4 relative overflow-hidden"
            >
              {/* Network background glow effect */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-glow-${network.color === 'cosmos' ? 'purple' : network.color === 'ethereum' ? 'blue' : 'green'} opacity-30 blur-xl`}></div>
              
              <div className="flex justify-between items-start relative z-10">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full mr-3 text-2xl flex items-center justify-center network-${network.color}`}>
                    {network.icon}
                  </div>
                  <div>
                    <div className="font-medium">{network.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {network.validators} validators • {network.apr} APR
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5">
                  {network.status === "active" && (
                    <div className="flex items-center px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs">
                      <Wifi className="h-3 w-3 mr-1" /> Active
                    </div>
                  )}
                  {network.status === "syncing" && (
                    <div className="flex items-center px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full text-xs">
                      <Cpu className="h-3 w-3 mr-1" /> Syncing
                    </div>
                  )}
                  {network.status === "inactive" && (
                    <div className="flex items-center px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full text-xs">
                      <Zap className="h-3 w-3 mr-1" /> Inactive
                    </div>
                  )}
                  
                  {/* Only show remove button for non-default networks */}
                  {!defaultNetworks.some(n => n.id === network.id) && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 ml-2 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveNetwork(network.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="mt-4 space-y-2 relative z-10">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Your Stake</span>
                  <span>{network.yourStake}</span>
                </div>
                <Progress value={network.percentage} className="h-1.5 bg-muted" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Total Staked: {network.totalStaked}</span>
                  <span>Network Security: {network.percentage}%</span>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>

      {/* Add Network Modal */}
      <Dialog open={isAddNetworkOpen} onOpenChange={setIsAddNetworkOpen}>
        <DialogContent className="glass-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add a Network</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Network Name</Label>
              <Input 
                id="name" 
                placeholder="e.g., Celestia, Akash Network" 
                value={newNetwork.name}
                onChange={(e) => setNewNetwork({...newNetwork, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="chainId">Chain ID</Label>
              <Input 
                id="chainId" 
                placeholder="e.g., celestia-1, akashnet-2" 
                value={newNetwork.chainId}
                onChange={(e) => setNewNetwork({...newNetwork, chainId: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rpc">RPC Endpoint (Optional)</Label>
              <Input 
                id="rpc" 
                placeholder="https://rpc-example.com" 
                value={newNetwork.rpc}
                onChange={(e) => setNewNetwork({...newNetwork, rpc: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Network Icon</Label>
              <div className="flex flex-wrap gap-2">
                {networkIcons.map((item) => (
                  <Button
                    key={item.icon}
                    type="button"
                    variant={newNetwork.selectedIcon === item.icon ? "default" : "outline"}
                    className={`w-10 h-10 p-0 text-xl ${newNetwork.selectedIcon === item.icon ? 'bg-primary' : 'bg-muted/30'}`}
                    onClick={() => setNewNetwork({...newNetwork, selectedIcon: item.icon})}
                  >
                    {item.icon}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeAddNetworkModal}>Cancel</Button>
            <Button onClick={handleAddNetwork}>Add Network</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default NetworksOverview;
