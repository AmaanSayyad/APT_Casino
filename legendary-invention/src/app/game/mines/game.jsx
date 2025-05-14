import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineVolumeUp, HiOutlineVolumeOff, HiOutlineInformationCircle } from "react-icons/hi";
import { FaRegGem, FaBomb, FaDiamond, FaQuestion, FaCoins, FaBullseye, FaClipboardCheck } from "react-icons/fa";
import { GiMineTruck, GiTreasureMap, GiCrystalGrowth } from "react-icons/gi";
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GRID_SIZES = {
  5: 5, // 5x5 grid
  6: 6, // 6x6 grid - advanced mode
};

const MINE_SPRITES = [
  "/images/bomb.png",
];

const GEM_SPRITES = [
  "/images/diamond.png",
];

// Sound effects URLs
const SOUNDS = {
  click: "/sounds/click.mp3",
  reveal: "/sounds/reveal.mp3",
  gem: "/sounds/gem.mp3",
  explosion: "/sounds/explosion.mp3",
  win: "/sounds/win.mp3",
  cashout: "/sounds/cashout.mp3",
  hover: "/sounds/hover.mp3",
  bet: "/sounds/bet.mp3",
};

const Game = ({ betSettings = {} }) => {
  // Game Settings
  const defaultSettings = {
    betAmount: 50,
    mines: 5,
    cashoutMultiplier: "Off",
    isAutoBetting: false,
    tilesToReveal: 5,
  };

  const settings = { ...defaultSettings, ...betSettings };
  
  // Game State
  const [grid, setGrid] = useState([]);
  const [gridSize, setGridSize] = useState(GRID_SIZES[5]); // Default 5x5 grid
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [minesCount, setMinesCount] = useState(settings.mines);
  const [revealedCount, setRevealedCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [multiplier, setMultiplier] = useState(1.0);
  const [profit, setProfit] = useState(0);
  const [hasPlacedBet, setHasPlacedBet] = useState(false);
  const [isAutoBetting, setIsAutoBetting] = useState(settings.isAutoBetting);
  const [isGameInfoVisible, setIsGameInfoVisible] = useState(false);
  const [betAmount, setBetAmount] = useState(settings.betAmount);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [autoRevealInProgress, setAutoRevealInProgress] = useState(false);
  
  // Audio refs
  const audioRefs = {
    click: useRef(null),
    reveal: useRef(null),
    gem: useRef(null),
    explosion: useRef(null),
    win: useRef(null),
    cashout: useRef(null),
    hover: useRef(null),
    bet: useRef(null),
  };
  
  // Window size for Confetti
  const { width, height } = useWindowSize();
  
  // Calculate safe tiles
  const totalTiles = gridSize * gridSize;
  const safeTiles = totalTiles - minesCount;
  
  // Calculate next multiplier based on revealed count
  const calculateNextMultiplier = (revealed) => {
    const nextRevealed = revealed + 1;
    // Formula: totalTiles / (totalTiles - minesCount - revealed)
    return parseFloat((totalTiles / (totalTiles - minesCount - nextRevealed)).toFixed(2));
  };
  
  // Calculate chance of hitting a mine
  const calculateMineChance = () => {
    if (revealedCount >= safeTiles) return 100;
    return Math.round(minesCount / (totalTiles - revealedCount) * 100);
  };
  
  // Calculate current payout
  const calculatePayout = () => {
    return Math.round(betAmount * multiplier);
  };

  // Multiplier table (memoized to avoid recalculation)
  const multiplierTable = useMemo(() => {
    const table = [];
    
    for (let i = 1; i <= safeTiles && i <= 12; i++) {
      // Formula: totalTiles / (totalTiles - minesCount - revealed)
      const mult = parseFloat((totalTiles / (totalTiles - minesCount - i)).toFixed(2));
      table.push({ tiles: i, multiplier: mult });
    }
    
    return table;
  }, [minesCount, safeTiles, totalTiles]);

  // Play sound helper function
  const playSound = (sound) => {
    if (isMuted || !audioRefs[sound]?.current) return;
    
    // Reset sound to beginning if it's already playing
    audioRefs[sound].current.currentTime = 0;
    audioRefs[sound].current.play().catch(error => console.error("Sound play failed:", error));
  };
  
  // Initialize the grid
  const initializeGrid = (mines = minesCount) => {
    let newGrid = Array(gridSize)
      .fill()
      .map(() =>
        Array(gridSize)
          .fill()
          .map(() => ({
            isDiamond: false,
            isBomb: false,
            isRevealed: false,
            isHovered: false,
            spriteIndex: 0, // Always use the first sprite
          }))
      );

    let bombsPlaced = 0;
    while (bombsPlaced < mines) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      if (!newGrid[row][col].isBomb) {
        newGrid[row][col].isBomb = true;
        bombsPlaced++;
      }
    }

    // All non-bomb cells are diamonds (gems)
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (!newGrid[i][j].isBomb) {
          newGrid[i][j].isDiamond = true;
        }
      }
    }

    return newGrid;
  };

  // Initialize the game on component mount
  useEffect(() => {
    setGrid(initializeGrid());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Reset the game state when gridSize or minesCount changes
  useEffect(() => {
    if (isPlaying) return; // Don't reset while playing
    
    setGrid(initializeGrid(minesCount));
    setMultiplier(1.0);
    setProfit(0);
    setRevealedCount(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridSize, minesCount]);

  // Handle cell hover (for desktop)
  const handleCellHover = (row, col, isHovering) => {
    if (gameOver || gameWon || !isPlaying || grid[row][col].isRevealed) return;
    
    if (isHovering) playSound('hover');
    
    const newGrid = [...grid];
    newGrid[row][col].isHovered = isHovering;
    setGrid(newGrid);
  };

  // Reveal a specific cell
  const revealCell = (row, col) => {
    if (gameOver || gameWon || !isPlaying || grid[row][col].isRevealed) return;

    playSound('click');
    
    const newGrid = [...grid];
    newGrid[row][col].isRevealed = true;
    
    setTimeout(() => {
      if (grid[row][col].isBomb) {
        playSound('explosion');
        setGameOver(true);
        revealAll();
        toast.error('Game Over! You hit a mine!');
      } else if (grid[row][col].isDiamond) {
        playSound('gem');
        
        setRevealedCount(prev => {
          const newCount = prev + 1;
          const newMultiplier = calculateNextMultiplier(prev);
          setMultiplier(newMultiplier);
          setProfit(Math.round(betAmount * (newMultiplier - 1)));
          
          // Check if all safe tiles are revealed
          if (newCount === safeTiles) {
            setGameWon(true);
            revealAll();
            playSound('win');
            setShowConfetti(true);
            toast.success('Congratulations! You revealed all safe tiles!');
            setTimeout(() => setShowConfetti(false), 5000);
          }
          
          return newCount;
        });
      }
    }, 200);

    setGrid(newGrid);
  };

  // Auto-reveal tiles (for auto betting)
  const autoRevealTiles = (count = settings.tilesToReveal) => {
    if (gameOver || gameWon || !isPlaying || autoRevealInProgress) return;
    
    setAutoRevealInProgress(true);
    
    let revealed = 0;
    let timerIds = [];
    
    const revealNext = () => {
      if (revealed >= count) {
        setAutoRevealInProgress(false);
        cashout();
        return;
      }
      
      // Find all unrevealed gem cells
      const unrevealedGems = [];
      grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (!cell.isRevealed && cell.isDiamond) {
            unrevealedGems.push([rowIndex, colIndex]);
          }
        });
      });
      
      if (unrevealedGems.length === 0) {
        setAutoRevealInProgress(false);
        return;
      }
      
      // Randomly select one
      const randomIndex = Math.floor(Math.random() * unrevealedGems.length);
      const [rowToReveal, colToReveal] = unrevealedGems[randomIndex];
      
      revealCell(rowToReveal, colToReveal);
      revealed++;
      
      // Check if game is over after each reveal
      if (!gameOver && !gameWon) {
        const timerId = setTimeout(revealNext, 300);
        timerIds.push(timerId);
      } else {
        setAutoRevealInProgress(false);
      }
    };
    
    // Start the auto-reveal process
    revealNext();
    
    // Cleanup timers if component unmounts
    return () => timerIds.forEach(id => clearTimeout(id));
  };

  // Reveal all cells (game over)
  const revealAll = () => {
    const newGrid = grid.map((row) =>
      row.map((cell) => ({
        ...cell,
        isRevealed: true,
      }))
    );
    setGrid(newGrid);
  };

  // Reset the game
  const resetGame = () => {
    setGrid(initializeGrid(minesCount));
    setGameOver(false);
    setGameWon(false);
    setRevealedCount(0);
    setIsPlaying(false);
    setHasPlacedBet(false);
    setMultiplier(1.0);
    setProfit(0);
    setShowConfetti(false);
  };
  
  // Start a new game
  const placeBet = () => {
    resetGame();
    setIsPlaying(true);
    setHasPlacedBet(true);
    playSound('bet');
    toast.info(`Bet placed: ${betAmount} APTC, ${minesCount} mines`);
    
    // If auto-betting is enabled, automatically reveal tiles
    if (isAutoBetting) {
      setTimeout(() => autoRevealTiles(), 500);
    }
  };
  
  // Cashout function
  const cashout = () => {
    if (!isPlaying || gameOver || gameWon || revealedCount === 0) return;
    
    playSound('cashout');
    setIsPlaying(false);
    
    const payout = calculatePayout();
    toast.success(`Cashed out: ${payout} APTC (${multiplier}x)`);
    
    // Show brief confetti for wins
    if (multiplier > 1.5) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  // Toggle game info
  const toggleGameInfo = () => {
    setIsGameInfoVisible(!isGameInfoVisible);
  };
  
  // Toggle advanced mode
  const toggleAdvancedMode = () => {
    if (isPlaying) return; // Can't change during gameplay
    
    const newMode = !isAdvancedMode;
    setIsAdvancedMode(newMode);
    setGridSize(newMode ? GRID_SIZES[6] : GRID_SIZES[5]);
  };
  
  // Adjust mines count
  const adjustMinesCount = (delta) => {
    if (isPlaying) return; // Can't change during gameplay
    
    const maxMines = Math.floor(totalTiles * 0.8); // Max 80% of tiles can be mines
    const newCount = Math.max(1, Math.min(maxMines, minesCount + delta));
    setMinesCount(newCount);
  };
  
  // Cell content renderer
  const getCellContent = (cell) => {
    if (!cell.isRevealed) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <FaQuestion className="text-gray-400 text-xl md:text-2xl" />
        </div>
      );
    }
    
    if (cell.isBomb) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src={MINE_SPRITES[cell.spriteIndex % MINE_SPRITES.length]}
            alt="Mine"
            width={64}
            height={64}
            className="w-10 h-10 md:w-12 md:h-12 object-contain"
          />
        </div>
      );
    }
    
    if (cell.isDiamond) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src={GEM_SPRITES[cell.spriteIndex % GEM_SPRITES.length]}
            alt="Gem"
            width={64}
            height={64}
            className="w-10 h-10 md:w-12 md:h-12 object-contain"
          />
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Audio elements */}
      {Object.entries(SOUNDS).map(([key, src]) => (
        <audio key={key} ref={audioRefs[key]} src={src} preload="auto" />
      ))}
      
      {/* Confetti animation for wins */}
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={300} />}
      
      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover theme="dark" />
      
      {/* Game information overlay */}
      <AnimatePresence>
        {isGameInfoVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-0 left-0 right-0 bottom-0 bg-black/90 backdrop-blur-sm z-50 p-6 overflow-auto"
          >
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <GiMineTruck className="mr-2 text-red-500" /> How to Play Mines
              </h3>
              
              <div className="space-y-4 text-white/90">
                <p><strong>Objective:</strong> Reveal gem tiles while avoiding hidden mines.</p>
                
                <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded">
                  <FaRegGem className="text-blue-400 text-xl" />
                  <span>Gems are safe to click - each one increases your multiplier.</span>
                </div>
                
                <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded">
                  <FaBomb className="text-red-500 text-xl" />
                  <span>Mines end your game if clicked - you lose your bet.</span>
                </div>
                
                <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded">
                  <FaCoins className="text-yellow-500 text-xl" />
                  <span>Cashout anytime to secure your winnings.</span>
                </div>
                
                <p><strong>Strategy:</strong> More mines mean higher risk but bigger potential rewards.</p>
                
                <div className="border border-gray-700 rounded p-4">
                  <h4 className="text-lg font-semibold mb-2">Payout Formula</h4>
                  <p className="font-mono bg-gray-800/50 p-2 rounded text-sm">
                    multiplier = totalTiles / (totalTiles - mines - revealedTiles)
                  </p>
                </div>
              </div>
              
              <button 
                className="mt-6 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium"
                onClick={toggleGameInfo}
              >
                Got it!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Game Header */}
      <div className="w-full flex flex-wrap justify-between items-center gap-2 mb-4">
        <div className="flex items-center space-x-3">
          <button 
            className="p-2 rounded-full bg-purple-900/20 hover:bg-purple-900/40 transition-colors"
            onClick={toggleMute}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? 
              <HiOutlineVolumeOff className="text-white/70 text-xl" /> : 
              <HiOutlineVolumeUp className="text-white/70 text-xl" />
            }
          </button>
          
          <button 
            className="p-2 rounded-full bg-blue-900/20 hover:bg-blue-900/40 transition-colors"
            onClick={toggleGameInfo}
            title="Game Info"
          >
            <HiOutlineInformationCircle className="text-white/70 text-xl" />
          </button>
          
          <div className="ml-2 flex items-center">
            <div className="flex items-center gap-2">
              <div className="text-xs md:text-sm text-white/50">
                Mode:
              </div>
              <button
                className={`px-2 py-1 text-xs md:text-sm rounded ${
                  isAdvancedMode ? 'bg-purple-600' : 'bg-blue-600'
                }`}
                onClick={toggleAdvancedMode}
                disabled={isPlaying}
              >
                {isAdvancedMode ? '6x6 Advanced' : '5x5 Classic'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="text-sm text-white/70 mr-2">Mines:</div>
          <div className="flex items-center bg-gray-900/50 rounded overflow-hidden">
            <button 
              className="px-2 py-1 bg-red-900/30 hover:bg-red-900/50 text-white disabled:opacity-50"
              onClick={() => adjustMinesCount(-1)}
              disabled={isPlaying || minesCount <= 1}
            >
              -
            </button>
            <div className="px-3 py-1 font-medium text-white">
              {minesCount}
            </div>
            <button 
              className="px-2 py-1 bg-green-900/30 hover:bg-green-900/50 text-white disabled:opacity-50"
              onClick={() => adjustMinesCount(1)}
              disabled={isPlaying || minesCount >= Math.floor(totalTiles * 0.8)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      
      {/* Game Stats */}
      <div className="w-full grid grid-cols-3 gap-2 mb-4">
        <div className="bg-gray-900/50 rounded p-2 text-center">
          <div className="text-xs text-white/50 mb-1">Chance of Mine</div>
          <div className={`text-lg font-bold ${calculateMineChance() > 50 ? 'text-red-400' : 'text-white'}`}>
            {calculateMineChance()}%
          </div>
        </div>
        
        <div className="bg-gray-900/50 rounded p-2 text-center">
          <div className="text-xs text-white/50 mb-1">Multiplier</div>
          <div className="text-lg font-bold text-yellow-400">
            {multiplier.toFixed(2)}x
          </div>
        </div>
        
        <div className="bg-gray-900/50 rounded p-2 text-center">
          <div className="text-xs text-white/50 mb-1">Profit</div>
          <div className={`text-lg font-bold ${profit > 0 ? 'text-green-400' : 'text-white'}`}>
            {profit > 0 ? '+' : ''}{profit}
          </div>
        </div>
      </div>
      
      {/* Game Grid */}
      <div 
        className={`grid gap-2 w-full mb-4 mx-auto max-w-md`}
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <motion.button
              key={`${rowIndex}-${colIndex}`}
              className={`
                aspect-square flex items-center justify-center rounded-lg 
                ${cell.isRevealed ? (
                  cell.isBomb ? 'bg-red-900/70' : 'bg-blue-600/30'
                ) : (
                  cell.isHovered ? 'bg-purple-800/30' : 'bg-gray-900/70'
                )}
                ${!isPlaying ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}
                ${cell.isRevealed ? '' : 'hover:bg-purple-800/30'}
                transition-colors duration-200 text-2xl
                border border-gray-800 shadow-lg
              `}
              onClick={() => isPlaying && revealCell(rowIndex, colIndex)}
              onMouseEnter={() => handleCellHover(rowIndex, colIndex, true)}
              onMouseLeave={() => handleCellHover(rowIndex, colIndex, false)}
              disabled={!isPlaying || cell.isRevealed || gameOver || gameWon}
              whileHover={{ scale: isPlaying && !cell.isRevealed ? 1.05 : 1 }}
              whileTap={{ scale: isPlaying && !cell.isRevealed ? 0.95 : 1 }}
              animate={{ 
                opacity: cell.isRevealed ? 1 : 0.9,
                scale: cell.isRevealed ? 1 : 1
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {getCellContent(cell)}
            </motion.button>
          ))
        )}
      </div>
      
      {/* Game Controls */}
      <div className="w-full space-y-3">
        {!hasPlacedBet ? (
          <button
            onClick={placeBet}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-bold shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            Place Bet ({betAmount} APTC)
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={cashout}
              disabled={!isPlaying || revealedCount === 0}
              className={`flex-1 py-3 ${
                isPlaying && revealedCount > 0 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' 
                  : 'bg-gray-700 cursor-not-allowed'
              } rounded-lg text-white font-bold shadow-lg transition-all`}
            >
              Cash Out ({calculatePayout()} APTC)
            </button>
            
            <button
              onClick={resetGame}
              className="flex-1 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg text-white font-bold shadow-lg hover:from-red-700 hover:to-orange-700 transition-all"
            >
              New Game
            </button>
          </div>
        )}
        
        {/* Game result message */}
        {(gameOver || gameWon) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center py-2 rounded-lg ${
              gameWon ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
            } font-bold`}
          >
            {gameWon ? 'Congratulations! You won!' : 'Game Over! You hit a mine!'}
          </motion.div>
        )}
      </div>
      
      {/* Multiplier Table */}
      <div className="w-full mt-6">
        <h3 className="text-white font-medium mb-2 flex items-center">
          <GiCrystalGrowth className="mr-2 text-blue-400" /> 
          Multiplier Table
        </h3>
        <div className="overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {multiplierTable.map((item, index) => (
              <div 
                key={index}
                className={`min-w-16 p-2 text-center rounded ${
                  item.tiles === revealedCount 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-800/50 text-white/70'
                }`}
              >
                <div className="text-xs">{item.tiles} Tiles</div>
                <div className="text-sm font-semibold">{item.multiplier.toFixed(2)}x</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
