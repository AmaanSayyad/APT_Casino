"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTable, FaGem, FaBomb, FaTrophy, FaInfoCircle, FaChevronRight } from "react-icons/fa";
import { GiMining, GiTreasureMap, GiDiamonds } from "react-icons/gi";

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
      icon: <FaTrophy className="text-yellow-400" />
    },
    {
      title: "Balanced",
      description: "5 mines offers a good risk/reward ratio for most players.",
      icon: <FaGem className="text-blue-400" />
    },
    {
      title: "High Risk",
      description: "10+ mines for experienced players seeking massive multipliers.",
      icon: <FaBomb className="text-red-400" />
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
    <div className="bg-[#1A0015]/80 rounded-xl border border-gray-800 p-4 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center">
          <FaTable className="mr-2 text-purple-400" /> {bettingTableData.title}
        </h3>
        <button
          onClick={() => setShowTips(!showTips)}
          className="flex items-center text-sm bg-purple-900/30 hover:bg-purple-900/50 transition-colors px-3 py-1 rounded-full text-white/80"
        >
          <FaInfoCircle className="mr-1" />
          {showTips ? "Hide Tips" : "Strategy Tips"}
        </button>
      </div>
      
      <p className="text-white/70 text-sm mb-4">{bettingTableData.description}</p>
      
      {/* Strategy Tips Section */}
      <AnimatePresence>
        {showTips && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-gray-800 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2 flex items-center">
                <GiTreasureMap className="mr-2 text-yellow-400" /> Strategy Guide
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {strategyTips.map((tip, index) => (
                  <div key={index} className="bg-black/30 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      {tip.icon}
                      <span className="ml-2 text-white font-medium">{tip.title}</span>
                    </div>
                    <p className="text-white/70 text-sm">{tip.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto scrollbar-hide mb-4 pb-2">
        {bettingTableData.table.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex items-center px-4 py-2 rounded-full mr-2 text-sm whitespace-nowrap transition-colors ${
              activeTab === index 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'bg-gray-800/50 text-white/70 hover:bg-gray-800'
            }`}
          >
            <FaBomb className="mr-1" />
            {item.mines} {item.mines === 1 ? 'Mine' : 'Mines'}
          </button>
        ))}
      </div>
      
      {/* Table Content */}
      <div className="bg-black/20 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-2 mb-2 text-white/60 text-xs font-medium">
          <div>Tiles Revealed</div>
          <div>Multiplier</div>
          <div>For 100 APTC</div>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          {bettingTableData.table[activeTab].tiles && bettingTableData.table[activeTab].tiles.map((tile, index) => {
            if (!tile || !tile.multiplier) return null;
            
            // Extract the numeric value from the multiplier string - safely
            const multiplierText = tile.multiplier || "0x";
            const multiplierValue = parseFloat(multiplierText.replace('x', '').replace(',', '')) || 0;
            // Calculate payout for 100 APTC
            const payout = (100 * multiplierValue).toFixed(0);
            
            return (
              <motion.div
                key={index}
                variants={rowVariants}
                className={`grid grid-cols-3 gap-2 p-2 rounded ${
                  index % 2 === 0 ? 'bg-purple-900/10' : 'bg-blue-900/10'
                } border border-gray-800 hover:border-purple-500/30 transition-colors`}
              >
                <div className="flex items-center text-white">
                  <FaGem className="mr-2 text-blue-400" />
                  <span>{tile.revealed}</span>
                </div>
                <div className="text-yellow-400 font-semibold">
                  {tile.multiplier}
                </div>
                <div className="text-green-400">
                  {payout} APTC
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      
      {/* Additional Information */}
      <div className="mt-4 text-white/60 text-sm flex items-start">
        <FaInfoCircle className="mt-1 mr-2 text-purple-400 flex-shrink-0" />
        <span>
          The multiplier formula is based on probability: <span className="text-xs bg-black/30 rounded px-1 py-0.5 font-mono">multiplier = totalTiles / (totalTiles - mines - revealed)</span>. Higher risk leads to exponentially higher rewards.
        </span>
      </div>
    </div>
  );
};

export default MinesBettingTable; 