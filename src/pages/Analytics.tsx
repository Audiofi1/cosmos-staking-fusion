
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWallet } from "@/contexts/WalletContext";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  AreaChart,
  Area,
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  ArrowUpRight, 
  ArrowDownRight,
  Users,
  Activity,
  Timer,
  Globe,
  ShieldCheck
} from "lucide-react";

// Mock analytics data - in a real app, this would come from an API
const protocolUsageData = [
  { name: 'Apr 1', staking: 1500, transfers: 845, rewards: 320 },
  { name: 'Apr 2', staking: 1680, transfers: 790, rewards: 340 },
  { name: 'Apr 3', staking: 1580, transfers: 890, rewards: 310 },
  { name: 'Apr 4', staking: 1790, transfers: 920, rewards: 370 },
  { name: 'Apr 5', staking: 1820, transfers: 980, rewards: 410 },
  { name: 'Apr 6', staking: 1950, transfers: 1100, rewards: 430 },
  { name: 'Apr 7', staking: 2100, transfers: 1200, rewards: 450 },
  { name: 'Apr 8', staking: 2220, transfers: 1300, rewards: 490 },
  { name: 'Apr 9', staking: 2390, transfers: 1400, rewards: 510 },
  { name: 'Apr 10', staking: 2490, transfers: 1500, rewards: 540 },
  { name: 'Apr 11', staking: 2590, transfers: 1580, rewards: 570 },
  { name: 'Apr 12', staking: 2710, transfers: 1680, rewards: 590 },
  { name: 'Apr 13', staking: 2890, transfers: 1790, rewards: 640 },
  { name: 'Apr 14', staking: 3050, transfers: 1900, rewards: 680 },
];

const tvlData = [
  { name: 'Apr 1', tvl: 5400000 },
  { name: 'Apr 2', tvl: 5450000 },
  { name: 'Apr 3', tvl: 5520000 },
  { name: 'Apr 4', tvl: 5680000 },
  { name: 'Apr 5', tvl: 5830000 },
  { name: 'Apr 6', tvl: 6100000 },
  { name: 'Apr 7', tvl: 6320000 },
  { name: 'Apr 8', tvl: 6580000 },
  { name: 'Apr 9', tvl: 6890000 },
  { name: 'Apr 10', tvl: 7120000 },
  { name: 'Apr 11', tvl: 7350000 },
  { name: 'Apr 12', tvl: 7590000 },
  { name: 'Apr 13', tvl: 7890000 },
  { name: 'Apr 14', tvl: 8200000 },
];

const networkDistributionData = [
  { name: 'Cosmos Hub', value: 42, color: '#8A2BE2' },
  { name: 'Osmosis', value: 28, color: '#FF6B81' },
  { name: 'Juno', value: 18, color: '#2E93fA' },
  { name: 'Akash', value: 12, color: '#66DA26' },
];

const dexActivityData = [
  { name: 'Apr 1', swaps: 1200 },
  { name: 'Apr 2', swaps: 1350 },
  { name: 'Apr 3', swaps: 1480 },
  { name: 'Apr 4', swaps: 1290 },
  { name: 'Apr 5', swaps: 1430 },
  { name: 'Apr 6', swaps: 1580 },
  { name: 'Apr 7', swaps: 1690 },
  { name: 'Apr 8', swaps: 1750 },
  { name: 'Apr 9', swaps: 1890 },
  { name: 'Apr 10', swaps: 2010 },
  { name: 'Apr 11', swaps: 1950 },
  { name: 'Apr 12', swaps: 2100 },
  { name: 'Apr 13', swaps: 2230 },
  { name: 'Apr 14', swaps: 2400 },
];

const formatTVL = (value: number) => {
  return `$${(value / 1000000).toFixed(2)}M`;
};

const formatNumber = (value: number) => {
  return value.toLocaleString();
};

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const isMobile = useIsMobile();
  const { wallet } = useWallet();

  const currentTVL = tvlData[tvlData.length - 1].tvl;
  const previousTVL = tvlData[tvlData.length - 2].tvl;
  const tvlChange = ((currentTVL - previousTVL) / previousTVL) * 100;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-2 mb-6">
          <h1 className="text-3xl font-bold">Protocol Analytics</h1>
          <p className="text-muted-foreground">Comprehensive data insights across the IBC ecosystem</p>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3 sm:w-[400px]'}`}>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="networks">Networks</TabsTrigger>
            <TabsTrigger value="staking">Staking</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            {/* TVL and Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardDescription>Total Value Locked</CardDescription>
                  <CardTitle className="text-2xl flex items-center">
                    {formatTVL(currentTVL)}
                    <span className={`ml-2 flex items-center text-sm ${tvlChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {tvlChange >= 0 ? (
                        <ArrowUpRight className="h-4 w-4 mr-0.5" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-0.5" />
                      )}
                      {Math.abs(tvlChange).toFixed(2)}%
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    24h change: {formatTVL(currentTVL - previousTVL)}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardDescription>Active Users</CardDescription>
                  <CardTitle className="text-2xl flex items-center">
                    94,532
                    <span className="text-green-400 text-sm ml-2 flex items-center">
                      <ArrowUpRight className="h-4 w-4 mr-0.5" /> +12.8%
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    <Users className="inline h-3 w-3 mr-1" /> 3,245 new today
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardDescription>Daily Transactions</CardDescription>
                  <CardTitle className="text-2xl flex items-center">
                    152,387
                    <span className="text-green-400 text-sm ml-2 flex items-center">
                      <ArrowUpRight className="h-4 w-4 mr-0.5" /> +18.4%
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    <Activity className="inline h-3 w-3 mr-1" /> 24h volume: $12.5M
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardDescription>Avg. Finality Time</CardDescription>
                  <CardTitle className="text-2xl flex items-center">
                    6.8s
                    <span className="text-green-400 text-sm ml-2 flex items-center">
                      <ArrowDownRight className="h-4 w-4 mr-0.5" /> -0.3s
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    <Timer className="inline h-3 w-3 mr-1" /> Fast confirmations
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* TVL Chart */}
            <Card className="glass-card mb-6">
              <CardHeader>
                <CardTitle>Total Value Locked (TVL)</CardTitle>
                <CardDescription>14-day trend across all networks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={tvlData}
                      margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    >
                      <defs>
                        <linearGradient id="tvlGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8A2BE2" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8A2BE2" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis 
                        dataKey="name" 
                        interval={isMobile ? 6 : 1} 
                        tick={{ fontSize: 12 }}
                        stroke="#666"
                      />
                      <YAxis 
                        tickFormatter={formatTVL} 
                        tick={{ fontSize: 12 }}
                        stroke="#666"
                      />
                      <Tooltip 
                        formatter={(value) => [formatTVL(value as number), 'TVL']}
                        contentStyle={{ backgroundColor: 'rgba(17, 25, 40, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                        labelStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="tvl" 
                        stroke="#8A2BE2" 
                        fillOpacity={1}
                        fill="url(#tvlGradient)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Protocol Usage Statistics */}
            <Card className="glass-card mb-6">
              <CardHeader>
                <CardTitle>Protocol Usage Statistics</CardTitle>
                <CardDescription>Daily activities across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={protocolUsageData}
                      margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis 
                        dataKey="name" 
                        interval={isMobile ? 6 : 1} 
                        tick={{ fontSize: 12 }}
                        stroke="#666"
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        stroke="#666"
                      />
                      <Tooltip 
                        formatter={(value) => [formatNumber(value as number), 'Operations']}
                        contentStyle={{ backgroundColor: 'rgba(17, 25, 40, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                        labelStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      />
                      <Legend />
                      <Bar dataKey="staking" name="Staking Operations" fill="#8A2BE2" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="transfers" name="IBC Transfers" fill="#FF6B81" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="rewards" name="Rewards Claimed" fill="#66DA26" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Network Distribution & DEX Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Network Distribution</CardTitle>
                  <CardDescription>TVL distribution by network</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={networkDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {networkDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Share']}
                          contentStyle={{ backgroundColor: 'rgba(17, 25, 40, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                          labelStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>DEX Activity</CardTitle>
                  <CardDescription>Daily swap operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={dexActivityData}
                        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis 
                          dataKey="name" 
                          interval={isMobile ? 6 : 1} 
                          tick={{ fontSize: 12 }}
                          stroke="#666"
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          stroke="#666"
                        />
                        <Tooltip 
                          formatter={(value) => [formatNumber(value as number), 'Swaps']}
                          contentStyle={{ backgroundColor: 'rgba(17, 25, 40, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                          labelStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="swaps" 
                          stroke="#2E93fA" 
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Networks Tab */}
          <TabsContent value="networks">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="glass-card mb-6">
                  <CardHeader>
                    <CardTitle>Connected IBC Networks</CardTitle>
                    <CardDescription>Real-time activity across connected chains</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Cosmos Hub", icon: "⚛️", tvl: "$3.42M", txs: "54,321", validators: 175, uptime: "99.98%" },
                        { name: "Osmosis", icon: "🌌", tvl: "$2.28M", txs: "42,756", validators: 150, uptime: "99.95%" },
                        { name: "Juno Network", icon: "🪐", tvl: "$1.48M", txs: "28,319", validators: 125, uptime: "99.92%" },
                        { name: "Akash Network", icon: "☁️", tvl: "$0.98M", txs: "18,452", validators: 100, uptime: "99.89%" }
                      ].map((network, idx) => (
                        <div key={idx} className="p-4 border border-white/5 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full text-2xl flex items-center justify-center bg-white/10">
                                {network.icon}
                              </div>
                              <div>
                                <h3 className="font-medium">{network.name}</h3>
                                <p className="text-sm text-muted-foreground">TVL: {network.tvl}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center text-green-400 mb-1">
                                <Globe className="h-3 w-3 mr-1" />
                                <span className="text-sm">{network.uptime} Uptime</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{network.txs} transactions (24h)</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>IBC Channel Activity</CardTitle>
                    <CardDescription>Transfer volume between chains</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: 'Cosmos-Osmosis', volume: 1245000 },
                            { name: 'Osmosis-Juno', volume: 875000 },
                            { name: 'Cosmos-Juno', volume: 645000 },
                            { name: 'Osmosis-Akash', volume: 420000 },
                            { name: 'Cosmos-Akash', volume: 320000 },
                            { name: 'Juno-Akash', volume: 280000 },
                          ]}
                          margin={{ top: 10, right: 10, left: 20, bottom: 30 }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                          <XAxis 
                            type="number"
                            tick={{ fontSize: 12 }}
                            stroke="#666"
                            tickFormatter={(value) => `$${value / 1000}K`}
                          />
                          <YAxis 
                            dataKey="name" 
                            type="category"
                            tick={{ fontSize: 12 }}
                            stroke="#666"
                            width={120}
                          />
                          <Tooltip 
                            formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Volume']}
                            contentStyle={{ backgroundColor: 'rgba(17, 25, 40, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                            labelStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
                          />
                          <Bar dataKey="volume" fill="#8A2BE2" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="glass-card mb-6">
                  <CardHeader>
                    <CardTitle>Network Security</CardTitle>
                    <CardDescription>Cross-chain security metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <ShieldCheck className="h-4 w-4 text-green-400" />
                          <h4 className="font-medium">Security Score</h4>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-2xl font-bold">98/100</div>
                          <div className="text-sm text-green-400 bg-green-400/10 px-2 py-1 rounded">Excellent</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Security Metrics</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { name: "Validators", value: "550+" },
                            { name: "Slashing Events", value: "2" },
                            { name: "Avg Uptime", value: "99.94%" },
                            { name: "IBC Relayers", value: "48" },
                          ].map((metric, idx) => (
                            <div key={idx} className="p-2 border border-white/5 rounded-lg">
                              <div className="text-xs text-muted-foreground">{metric.name}</div>
                              <div className="font-medium">{metric.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator className="bg-white/10" />
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Recent Security Updates</h4>
                        <div className="space-y-2 text-sm">
                          <div className="p-2 border border-white/5 rounded-lg">
                            <div className="font-medium">IBC Protocol v1.2.3 Upgrade</div>
                            <div className="text-xs text-muted-foreground">3 days ago</div>
                          </div>
                          <div className="p-2 border border-white/5 rounded-lg">
                            <div className="font-medium">Osmosis Chain Security Audit</div>
                            <div className="text-xs text-muted-foreground">1 week ago</div>
                          </div>
                          <div className="p-2 border border-white/5 rounded-lg">
                            <div className="font-medium">Cosmos SDK Patch Release</div>
                            <div className="text-xs text-muted-foreground">2 weeks ago</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Top IBC Tokens</CardTitle>
                    <CardDescription>By transfer volume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { icon: "⚛️", name: "ATOM", price: "$9.85", change: "+2.4%" },
                        { icon: "🌌", name: "OSMO", price: "$0.48", change: "+3.8%" },
                        { icon: "🪐", name: "JUNO", price: "$0.29", change: "+1.6%" },
                        { icon: "☁️", name: "AKT", price: "$1.42", change: "+5.2%" },
                        { icon: "💧", name: "SCRT", price: "$0.58", change: "-0.8%" },
                      ].map((token, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2 border border-white/5 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center space-x-2">
                            <div className="text-2xl">{token.icon}</div>
                            <div className="font-medium">{token.name}</div>
                          </div>
                          <div className="text-right">
                            <div>{token.price}</div>
                            <div className={`text-xs ${token.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                              {token.change}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Staking Tab */}
          <TabsContent value="staking">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="glass-card mb-6">
                  <CardHeader>
                    <CardTitle>Staking Analytics</CardTitle>
                    <CardDescription>Total staked assets and growth metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { date: 'Apr 1', staked: 4500000, delegators: 28500 },
                            { date: 'Apr 2', staked: 4580000, delegators: 29200 },
                            { date: 'Apr 3', staked: 4650000, delegators: 29800 },
                            { date: 'Apr 4', staked: 4720000, delegators: 30500 },
                            { date: 'Apr 5', staked: 4810000, delegators: 31200 },
                            { date: 'Apr 6', staked: 4950000, delegators: 32100 },
                            { date: 'Apr 7', staked: 5120000, delegators: 33000 },
                            { date: 'Apr 8', staked: 5280000, delegators: 33700 },
                            { date: 'Apr 9', staked: 5480000, delegators: 34500 },
                            { date: 'Apr 10', staked: 5620000, delegators: 35200 },
                            { date: 'Apr 11', staked: 5780000, delegators: 36100 },
                            { date: 'Apr 12', staked: 5950000, delegators: 37000 },
                            { date: 'Apr 13', staked: 6080000, delegators: 37800 },
                            { date: 'Apr 14', staked: 6250000, delegators: 38500 },
                          ]}
                          margin={{ top: 10, right: 10, left: 20, bottom: 10 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                          <XAxis 
                            dataKey="date" 
                            interval={isMobile ? 6 : 1} 
                            tick={{ fontSize: 12 }}
                            stroke="#666"
                          />
                          <YAxis 
                            yAxisId="left"
                            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                            tick={{ fontSize: 12 }}
                            stroke="#8A2BE2"
                          />
                          <YAxis 
                            yAxisId="right"
                            orientation="right"
                            tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`}
                            tick={{ fontSize: 12 }}
                            stroke="#FF6B81"
                          />
                          <Tooltip 
                            formatter={(value, name) => {
                              if (name === 'staked') return [`$${Number(value).toLocaleString()}`, 'Total Staked'];
                              if (name === 'delegators') return [Number(value).toLocaleString(), 'Delegators'];
                              return [value, name];
                            }}
                            contentStyle={{ backgroundColor: 'rgba(17, 25, 40, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                            labelStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
                          />
                          <Legend />
                          <Line 
                            yAxisId="left"
                            type="monotone" 
                            dataKey="staked" 
                            name="Total Staked"
                            stroke="#8A2BE2" 
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                          />
                          <Line 
                            yAxisId="right"
                            type="monotone" 
                            dataKey="delegators" 
                            name="Active Delegators"
                            stroke="#FF6B81" 
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Validator Performance</CardTitle>
                    <CardDescription>Top validators by staked assets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Cosmos Sentinel", stake: "$582,450", uptime: "100%", commission: "5%" },
                        { name: "Osmosis Guard", stake: "$487,320", uptime: "99.98%", commission: "8%" },
                        { name: "Juno Validators", stake: "$384,780", uptime: "99.95%", commission: "6%" },
                        { name: "Akash Node", stake: "$298,540", uptime: "99.99%", commission: "7%" },
                        { name: "IBC Staking", stake: "$245,980", uptime: "99.92%", commission: "5%" },
                      ].map((validator, idx) => (
                        <div key={idx} className="p-3 border border-white/5 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">{validator.name}</h4>
                              <p className="text-sm text-muted-foreground">Staked: {validator.stake}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-green-400">{validator.uptime} Uptime</div>
                              <div className="text-sm">{validator.commission} Commission</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="glass-card mb-6">
                  <CardHeader>
                    <CardTitle>Staking Distribution</CardTitle>
                    <CardDescription>By network</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Cosmos Hub', value: 45, color: '#8A2BE2' },
                              { name: 'Osmosis', value: 25, color: '#FF6B81' },
                              { name: 'Juno', value: 18, color: '#2E93fA' },
                              { name: 'Akash', value: 12, color: '#66DA26' },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {networkDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${value}%`, 'Share']}
                            contentStyle={{ backgroundColor: 'rgba(17, 25, 40, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                            labelStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card mb-6">
                  <CardHeader>
                    <CardTitle>Staking Rewards</CardTitle>
                    <CardDescription>Annual reward rates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { icon: "⚛️", name: "ATOM", network: "Cosmos Hub", apy: "14.5%" },
                        { icon: "🌌", name: "OSMO", network: "Osmosis", apy: "21.2%" },
                        { icon: "🪐", name: "JUNO", network: "Juno", apy: "18.8%" },
                        { icon: "☁️", name: "AKT", network: "Akash", apy: "24.6%" },
                      ].map((token, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 border border-white/5 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="flex items-center space-x-2">
                            <div className="text-2xl">{token.icon}</div>
                            <div>
                              <div className="font-medium">{token.name}</div>
                              <div className="text-xs text-muted-foreground">{token.network}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-400">{token.apy}</div>
                            <div className="text-xs text-muted-foreground">APY</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Staking Periods</CardTitle>
                    <CardDescription>Distribution by lock duration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { period: "No Lock", percentage: 15, color: "#e0e0e0" },
                        { period: "7 Days", percentage: 22, color: "#a5d6a7" },
                        { period: "14 Days", percentage: 28, color: "#66bb6a" },
                        { period: "30 Days", percentage: 25, color: "#43a047" },
                        { period: "90+ Days", percentage: 10, color: "#2e7d32" },
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{item.period}</span>
                            <span>{item.percentage}%</span>
                          </div>
                          <div className="w-full bg-muted/30 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${item.percentage}%`, 
                                backgroundColor: item.color
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Background elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-48 h-48 bg-glow-purple opacity-30 rounded-full filter blur-3xl fade-pulse"></div>
          <div className="absolute top-[40%] right-[15%] w-64 h-64 bg-glow-blue opacity-20 rounded-full filter blur-3xl fade-pulse"></div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
