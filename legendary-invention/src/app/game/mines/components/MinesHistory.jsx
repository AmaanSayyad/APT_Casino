"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaHistory, FaStar, FaTrophy, FaChartBar, FaChartLine, FaBomb } from "react-icons/fa";
import { GiMining, GiDiamonds } from "react-icons/gi";

const MinesHistory = ({ gameHistory = [], userStats = {} }) => {
  // Default user stats if none provided
  const defaultStats = {
    totalPlayed: 0,
    totalWon: 0,
    winRate: "0%",
    biggestWin: "0",
    avgMultiplier: "0x",
    profitLoss: "0",
  };

  const stats = { ...defaultStats, ...userStats };

  // Default history if none provided
  const defaultHistory = [
    { id: 1, mines: 5, bet: "50 APTC", outcome: "win", payout: "165 APTC", multiplier: "3.3x", time: "5m ago" },
    { id: 2, mines: 3, bet: "100 APTC", outcome: "loss", payout: "0 APTC", multiplier: "0x", time: "8m ago" },
    { id: 3, mines: 10, bet: "25 APTC", outcome: "win", payout: "223 APTC", multiplier: "8.91x", time: "15m ago" },
    { id: 4, mines: 5, bet: "75 APTC", outcome: "loss", payout: "0 APTC", multiplier: "0x", time: "22m ago" },
    { id: 5, mines: 1, bet: "200 APTC", outcome: "win", payout: "253 APTC", multiplier: "1.27x", time: "30m ago" },
  ];

  const history = gameHistory.length > 0 ? gameHistory : defaultHistory;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="bg-[#1A0015]/80 rounded-xl border border-gray-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <FaHistory className="mr-2 text-purple-400" /> Your Mines History
        </h3>
        <div className="bg-purple-900/30 px-3 py-1 rounded-full text-xs text-white/80">
          {history.length} Games
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
        <div className="bg-black/30 rounded-lg p-2">
          <div className="text-xs text-white/60">Games Played</div>
          <div className="text-sm font-semibold text-white flex items-center mt-1">
            <FaChartBar className="mr-1 text-blue-400" /> {stats.totalPlayed}
          </div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-2">
          <div className="text-xs text-white/60">Games Won</div>
          <div className="text-sm font-semibold text-white flex items-center mt-1">
            <FaTrophy className="mr-1 text-yellow-400" /> {stats.totalWon}
          </div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-2">
          <div className="text-xs text-white/60">Win Rate</div>
          <div className="text-sm font-semibold text-white flex items-center mt-1">
            <FaStar className="mr-1 text-orange-400" /> {stats.winRate}
          </div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-2">
          <div className="text-xs text-white/60">Biggest Win</div>
          <div className="text-sm font-semibold text-green-400 flex items-center mt-1">
            <GiDiamonds className="mr-1" /> {stats.biggestWin}
          </div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-2">
          <div className="text-xs text-white/60">Avg Multiplier</div>
          <div className="text-sm font-semibold text-yellow-400 flex items-center mt-1">
            <FaChartLine className="mr-1" /> {stats.avgMultiplier}
          </div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-2">
          <div className="text-xs text-white/60">Profit/Loss</div>
          <div className={`text-sm font-semibold flex items-center mt-1 ${
            stats.profitLoss.startsWith('-') ? 'text-red-400' : 'text-green-400'
          }`}>
            <GiMining className="mr-1" /> {stats.profitLoss}
          </div>
        </div>
      </div>

      {/* Game History */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2 max-h-80 overflow-y-auto pr-1"
      >
        {/* Header */}
        <div className="grid grid-cols-6 gap-2 pb-2 text-xs text-white/60 font-medium border-b border-gray-800">
          <div>Game</div>
          <div>Mines</div>
          <div>Bet</div>
          <div>Multiplier</div>
          <div>Payout</div>
          <div>Time</div>
        </div>
        
        {/* History Items */}
        {history.map((game) => (
          <motion.div
            key={game.id}
            variants={itemVariants}
            className={`grid grid-cols-6 gap-2 p-2 text-xs rounded ${
              game.outcome === 'win' ? 'bg-green-900/10' : 'bg-red-900/10'
            } hover:bg-purple-900/20 transition-colors border border-gray-800`}
          >
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-1 ${
                game.outcome === 'win' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className="text-white">#{game.id}</span>
            </div>
            <div className="text-white flex items-center">
              <FaBomb className="mr-1 text-red-400" size={10} /> {game.mines}
            </div>
            <div className="text-white">{game.bet}</div>
            <div className={game.outcome === 'win' ? 'text-yellow-400' : 'text-gray-500'}>
              {game.multiplier}
            </div>
            <div className={game.outcome === 'win' ? 'text-green-400' : 'text-gray-500'}>
              {game.payout}
            </div>
            <div className="text-white/60">{game.time}</div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Empty State */}
      {history.length === 0 && (
        <div className="text-center py-10 text-white/50">
          <GiMining className="mx-auto text-3xl mb-2 text-purple-400/50" />
          <p>No game history yet. Start playing to see your results!</p>
        </div>
      )}
    </div>
  );
};

export default MinesHistory; 