
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import WalletConnectModal from "@/components/WalletConnectModal";
import { useWallet } from "@/contexts/WalletContext";
import { 
  ArrowUpRight, 
  ArrowRight,
  ArrowRightLeft,
  ExternalLink, 
  Info, 
  Wallet, 
  Repeat, 
  ShieldCheck,
  Timer,
  Coins,
  BadgePercent,
  CornerDownRight,
  AlertTriangle
} from "lucide-react";

const StakePage = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("stake");
  const { toast } = useToast();
  const { wallet, connectKeplr } = useWallet();
  
  const cosmosTokens = [
    { id: "atom", name: "ATOM", icon: "⚛️", apy: "14.2%", network: "Cosmos Hub" },
    { id: "osmo", name: "OSMO", icon: "🌌", apy: "21.4%", network: "Osmosis" },
    { id: "juno", name: "JUNO", icon: "🪐", apy: "18.7%", network: "Juno" },
    { id: "evmos", name: "EVMOS", icon: "🔥", apy: "32.6%", network: "Evmos" },
    { id: "kava", name: "KAVA", icon: "☕", apy: "17.4%", network: "Kava" },
    { id: "scrt", name: "SCRT", icon: "🔒", apy: "16.4%", network: "Secret" },
    { id: "akt", name: "AKT", icon: "☁️", apy: "24.8%", network: "Akash" },
    { id: "usdt", name: "USDT", icon: "💵", apy: "8.2%", network: "IBC-Enabled USDT" },
    { id: "axl-usdc", name: "axlUSDC", icon: "💲", apy: "7.5%", network: "Axelar" },
    { id: "ust", name: "UST", icon: "🌗", apy: "9.8%", network: "Terra Classic" },
    { id: "luna", name: "LUNA", icon: "🌕", apy: "11.2%", network: "Terra" },
    { id: "inj", name: "INJ", icon: "📊", apy: "19.3%", network: "Injective" }
  ];

  const destinationChains = [
    { id: "cosmos", name: "Cosmos Hub", icon: "⚛️" },
    { id: "osmosis", name: "Osmosis", icon: "🌌" },
    { id: "juno", name: "Juno Network", icon: "🪐" },
    { id: "evmos", name: "Evmos", icon: "🔥" },
    { id: "kava", name: "Kava", icon: "☕" },
    { id: "secret", name: "Secret Network", icon: "🔒" },
    { id: "akash", name: "Akash Network", icon: "☁️" },
    { id: "ethereum", name: "Ethereum", icon: "Ξ" },
    { id: "bnb", name: "BNB Chain", icon: "₿" },
    { id: "polygon", name: "Polygon", icon: "⬡" },
    { id: "avalanche", name: "Avalanche", icon: "🔺" },
    { id: "fantom", name: "Fantom", icon: "👻" }
  ];

  const stakeFormSchema = z.object({
    token: z.string().min(1, "Please select a token"),
    amount: z.string().min(1, "Please enter an amount"),
    destination: z.string().min(1, "Please select a destination"),
    stakingPeriod: z.string().min(1, "Please select a staking period"),
    isAutoCompound: z.boolean().default(true),
  });

  const transferFormSchema = z.object({
    sourceChain: z.string().min(1, "Please select a source chain"),
    sourceToken: z.string().min(1, "Please select a token"),
    destinationChain: z.string().min(1, "Please select a destination chain"),
    amount: z.string().min(1, "Please enter an amount"),
    recipientAddress: z.string().min(1, "Please enter a recipient address"),
  });

  const stakeForm = useForm<z.infer<typeof stakeFormSchema>>({
    resolver: zodResolver(stakeFormSchema),
    defaultValues: {
      token: "",
      amount: "",
      destination: "",
      stakingPeriod: "14",
      isAutoCompound: true,
    },
  });

  const transferForm = useForm<z.infer<typeof transferFormSchema>>({
    resolver: zodResolver(transferFormSchema),
    defaultValues: {
      sourceChain: "cosmos",
      sourceToken: "",
      destinationChain: "",
      amount: "",
      recipientAddress: "",
    },
  });

  useEffect(() => {
    // If a source chain is selected, filter available tokens
    if (transferForm.watch("sourceChain")) {
      // In a real app, you would fetch tokens available on that chain
      // For now, we pre-populate with a default token based on the chain
      const chainTokens = cosmosTokens.filter(token => 
        token.network.toLowerCase().includes(transferForm.watch("sourceChain"))
      );
      
      if (chainTokens.length > 0 && !transferForm.watch("sourceToken")) {
        transferForm.setValue("sourceToken", chainTokens[0].id);
      }
    }
  }, [transferForm.watch("sourceChain")]);

  const onSubmitStake = (values: z.infer<typeof stakeFormSchema>) => {
    if (!wallet) {
      setIsWalletModalOpen(true);
      return;
    }

    // In a real app, this would handle the staking action
    toast({
      title: "Staking Initiated",
      description: `Staking ${values.amount} ${values.token} to ${values.destination} for ${values.stakingPeriod} days.`,
    });
    
    console.log("Staking values:", values);
  };

  const onSubmitTransfer = (values: z.infer<typeof transferFormSchema>) => {
    if (!wallet) {
      setIsWalletModalOpen(true);
      return;
    }

    // In a real app, this would handle the IBC transfer
    toast({
      title: "IBC Transfer Initiated",
      description: `Transferring ${values.amount} ${values.sourceToken} from ${values.sourceChain} to ${values.destinationChain}.`,
    });
    
    console.log("Transfer values:", values);
  };

  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  const findTokenById = (id: string) => {
    return cosmosTokens.find(token => token.id === id);
  };

  const handleWalletConnect = (walletId: string) => {
    closeWalletModal();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold mb-2">IBC Staking</h1>
            <p className="text-muted-foreground">Stake Cosmos ecosystem tokens across multiple chains</p>
          </div>
          
          {!wallet ? (
            <Button onClick={openWalletModal} className="cosmic-button">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          ) : (
            <div className="flex items-center bg-muted/30 px-4 py-2 rounded-lg border border-white/5">
              <div className="mr-3 p-2 rounded-full bg-white/10">
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium">{wallet.address.substring(0, 8)}...{wallet.address.substring(wallet.address.length - 4)}</div>
                <div className="text-xs text-muted-foreground">{wallet.chainId}</div>
              </div>
            </div>
          )}
        </div>
        
        <Tabs defaultValue="stake" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6 bg-muted/30">
            <TabsTrigger value="stake">Stake</TabsTrigger>
            <TabsTrigger value="ibc-transfer">IBC Transfer</TabsTrigger>
            <TabsTrigger value="cross-chain">Cross-Chain Stake</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stake" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-xl">Stake Your Assets</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    {!wallet && (
                      <Alert className="mb-6 bg-primary/10 border-primary/30">
                        <Wallet className="h-4 w-4" />
                        <AlertTitle>Wallet connection required</AlertTitle>
                        <AlertDescription>
                          Please connect your Keplr wallet to start staking IBC tokens.
                          <Button 
                            onClick={openWalletModal} 
                            variant="link" 
                            className="text-primary p-0 h-auto ml-2"
                          >
                            Connect now
                          </Button>
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <Form {...stakeForm}>
                      <form onSubmit={stakeForm.handleSubmit(onSubmitStake)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={stakeForm.control}
                            name="token"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Token</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                  disabled={!wallet}
                                >
                                  <FormControl>
                                    <SelectTrigger className="bg-muted/30 border-white/5">
                                      <SelectValue placeholder="Select token" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-card border-white/10">
                                    {cosmosTokens.map((token) => (
                                      <SelectItem key={token.id} value={token.id}>
                                        <div className="flex items-center">
                                          <span className="mr-2">{token.icon}</span>
                                          <span>{token.name}</span>
                                          <span className="ml-2 text-xs text-muted-foreground">({token.network})</span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  Select the token you want to stake
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={stakeForm.control}
                            name="amount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <div className="relative">
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="number"
                                      placeholder="0.00"
                                      className="pr-16 bg-muted/30 border-white/5"
                                      disabled={!wallet}
                                    />
                                  </FormControl>
                                  <Button 
                                    type="button"
                                    variant="ghost" 
                                    size="sm" 
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() => stakeForm.setValue("amount", "100")}
                                    disabled={!wallet}
                                  >
                                    MAX
                                  </Button>
                                </div>
                                <FormDescription>
                                  Available: {wallet ? '100' : '0'} {stakeForm.watch("token") && findTokenById(stakeForm.watch("token"))?.name}
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={stakeForm.control}
                          name="destination"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Destination Chain</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                                disabled={!wallet}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-muted/30 border-white/5">
                                    <SelectValue placeholder="Select destination chain" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-card border-white/10">
                                  {destinationChains.map((chain) => (
                                    <SelectItem key={chain.id} value={chain.id}>
                                      <div className="flex items-center">
                                        <span className="mr-2">{chain.icon}</span>
                                        <span>{chain.name}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Select the destination chain for staking
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={stakeForm.control}
                            name="stakingPeriod"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Staking Period</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                  disabled={!wallet}
                                >
                                  <FormControl>
                                    <SelectTrigger className="bg-muted/30 border-white/5">
                                      <SelectValue placeholder="Select period" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-card border-white/10">
                                    <SelectItem value="0">No lock</SelectItem>
                                    <SelectItem value="7">7 days</SelectItem>
                                    <SelectItem value="14">14 days</SelectItem>
                                    <SelectItem value="21">21 days</SelectItem>
                                    <SelectItem value="28">28 days</SelectItem>
                                    <SelectItem value="90">90 days</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  Choose your preferred locking period
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={stakeForm.control}
                            name="isAutoCompound"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-end space-x-3 space-y-0 rounded-md border border-white/5 bg-muted/30 p-4">
                                <FormControl>
                                  <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={field.onChange}
                                    className="accent-primary h-4 w-4"
                                    disabled={!wallet}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Enable Auto-Compound</FormLabel>
                                  <FormDescription>
                                    Automatically reinvest rewards to maximize returns
                                  </FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className={`w-full py-6 ${wallet ? 'cosmic-button' : 'bg-muted/50 text-muted-foreground hover:bg-muted/50 cursor-not-allowed'}`}
                          onClick={(e) => {
                            if (!wallet) {
                              e.preventDefault();
                              openWalletModal();
                            }
                          }}
                        >
                          {wallet ? (
                            <>
                              <Coins className="mr-2 h-4 w-4" />
                              Stake Now
                            </>
                          ) : (
                            <>
                              <Wallet className="mr-2 h-4 w-4" />
                              Connect Wallet to Stake
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="glass-card h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">Staking Info</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {stakeForm.watch("token") && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-background/30">
                          <div className="text-sm">Selected Token</div>
                          <div className="font-medium flex items-center">
                            {findTokenById(stakeForm.watch("token"))?.icon} {findTokenById(stakeForm.watch("token"))?.name}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-background/30">
                          <div className="text-sm flex items-center">
                            <BadgePercent className="h-3 w-3 mr-1" /> APY
                          </div>
                          <div className="font-medium text-green-400">
                            {findTokenById(stakeForm.watch("token"))?.apy}
                          </div>
                        </div>
                        
                        {stakeForm.watch("stakingPeriod") && (
                          <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-background/30">
                            <div className="text-sm flex items-center">
                              <Timer className="h-3 w-3 mr-1" /> Lock Period
                            </div>
                            <div className="font-medium">
                              {stakeForm.watch("stakingPeriod") === "0" ? "No lock" : `${stakeForm.watch("stakingPeriod")} days`}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-background/30">
                          <div className="text-sm flex items-center">
                            <ArrowUpRight className="h-3 w-3 mr-1" /> Auto-Compound
                          </div>
                          <div className="font-medium">
                            {stakeForm.watch("isAutoCompound") ? "Enabled" : "Disabled"}
                          </div>
                        </div>
                        
                        {stakeForm.watch("amount") && stakeForm.watch("token") && (
                          <div className="p-3 rounded-lg border border-white/5 bg-background/30">
                            <div className="text-sm mb-1">Estimated Rewards (30 days)</div>
                            <div className="font-medium text-green-400 text-xl">
                              {(parseFloat(stakeForm.watch("amount") || "0") * 
                                parseFloat(findTokenById(stakeForm.watch("token"))?.apy.replace("%", "") || "0") / 100 / 12).toFixed(6)} {findTokenById(stakeForm.watch("token"))?.name}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Network Features</h3>
                      
                      <div className="flex items-start space-x-2 text-xs">
                        <ShieldCheck className="h-4 w-4 mt-0.5 text-green-400" />
                        <div>
                          <p className="font-medium">Secure Cross-Chain Bridge</p>
                          <p className="text-muted-foreground">Assets are secured by IBC protocol</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2 text-xs">
                        <Repeat className="h-4 w-4 mt-0.5 text-green-400" />
                        <div>
                          <p className="font-medium">Auto-Compounding</p>
                          <p className="text-muted-foreground">Automatically reinvest rewards</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2 text-xs">
                        <CornerDownRight className="h-4 w-4 mt-0.5 text-green-400" />
                        <div>
                          <p className="font-medium">IBC Transfers</p>
                          <p className="text-muted-foreground">Seamless token transfers between chains</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground border-t border-white/5 pt-4">
                      <p className="flex items-center">
                        <Info className="h-3 w-3 mr-1" />
                        Learn more about <a href="#" className="underline ml-1 flex items-center">IBC Protocol <ExternalLink className="h-3 w-3 ml-1" /></a>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ibc-transfer" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-xl">IBC Token Transfer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!wallet && (
                      <Alert className="mb-6 bg-primary/10 border-primary/30">
                        <Wallet className="h-4 w-4" />
                        <AlertTitle>Wallet connection required</AlertTitle>
                        <AlertDescription>
                          Please connect your Keplr wallet to transfer IBC tokens.
                          <Button 
                            onClick={openWalletModal} 
                            variant="link" 
                            className="text-primary p-0 h-auto ml-2"
                          >
                            Connect now
                          </Button>
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <Form {...transferForm}>
                      <form onSubmit={transferForm.handleSubmit(onSubmitTransfer)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={transferForm.control}
                            name="sourceChain"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Source Chain</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                  disabled={!wallet}
                                >
                                  <FormControl>
                                    <SelectTrigger className="bg-muted/30 border-white/5">
                                      <SelectValue placeholder="Select source chain" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-card border-white/10">
                                    {destinationChains
                                      .filter(chain => ['cosmos', 'osmosis', 'juno', 'evmos', 'kava', 'secret', 'akash'].includes(chain.id))
                                      .map((chain) => (
                                        <SelectItem key={chain.id} value={chain.id}>
                                          <div className="flex items-center">
                                            <span className="mr-2">{chain.icon}</span>
                                            <span>{chain.name}</span>
                                          </div>
                                        </SelectItem>
                                      ))}
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  Select the source chain
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={transferForm.control}
                            name="sourceToken"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Token</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                  disabled={!wallet || !transferForm.watch("sourceChain")}
                                >
                                  <FormControl>
                                    <SelectTrigger className="bg-muted/30 border-white/5">
                                      <SelectValue placeholder="Select token" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-card border-white/10">
                                    {cosmosTokens
                                      .filter(token => token.network.toLowerCase().includes(transferForm.watch("sourceChain")))
                                      .map((token) => (
                                        <SelectItem key={token.id} value={token.id}>
                                          <div className="flex items-center">
                                            <span className="mr-2">{token.icon}</span>
                                            <span>{token.name}</span>
                                          </div>
                                        </SelectItem>
                                      ))}
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  Select the token to transfer
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center">
                            <ArrowRightLeft className="h-5 w-5" />
                          </div>
                        </div>
                        
                        <FormField
                          control={transferForm.control}
                          name="destinationChain"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Destination Chain</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                                disabled={!wallet}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-muted/30 border-white/5">
                                    <SelectValue placeholder="Select destination chain" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-card border-white/10">
                                  {destinationChains
                                    .filter(chain => chain.id !== transferForm.watch("sourceChain"))
                                    .map((chain) => (
                                      <SelectItem key={chain.id} value={chain.id}>
                                        <div className="flex items-center">
                                          <span className="mr-2">{chain.icon}</span>
                                          <span>{chain.name}</span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Select the destination chain
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={transferForm.control}
                          name="amount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Amount</FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="number"
                                    placeholder="0.00"
                                    className="pr-16 bg-muted/30 border-white/5"
                                    disabled={!wallet}
                                  />
                                </FormControl>
                                <Button 
                                  type="button"
                                  variant="ghost" 
                                  size="sm" 
                                  className="absolute right-0 top-0 h-full px-3"
                                  onClick={() => transferForm.setValue("amount", "100")}
                                  disabled={!wallet}
                                >
                                  MAX
                                </Button>
                              </div>
                              <FormDescription>
                                Available: {wallet ? '100' : '0'} {transferForm.watch("sourceToken") && findTokenById(transferForm.watch("sourceToken"))?.name}
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={transferForm.control}
                          name="recipientAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Recipient Address</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="cosmos1..."
                                  className="bg-muted/30 border-white/5"
                                  disabled={!wallet}
                                />
                              </FormControl>
                              <FormDescription>
                                Enter the recipient's address on the destination chain
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className={`w-full py-6 ${wallet ? 'cosmic-button' : 'bg-muted/50 text-muted-foreground hover:bg-muted/50 cursor-not-allowed'}`}
                          onClick={(e) => {
                            if (!wallet) {
                              e.preventDefault();
                              openWalletModal();
                            }
                          }}
                        >
                          {wallet ? (
                            <>
                              <ArrowRightLeft className="mr-2 h-4 w-4" />
                              Transfer Tokens
                            </>
                          ) : (
                            <>
                              <Wallet className="mr-2 h-4 w-4" />
                              Connect Wallet to Transfer
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="glass-card h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">Transfer Info</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {transferForm.watch("sourceToken") && transferForm.watch("destinationChain") && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-background/30">
                          <div className="text-sm">Selected Token</div>
                          <div className="font-medium flex items-center">
                            {findTokenById(transferForm.watch("sourceToken"))?.icon} {findTokenById(transferForm.watch("sourceToken"))?.name}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-background/30">
                          <div className="text-sm">Route</div>
                          <div className="font-medium">
                            {destinationChains.find(c => c.id === transferForm.watch("sourceChain"))?.name} → {destinationChains.find(c => c.id === transferForm.watch("destinationChain"))?.name}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-background/30">
                          <div className="text-sm">Estimated Fee</div>
                          <div className="font-medium">
                            {transferForm.watch("sourceToken") && findTokenById(transferForm.watch("sourceToken")) ? `0.001 ${findTokenById(transferForm.watch("sourceToken"))?.name}` : '0.001 TOKEN'}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-background/30">
                          <div className="text-sm">Estimated Time</div>
                          <div className="font-medium">~30 seconds</div>
                        </div>
                      </div>
                    )}
                    
                    <Alert variant="default" className="bg-card/60 border-yellow-500/30">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <AlertTitle>Transfer Only To Supported Chains</AlertTitle>
                      <AlertDescription className="text-xs text-muted-foreground">
                        Only transfer tokens to chains that support the IBC protocol. Make sure the recipient address is valid on the destination chain.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">IBC Transfer Features</h3>
                      
                      <div className="flex items-start space-x-2 text-xs">
                        <ShieldCheck className="h-4 w-4 mt-0.5 text-green-400" />
                        <div>
                          <p className="font-medium">Secure Protocol</p>
                          <p className="text-muted-foreground">Transfers secured by IBC protocol</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2 text-xs">
                        <Timer className="h-4 w-4 mt-0.5 text-green-400" />
                        <div>
                          <p className="font-medium">Fast Transfers</p>
                          <p className="text-muted-foreground">Complete in seconds, not minutes</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2 text-xs">
                        <Coins className="h-4 w-4 mt-0.5 text-green-400" />
                        <div>
                          <p className="font-medium">Low Fees</p>
                          <p className="text-muted-foreground">Minimal fees for token transfers</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground border-t border-white/5 pt-4">
                      <p className="flex items-center">
                        <Info className="h-3 w-3 mr-1" />
                        Learn more about <a href="#" className="underline ml-1 flex items-center">IBC Transfers <ExternalLink className="h-3 w-3 ml-1" /></a>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="cross-chain" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Cross-Chain Staking</CardTitle>
              </CardHeader>
              <CardContent>
                {!wallet ? (
                  <div className="flex flex-col items-center justify-center p-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                      <Wallet className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-medium">Connect Wallet to Continue</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                      Please connect your Keplr wallet to access Cross-Chain Staking features.
                    </p>
                    <Button 
                      onClick={openWalletModal} 
                      className="cosmic-button mt-4"
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      Connect Wallet
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-12">
                    <div className="text-center space-y-2">
                      <div className="text-5xl mb-4">⚡</div>
                      <h3 className="text-xl font-medium">Cross-Chain Staking Coming Soon</h3>
                      <p className="text-muted-foreground">Stake assets across multiple chains for enhanced returns</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-purple-500/20 text-purple-400">
                  <Coins className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Cosmos Ecosystem</h3>
                  <p className="text-sm text-muted-foreground">12 networks, 25+ tokens</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-green-500/20 text-green-400">
                  <BadgePercent className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Competitive APYs</h3>
                  <p className="text-sm text-muted-foreground">Up to 32% APY</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
                  <ArrowRight className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Fast Transfers</h3>
                  <p className="text-sm text-muted-foreground">IBC transfers in under 30s</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={closeWalletModal}
        onConnect={handleWalletConnect}
      />
    </div>
  );
};

export default StakePage;
