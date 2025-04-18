
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Pools from "./pages/Pools";
import Stake from "./pages/Stake";
import Rewards from "./pages/Rewards";
import Bridge from "./pages/Bridge";
import Swap from "./pages/Swap";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import { WalletProvider } from "./contexts/WalletContext";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pools" element={<Pools />} />
            <Route path="/stake" element={<Stake />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/bridge" element={<Bridge />} />
            <Route path="/swap" element={<Swap />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </WalletProvider>
    </QueryClientProvider>
  );
}

export default App;
