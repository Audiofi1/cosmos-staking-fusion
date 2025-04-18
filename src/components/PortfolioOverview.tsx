import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, TrendingUp, Clock, ArrowRightLeft } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";

const PortfolioOverview = () => {
  const { wallet } = useWallet();

  // Completely empty state for a new live account
  const portfolioData = wallet 
    ? {
        totalValue: "$0.00", 
        totalValueStaked: "$0.00",
        networks: [],
        assets: [],
        averageApr: "0%",
        lockedPercentage: "0%",
        connectedChains: 0
      }
    : {
        totalValue: "$14,329.85",
        totalValueStaked: "$1,243.42",
        networks: [
          {
            name: "Cosmos",
            icon: "⚛️",
            assetsStaked: 5,
            value: "$7,245.23",
            percentage: 50,
            growth: "+3.2%"
          },
          {
            name: "Osmosis", 
            icon: "🌌", 
            assetsStaked: 3,
            value: "$4,673.18", 
            percentage: 35,
            growth: "+1.7%"
          }
        ],
        averageApr: "12.4%",
        lockedPercentage: "68%",
        connectedChains: 2
      };

  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Portfolio Overview</span>
          <span className="text-sm text-green-400 flex items-center">
            {wallet ? "Live Account" : "+12.4%"} <ArrowUpRight className="h-4 w-4 ml-1" />
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4 bg-muted/30">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="text-3xl font-bold">{portfolioData.totalValue}</div>
            <div className="flex justify-between text-sm text-muted-foreground mb-4">
              <span>Total Value Staked</span>
              <span className="text-green-400">
                {wallet ? "$0.00" : "+$1,243.42 (24h)"}
              </span>
            </div>
            
            {wallet ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No assets staked yet</p>
                <p className="text-sm mt-2">Start staking to see your portfolio grow</p>
              </div>
            ) : (
              <div className="space-y-4">
                {portfolioData.networks.map((network, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full network-cosmos mr-2 text-2xl flex items-center justify-center">
                        {network.icon}
                      </div>
                      <div>
                        <div className="font-medium">{network.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {network.assetsStaked} assets staked
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{network.value}</div>
                      <div className="text-xs text-green-400">{network.growth}</div>
                    </div>
                  </div>
                ))}
                {portfolioData.networks.map((network, index) => (
                  <Progress 
                    key={index} 
                    value={network.percentage} 
                    className="h-1.5 bg-muted" 
                  />
                ))}
              </div>
            )}
            
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-lg border border-white/5 bg-muted/30">
                <div className="flex items-center text-xs text-muted-foreground mb-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> APR
                </div>
                <div className="font-medium text-lg">{portfolioData.averageApr}</div>
                <div className="text-xs text-muted-foreground">Average</div>
              </div>
              <div className="p-3 rounded-lg border border-white/5 bg-muted/30">
                <div className="flex items-center text-xs text-muted-foreground mb-1">
                  <Clock className="h-3 w-3 mr-1" /> Locked
                </div>
                <div className="font-medium text-lg">{portfolioData.lockedPercentage}</div>
                <div className="text-xs text-muted-foreground">Of assets</div>
              </div>
              <div className="p-3 rounded-lg border border-white/5 bg-muted/30">
                <div className="flex items-center text-xs text-muted-foreground mb-1">
                  <ArrowRightLeft className="h-3 w-3 mr-1" /> Chains
                </div>
                <div className="font-medium text-lg">{portfolioData.connectedChains}</div>
                <div className="text-xs text-muted-foreground">Connected</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="assets">
            {wallet ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No assets found</p>
                <p className="text-sm mt-2">Start staking to see your assets</p>
              </div>
            ) : (
              <div className="space-y-2">
                {[
                  { icon: "⚛️", name: "ATOM", network: "Cosmos", amount: "124.5", value: "$1,869.38", apy: "14.2%" },
                  { icon: "🌌", name: "OSMO", network: "Osmosis", amount: "2,345", value: "$1,452.39", apy: "21.4%" },
                ].map((asset, index) => (
                  <div key={index} className="p-3 rounded-lg border border-white/5 bg-muted/30 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full mr-2 text-xl flex items-center justify-center network-${asset.network === "Cosmos" ? "cosmos" : "osmosis"}`}>
                        {asset.icon}
                      </div>
                      <div>
                        <div className="font-medium">{asset.name}</div>
                        <div className="text-xs text-muted-foreground">{asset.network}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{asset.value}</div>
                      <div className="text-xs text-green-400 flex items-center justify-end">
                        APY: {asset.apy}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history">
            {wallet ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No transaction history</p>
                <p className="text-sm mt-2">Your transactions will appear here</p>
              </div>
            ) : (
              <div className="space-y-2">
                {[
                  { action: "Staked", asset: "ATOM", amount: "25", value: "$375.25", time: "2h ago" },
                  { action: "Reward", asset: "OSMO", amount: "45.2", value: "$28.02", time: "1d ago" },
                ].map((event, index) => (
                  <div key={index} className="p-3 rounded-lg border border-white/5 bg-muted/30 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <div className="font-medium">{event.action}</div>
                        <div className="text-xs text-muted-foreground">{event.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{event.amount} {event.asset}</div>
                      <div className="text-xs text-muted-foreground">{event.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PortfolioOverview;
