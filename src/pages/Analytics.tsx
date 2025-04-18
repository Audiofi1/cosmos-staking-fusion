import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Info } from "lucide-react";
import WalletConnectModal from '../components/WalletConnectModal';
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';

// Sample data for charts
const volumeData = [
  { name: 'Jan', volume: 4000 },
  { name: 'Feb', volume: 3000 },
  { name: 'Mar', volume: 2000 },
  { name: 'Apr', volume: 2780 },
  { name: 'May', volume: 1890 },
  { name: 'Jun', volume: 2390 },
  { name: 'Jul', volume: 3490 },
];

const tvlData = [
  { name: 'Jan', tvl: 2400 },
  { name: 'Feb', tvl: 1398 },
  { name: 'Mar', tvl: 9800 },
  { name: 'Apr', tvl: 3908 },
  { name: 'May', tvl: 4800 },
  { name: 'Jun', tvl: 3800 },
  { name: 'Jul', tvl: 4300 },
];

const priceData = [
  { name: 'Jan', price: 10 },
  { name: 'Feb', price: 12 },
  { name: 'Mar', price: 8 },
  { name: 'Apr', price: 15 },
  { name: 'May', price: 18 },
  { name: 'Jun', price: 14 },
  { name: 'Jul', price: 20 },
];

const tokenStats = [
  { name: 'ATOM', price: '$12.45', change: 5.2, volume: '$24.5M', tvl: '$120.3M' },
  { name: 'OSMO', price: '$1.23', change: -2.1, volume: '$12.1M', tvl: '$78.5M' },
  { name: 'JUNO', price: '$0.87', change: 3.4, volume: '$5.6M', tvl: '$32.1M' },
  { name: 'SCRT', price: '$0.56', change: 1.2, volume: '$3.2M', tvl: '$18.7M' },
  { name: 'EVMOS', price: '$0.12', change: -4.5, volume: '$1.8M', tvl: '$9.2M' },
];

const Analytics = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { toast } = useToast();

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

  return (
    <div className="min-h-screen">
      <Navbar openWalletModal={openWalletModal} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Analytics</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Volume (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">$45.2M</div>
              <div className="flex items-center text-green-400 text-sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>+12.5% from yesterday</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Value Locked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">$258.8M</div>
              <div className="flex items-center text-red-400 text-sm">
                <ArrowDown className="h-4 w-4 mr-1" />
                <span>-2.3% from yesterday</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Users (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">12,456</div>
              <div className="flex items-center text-green-400 text-sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>+8.7% from yesterday</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Trading Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={volumeData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        borderColor: '#333',
                        color: '#fff'
                      }} 
                    />
                    <Bar dataKey="volume" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Total Value Locked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={tvlData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorTvl" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        borderColor: '#333',
                        color: '#fff'
                      }} 
                    />
                    <Area type="monotone" dataKey="tvl" stroke="#8884d8" fillOpacity={1} fill="url(#colorTvl)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="glass-card mb-6">
          <CardHeader>
            <CardTitle>Token Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="price">
              <TabsList className="grid w-full grid-cols-3 mb-4 bg-muted/30">
                <TabsTrigger value="price">Price</TabsTrigger>
                <TabsTrigger value="volume">Volume</TabsTrigger>
                <TabsTrigger value="tvl">TVL</TabsTrigger>
              </TabsList>
              
              <TabsContent value="price">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={priceData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1a1a1a', 
                          borderColor: '#333',
                          color: '#fff'
                        }} 
                      />
                      <Line type="monotone" dataKey="price" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="volume">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={volumeData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1a1a1a', 
                          borderColor: '#333',
                          color: '#fff'
                        }} 
                      />
                      <Bar dataKey="volume" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="tvl">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={tvlData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorTvl2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1a1a1a', 
                          borderColor: '#333',
                          color: '#fff'
                        }} 
                      />
                      <Area type="monotone" dataKey="tvl" stroke="#82ca9d" fillOpacity={1} fill="url(#colorTvl2)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Token Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4">Token</th>
                    <th className="text-left py-3 px-4">Price</th>
                    <th className="text-left py-3 px-4">24h Change</th>
                    <th className="text-left py-3 px-4">Volume (24h)</th>
                    <th className="text-left py-3 px-4">TVL</th>
                  </tr>
                </thead>
                <tbody>
                  {tokenStats.map((token, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">{token.name}</td>
                      <td className="py-3 px-4">{token.price}</td>
                      <td className="py-3 px-4">
                        <span className={`flex items-center ${token.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {token.change >= 0 ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
                          {Math.abs(token.change)}%
                        </span>
                      </td>
                      <td className="py-3 px-4">{token.volume}</td>
                      <td className="py-3 px-4">{token.tvl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
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

export default Analytics;
