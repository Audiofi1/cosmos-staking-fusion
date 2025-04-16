
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress"; 
import { 
  ChevronUp, 
  ChevronDown, 
  Info, 
  Star, 
  Percent, 
  TrendingUp, 
  TrendingDown,
  Plus
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import StakingModal from '../components/StakingModal';

// Simulated pool data
const poolsData = [
  {
    id: "atom-osmo",
    name: "ATOM-OSMO",
    token1: "ATOM",
    token2: "OSMO",
    liquidity: 89562344,
    marketCap: 452896000,
    volume24h: 12456987,
    change24h: 3.2,
    apr: 12.5,
    network: "cosmos"
  },
  {
    id: "atom-juno",
    name: "ATOM-JUNO",
    token1: "ATOM",
    token2: "JUNO",
    liquidity: 34567890,
    marketCap: 267531000,
    volume24h: 7863542,
    change24h: -1.8,
    apr: 9.7,
    network: "cosmos"
  },
  {
    id: "osmo-kava",
    name: "OSMO-KAVA",
    token1: "OSMO",
    token2: "KAVA",
    liquidity: 23489675,
    marketCap: 156732000,
    volume24h: 4765321,
    change24h: 5.6,
    apr: 14.2,
    network: "cosmos"
  },
  {
    id: "juno-scrt",
    name: "JUNO-SCRT",
    token1: "JUNO",
    token2: "SCRT",
    liquidity: 16784532,
    marketCap: 98572000,
    volume24h: 3218765,
    change24h: 2.3,
    apr: 8.9,
    network: "cosmos"
  },
  {
    id: "atom-scrt",
    name: "ATOM-SCRT",
    token1: "ATOM",
    token2: "SCRT",
    liquidity: 12456789,
    marketCap: 78954000,
    volume24h: 2134567,
    change24h: -0.7,
    apr: 7.5,
    network: "cosmos"
  },
  {
    id: "kava-hard",
    name: "KAVA-HARD",
    token1: "KAVA",
    token2: "HARD",
    liquidity: 8765432,
    marketCap: 45678000,
    volume24h: 1234567,
    change24h: 1.5,
    apr: 11.3,
    network: "cosmos"
  },
];

const Pools = () => {
  const [sortField, setSortField] = useState('liquidity');
  const [sortDirection, setSortDirection] = useState('desc');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isStakingModalOpen, setIsStakingModalOpen] = useState(false);
  const [selectedPoolId, setSelectedPoolId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const toggleFavorite = (poolId: string) => {
    if (favorites.includes(poolId)) {
      setFavorites(favorites.filter(id => id !== poolId));
    } else {
      setFavorites([...favorites, poolId]);
      toast({
        title: "Added to Favorites",
        description: "Pool has been added to your favorites.",
      });
    }
  };

  const openStakeModal = (poolId: string) => {
    setSelectedPoolId(poolId);
    setIsStakingModalOpen(true);
  };

  const closeStakeModal = () => {
    setIsStakingModalOpen(false);
    setSelectedPoolId(null);
  };

  // Filter and sort pools
  const filteredPools = poolsData
    .filter(pool => {
      if (showFavoritesOnly) return favorites.includes(pool.id);
      if (searchTerm) {
        return pool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               pool.token1.toLowerCase().includes(searchTerm.toLowerCase()) ||
               pool.token2.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'change24h') {
        comparison = a.change24h - b.change24h;
      } else {
        // @ts-ignore - dynamic property access
        comparison = a[sortField] - b[sortField];
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    } else {
      return `$${value.toFixed(2)}`;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Liquidity Pools</h1>
        </div>
        
        <Card className="glass-card">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div>
                <CardTitle>Cosmos IBC Pools</CardTitle>
                <CardDescription>View and stake in liquidity pools</CardDescription>
              </div>
              <div className="flex space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search pools..."
                    className="w-full md:w-64 h-10 pl-3 pr-10 rounded-md bg-card/50 border border-white/10 text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-white/20 ${showFavoritesOnly ? 'bg-white/10' : ''}`}
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                >
                  <Star className={`h-4 w-4 mr-1 ${showFavoritesOnly ? 'text-crossflip-yellow fill-crossflip-yellow' : ''}`} />
                  {showFavoritesOnly ? 'All Pools' : 'Favorites'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-10"></TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                      Pool {sortField === 'name' && (
                        sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />
                      )}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('liquidity')}>
                      Liquidity {sortField === 'liquidity' && (
                        sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />
                      )}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('marketCap')}>
                      Market Cap {sortField === 'marketCap' && (
                        sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />
                      )}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('volume24h')}>
                      Volume (24h) {sortField === 'volume24h' && (
                        sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />
                      )}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('change24h')}>
                      Change (24h) {sortField === 'change24h' && (
                        sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />
                      )}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('apr')}>
                      APR {sortField === 'apr' && (
                        sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />
                      )}
                    </TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPools.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6">
                        No pools match your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPools.map(pool => (
                      <TableRow key={pool.id} className="hover:bg-white/5">
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8" 
                            onClick={() => toggleFavorite(pool.id)}
                          >
                            <Star 
                              className={`h-4 w-4 ${favorites.includes(pool.id) ? 'text-crossflip-yellow fill-crossflip-yellow' : ''}`} 
                            />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="flex -space-x-2">
                              <div className={`network-icon network-${pool.network}`}>{pool.token1.charAt(0)}</div>
                              <div className={`network-icon network-${pool.network}`}>{pool.token2.charAt(0)}</div>
                            </div>
                            <span className="font-medium">{pool.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{formatCurrency(pool.liquidity)}</TableCell>
                        <TableCell>{formatCurrency(pool.marketCap)}</TableCell>
                        <TableCell>{formatCurrency(pool.volume24h)}</TableCell>
                        <TableCell>
                          <span className={`flex items-center ${pool.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {pool.change24h >= 0 ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
                            {Math.abs(pool.change24h)}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <span className="text-primary-foreground font-medium">{pool.apr}%</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs">Annual Percentage Rate based on current pool activity</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <Progress value={pool.apr * 5} className="h-1 mt-1" />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            size="sm" 
                            className="cosmic-button"
                            onClick={() => openStakeModal(pool.id)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Stake
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
      
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-48 h-48 bg-glow-purple opacity-30 rounded-full filter blur-3xl fade-pulse"></div>
        <div className="absolute top-[40%] right-[15%] w-64 h-64 bg-glow-blue opacity-20 rounded-full filter blur-3xl fade-pulse"></div>
      </div>
      
      {/* Staking Modal */}
      <StakingModal 
        isOpen={isStakingModalOpen}
        onClose={closeStakeModal}
        poolId={selectedPoolId}
      />
    </div>
  );
};

export default Pools;
