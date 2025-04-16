
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import Index from './pages/Index';
import StakePage from './pages/Stake';
import NotFound from './pages/NotFound';
import { Toaster } from "./components/ui/toaster";

const AppWrapper = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/stake" element={<StakePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default AppWrapper;
