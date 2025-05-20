'use client';
import { useState, useEffect } from 'react';
import { FaBitcoin, FaChartLine, FaLock, FaExchangeAlt } from 'react-icons/fa';
import Link from 'next/link';

const SBTCIntegration = () => {
  const [activeTab, setActiveTab] = useState('stake');
  const [stakeAmount, setStakeAmount] = useState('');
  const [stakeDuration, setStakeDuration] = useState('30');
  const [estimatedRewards, setEstimatedRewards] = useState(0);
  const [userStakes, setUserStakes] = useState([
    { id: 1, amount: "0.025", apy: "8.5%", duration: "30 days", rewards: "0.000582", started: "2023-05-10", status: "active" },
    { id: 2, amount: "0.075", apy: "12.2%", duration: "90 days", rewards: "0.006279", started: "2023-04-02", status: "active" }
  ]);
  
  // Calculate estimated rewards based on stake amount and duration
  useEffect(() => {
    if (stakeAmount && stakeDuration) {
      // Basic APY calculation (would be more complex in real implementation)
      const baseApy = 6.5; // Base APY
      let bonusApy = 0;
      
      // Bonus APY based on duration
      if (stakeDuration === '30') bonusApy = 2;
      else if (stakeDuration === '90') bonusApy = 5.5;
      else if (stakeDuration === '180') bonusApy = 9;
      else if (stakeDuration === '365') bonusApy = 12;
      
      // Calculate daily rewards
      const totalApy = baseApy + bonusApy;
      const dailyRate = totalApy / 365 / 100;
      const days = parseInt(stakeDuration);
      const principal = parseFloat(stakeAmount);
      
      // Simplified compound interest calculation
      const rewards = principal * (Math.pow(1 + dailyRate, days) - 1);
      setEstimatedRewards(rewards.toFixed(8));
    } else {
      setEstimatedRewards(0);
    }
  }, [stakeAmount, stakeDuration]);
  
  // Handle stake submission
  const handleStake = (e) => {
    e.preventDefault();
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return;
    
    // In real implementation, this would call the sBTC smart contract
    alert(`Staking ${stakeAmount} BTC for ${stakeDuration} days using sBTC on Stacks`);
    
    // Mock adding to user stakes
    const newStake = {
      id: userStakes.length + 1,
      amount: stakeAmount,
      apy: `${(6.5 + (stakeDuration === '30' ? 2 : stakeDuration === '90' ? 5.5 : stakeDuration === '180' ? 9 : 12)).toFixed(1)}%`,
      duration: `${stakeDuration} days`,
      rewards: estimatedRewards,
      started: new Date().toISOString().split('T')[0],
      status: "active"
    };
    
    setUserStakes([...userStakes, newStake]);
    setStakeAmount('');
  };
  
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#0A0A0E] relative">
      <div className="absolute top-0 right-0 w-full h-full bg-[url('/images/btc-pattern.png')] opacity-5 z-0"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-center mb-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-bitcoin-orange rounded-full p-3 mb-4">
              <FaBitcoin className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-display font-bold text-white mb-2">Stake & Play with sBTC</h2>
            <p className="text-white/60 max-w-2xl text-center">
              Use Stacks' sBTC to earn Bitcoin yield while playing your favorite games. Your Bitcoin works for you even while you're having fun!
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          {/* Left column - Staking Form */}
          <div className="lg:col-span-5">
            <div className="p-[1px] bg-gradient-to-r from-bitcoin-orange to-blue-magic rounded-xl">
              <div className="bg-[#111116] rounded-xl p-6">
                {/* Tabs */}
                <div className="flex mb-6 border-b border-white/10">
                  <button 
                    className={`pb-3 px-4 text-sm font-medium ${activeTab === 'stake' ? 'text-bitcoin-orange border-b-2 border-bitcoin-orange' : 'text-white/60 hover:text-white'}`}
                    onClick={() => setActiveTab('stake')}
                  >
                    Stake Bitcoin
                  </button>
                  <button 
                    className={`pb-3 px-4 text-sm font-medium ${activeTab === 'unstake' ? 'text-bitcoin-orange border-b-2 border-bitcoin-orange' : 'text-white/60 hover:text-white'}`}
                    onClick={() => setActiveTab('unstake')}
                  >
                    Unstake
                  </button>
                </div>
                
                {/* Staking Form */}
                {activeTab === 'stake' && (
                  <form onSubmit={handleStake}>
                    <div className="mb-4">
                      <label className="block text-white/80 text-sm mb-2">
                        Amount to Stake (BTC)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.001"
                          placeholder="0.01"
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(e.target.value)}
                          className="w-full bg-[#1A1A24] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-bitcoin-orange"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bitcoin-orange">
                          <FaBitcoin />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-white/80 text-sm mb-2">
                        Staking Duration
                      </label>
                      <select
                        value={stakeDuration}
                        onChange={(e) => setStakeDuration(e.target.value)}
                        className="w-full bg-[#1A1A24] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-bitcoin-orange"
                      >
                        <option value="30">30 Days (8.5% APY)</option>
                        <option value="90">90 Days (12.0% APY)</option>
                        <option value="180">180 Days (15.5% APY)</option>
                        <option value="365">365 Days (18.5% APY)</option>
                      </select>
                    </div>
                    
                    <div className="p-4 bg-[#1A1A24] rounded-lg mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-white/60">Estimated Rewards</span>
                        <span className="text-white font-medium">{estimatedRewards} BTC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Rewards Frequency</span>
                        <span className="text-white font-medium">Daily</span>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-bitcoin-orange to-yellow-500 text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
                    >
                      <FaLock className="mr-2" />
                      Stake with sBTC
                    </button>
                    
                    <p className="text-xs text-white/40 mt-3 text-center">
                      Your BTC will be converted to sBTC on the Stacks chain for staking
                    </p>
                  </form>
                )}
                
                {/* Unstake Form - simplified */}
                {activeTab === 'unstake' && (
                  <div className="py-6">
                    <p className="text-white/80 mb-6">
                      Select a stake to withdraw. Early unstaking may incur penalties.
                    </p>
                    
                    {userStakes.map(stake => (
                      <div key={stake.id} className="bg-[#1A1A24] rounded-lg p-4 mb-4 border border-white/5">
                        <div className="flex justify-between mb-2">
                          <span className="text-white/80">{stake.amount} BTC</span>
                          <span className="text-bitcoin-orange">{stake.apy} APY</span>
                        </div>
                        <div className="flex justify-between text-sm mb-3">
                          <span className="text-white/60">Started: {stake.started}</span>
                          <span className="text-white/60">{stake.duration}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
                            {stake.status}
                          </span>
                          <button className="text-sm bg-[#2A2A34] text-white/80 px-3 py-1 rounded-md hover:bg-[#3A3A44]">
                            Unstake
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right column - Benefits & Info */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-[#111116] rounded-xl p-6 border border-white/5">
                <div className="text-blue-400 mb-4">
                  <FaLock size={24} />
                </div>
                <h3 className="text-white text-lg font-medium mb-2">Secure Staking</h3>
                <p className="text-white/60 text-sm">
                  Your Bitcoin is converted to sBTC on the Stacks blockchain with 1:1 backing.
                  It's as secure as Bitcoin with the programmability of smart contracts.
                </p>
              </div>
              
              <div className="bg-[#111116] rounded-xl p-6 border border-white/5">
                <div className="text-green-400 mb-4">
                  <FaChartLine size={24} />
                </div>
                <h3 className="text-white text-lg font-medium mb-2">Earn While Playing</h3>
                <p className="text-white/60 text-sm">
                  Your staked Bitcoin earns yield even while you're playing games.
                  Double your chances to win with gameplay rewards and staking yields.
                </p>
              </div>
            </div>
            
            <div className="bg-[#111116] rounded-xl p-6 border border-white/5">
              <h3 className="text-white text-lg font-medium mb-4">How sBTC Works</h3>
              
              <div className="relative">
                {/* sBTC flow diagram */}
                <div className="grid grid-cols-3 gap-4 mt-6 mb-8 relative">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[#1A1A24] flex items-center justify-center mx-auto mb-3">
                      <FaBitcoin className="text-bitcoin-orange text-2xl" />
                    </div>
                    <h4 className="text-white text-sm font-medium">Your Bitcoin</h4>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[#1A1A24] flex items-center justify-center mx-auto mb-3">
                      <FaExchangeAlt className="text-blue-400 text-xl" />
                    </div>
                    <h4 className="text-white text-sm font-medium">Stacks Protocol</h4>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[#1A1A24] flex items-center justify-center mx-auto mb-3">
                      <div className="text-yellow-500 text-2xl font-bold">S</div>
                    </div>
                    <h4 className="text-white text-sm font-medium">sBTC</h4>
                  </div>
                  
                  {/* Connecting arrows */}
                  <div className="absolute left-[27%] top-1/2 transform -translate-y-1/2 w-[46%] h-[2px] bg-gradient-to-r from-bitcoin-orange to-blue-400"></div>
                </div>
                
                <p className="text-white/70 mb-6">
                  sBTC is a 1:1 Bitcoin-backed asset on the Stacks blockchain. It combines Bitcoin's security with 
                  the programmability of smart contracts. Your BTC is held in secure multi-sig wallets managed by a 
                  decentralized set of signers, and you receive the equivalent amount of sBTC to use with DeFi apps.
                </p>
                
                <Link href="/sbtc-learn-more">
                  <div className="inline-block">
                    <button className="text-bitcoin-orange hover:text-bitcoin-orange/90 font-medium flex items-center">
                      Learn more about sBTC
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SBTCIntegration; 