import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Filter, 
  Search, 
  ArrowUpDown, 
  Star, 
  Info, 
  ChevronDown, 
  Wallet,
  BadgePercent,
  Clock,
  ArrowUpRight,
  Lock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface Pool {
  id: string;
  name: string;
  icon: string;
  network: string;
  networkColor: string;
  tvl: string;
  apy: string;
  autoCompound: boolean;
  lockPeriod: string;
  available: boolean;
}

const pools: Pool[] = [
  {
    id: "atom-1",
    name: "ATOM",
    icon: "⚛️",
    network: "Cosmos",
    networkColor: "cosmos",
    tvl: "$12.4M",
    apy: "14.2%",
    autoCompound: true,
    lockPeriod: "14 days",
    available: true
  },
  {
    id: "osmo-1",
    name: "OSMO",
    icon: "🌌",
    network: "Osmosis",
    networkColor: "cosmos",
    tvl: "$8.7M",
    apy: "21.4%",
    autoCompound: true,
    lockPeriod: "14 days",
    available: true
  },
  {
    id: "juno-1",
    name: "JUNO",
    icon: "🪐",
    network: "Juno",
    networkColor: "cosmos",
    tvl: "$4.2M",
    apy: "18.7%",
    autoCompound: true,
    lockPeriod: "28 days",
    available: true
  },
  {
    id: "evmos-1",
    name: "EVMOS",
    icon: "🔥",
    network: "Evmos",
    networkColor: "cosmos",
    tvl: "$2.1M",
    apy: "32.6%",
    autoCompound: true,
    lockPeriod: "21 days",
    available: true
  },
  {
    id: "secret-1",
    name: "SCRT",
    icon: "🔒",
    network: "Secret",
    networkColor: "cosmos",
    tvl: "$3.6M",
    apy: "16.4%",
    autoCompound: false,
    lockPeriod: "21 days",
    available: true
  },
  {
    id: "akash-1",
    name: "AKT",
    icon: "☁️",
    network: "Akash",
    networkColor: "cosmos",
    tvl: "$1.2M",
    apy: "24.8%",
    autoCompound: false,
    lockPeriod: "21 days",
    available: true
  }
];

const StakingPools = ({ openStakeModal }: { openStakeModal: (poolId: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPool, setExpandedPool] = useState<string | null>(null);
  
  const togglePoolExpand = (id: string) => {
    if (expandedPool === id) {
      setExpandedPool(null);
    } else {
      setExpandedPool(id);
    }
  };
  
  const filteredPools = pools.filter(pool => 
    pool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pool.network.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="glass-card h-full">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <CardTitle>Staking Pools</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search pools..."
              className="pl-8 bg-muted/30 border-white/5 w-[180px] sm:w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="bg-muted/30 border-white/5">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-white/10">
              <DropdownMenuItem className="cursor-pointer">Highest APY</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Lowest Risk</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">No Lock Period</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Auto-Compound Only</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="bg-muted/30 border-white/5">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-white/10">
              <DropdownMenuItem className="cursor-pointer">Highest APY</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Lowest APY</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Highest TVL</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Network (A-Z)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 bg-muted/30">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="cosmos">Cosmos Ecosystem</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-3">
            {filteredPools.map((pool) => (
              <div 
                key={pool.id} 
                className="rounded-lg border border-white/5 bg-muted/30 overflow-hidden transition-all duration-300"
              >
                <div 
                  className="p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => togglePoolExpand(pool.id)}
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full mr-3 text-2xl flex items-center justify-center network-${pool.networkColor}`}>
                      {pool.icon}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <div className="font-medium">{pool.name}</div>
                        <div className="ml-2 px-2 py-0.5 text-xs rounded-full bg-white/10">
                          {pool.network}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center mt-0.5">
                        <BadgePercent className="h-3 w-3 mr-1" /> APY: <span className="text-green-400 ml-1">{pool.apy}</span>
                        {pool.autoCompound && (
                          <span className="ml-2 flex items-center">
                            <ArrowUpRight className="h-3 w-3 mr-1" /> Auto-compound
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right hidden sm:block">
                      <div className="text-xs text-muted-foreground">TVL</div>
                      <div className="font-medium">{pool.tvl}</div>
                    </div>
                    <Button 
                      className="cosmic-button px-4 py-2 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        openStakeModal(pool.id);
                      }}
                    >
                      Stake
                    </Button>
                    <ChevronDown 
                      className={`h-5 w-5 transition-transform duration-300 ${expandedPool === pool.id ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>
                
                {expandedPool === pool.id && (
                  <div className="p-4 pt-0 border-t border-white/5 mt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                      <div className="p-3 rounded-lg border border-white/5 bg-background/30">
                        <div className="text-xs text-muted-foreground mb-1">Total Value Locked</div>
                        <div className="font-medium">{pool.tvl}</div>
                      </div>
                      <div className="p-3 rounded-lg border border-white/5 bg-background/30">
                        <div className="text-xs text-muted-foreground mb-1 flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> Lock Period
                        </div>
                        <div className="font-medium flex items-center">
                          {pool.lockPeriod}
                          {pool.lockPeriod !== "No lock" && <Lock className="h-3 w-3 ml-1" />}
                        </div>
                      </div>
                      <div className="p-3 rounded-lg border border-white/5 bg-background/30">
                        <div className="text-xs text-muted-foreground mb-1">Validator Set</div>
                        <div className="font-medium">8 validators</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="bg-background/30 border-white/5">
                          <Info className="h-3 w-3 mr-1" /> Pool Info
                        </Button>
                        <Button variant="outline" size="sm" className="bg-background/30 border-white/5">
                          <Star className="h-3 w-3 mr-1" /> Add to Watchlist
                        </Button>
                      </div>
                      <div>
                        <Button 
                          className="cosmic-button px-4 py-2 text-white"
                          onClick={() => openStakeModal(pool.id)}
                        >
                          <Wallet className="h-4 w-4 mr-2" />
                          Stake {pool.name}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="cosmos">
            {filteredPools
              .filter(pool => ["Cosmos", "Osmosis", "Juno", "Secret", "Akash", "Evmos"].includes(pool.network))
              .map((pool) => (
                <div 
                  key={pool.id} 
                  className="rounded-lg border border-white/5 bg-muted/30 overflow-hidden transition-all duration-300 mb-3"
                >
                  {/* Same pool content as above */}
                  <div 
                    className="p-4 flex justify-between items-center cursor-pointer"
                    onClick={() => togglePoolExpand(pool.id)}
                  >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full mr-3 text-2xl flex items-center justify-center network-${pool.networkColor}`}>
                        {pool.icon}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <div className="font-medium">{pool.name}</div>
                          <div className="ml-2 px-2 py-0.5 text-xs rounded-full bg-white/10">
                            {pool.network}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center mt-0.5">
                          <BadgePercent className="h-3 w-3 mr-1" /> APY: <span className="text-green-400 ml-1">{pool.apy}</span>
                          {pool.autoCompound && (
                            <span className="ml-2 flex items-center">
                              <ArrowUpRight className="h-3 w-3 mr-1" /> Auto-compound
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right hidden sm:block">
                        <div className="text-xs text-muted-foreground">TVL</div>
                        <div className="font-medium">{pool.tvl}</div>
                      </div>
                      <Button 
                        className="cosmic-button px-4 py-2 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          openStakeModal(pool.id);
                        }}
                      >
                        Stake
                      </Button>
                      <ChevronDown 
                        className={`h-5 w-5 transition-transform duration-300 ${expandedPool === pool.id ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                  
                  {expandedPool === pool.id && (
                    <div className="p-4 pt-0 border-t border-white/5 mt-2">
                      {/* Same expanded content as above */}
                    </div>
                  )}
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StakingPools;
