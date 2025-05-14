"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { FaPercentage, FaBomb, FaInfoCircle } from "react-icons/fa";
import { GiCardRandom, GiMineExplosion } from "react-icons/gi";

const MinesProbability = ({ winProbabilities, gridSize = 5 }) => {
  // Calculate additional probabilities
  const enhancedProbabilities = useMemo(() => {
    return winProbabilities.map(item => {
      // Extract mine count from config string
      const mineCountMatch = item.config.match(/(\d+)\s+mine/);
      const mineCount = mineCountMatch ? parseInt(mineCountMatch[1]) : 0;
      
      // Calculate total tiles
      const totalTiles = gridSize * gridSize;
      
      // Calculate safe tiles
      const safeTiles = totalTiles - mineCount;
      
      // Calculate probability of hitting a mine on first click
      const firstClickMineProb = (mineCount / totalTiles) * 100;
      
      // Calculate expected value (simplified formula)
      const expectedValue = ((item.probability / 100) * 2) - 1;
      
      return {
        ...item,
        mineCount,
        safeTiles,
        firstClickMineProb,
        expectedValue
      };
    });
  }, [winProbabilities, gridSize]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };
  
  return (
    <div className="bg-[#1A0015]/80 rounded-xl border border-gray-800 p-4 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center">
          <GiCardRandom className="mr-2 text-blue-400" /> Win Probabilities
        </h3>
      </div>
      
      <p className="text-white/70 text-sm mb-4">
        Your chance of winning depends on the number of mines and how many tiles you plan to reveal.
      </p>
      
      {/* Probability Visualizations */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {enhancedProbabilities.map((item, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="bg-black/20 rounded-lg p-4 border border-gray-800"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className={`p-2 rounded-full ${
                  item.probability > 75 ? 'bg-green-900/30' :
                  item.probability > 50 ? 'bg-blue-900/30' :
                  item.probability > 25 ? 'bg-yellow-900/30' : 'bg-red-900/30'
                } mr-2`}>
                  <FaBomb className="text-red-400" />
                </div>
                <div>
                  <p className="text-white font-medium">{item.config}</p>
                  <div className="flex text-xs text-white/60 items-center mt-1">
                    <span>{item.safeTiles} safe tiles</span>
                    <span className="mx-1">•</span>
                    <span>{item.mineCount} {item.mineCount === 1 ? 'mine' : 'mines'}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${
                  item.probability > 75 ? 'text-green-400' :
                  item.probability > 50 ? 'text-blue-400' :
                  item.probability > 25 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {item.probability}%
                </div>
                <p className="text-xs text-white/60">Win chance</p>
              </div>
            </div>
            
            {/* Probability bar */}
            <div className="w-full bg-gray-800 h-2 rounded-full mt-1 mb-3">
              <div 
                className={`h-2 rounded-full ${
                  item.probability > 75 ? 'bg-gradient-to-r from-green-500 to-green-400' :
                  item.probability > 50 ? 'bg-gradient-to-r from-blue-500 to-blue-400' :
                  item.probability > 25 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' : 
                  'bg-gradient-to-r from-red-500 to-red-400'
                }`}
                style={{ width: `${item.probability}%` }}
              ></div>
            </div>
            
            {/* Additional stats */}
            <div className="grid grid-cols-2 gap-2 text-xs mt-3">
              <div className="bg-black/30 rounded p-2">
                <p className="text-white/60 mb-1">First click mine chance</p>
                <p className="text-white font-medium">{item.firstClickMineProb.toFixed(1)}%</p>
              </div>
              <div className="bg-black/30 rounded p-2">
                <p className="text-white/60 mb-1">Expected value</p>
                <p className={`font-medium ${item.expectedValue >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {item.expectedValue.toFixed(2)}x
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Tips */}
      <div className="mt-4 flex items-start bg-purple-900/10 p-3 rounded-lg border border-purple-900/30">
        <FaInfoCircle className="mt-0.5 mr-2 text-purple-400 flex-shrink-0" />
        <div className="text-sm text-white/80">
          <p className="mb-1"><strong>Pro tip:</strong> Lower mine count gives higher win probability but smaller potential rewards.</p>
          <p>Games with expected value greater than 0 are mathematically favorable in the long run.</p>
        </div>
      </div>
    </div>
  );
};

export default MinesProbability; 