
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, Cpu, Wifi, Zap } from "lucide-react";

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

const networks: Network[] = [
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

const NetworksOverview = () => {
  return (
    <Card className="glass-card h-full">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Connected Networks</CardTitle>
        <Button variant="outline" size="sm" className="bg-muted/30 border-white/5">
          <Plus className="h-4 w-4 mr-1" /> Add Network
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {networks.map((network) => (
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
        ))}
      </CardContent>
    </Card>
  );
};

export default NetworksOverview;
