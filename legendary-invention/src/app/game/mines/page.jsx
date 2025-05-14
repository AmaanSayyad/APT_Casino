"use client";
import React, { useState, useEffect, useMemo } from "react";
import Button from "@/components/Button";
import Tabs from "@/components/Tabs";
import DynamicForm from "./Form";
import Game from "./game";
import GameDetail from "@/components/GameDetail";
import MinesBettingTable from "./components/MinesBettingTable.jsx";
import MinesProbability from "./components/MinesProbability.jsx";
import MinesHistory from "./components/MinesHistory.jsx";
import { gameData, bettingTableData, gameStatistics, recentBigWins, winProbabilities } from "./config/gameDetail.jsx";
import { manualFormConfig, autoFormConfig } from "./config/formConfig.jsx";
import { FaCrown, FaHistory, FaTrophy, FaInfoCircle, FaChartLine, FaFireAlt, FaBomb } from "react-icons/fa";
import { GiMining, GiDiamonds, GiCardRandom, GiMineExplosion, GiCrystalGrowth } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import useWalletStatus from '@/hooks/useWalletStatus';
import ConnectWalletButton from '@/components/ConnectWalletButton';

export default function Mines() {
  // Game State
  const [betSettings, setBetSettings] = useState({});
  const [activeTab, setActiveTab] = useState("Manual");
  const [gameInstance, setGameInstance] = useState(1); // Force re-render on new game
  
  // Wallet connection
  const { isConnected, address } = useWalletStatus();
  
  // Theme
  const { theme } = useTheme();
  
  // Handle betting form submission
  const handleFormSubmit = (formData) => {
    const isAutoBetting = activeTab === "Auto";
    
    // Update bet settings which will be passed to the game component
    setBetSettings({
      ...formData,
      isAutoBetting
    });
    
    // Force game component to re-render with new settings
    setGameInstance(prev => prev + 1);
  };

  // Tab configuration - memoized to prevent unnecessary re-renders
  const tabs = useMemo(() => [
    {
      label: "Manual",
      content: (
        <DynamicForm config={manualFormConfig} onSubmit={handleFormSubmit} />
      ),
    },
    {
      label: "Auto",
      content: (
        <DynamicForm config={autoFormConfig} onSubmit={handleFormSubmit} />
      ),
    },
  ], []);

  // Handle tab change
  const handleTabChange = (tabLabel) => {
    setActiveTab(tabLabel);
  };

  // Header Section
  const renderHeader = () => (
    <div className="relative text-white px-4 md:px-8 lg:px-20 mb-8">
      {/* Background Elements */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-0 left-1/3 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-20 left-1/4 w-48 h-48 bg-pink-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <div className="flex items-center">
              <div className="mr-3 p-3 bg-gradient-to-br from-purple-900/40 to-purple-700/10 rounded-lg shadow-lg shadow-purple-900/10 border border-purple-800/20">
                <GiMineExplosion className="text-3xl text-purple-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-400">Games / Mines</p>
                  <span className="text-xs px-2 py-0.5 bg-purple-900/30 rounded-full text-purple-300">Popular</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Mines</h1>
              </div>
            </div>
            <p className="text-white/70 mt-2 max-w-xl">
              Unearth hidden gems while avoiding mines. Higher risk means higher rewards - can you beat the odds?
            </p>
            
            {/* Game highlights */}
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center text-sm bg-gradient-to-r from-purple-900/30 to-purple-800/10 px-3 py-1.5 rounded-full">
                <FaBomb className="mr-1.5 text-red-400" />
                <span>Up to 25x multiplier</span>
              </div>
              <div className="flex items-center text-sm bg-gradient-to-r from-purple-900/30 to-purple-800/10 px-3 py-1.5 rounded-full">
                <GiDiamonds className="mr-1.5 text-blue-400" />
                <span>Customizable game grid</span>
              </div>
              <div className="flex items-center text-sm bg-gradient-to-r from-purple-900/30 to-purple-800/10 px-3 py-1.5 rounded-full">
                <GiCrystalGrowth className="mr-1.5 text-green-400" />
                <span>Provably fair gaming</span>
              </div>
            </div>
          </div>
          
          {/* Wallet information already shown in navbar */}
        </div>
        
        <div className="w-full h-0.5 bg-gradient-to-r from-purple-600 via-blue-500/30 to-transparent mt-6"></div>
      </div>
    </div>
  );

  // Main Content Section
  const renderMainContent = () => (
    <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-8 lg:px-20">
      {/* Sidebar/Tabs */}
      <div className="w-full lg:w-1/3 xl:w-1/4 space-y-4">
        <div className="rounded-xl border-2 border-[#333947] bg-[#290023]/50 backdrop-blur-sm p-4">
          <Tabs tabs={tabs} />
        </div>
      </div>

      {/* Game Area */}
      <div className="w-full lg:w-2/3 xl:w-3/4 rounded-xl border-2 border-[#333947] bg-[#290023]/50 backdrop-blur-sm p-4 md:p-6">
        <motion.div 
          key={gameInstance}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Game betSettings={betSettings} />
        </motion.div>
      </div>
    </div>
  );

  // Game Info Section
  const renderGameInfo = () => (
    <div className="mt-10 px-4 md:px-8 lg:px-20">
      <GameDetail 
        gameData={gameData} 
        showBettingTable={false}
        showProbabilities={false}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {typeof MinesBettingTable === 'function' && (
          <MinesBettingTable bettingTableData={bettingTableData} />
        )}
        {typeof MinesProbability === 'function' && (
          <MinesProbability winProbabilities={winProbabilities} />
        )}
      </div>
      
      <div className="mt-6">
        {typeof MinesHistory === 'function' && <MinesHistory />}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#070005] bg-gradient-to-b from-[#070005] to-[#0e0512] pb-20">
      <div className="pt-32">
        {renderHeader()}
        {renderMainContent()}
        {renderGameInfo()}
      </div>
    </div>
  );
} 