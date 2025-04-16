
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowDown, ArrowRight, ExternalLink, RefreshCw } from "lucide-react";

const Bridge = () => {
  const [fromChain, setFromChain] = useState('cosmos');
  const [toChain, setToChain] = useState('ethereum');
  const [fromToken, setFromToken] = useState('ATOM');
  const [toToken, setToToken] = useState('ETH');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const cosmosTokens = ['ATOM', 'OSMO', 'JUNO', 'KAVA', 'SCRT'];
  const ethereumTokens = ['ETH', 'USDT', 'USDC', 'DAI'];
  const bnbTokens = ['BNB', 'BUSD', 'CAKE'];

  const getTokensForChain = (chain: string) => {
    switch (chain) {
      case 'cosmos': return cosmosTokens;
      case 'ethereum': return ethereumTokens;
      case 'bnb': return bnbTokens;
      default: return [];
    }
  };

  const getTokenIcon = (token: string) => {
    const tokenLower = token.toLowerCase();
    return (
      <div className={`network-icon ${
        cosmosTokens.includes(token) ? 'network-cosmos' : 
        ethereumTokens.includes(token) ? 'network-ethereum' : 
        'network-bnb'
      }`}>
        {token.charAt(0)}
      </div>
    );
  };

  const handleSwapChains = () => {
    if ((fromChain === 'ethereum' || fromChain === 'bnb') && (toChain === 'ethereum' || toChain === 'bnb')) {
      setFromChain(toChain);
      setToChain(fromChain);
      setFromToken(getTokensForChain(toChain)[0]);
      setToToken(getTokensForChain(fromChain)[0]);
    } else if (fromChain === 'cosmos') {
      toast({
        title: "Unsupported Direction",
        description: "You can only bridge from Cosmos to other chains, not vice versa.",
        variant: "destructive",
      });
    }
  };

  const handleFromChainChange = (value: string) => {
    setFromChain(value);
    setFromToken(getTokensForChain(value)[0]);
  };

  const handleToChainChange = (value: string) => {
    setToChain(value);
    setToToken(getTokensForChain(value)[0]);
  };

  const handleBridge = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to bridge.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate bridge operation
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Bridge Initiated",
        description: `Bridging ${amount} ${fromToken} from ${fromChain.charAt(0).toUpperCase() + fromChain.slice(1)} to ${toChain.charAt(0).toUpperCase() + toChain.slice(1)} as ${toToken}.`,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Bridge</h1>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Bridge Tokens</CardTitle>
              <CardDescription>Transfer tokens across chains securely using IBC protocol</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* From Chain and Token Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">From</label>
                  <div className="flex gap-4">
                    <Select value={fromChain} onValueChange={handleFromChainChange}>
                      <SelectTrigger className="w-1/3 bg-card/70">
                        <SelectValue placeholder="Chain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cosmos">Cosmos</SelectItem>
                        <SelectItem value="ethereum">Ethereum</SelectItem>
                        <SelectItem value="bnb">BNB Chain</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={fromToken} onValueChange={setFromToken}>
                      <SelectTrigger className="w-2/3 bg-card/70">
                        <SelectValue placeholder="Token" />
                      </SelectTrigger>
                      <SelectContent>
                        {getTokensForChain(fromChain).map(token => (
                          <SelectItem key={token} value={token}>
                            <div className="flex items-center">
                              {getTokenIcon(token)}
                              <span className="ml-2">{token}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount</label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0.0"
                      className="bg-card/70"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setAmount('1')}
                    >
                      MAX
                    </Button>
                  </div>
                </div>
                
                {/* Direction Switcher */}
                <div className="flex justify-center my-3">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full bg-muted"
                    onClick={handleSwapChains}
                  >
                    <ArrowDown className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* To Chain and Token Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <div className="flex gap-4">
                    <Select value={toChain} onValueChange={handleToChainChange}>
                      <SelectTrigger className="w-1/3 bg-card/70">
                        <SelectValue placeholder="Chain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ethereum">Ethereum</SelectItem>
                        <SelectItem value="bnb">BNB Chain</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={toToken} onValueChange={setToToken}>
                      <SelectTrigger className="w-2/3 bg-card/70">
                        <SelectValue placeholder="Token" />
                      </SelectTrigger>
                      <SelectContent>
                        {getTokensForChain(toChain).map(token => (
                          <SelectItem key={token} value={token}>
                            <div className="flex items-center">
                              {getTokenIcon(token)}
                              <span className="ml-2">{token}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Transaction Details */}
                <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Time</span>
                    <span>3-5 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bridge Fee</span>
                    <span>0.1%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">You Receive</span>
                    <span>{amount ? (parseFloat(amount) * 0.999).toFixed(4) : '0'} {toToken}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="cosmic-button w-full"
                disabled={isLoading || !amount || parseFloat(amount) <= 0}
                onClick={handleBridge}
              >
                {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isLoading ? 'Processing...' : 'Bridge Tokens'}
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-6 p-4 bg-muted/20 rounded-lg">
            <h3 className="font-medium mb-2">Recent Transactions</h3>
            <div className="text-sm text-muted-foreground text-center py-6">
              No recent transactions found
            </div>
          </div>
        </div>
      </main>
      
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-48 h-48 bg-glow-purple opacity-30 rounded-full filter blur-3xl fade-pulse"></div>
        <div className="absolute top-[40%] right-[15%] w-64 h-64 bg-glow-blue opacity-20 rounded-full filter blur-3xl fade-pulse"></div>
      </div>
    </div>
  );
};

export default Bridge;
