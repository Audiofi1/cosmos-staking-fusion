
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StakePage from "./pages/Stake";
import Bridge from "./pages/Bridge";
import Pools from "./pages/Pools";
import Rewards from "./pages/Rewards";
import Swap from "./pages/Swap";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/stake" element={<StakePage />} />
          <Route path="/bridge" element={<Bridge />} />
          <Route path="/pools" element={<Pools />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
