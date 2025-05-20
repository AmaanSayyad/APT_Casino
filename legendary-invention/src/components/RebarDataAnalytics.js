'use client';
import { useState } from 'react';
import { FaChartBar, FaChartLine, FaChartPie, FaSearch } from 'react-icons/fa';

const RebarDataAnalytics = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  
  // Mock data for visualization
  const transactionData = [65, 59, 80, 81, 56, 55, 40, 45, 60, 75, 85, 90];
  const blockData = [1450, 1410, 1520, 1600, 1550, 1490, 1470, 1510, 1540, 1580, 1620, 1670];
  const gameStats = {
    totalGames: "347,829",
    avgBetSize: "0.0045 BTC",
    largestWin: "1.24 BTC",
    fairnessScore: "99.97%"
  };
  
  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Generate random data for charts
  const generateRandomData = (min, max, count) => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1) + min));
  };
  
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#080810] relative">
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-teal-500/10 p-3 rounded-full mb-4">
            <FaChartBar className="text-exsat-teal text-2xl" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-3">Blockchain Analytics with Rebar Data</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Leveraging Rebar Data's comprehensive Bitcoin and metaprotocol APIs to provide
            real-time insights and verifiable game outcomes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Stats cards */}
          <div className="bg-[#10101A] rounded-xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Games Played</h3>
              <div className="text-exsat-teal">
                <FaChartLine />
              </div>
            </div>
            <p className="text-2xl md:text-3xl text-white font-bold mb-2">{gameStats.totalGames}</p>
            <div className="flex items-center text-green-500 text-sm">
              <span className="mr-1">+12.4%</span>
              <span className="text-white/60 ml-1">vs. last month</span>
            </div>
          </div>
          
          <div className="bg-[#10101A] rounded-xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Average Bet Size</h3>
              <div className="text-exsat-teal">
                <FaChartPie />
              </div>
            </div>
            <p className="text-2xl md:text-3xl text-white font-bold mb-2">{gameStats.avgBetSize}</p>
            <div className="flex items-center text-green-500 text-sm">
              <span className="mr-1">+5.7%</span>
              <span className="text-white/60 ml-1">vs. last month</span>
            </div>
          </div>
          
          <div className="bg-[#10101A] rounded-xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Fairness Score</h3>
              <div className="text-exsat-teal">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="text-2xl md:text-3xl text-white font-bold mb-2">{gameStats.fairnessScore}</p>
            <div className="flex items-center text-green-500 text-sm">
              <span className="mr-1">+0.2%</span>
              <span className="text-white/60 ml-1">vs. last month</span>
            </div>
          </div>
        </div>
        
        {/* Analytics Dashboard */}
        <div className="bg-[#10101A] rounded-xl p-6 border border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h3 className="text-white text-xl font-medium mb-4 md:mb-0">Bitcoin Network Insights</h3>
            
            {/* Tabs */}
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1.5 text-sm rounded-lg ${activeTab === 'transactions' ? 'bg-exsat-teal text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                onClick={() => setActiveTab('transactions')}
              >
                Transactions
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded-lg ${activeTab === 'blocks' ? 'bg-exsat-teal text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                onClick={() => setActiveTab('blocks')}
              >
                Block Size
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded-lg ${activeTab === 'games' ? 'bg-exsat-teal text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                onClick={() => setActiveTab('games')}
              >
                Game Outcomes
              </button>
            </div>
          </div>
          
          {/* Transaction volume chart (simplified) */}
          {activeTab === 'transactions' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-white/70 text-sm">Daily Transaction Volume (Last 12 Days)</p>
                <p className="text-exsat-teal text-sm font-medium">Data from Rebar Data API</p>
              </div>
              <div className="h-80 relative">
                {/* Chart - simplified with div bars */}
                <div className="absolute bottom-0 left-0 right-0 h-64 flex items-end space-x-2">
                  {transactionData.map((value, index) => (
                    <div 
                      key={index} 
                      className="flex-1 bg-gradient-to-t from-exsat-teal/80 to-blue-500/30 rounded-t-sm" 
                      style={{ height: `${(value / 100) * 100}%` }}
                    ></div>
                  ))}
                </div>
                
                {/* X-axis labels */}
                <div className="absolute bottom-[-24px] left-0 right-0 flex justify-between text-white/40 text-xs">
                  {transactionData.map((_, index) => (
                    <div key={index} className="text-center">
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Block size chart */}
          {activeTab === 'blocks' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-white/70 text-sm">Bitcoin Block Size (Last 12 Blocks)</p>
                <p className="text-exsat-teal text-sm font-medium">Data from Rebar Data API</p>
              </div>
              <div className="h-80 relative">
                {/* Chart - simplified with div line */}
                <div className="absolute bottom-0 left-0 right-0 h-64">
                  <div className="relative h-full w-full">
                    {/* Line chart */}
                    <svg className="w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="none">
                      <path
                        d={`M0,${300 - (blockData[0] / 1700) * 300} ${blockData.map((value, index) => 
                          `L${(index + 1) * (1200 / blockData.length)},${300 - (value / 1700) * 300}`
                        ).join(' ')}`}
                        fill="none"
                        stroke="#00A0B0"
                        strokeWidth="3"
                      />
                    </svg>
                    
                    {/* Data points */}
                    {blockData.map((value, index) => (
                      <div 
                        key={index}
                        className="absolute w-3 h-3 bg-exsat-teal rounded-full transform -translate-x-1.5 -translate-y-1.5"
                        style={{ 
                          left: `${(index * (100 / (blockData.length - 1)))}%`, 
                          bottom: `${(value / 1700) * 100}%` 
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                {/* X-axis labels */}
                <div className="absolute bottom-[-24px] left-0 right-0 flex justify-between text-white/40 text-xs">
                  {blockData.map((_, index) => (
                    <div key={index} className="text-center">
                      #{formatNumber(740000 + index)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Game outcomes */}
          {activeTab === 'games' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-white/70 text-sm">Verified Game Outcomes (Last 24 Hours)</p>
                <p className="text-exsat-teal text-sm font-medium">Data from Rebar Data API</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <div className="bg-[#0A0A14] rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Outcome Distribution</h4>
                  
                  {/* Pie chart simulation */}
                  <div className="flex items-center justify-center py-4">
                    <div className="relative w-40 h-40">
                      {/* Pie sections */}
                      <div className="absolute inset-0 rounded-full border-[16px] border-blue-500/70" style={{ clipPath: 'polygon(50% 50%, 0 0, 0 100%, 100% 100%, 100% 0)' }}></div>
                      <div className="absolute inset-0 rounded-full border-[16px] border-red-500/70" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 50%, 50% 50%)' }}></div>
                      <div className="absolute inset-0 rounded-full border-[16px] border-green-500/70" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[calc(100%-32px)] h-[calc(100%-32px)] rounded-full bg-[#0A0A14]"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500/70 rounded-full mr-2"></div>
                      <span className="text-white/70 text-xs">Wins (24%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500/70 rounded-full mr-2"></div>
                      <span className="text-white/70 text-xs">Losses (64%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500/70 rounded-full mr-2"></div>
                      <span className="text-white/70 text-xs">Draws (12%)</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#0A0A14] rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Transaction Verification</h4>
                  
                  <div className="flex items-center justify-between p-2 bg-[#15151F] rounded mb-2">
                    <div className="text-xs text-white/60">Game ID</div>
                    <div className="text-xs text-white/60">Status</div>
                  </div>
                  
                  {/* Recent verifications */}
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-2 border-b border-white/5 last:border-0">
                      <div className="text-xs text-white/80 font-mono">game_7a2e{Math.floor(Math.random() * 10000)}</div>
                      <div className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">Verified</div>
                    </div>
                  ))}
                  
                  <div className="mt-4">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search transaction by ID..." 
                        className="w-full bg-[#15151F] text-white/80 text-sm rounded-lg pl-10 pr-4 py-2 border border-white/5 focus:outline-none focus:border-exsat-teal"
                      />
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-[#0A0A14] rounded-lg border border-exsat-teal/30">
                <h4 className="text-white font-medium mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-exsat-teal" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Rebar Data Verification
                </h4>
                <p className="text-white/70 text-sm">
                  All game outcomes are verified through Rebar Data's Bitcoin API, ensuring complete transparency and
                  cryptographic proof of fairness. Every transaction is independently verifiable on the Bitcoin blockchain.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-[#10101A] rounded-xl p-6 border border-white/5">
            <div className="w-12 h-12 rounded-full bg-exsat-teal/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-exsat-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-medium mb-2">Blockchain Verification</h3>
            <p className="text-white/60 text-sm">
              Every game outcome is recorded on the Bitcoin blockchain using Rebar Data's
              comprehensive APIs, ensuring permanent and immutable records.
            </p>
          </div>
          
          <div className="bg-[#10101A] rounded-xl p-6 border border-white/5">
            <div className="w-12 h-12 rounded-full bg-exsat-teal/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-exsat-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-medium mb-2">Real-time Analytics</h3>
            <p className="text-white/60 text-sm">
              Access real-time game statistics and blockchain metrics through our
              dashboard, powered by Rebar Data's comprehensive Bitcoin data suite.
            </p>
          </div>
          
          <div className="bg-[#10101A] rounded-xl p-6 border border-white/5">
            <div className="w-12 h-12 rounded-full bg-exsat-teal/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-exsat-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-medium mb-2">Export & Audit</h3>
            <p className="text-white/60 text-sm">
              Export your game history and transactions for personal record-keeping
              or independent verification against the Bitcoin blockchain.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RebarDataAnalytics; 