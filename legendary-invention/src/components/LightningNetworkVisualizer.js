'use client';
import { useState, useEffect, useRef } from 'react';
import { 
  FaBitcoin, 
  FaBolt, 
  FaExchangeAlt, 
  FaRocket, 
  FaGamepad, 
  FaUserAlt, 
  FaWallet,
  FaNetworkWired
} from 'react-icons/fa';
import { IoIosFlash } from 'react-icons/io';

const LightningNetworkVisualizer = () => {
  const [activeDemo, setActiveDemo] = useState('game');
  const [transactionState, setTransactionState] = useState('idle'); // idle, sending, confirming, confirmed
  const [showTransactionPath, setShowTransactionPath] = useState(false);
  const [satoshiAmount, setSatoshiAmount] = useState(500); // Default amount in satoshis
  const [streamingPayment, setStreamingPayment] = useState(false);
  const [streamAmount, setStreamAmount] = useState(0);
  const [totalStreamed, setTotalStreamed] = useState(0);
  const [streamRate, setStreamRate] = useState(10); // sats per second
  const [streamingInterval, setStreamingInterval] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const transactionTypes = [
    { id: 'game', name: 'Gaming Payouts', description: 'Instant micropayments for game rewards', icon: FaGamepad },
    { id: 'tip', name: 'Player Tips', description: 'Send satoshis to other players', icon: FaUserAlt },
    { id: 'stream', name: 'Streaming Payments', description: 'Continuous satoshi streams while playing', icon: IoIosFlash },
  ];

  // Add a new transaction to the list
  const addTransaction = (type, amount, status = 'completed') => {
    const newTx = {
      id: Date.now(),
      type,
      amount,
      timestamp: new Date(),
      status
    };
    
    setRecentTransactions(prev => [newTx, ...prev].slice(0, 5));
  };

  // Simulate starting a transaction on the Lightning Network
  const startTransaction = () => {
    setTransactionState('sending');
    setShowTransactionPath(true);
    
    // Simulate network delay (very fast for Lightning)
    setTimeout(() => {
      setTransactionState('confirming');
      
      // Lightning confirms very quickly
      setTimeout(() => {
        setTransactionState('confirmed');
        addTransaction(activeDemo, satoshiAmount);
        
        // Reset after showing confirmed for a bit
        setTimeout(() => {
          setTransactionState('idle');
          setShowTransactionPath(false);
        }, 2000);
      }, 800);
    }, 1000);
  };

  // Start streaming payments
  const startStreaming = () => {
    if (streamingPayment) return;
    
    setStreamingPayment(true);
    setStreamAmount(0);
    setTotalStreamed(0);
    
    const interval = setInterval(() => {
      setStreamAmount(streamRate);
      setTotalStreamed(prev => {
        const newTotal = prev + streamRate;
        // Add transaction every 100 sats
        if (Math.floor(newTotal / 100) > Math.floor(prev / 100)) {
          addTransaction('stream', streamRate * 10, 'streaming');
        }
        return newTotal;
      });
    }, 1000);
    
    setStreamingInterval(interval);
  };

  // Stop streaming payments
  const stopStreaming = () => {
    if (!streamingPayment) return;
    
    clearInterval(streamingInterval);
    setStreamingPayment(false);
    setStreamAmount(0);
    addTransaction('stream', totalStreamed, 'completed');
  };

  // Handle canvas animations
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Nodes in the network
    const nodes = [
      { x: width * 0.2, y: height * 0.3, label: 'Player', color: '#F7931A', icon: FaUserAlt },
      { x: width * 0.4, y: height * 0.2, label: 'Channel 1', color: '#3498db', icon: FaNetworkWired },
      { x: width * 0.6, y: height * 0.3, label: 'Channel 2', color: '#2ecc71', icon: FaNetworkWired },
      { x: width * 0.8, y: height * 0.2, label: 'Casino', color: '#9b59b6', icon: FaGamepad }
    ];
    
    // Edges/channels between nodes
    const channels = [
      { from: 0, to: 1, balance: 10000 },
      { from: 1, to: 2, balance: 50000 },
      { from: 2, to: 3, balance: 25000 }
    ];
    
    // Animation particles
    let particles = [];
    
    // Create new particles when payment is being made
    if (showTransactionPath && (transactionState === 'sending' || transactionState === 'confirming')) {
      if (Math.random() > 0.7) {
        particles.push({
          x: nodes[0].x,
          y: nodes[0].y,
          speed: 2 + Math.random() * 2,
          progress: 0,
          size: 3 + Math.random() * 3,
          pathIndex: 0 // Current edge index
        });
      }
    }
    
    // Create streaming particles
    if (streamingPayment) {
      if (Math.random() > 0.8) {
        particles.push({
          x: nodes[3].x,
          y: nodes[3].y,
          speed: 2 + Math.random() * 2,
          progress: 0,
          size: 2 + Math.random() * 2,
          pathIndex: 2, // Start from casino node
          reverse: true // Going in reverse direction
        });
      }
    }
    
    const drawNetwork = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw connections first (under nodes)
      channels.forEach(channel => {
        const fromNode = nodes[channel.from];
        const toNode = nodes[channel.to];
        
        ctx.beginPath();
        ctx.strokeStyle = showTransactionPath ? '#ffcc00' : '#444';
        ctx.lineWidth = showTransactionPath ? 2 : 1;
        ctx.setLineDash(showTransactionPath ? [] : [5, 3]);
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();
        
        // Draw balance if transaction is happening
        if (showTransactionPath) {
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2 - 15;
          
          ctx.fillStyle = '#ffcc00';
          ctx.font = '10px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(`${channel.balance} sats`, midX, midY);
        }
      });
      
      // Draw nodes
      nodes.forEach((node, index) => {
        ctx.beginPath();
        ctx.fillStyle = node.color;
        ctx.arc(node.x, node.y, 15, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'white';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + 30);
      });
      
      // Update and draw particles
      particles = particles.filter(p => {
        // Get current path
        const channel = p.reverse 
          ? { from: channels[p.pathIndex].to, to: channels[p.pathIndex].from }
          : channels[p.pathIndex];
        const fromNode = nodes[channel.from];
        const toNode = nodes[channel.to];
        
        // Update progress along path
        p.progress += p.speed / 100;
        
        // Calculate position along the path
        const t = p.progress;
        p.x = fromNode.x + (toNode.x - fromNode.x) * t;
        p.y = fromNode.y + (toNode.y - fromNode.y) * t;
        
        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = p.reverse ? '#2ecc71' : '#F7931A';
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add lightning effect
        if (Math.random() > 0.7) {
          ctx.beginPath();
          ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // If this path is complete
        if (p.progress >= 1) {
          p.pathIndex++;
          p.progress = 0;
          
          // If all paths are complete, remove the particle
          if (p.reverse) {
            return p.pathIndex >= 0;
          } else {
            return p.pathIndex < channels.length;
          }
        }
        
        return true;
      });
      
      animationRef.current = requestAnimationFrame(drawNetwork);
    };
    
    // Start the animation
    drawNetwork();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      if (streamingInterval) {
        clearInterval(streamingInterval);
      }
    };
  }, [showTransactionPath, transactionState, streamingPayment, streamingInterval]);
  
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#0A0A0F] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-5"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-yellow-500/10 p-3 rounded-full mb-4">
            <FaBolt className="text-yellow-500 text-2xl" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-3">Bitcoin Lightning Network Integration</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Experience instant micropayments with Bitcoin's Lightning Network. Send and receive satoshis in milliseconds,
            enabling real-time gameplay rewards and player-to-player interactions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Network Visualization */}
          <div className="lg:col-span-8 bg-[#12121A] rounded-xl p-6 border border-white/5">
            <h3 className="text-white text-xl font-medium mb-4">Lightning Network Visualization</h3>
            
            <div className="bg-[#0A0A12] rounded-xl p-4 mb-6 h-[300px] relative overflow-hidden">
              <canvas 
                ref={canvasRef} 
                width={800} 
                height={300} 
                className="w-full h-full absolute top-0 left-0"
              />
              
              {/* Transaction Status Overlay */}
              {transactionState !== 'idle' && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A12]/80 backdrop-blur-sm">
                  <div className="text-center">
                    {transactionState === 'sending' && (
                      <>
                        <div className="w-16 h-16 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin mx-auto mb-4"></div>
                        <h4 className="text-white text-lg font-medium mb-2">Sending Payment...</h4>
                        <p className="text-white/60">{satoshiAmount} satoshis via Lightning Network</p>
                      </>
                    )}
                    
                    {transactionState === 'confirming' && (
                      <>
                        <div className="flex justify-center mb-4">
                          <FaBolt className="text-yellow-500 text-4xl animate-pulse" />
                        </div>
                        <h4 className="text-white text-lg font-medium mb-2">Almost Instant!</h4>
                        <p className="text-white/60">Lightning confirmations in milliseconds</p>
                      </>
                    )}
                    
                    {transactionState === 'confirmed' && (
                      <>
                        <div className="flex justify-center mb-4">
                          <div className="bg-green-500/20 rounded-full p-3">
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        </div>
                        <h4 className="text-white text-lg font-medium mb-2">Payment Confirmed!</h4>
                        <p className="text-white/60">{satoshiAmount} satoshis sent successfully</p>
                      </>
                    )}
                  </div>
                </div>
              )}
              
              {/* Streaming Indicator */}
              {streamingPayment && (
                <div className="absolute top-4 right-4 bg-[#1A1A24] px-3 py-2 rounded-lg flex items-center border border-green-500/30">
                  <IoIosFlash className="text-green-500 mr-2 animate-pulse" />
                  <div>
                    <p className="text-white text-sm font-medium">Streaming: {streamAmount} sats/sec</p>
                    <p className="text-white/60 text-xs">Total: {totalStreamed} sats</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              {transactionTypes.map(type => (
                <button
                  key={type.id}
                  className={`p-4 rounded-lg flex flex-col items-center justify-center text-center transition-all ${
                    activeDemo === type.id 
                      ? 'bg-yellow-500/20 border border-yellow-500/30' 
                      : 'bg-[#1A1A24] border border-white/5 hover:bg-[#20202A]'
                  }`}
                  onClick={() => setActiveDemo(type.id)}
                >
                  <type.icon className={`text-2xl mb-2 ${activeDemo === type.id ? 'text-yellow-500' : 'text-white/70'}`} />
                  <h4 className="text-white text-sm font-medium mb-1">{type.name}</h4>
                  <p className="text-white/50 text-xs">{type.description}</p>
                </button>
              ))}
            </div>
            
            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeDemo !== 'stream' ? (
                <div className="bg-[#1A1A24] rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <FaWallet className="text-yellow-500 mr-2" />
                    Send Payment
                  </h4>
                  
                  <div className="mb-4">
                    <label className="block text-white/70 text-sm mb-2">
                      Amount (satoshis)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={satoshiAmount}
                        onChange={(e) => setSatoshiAmount(Math.max(10, parseInt(e.target.value) || 0))}
                        className="w-full bg-[#12121A] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
                        min="10"
                        max="10000"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-500">
                        sats
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={startTransaction}
                    disabled={transactionState !== 'idle'}
                    className={`w-full py-2 rounded-lg flex items-center justify-center font-medium transition-colors ${
                      transactionState === 'idle'
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:opacity-90'
                        : 'bg-gray-700 text-white/50 cursor-not-allowed'
                    }`}
                  >
                    <FaBolt className="mr-2" />
                    Send Lightning Payment
                  </button>
                </div>
              ) : (
                <div className="bg-[#1A1A24] rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <IoIosFlash className="text-green-500 mr-2" />
                    Streaming Payments
                  </h4>
                  
                  <div className="mb-4">
                    <label className="block text-white/70 text-sm mb-2">
                      Rate (satoshis per second)
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={streamRate}
                        onChange={(e) => setStreamRate(parseInt(e.target.value))}
                        className="w-full accent-green-500"
                      />
                      <div className="flex justify-between text-white/60 text-xs">
                        <span>1 sat/s</span>
                        <span>{streamRate} sat/s</span>
                        <span>100 sat/s</span>
                      </div>
                    </div>
                  </div>
                  
                  {!streamingPayment ? (
                    <button
                      onClick={startStreaming}
                      className="w-full py-2 rounded-lg flex items-center justify-center font-medium bg-gradient-to-r from-green-500 to-green-600 text-white hover:opacity-90 transition-colors"
                    >
                      <IoIosFlash className="mr-2" />
                      Start Streaming Sats
                    </button>
                  ) : (
                    <button
                      onClick={stopStreaming}
                      className="w-full py-2 rounded-lg flex items-center justify-center font-medium bg-red-500 text-white hover:opacity-90 transition-colors"
                    >
                      Stop Streaming
                    </button>
                  )}
                </div>
              )}
              
              {/* Recent Transactions */}
              <div className="bg-[#1A1A24] rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Recent Transactions</h4>
                
                {recentTransactions.length === 0 ? (
                  <div className="text-center py-6 text-white/40">
                    No transactions yet
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-500/20 scrollbar-track-[#12121A]">
                    {recentTransactions.map(tx => (
                      <div key={tx.id} className="bg-[#12121A] rounded-lg p-2 text-sm flex justify-between">
                        <div className="flex items-center">
                          {tx.type === 'game' && <FaGamepad className="text-yellow-500 mr-2" />}
                          {tx.type === 'tip' && <FaUserAlt className="text-blue-500 mr-2" />}
                          {tx.type === 'stream' && <IoIosFlash className="text-green-500 mr-2" />}
                          <span className="text-white">{tx.amount} sats</span>
                        </div>
                        <div className="text-white/50">
                          {tx.status === 'streaming' ? (
                            <span className="text-green-500 animate-pulse">live</span>
                          ) : (
                            <>just now</>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right column - Info */}
          <div className="lg:col-span-4">
            <div className="bg-[#12121A] rounded-xl p-6 border border-white/5 mb-6">
              <h3 className="text-white text-lg font-medium mb-4 flex items-center">
                <FaBolt className="text-yellow-500 mr-2" />
                Lightning Network Benefits
              </h3>
              
              <ul className="space-y-4">
                <li className="flex">
                  <div className="mr-3 text-yellow-500">
                    <FaRocket />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Instant Settlements</h4>
                    <p className="text-white/60 text-sm">
                      Lightning transactions confirm in milliseconds, not minutes, enabling real-time gaming payouts.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="mr-3 text-yellow-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 11a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2-1a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Microscopic Fees</h4>
                    <p className="text-white/60 text-sm">
                      Transactions cost fractions of a cent, making even tiny payments economical for gameplay.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="mr-3 text-yellow-500">
                    <IoIosFlash size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Streaming Payments</h4>
                    <p className="text-white/60 text-sm">
                      Unique to Lightning: continuous payment streams while playing, tipping, or earning rewards.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#12121A] rounded-xl p-6 border border-white/5">
              <h3 className="text-white text-lg font-medium mb-4">Gaming Applications</h3>
              
              <div className="space-y-4">
                <div className="bg-[#1A1A24] rounded-lg p-3">
                  <h4 className="text-white font-medium mb-1 flex items-center">
                    <FaGamepad className="text-yellow-500 mr-2" />
                    Pay-per-Action Gaming
                  </h4>
                  <p className="text-white/60 text-sm">
                    Pay small amounts for each move or action, creating true micro-transactions for gaming.
                  </p>
                </div>
                
                <div className="bg-[#1A1A24] rounded-lg p-3">
                  <h4 className="text-white font-medium mb-1 flex items-center">
                    <FaUserAlt className="text-yellow-500 mr-2" />
                    Audience Participation
                  </h4>
                  <p className="text-white/60 text-sm">
                    Viewers can tip players in real-time or influence gameplay with satoshi votes.
                  </p>
                </div>
                
                <div className="bg-[#1A1A24] rounded-lg p-3">
                  <h4 className="text-white font-medium mb-1 flex items-center">
                    <FaExchangeAlt className="text-yellow-500 mr-2" />
                    Prize Distribution
                  </h4>
                  <p className="text-white/60 text-sm">
                    Instantly distribute tournament prizes to multiple winners without delays.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg p-4 border border-yellow-500/30">
                <h4 className="text-white font-medium mb-2 flex items-center">
                  <FaBitcoin className="text-yellow-500 mr-2" />
                  Try Lightning Now
                </h4>
                <p className="text-white/70 text-sm mb-3">
                  Experience Bitcoin Lightning payments with wallets like Muun, Phoenix, or Wallet of Satoshi.
                </p>
                <button className="w-full py-2 rounded-lg bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition-colors">
                  Connect Lightning Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LightningNetworkVisualizer; 