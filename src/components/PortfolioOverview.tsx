
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, TrendingUp, Clock, ArrowRightLeft } from "lucide-react";

const PortfolioOverview = () => {
  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Portfolio Overview</span>
          <span className="text-sm text-green-400 flex items-center">
            +12.4% <ArrowUpRight className="h-4 w-4 ml-1" />
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
            <div className="text-3xl font-bold">$14,329.85</div>
            <div className="flex justify-between text-sm text-muted-foreground mb-4">
              <span>Total Value Staked</span>
              <span className="text-green-400">+$1,243.42 (24h)</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full network-cosmos mr-2 text-2xl flex items-center justify-center">⚛️</div>
                  <div>
                    <div className="font-medium">Cosmos</div>
                    <div className="text-xs text-muted-foreground">5 assets staked</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$7,245.23</div>
                  <div className="text-xs text-green-400">+3.2%</div>
                </div>
              </div>
              <Progress value={50} className="h-1.5 bg-muted" />
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full network-osmosis mr-2 text-2xl flex items-center justify-center">🌌</div>
                  <div>
                    <div className="font-medium">Osmosis</div>
                    <div className="text-xs text-muted-foreground">3 assets staked</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$4,673.18</div>
                  <div className="text-xs text-green-400">+1.7%</div>
                </div>
              </div>
              <Progress value={35} className="h-1.5 bg-muted" />
            </div>
            
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-lg border border-white/5 bg-muted/30">
                <div className="flex items-center text-xs text-muted-foreground mb-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> APR
                </div>
                <div className="font-medium text-lg">12.4%</div>
                <div className="text-xs text-muted-foreground">Average</div>
              </div>
              <div className="p-3 rounded-lg border border-white/5 bg-muted/30">
                <div className="flex items-center text-xs text-muted-foreground mb-1">
                  <Clock className="h-3 w-3 mr-1" /> Locked
                </div>
                <div className="font-medium text-lg">68%</div>
                <div className="text-xs text-muted-foreground">Of assets</div>
              </div>
              <div className="p-3 rounded-lg border border-white/5 bg-muted/30">
                <div className="flex items-center text-xs text-muted-foreground mb-1">
                  <ArrowRightLeft className="h-3 w-3 mr-1" /> Chains
                </div>
                <div className="font-medium text-lg">2+</div>
                <div className="text-xs text-muted-foreground">Connected</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="assets">
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
          </TabsContent>
          
          <TabsContent value="history">
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PortfolioOverview;
