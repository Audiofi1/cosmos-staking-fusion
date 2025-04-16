
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X, Wallet, Bell, Settings } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Navbar = ({ openWalletModal }: { openWalletModal: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 rounded-full bg-button-gradient flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">OP</span>
              </div>
              <span className="text-white font-bold text-xl">Omnia Protocol</span>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link 
                  to="/" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/') ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/swap" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/swap') ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Swap
                </Link>
                <Link 
                  to="/bridge" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/bridge') ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Bridge
                </Link>
                <Link 
                  to="/pools" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/pools') ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Pools
                </Link>
                <Link 
                  to="/stake" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/stake') ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Stake
                </Link>
                <Link 
                  to="/rewards" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/rewards') ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Rewards
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-white/70 hover:text-white px-3 py-2 rounded-md text-sm font-medium inline-flex items-center">
                    <span>More</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-card border-white/10 text-foreground">
                    <DropdownMenuItem className="cursor-pointer hover:bg-white/10">Analytics</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-white/10">Documentation</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-white/10">Governance</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
                <Bell size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
                <Settings size={20} />
              </Button>
              <Button 
                className="cosmic-button px-4 py-2 text-white" 
                onClick={openWalletModal}
              >
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={toggleMobileMenu}
              className="text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            <Button 
              className="cosmic-button ml-4 px-3 py-1.5 text-white" 
              onClick={openWalletModal}
            >
              <Wallet className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-card py-2 px-4">
          <div className="flex flex-col space-y-1">
            <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/') ? 'text-white' : 'text-white/70'}`}>
              Dashboard
            </Link>
            <Link to="/swap" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/swap') ? 'text-white' : 'text-white/70'}`}>
              Swap
            </Link>
            <Link to="/bridge" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/bridge') ? 'text-white' : 'text-white/70'}`}>
              Bridge
            </Link>
            <Link to="/pools" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/pools') ? 'text-white' : 'text-white/70'}`}>
              Pools
            </Link>
            <Link to="/stake" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/stake') ? 'text-white' : 'text-white/70'}`}>
              Stake
            </Link>
            <Link to="/rewards" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/rewards') ? 'text-white' : 'text-white/70'}`}>
              Rewards
            </Link>
            <a href="#" className="text-white/70 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Analytics</a>
            <a href="#" className="text-white/70 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Documentation</a>
            <a href="#" className="text-white/70 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Governance</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
