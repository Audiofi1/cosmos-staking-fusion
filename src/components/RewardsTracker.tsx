import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { Wallet, TrendingUp, ArrowRight, BadgePercent, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/contexts/WalletContext";

const RewardsTracker = () => {
  const { toast } = useToast();
  const { wallet, openWalletModal } = useWallet();
  const [isClaimingRewards, setIsClaimingRewards] = React.useState(false);

  // Empty rewards data for a new wallet
  const rewardsData = wallet 
    ? [] 
    : [
        { date: 'Apr 01', amount: 0.12 },
        { date: 'Apr 03', amount: 0.25 },
        { date: 'Apr 05', amount: 0.38 },
        { date: 'Apr 07', amount: 0.41 },
        { date: 'Apr 09', amount: 0.56 },
        { date: 'Apr 11', amount: 0.72 },
        { date: 'Apr 13', amount: 0.89 },
        { date: 'Apr 15', amount: 1.05 },
      ];

  // Empty reward distribution for a new wallet
  const rewardDistribution = wallet 
    ? [] 
    : [
        { network: 'Cosmos', icon: '⚛️', color: 'cosmos', amount: '0.45', percentage: 42 },
        { network: 'Osmosis', icon: '🌌', color: 'cosmos', amount: '0.28', percentage: 26 },
        { network: 'Juno', icon: '🪐', color: 'cosmos', amount: '0.21', percentage: 20 },
        { network: 'Secret', icon: '🔒', color: 'cosmos', amount: '0.13', percentage: 12 }
      ];

  const handleClaimRewards = () => {
    if (!wallet) {
      openWalletModal();
      return;
    }
    
    toast({
      title: "No rewards available",
      description: "You don't have any staking rewards yet. Start staking to earn rewards.",
    });
  };

  const totalRewards = wallet 
    ? 0 
    : rewardsData[rewardsData.length - 1].amount;

  return (
    <Card className="glass-card h-full">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Staking Rewards</CardTitle>
        <Button 
          className="cosmic-button px-4 py-1.5 text-white"
          onClick={handleClaimRewards}
          disabled={wallet ? true : false}
        >
          {wallet ? "No Rewards" : "Claim All"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="text-3xl font-bold flex items-baseline">
            {totalRewards} ATOM
            <span className="text-green-400 text-sm ml-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-0.5" /> {wallet ? "0%" : "+24.3%"}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {wallet ? "$0.00" : "≈ $2,482.35"}
          </div>
        </div>
        
        <div className="h-48 w-full">
          {wallet ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No rewards data</p>
              <p className="text-sm mt-2">Start staking to see your rewards history</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={rewardsData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="rewardGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#888', fontSize: 10 }}
                />
                <YAxis 
                  hide={true}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#8A2BE2" 
                  fillOpacity={1}
                  fill="url(#rewardGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm font-medium">Reward Distribution</div>
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2 text-muted-foreground hover:text-white">
              View Details <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
          
          {wallet ? (
            <div className="text-center py-4 text-muted-foreground">
              <p>No rewards distribution</p>
              <p className="text-sm mt-2">Stake tokens to start earning rewards</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rewardDistribution.map((item) => (
                <div key={item.network} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full mr-2 text-xl flex items-center justify-center network-${item.color}`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{item.network}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{item.amount} ATOM</div>
                    <div className="text-xs text-muted-foreground">{item.percentage}% of total</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-6 p-3 rounded-lg border border-white/5 bg-muted/30 flex justify-between items-center">
          <div className="flex items-center text-sm">
            <BadgePercent className="h-4 w-4 mr-2 text-green-400" />
            {wallet ? "No auto-compound pools" : "Auto-compound is enabled for 3 pools"}
          </div>
          <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
            Configure
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface RewardDataPoint {
  date: string;
  amount: number;
}

interface RewardDistribution {
  network: string;
  icon: string;
  color: string;
  amount: string;
  percentage: number;
}

interface IRewardsContract {
  claimRewards: () => Promise<void>;
  getRewardsBalance: () => Promise<string>;
}

interface TooltipProps<T extends number | string, V extends string> {
  active?: boolean;
  payload?: any[] | null;
  label?: T;
  formatter?: (value: any, name: string) => React.ReactNode;
  position?: { x: number; y: number };
  offset?: number;
  separator?: string;
  itemStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  coordinate?: { x: number; y: number }[];
  isAnimationActive?: boolean;
  animationDuration?: number;
  animationEasing?: string;
  cursor?: React.CSSProperties;
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-2 text-xs border border-white/10">
        <p className="text-muted-foreground">{payload[0].payload.date}</p>
        <p className="font-medium text-green-400">{`${payload[0].value} ATOM`}</p>
      </div>
    );
  }

  return null;
};

const useRewardsContract = (): IRewardsContract => {
  return {
    claimRewards: async () => {
      // Implementation by smart contract developers
    },
    getRewardsBalance: async () => {
      // Implementation by smart contract developers
      return "0";
    }
  };
};

export default RewardsTracker;
