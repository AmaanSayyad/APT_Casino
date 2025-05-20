"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTable, FaGem, FaBomb, FaTrophy, FaInfoCircle, FaChevronRight, FaChevronDown, FaChartLine, FaCalculator } from "react-icons/fa";
import { GiMining, GiTreasureMap, GiDiamonds, GiGoldBar, GiCrystalGrowth } from "react-icons/gi";
import { HiOutlineLightningBolt } from "react-icons/hi";

const MinesBettingTable = ({ bettingTableData }) => {
  if (!bettingTableData) {
    console.error('MinesBettingTable: bettingTableData prop is required');
    return (
      <div className="bg-[#1A0015]/80 rounded-xl border border-gray-800 p-4 mt-6">
        <div className="text-red-400">Error: Betting table data not available</div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };
  
  // Strategy tips
  const strategyTips = [
    {
      title: "Low Risk",
      description: "Select 1-3 mines for safer play with modest returns.",
      icon: <FaTrophy className="text-yellow-400" />,
      color: "from-green-900/40 to-green-800/20",
      borderColor: "green-800/30"
    },
    {
      title: "Balanced",
      description: "5 mines offers a good risk/reward ratio for most players.",
      icon: <FaGem className="text-blue-400" />,
      color: "from-blue-900/40 to-blue-800/20",
      borderColor: "blue-800/30"
    },
    {
      title: "High Risk",
      description: "10+ mines for experienced players seeking massive multipliers.",
      icon: <FaBomb className="text-red-400" />,
      color: "from-red-900/40 to-red-800/20",
      borderColor: "red-800/30"
    }
  ];

  // Check if table and activeTab are valid
  if (!bettingTableData.table || !bettingTableData.table[activeTab]) {
    return (
      <div className="bg-[#1A0015]/80 rounded-xl border border-gray-800 p-4 mt-6">
        <div className="text-red-400">Error: Invalid betting table data structure</div>
      </div>
    );
  }
  
  return (
    <div className="bg-gradient-to-b from-[#1A0015]/90 to-[#190020]/90 rounded-xl border-2 border-[#333947] p-5 mt-6 shadow-lg shadow-purple-900/5 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center font-display">
          <GiCrystalGrowth className="mr-2 text-purple-400" /> {bettingTableData.title}
        </h3>
        <motion.button
          onClick={() => setShowTips(!showTips)}
          className="flex items-center text-sm bg-gradient-to-r from-purple-900/40 to-purple-800/20 hover:from-purple-800/60 hover:to-purple-700/30 transition-all px-3 py-1.5 rounded-full text-white/80 border border-purple-800/30"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaInfoCircle className="mr-2" />
          {showTips ? "Hide Tips" : "Strategy Tips"}
          <motion.div
            animate={{ rotate: showTips ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="ml-2"
          >
            <FaChevronDown className="text-xs" />
          </motion.div>
        </motion.button>
      </div>
      
      <p className="text-white/70 text-sm mb-4 font-sans">{bettingTableData.description}</p>
      
      {/* Strategy Tips Section */}
      <AnimatePresence>
        {showTips && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-800/30 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3 flex items-center font-display">
                <GiTreasureMap className="mr-2 text-yellow-400" /> Strategy Guide
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {strategyTips.map((tip, index) => (
                  <motion.div 
                    key={index} 
                    className={`bg-gradient-to-br ${tip.color} rounded-lg p-3 border border-${tip.borderColor}`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="flex items-center mb-1">
                      {tip.icon}
                      <span className="ml-2 text-white font-medium font-display">{tip.title}</span>
                    </div>
                    <p className="text-white/80 text-sm font-sans">{tip.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-black/30 rounded-lg border border-gray-800/50">
                <h5 className="text-white flex items-center text-sm font-medium mb-2 font-display">
                  <FaCalculator className="mr-2 text-blue-400" /> Probability Insight
                </h5>
                <p className="text-white/70 text-xs font-sans">
                  Every game of Mines is statistically independent. This means the probability of hitting a mine 
                  on any given tile is: <span className="font-mono text-green-400 bg-black/50 px-1 py-0.5 rounded">mines / (total tiles - revealed tiles)</span>. 
                  This probability increases with each safe tile you reveal.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto custom-scrollbar mb-4 pb-2">
        {bettingTableData.table.map((item, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex items-center px-4 py-2 rounded-full mr-2 text-sm whitespace-nowrap transition-colors ${
              activeTab === index 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md shadow-purple-900/30'
                : 'bg-gray-800/50 text-white/70 hover:bg-gray-800'
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <FaBomb className="mr-2" />
            {item.mines} {item.mines === 1 ? 'Mine' : 'Mines'}
          </motion.button>
        ))}
      </div>
      
      {/* Table Content */}
      <div className="bg-black/30 rounded-lg p-4 border border-purple-900/20">
        <div className="grid grid-cols-3 gap-2 mb-3 text-white/60 text-xs font-medium border-b border-gray-800/50 pb-2">
          <div className="font-display">Tiles Revealed</div>
          <div className="font-display">Multiplier</div>
          <div className="font-display">For 100 APTC</div>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
          key={activeTab}
        >
          {bettingTableData.table[activeTab].tiles && bettingTableData.table[activeTab].tiles.map((tile, index) => {
            if (!tile || !tile.multiplier) return null;
            
            // Extract the numeric value from the multiplier string - safely
            const multiplierText = tile.multiplier || "0x";
            const multiplierValue = parseFloat(multiplierText.replace('x', '').replace(',', '')) || 0;
            // Calculate payout for 100 APTC
            const payout = (100 * multiplierValue).toFixed(0);
            
            // Determine background color based on payout
            let bgGradient = "from-purple-900/10 to-blue-900/10";
            let textColor = "text-green-400";
            
            if (payout > 10000) {
              bgGradient = "from-red-900/20 to-orange-900/10";
              textColor = "text-red-400";
            } else if (payout > 1000) {
              bgGradient = "from-orange-900/20 to-yellow-900/10";
              textColor = "text-orange-400";
            } else if (payout > 500) {
              bgGradient = "from-yellow-900/20 to-green-900/10";
              textColor = "text-yellow-400";
            }
            
            return (
              <motion.div
                key={index}
                variants={rowVariants}
                className={`grid grid-cols-3 gap-2 p-3 rounded bg-gradient-to-r ${bgGradient} border border-gray-800/50 hover:border-purple-500/30 transition-colors relative`}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <div className="flex items-center text-white">
                  <FaGem className="mr-2 text-blue-400" />
                  <span className="font-medium">{tile.revealed}</span>
                </div>
                <div className="text-yellow-400 font-semibold">
                  {tile.multiplier}
                </div>
                <div className={`${textColor} font-bold flex items-center`}>
                  <GiGoldBar className="mr-1" /> {payout}
                </div>
                
                {/* Hover effect - show probability */}
                <AnimatePresence>
                  {hoverIndex === index && (
                    <motion.div 
                      className="absolute -right-2 -bottom-2 bg-black/80 text-xs px-2 py-1 rounded-full text-white/90 border border-purple-800/50"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <div className="flex items-center">
                        <FaChartLine className="mr-1 text-blue-400" />
                        <span>Chance: {(100 - (bettingTableData.table[activeTab].mines * 100 / (25 - tile.revealed))).toFixed(1)}%</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      
      {/* Additional Information */}
      <div className="mt-4 text-white/70 text-sm flex items-start p-3 bg-purple-900/10 rounded-lg border border-purple-800/30">
        <HiOutlineLightningBolt className="mt-0.5 mr-2 text-purple-400 flex-shrink-0 text-lg" />
        <span className="font-sans">
          The multiplier formula is based on probability: <span className="text-xs bg-black/40 rounded px-1 py-0.5 font-mono">multiplier = totalTiles / (totalTiles - mines - revealed)</span>. Higher risk leads to exponentially higher rewards.
        </span>
      </div>
    </div>
  );
};

export default MinesBettingTable; 