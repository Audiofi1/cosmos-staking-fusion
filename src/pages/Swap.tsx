
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowDown, 
  RefreshCw, 
  Settings, 
  ChevronDown, 
  BarChart3,
  Zap
} from "lucide-react";

// Token data
const tokens = [
  { symbol: 'ATOM', name: 'Cosmos', chain: 'cosmos', price: 8.42, balance: 12.5 },
  { symbol: 'OSMO', name: 'Osmosis', chain: 'cosmos', price: 0.42, balance: 235.8 },
  { symbol: 'JUNO', name: 'Juno', chain: 'cosmos', price: 0.31, balance: 78.2 },
  { symbol: 'KAVA', name: 'Kava', chain: 'cosmos', price: 0.65, balance: 125.4 },
  { symbol: 'SCRT', name: 'Secret', chain: 'cosmos', price: 0.21, balance: 467.3 },
  { symbol: 'ETH', name: 'Ethereum', chain: 'ethereum', price: 3250.75, balance: 0.125 },
  { symbol: 'USDT', name: 'Tether', chain: 'ethereum', price: 1.00, balance: 500.0 },
  { symbol: 'USDC', name: 'USD Coin', chain: 'ethereum', price: 1.00, balance: 750.0 },
  { symbol: 'DAI', name: 'Dai', chain: 'ethereum', price: 1.00, balance: 325.0 },
  { symbol: 'BNB', name: 'BNB', chain: 'bnb', price: 520.35, balance: 0.75 },
  { symbol: 'BUSD', name: 'Binance USD', chain: 'bnb', price: 1.00, balance: 450.0 },
  { symbol: 'CAKE', name: 'PancakeSwap', chain: 'bnb', price: 2.15, balance: 42.5 },
];

const Swap = () => {
  const [fromToken, setFromToken] = useState('ATOM');
  const [toToken, setToToken] = useState('ETH');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [slippageTolerance, setSlippageTolerance] = useState('0.5');
  const { toast } = useToast();

  // Calculate the exchange rate and converted amount when inputs change
  useEffect(() => {
    if (fromAmount && !isNaN(parseFloat(fromAmount))) {
      const fromTokenData = tokens.find(t => t.symbol === fromToken);
      const toTokenData = tokens.find(t => t.symbol === toToken);
      
      if (fromTokenData && toTokenData) {
        const exchangeRate = fromTokenData.price / toTokenData.price;
        const convertedAmount = parseFloat(fromAmount) * exchangeRate;
        setToAmount(convertedAmount.toFixed(6));
      }
    } else {
      setToAmount('');
    }
  }, [fromAmount, fromToken, toToken]);

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    
    // Reset amounts
    setFromAmount('');
    setToAmount('');
  };

  const getTokenIcon = (symbol: string) => {
    const token = tokens.find(t => t.symbol === symbol);
    if (!token) return null;
    
    const chainClass = token.chain === 'cosmos' ? 'network-cosmos' : 
                       token.chain === 'ethereum' ? 'network-ethereum' : 
                       'network-bnb';
    
    return (
      <div className={`network-icon ${chainClass}`}>
        {symbol.charAt(0)}
      </div>
    );
  };

  const handleSwap = () => {
    const fromTokenData = tokens.find(t => t.symbol === fromToken);
    
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to swap.",
        variant: "destructive",
      });
      return;
    }
    
    if (fromTokenData && parseFloat(fromAmount) > fromTokenData.balance) {
      toast({
        title: "Insufficient Balance",
        description: `You don't have enough ${fromToken} to complete this swap.`,
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate swap operation
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Swap Successful",
        description: `Swapped ${fromAmount} ${fromToken} for ${toAmount} ${toToken}.`,
      });
      
      // Reset form
      setFromAmount('');
      setToAmount('');
    }, 2000);
  };

  const getTokenBalance = (symbol: string) => {
    const token = tokens.find(t => t.symbol === symbol);
    return token ? token.balance : 0;
  };

  const handleFromAmountMax = () => {
    const balance = getTokenBalance(fromToken);
    setFromAmount(balance.toString());
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Swap</h1>
        </div>
        
        <div className="max-w-lg mx-auto">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Swap Tokens</CardTitle>
                  <CardDescription>Swap between Cosmos IBC, Ethereum and BNB tokens</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              
              {showSettings && (
                <div className="mt-4 bg-muted/20 p-3 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Slippage Tolerance</h4>
                  <div className="flex items-center gap-2">
                    {['0.1', '0.5', '1.0'].map(value => (
                      <Button
                        key={value}
                        variant="outline"
                        size="sm"
                        className={`px-3 py-1 ${slippageTolerance === value ? 'bg-primary text-white' : 'bg-transparent border-white/20'}`}
                        onClick={() => setSlippageTolerance(value)}
                      >
                        {value}%
                      </Button>
                    ))}
                    <div className="relative flex items-center">
                      <Input
                        type="number"
                        value={slippageTolerance}
                        onChange={(e) => setSlippageTolerance(e.target.value)}
                        className="w-16 h-8 pl-2 pr-6 py-1 bg-card/50"
                      />
                      <span className="absolute right-2 text-xs">%</span>
                    </div>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {/* From Token Selection */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">From</label>
                  <span className="text-xs text-muted-foreground">
                    Balance: {getTokenBalance(fromToken)} {fromToken}
                  </span>
                </div>
                <div className="bg-card/50 rounded-lg p-3">
                  <div className="flex gap-2">
                    <Select value={fromToken} onValueChange={setFromToken}>
                      <SelectTrigger className="bg-transparent border-0 shadow-none h-12 w-36">
                        <SelectValue>
                          <div className="flex items-center gap-2">
                            {getTokenIcon(fromToken)}
                            <span>{fromToken}</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {tokens.map(token => (
                          <SelectItem 
                            key={token.symbol} 
                            value={token.symbol}
                            disabled={token.symbol === toToken}
                          >
                            <div className="flex items-center gap-2">
                              {getTokenIcon(token.symbol)}
                              <div>
                                <span>{token.symbol}</span>
                                <span className="text-xs text-muted-foreground block">
                                  {token.name}
                                </span>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="flex-1 relative">
                      <Input
                        type="number"
                        placeholder="0.0"
                        className="bg-transparent border-0 shadow-none h-12 text-right text-lg"
                        value={fromAmount}
                        onChange={(e) => setFromAmount(e.target.value)}
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 text-xs"
                        onClick={handleFromAmountMax}
                      >
                        MAX
                      </Button>
                    </div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground mt-1">
                    ~${fromAmount ? (parseFloat(fromAmount) * tokens.find(t => t.symbol === fromToken)!.price).toFixed(2) : '0.00'}
                  </div>
                </div>
              </div>
              
              {/* Swap Button */}
              <div className="flex justify-center -my-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full bg-muted h-8 w-8 border border-white/10 shadow-md"
                  onClick={handleSwapTokens}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>
              
              {/* To Token Selection */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">To</label>
                  <span className="text-xs text-muted-foreground">
                    Balance: {getTokenBalance(toToken)} {toToken}
                  </span>
                </div>
                <div className="bg-card/50 rounded-lg p-3">
                  <div className="flex gap-2">
                    <Select value={toToken} onValueChange={setToToken}>
                      <SelectTrigger className="bg-transparent border-0 shadow-none h-12 w-36">
                        <SelectValue>
                          <div className="flex items-center gap-2">
                            {getTokenIcon(toToken)}
                            <span>{toToken}</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {tokens.map(token => (
                          <SelectItem 
                            key={token.symbol} 
                            value={token.symbol}
                            disabled={token.symbol === fromToken}
                          >
                            <div className="flex items-center gap-2">
                              {getTokenIcon(token.symbol)}
                              <div>
                                <span>{token.symbol}</span>
                                <span className="text-xs text-muted-foreground block">
                                  {token.name}
                                </span>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="flex-1">
                      <Input
                        type="text"
                        placeholder="0.0"
                        className="bg-transparent border-0 shadow-none h-12 text-right text-lg"
                        value={toAmount}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground mt-1">
                    ~${toAmount ? (parseFloat(toAmount) * tokens.find(t => t.symbol === toToken)!.price).toFixed(2) : '0.00'}
                  </div>
                </div>
              </div>
              
              {/* Swap Details */}
              {fromAmount && toAmount && (
                <div className="bg-muted/20 rounded-lg p-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Exchange Rate</span>
                    <span>1 {fromToken} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)} {toToken}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Slippage Tolerance</span>
                    <span>{slippageTolerance}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network Fee</span>
                    <span>~$0.15</span>
                  </div>
                </div>
              )}
              
              {/* Route Details Button */}
              {fromAmount && toAmount && (
                <Button 
                  variant="ghost" 
                  className="w-full text-muted-foreground border border-white/10"
                  size="sm"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Route Details
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                className="cosmic-button w-full relative overflow-hidden"
                disabled={isLoading || !fromAmount || parseFloat(fromAmount) <= 0}
                onClick={handleSwap}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Swapping...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Swap Tokens
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <div className="flex justify-center mt-4">
            <Button variant="link" className="text-sm text-muted-foreground">
              Need help? View the Swap Guide
            </Button>
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

export default Swap;
