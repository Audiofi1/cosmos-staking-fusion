
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Gift, 
  Clock, 
  ChevronRight, 
  BarChart4, 
  Award, 
  Coins, 
  ArrowDown, 
  ShieldCheck,
  Lock,
  RefreshCw
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Progress } from "@/components/ui/progress";
import WalletConnectModal from '../components/WalletConnectModal';

// Simulated rewards data
const rewardsHistory = [
  { date: '2025-03-15', amount: 12.5 },
  { date: '2025-03-14', amount: 11.8 },
  { date: '2025-03-13', amount: 13.2 },
  { date: '2025-03-12', amount: 10.7 },
  { date: '2025-03-11', amount: 9.8 },
  { date: '2025-03-10', amount: 8.5 },
  { date: '2025-03-09', amount: 7.9 },
  { date: '2025-03-08', amount: 9.3 },
  { date: '2025-03-07', amount: 10.1 },
  { date: '2025-03-06', amount: 11.5 },
  { date: '2025-03-05', amount: 12.8 },
  { date: '2025-03-04', amount: 13.7 },
  { date: '2025-03-03', amount: 14.2 },
  { date: '2025-03-02', amount: 13.5 },
  { date: '2025-03-01', amount: 12.9 },
].map(item => ({
  ...item,
  date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}));

// Simulated positions data
const stakingPositions = [
  {
    id: "pos1",
    pool: "ATOM-OSMO",
    staked: 1520,
    token1: "ATOM",
    token2: "OSMO",
    pendingRewards: 45.8,
    apr: 12.5,
    startDate: "2025-02-15",
    network: "cosmos",
    lockPeriod: 30,
    remainingDays: 12
  },
  {
    id: "pos2",
    pool: "ATOM-JUNO",
    staked: 780,
    token1: "ATOM",
    token2: "JUNO",
    pendingRewards: 18.6,
    apr: 9.7,
    startDate: "2025-03-01",
    network: "cosmos",
    lockPeriod: 14,
    remainingDays: 0
  },
  {
    id: "pos3",
    pool: "OSMO-KAVA",
    staked: 650,
    token1: "OSMO",
    token2: "KAVA",
    pendingRewards: 24.3,
    apr: 14.2,
    startDate: "2025-03-10",
    network: "cosmos",
    lockPeriod: 7,
    remainingDays: 2
  }
];

// Calculate totals
const totalStaked = stakingPositions.reduce((sum, pos) => sum + pos.staked, 0);
const totalPendingRewards = stakingPositions.reduce((sum, pos) => sum + pos.pendingRewards, 0);
const totalClaimedRewards = 248.75; // Simulated total claimed rewards

const Rewards = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isClaimingAll, setIsClaimingAll] = useState(false);
  const [isClaimingPosition, setIsClaimingPosition] = useState<string | null>(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

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

  const handleClaimAll = () => {
    setIsClaimingAll(true);
    
    // Simulate claim operation
    setTimeout(() => {
      setIsClaimingAll(false);
      toast({
        title: "Rewards Claimed",
        description: `Successfully claimed ${totalPendingRewards.toFixed(2)} tokens.`,
      });
    }, 2000);
  };

  const handleClaimPosition = (positionId: string, amount: number) => {
    setIsClaimingPosition(positionId);
    
    // Simulate claim operation
    setTimeout(() => {
      setIsClaimingPosition(null);
      toast({
        title: "Position Rewards Claimed",
        description: `Successfully claimed ${amount.toFixed(2)} tokens from position.`,
      });
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Mobile-friendly position card
  const PositionCard = ({ position }: { position: typeof stakingPositions[0] }) => (
    <Card className="glass-card mb-4 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-medium flex items-center">
              <div className="flex -space-x-2 mr-2">
                <div className={`network-icon network-${position.network}`}>{position.token1.charAt(0)}</div>
                <div className={`network-icon network-${position.network}`}>{position.token2.charAt(0)}</div>
              </div>
              {position.pool}
            </h3>
            <p className="text-sm text-muted-foreground">
              Staked on {formatDate(position.startDate)}
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <ShieldCheck className="h-4 w-4 text-crossflip-green" />
            <span className="text-sm font-medium text-crossflip-green">
              {position.apr}% APR
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Staked Amount</p>
            <p className="text-lg font-medium">${position.staked.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pending Rewards</p>
            <p className="text-lg font-medium">${position.pendingRewards.toFixed(2)}</p>
          </div>
        </div>
        
        {position.remainingDays > 0 ? (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center">
                <Lock className="h-3 w-3 mr-1" />
                Lock Period
              </span>
              <span>{position.remainingDays} days remaining</span>
            </div>
            <Progress value={(position.lockPeriod - position.remainingDays) / position.lockPeriod * 100} className="h-2" />
          </div>
        ) : (
          <div className="mb-4">
            <p className="text-sm text-crossflip-green">
              <span className="inline-block h-2 w-2 rounded-full bg-crossflip-green mr-2"></span>
              Unlocked and ready to withdraw
            </p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            className="cosmic-button w-full transition-all duration-300"
            disabled={isClaimingPosition === position.id || position.pendingRewards === 0}
            onClick={() => handleClaimPosition(position.id, position.pendingRewards)}
          >
            {isClaimingPosition === position.id ? 
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : 
              <Award className="mr-2 h-4 w-4" />
            }
            Claim Rewards
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-white/20"
            disabled={position.remainingDays > 0}
          >
            <ArrowDown className="mr-2 h-4 w-4" />
            Withdraw
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      <Navbar openWalletModal={openWalletModal} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Rewards</h1>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3 sm:w-[400px]'}`}>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="positions">Positions</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardDescription>Total Staked</CardDescription>
                  <CardTitle className="text-2xl flex items-center">
                    ${totalStaked.toLocaleString()}
                    <Coins className="ml-2 h-5 w-5 text-crossflip-yellow" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Across {stakingPositions.length} active positions
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardDescription>Pending Rewards</CardDescription>
                  <CardTitle className="text-2xl flex items-center">
                    ${totalPendingRewards.toLocaleString()}
                    <Gift className="ml-2 h-5 w-5 text-crossflip-green" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="cosmic-button w-full transition-all duration-300"
                    disabled={isClaimingAll || totalPendingRewards === 0}
                    onClick={handleClaimAll}
                  >
                    {isClaimingAll ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Award className="mr-2 h-4 w-4" />}
                    {isClaimingAll ? 'Claiming...' : 'Claim All Rewards'}
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardDescription>Total Claimed</CardDescription>
                  <CardTitle className="text-2xl flex items-center">
                    ${totalClaimedRewards.toLocaleString()}
                    <BarChart4 className="ml-2 h-5 w-5 text-crossflip-blue" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Lifetime rewards claimed
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Rewards Overview</CardTitle>
                <CardDescription>15-day rewards history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`${isMobile ? 'h-60' : 'h-80'}`}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={rewardsHistory}
                      margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                    >
                      <defs>
                        <linearGradient id="rewardsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#9B30FF" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#9B30FF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#888" 
                        tick={{ fontSize: isMobile ? 10 : 12 }}
                        tickMargin={8}
                        height={40}
                        interval={isMobile ? 2 : 0}
                      />
                      <YAxis 
                        stroke="#888" 
                        tick={{ fontSize: isMobile ? 10 : 12 }}
                        tickMargin={8}
                        width={40}
                      />
                      <RechartsTooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(45, 38, 82, 0.9)', 
                          borderColor: 'rgba(156, 163, 175, 0.3)',
                          color: 'white' 
                        }} 
                        formatter={(value: any) => ['$' + value, 'Rewards']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#9B30FF" 
                        fillOpacity={1} 
                        fill="url(#rewardsGradient)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Positions Tab */}
          <TabsContent value="positions">
            <div className="space-y-6">
              {stakingPositions.length === 0 ? (
                <Card className="glass-card p-8 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <Coins className="h-16 w-16 text-muted-foreground" />
                    <h3 className="text-xl font-medium">No Active Positions</h3>
                    <p className="text-muted-foreground">
                      You don't have any active staking positions yet.
                    </p>
                    <Button className="cosmic-button mt-2 transition-all duration-300">
                      Stake Now
                    </Button>
                  </div>
                </Card>
              ) : isMobile ? (
                stakingPositions.map(position => (
                  <PositionCard key={position.id} position={position} />
                ))
              ) : (
                stakingPositions.map(position => (
                  <Card key={position.id} className="glass-card overflow-hidden mb-4 hover:bg-white/5 transition-colors">
                    <div className="flex flex-col lg:flex-row">
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-medium flex items-center">
                              <div className="flex -space-x-2 mr-2">
                                <div className={`network-icon network-${position.network}`}>{position.token1.charAt(0)}</div>
                                <div className={`network-icon network-${position.network}`}>{position.token2.charAt(0)}</div>
                              </div>
                              {position.pool}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Staked on {formatDate(position.startDate)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ShieldCheck className="h-4 w-4 text-crossflip-green" />
                            <span className="text-sm font-medium text-crossflip-green">
                              {position.apr}% APR
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Staked Amount</p>
                            <p className="text-lg font-medium">${position.staked.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Pending Rewards</p>
                            <p className="text-lg font-medium">${position.pendingRewards.toFixed(2)}</p>
                          </div>
                        </div>
                        
                        {position.remainingDays > 0 ? (
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="flex items-center">
                                <Lock className="h-3 w-3 mr-1" />
                                Lock Period
                              </span>
                              <span>{position.remainingDays} days remaining</span>
                            </div>
                            <Progress value={(position.lockPeriod - position.remainingDays) / position.lockPeriod * 100} className="h-2" />
                          </div>
                        ) : (
                          <div className="mb-4">
                            <p className="text-sm text-crossflip-green">
                              <span className="inline-block h-2 w-2 rounded-full bg-crossflip-green mr-2"></span>
                              Unlocked and ready to withdraw
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="bg-muted/30 p-6 flex flex-col justify-center space-y-3 lg:w-56">
                        <Button 
                          className="cosmic-button w-full transition-all duration-300"
                          disabled={isClaimingPosition === position.id || position.pendingRewards === 0}
                          onClick={() => handleClaimPosition(position.id, position.pendingRewards)}
                        >
                          {isClaimingPosition === position.id ? 
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : 
                            <Award className="mr-2 h-4 w-4" />
                          }
                          Claim Rewards
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="w-full border-white/20"
                          disabled={position.remainingDays > 0}
                        >
                          <ArrowDown className="mr-2 h-4 w-4" />
                          Withdraw
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          {/* History Tab */}
          <TabsContent value="history">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Rewards History</CardTitle>
                <CardDescription>Your past rewards and claims</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/10 pb-4 last:border-0">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/20 p-2 rounded-full">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Reward Claimed</p>
                          <p className="text-sm text-muted-foreground">From {['ATOM-OSMO', 'ATOM-JUNO', 'OSMO-KAVA'][i % 3]} pool</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(Math.random() * 50 + 10).toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(Date.now() - (i + 1) * 86400000 * 2).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4 border-white/20 transition-colors hover:bg-white/10">
                  <Clock className="mr-2 h-4 w-4" />
                  View All History
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-48 h-48 bg-glow-purple opacity-30 rounded-full filter blur-3xl fade-pulse"></div>
        <div className="absolute top-[40%] right-[15%] w-64 h-64 bg-glow-blue opacity-20 rounded-full filter blur-3xl fade-pulse"></div>
      </div>

      {/* Wallet Connect Modal */}
      <WalletConnectModal 
        isOpen={isWalletModalOpen}
        onClose={closeWalletModal}
        onConnect={handleWalletConnect}
      />
    </div>
  );
};

export default Rewards;
