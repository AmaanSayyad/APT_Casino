'use client';
import { useState } from 'react';
import { FaShieldAlt, FaBolt, FaEye, FaEyeSlash, FaChevronRight, FaLock } from 'react-icons/fa';

const RebarShieldIntegration = () => {
  const [activeTab, setActiveTab] = useState('private');
  const [showDemo, setShowDemo] = useState(false);
  const [txStatus, setTxStatus] = useState('idle'); // idle, sending, confirmed, failed
  const [txHash, setTxHash] = useState('');
  const [useShield, setUseShield] = useState(true);
  
  // Simulated transaction using Rebar Shield
  const simulateTransaction = () => {
    setTxStatus('sending');
    setTxHash('');
    
    // Simulate network delay
    setTimeout(() => {
      if (useShield) {
        // Faster confirmation with Rebar Shield
        setTxStatus('confirmed');
        setTxHash('0x7f4e9c511da6d1c1b2986f898254b927b337d9189a9a4f59a3bd3f8b03344f86');
      } else {
        // Slower confirmation without Rebar Shield
        setTimeout(() => {
          setTxStatus('confirmed');
          setTxHash('0x9c2e4b74c6b3d1b7f78d5b3c3e65c1b7f8a2e5d989a3b5c1d1e1f4a6b7c8d9e0');
        }, 12000); // Simulate longer wait time
      }
    }, useShield ? 3000 : 6000);
  };
  
  // Reset simulation
  const resetDemo = () => {
    setTxStatus('idle');
    setTxHash('');
  };
  
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#0D0D10] relative">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#1A1A21]/20 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-indigo-500/10 p-3 rounded-full mb-4">
            <FaShieldAlt className="text-indigo-500 text-2xl" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-3">Private Transactions with Rebar Shield</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            APT Casino uses Rebar Shield technology to submit your transactions directly to Bitcoin mining pools,
            bypassing the public mempool for faster settlement and enhanced privacy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left column - Advantages */}
          <div className="lg:col-span-5">
            <div className="bg-[#15151C] rounded-xl p-6 mb-6">
              <h3 className="text-white text-xl font-medium mb-4">Advantages of Rebar Shield</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-indigo-500">
                    <FaBolt />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Faster Game Settlements</h4>
                    <p className="text-white/60 text-sm">
                      Transactions are sent directly to mining pools, reducing confirmation times by up to 80% 
                      compared to standard mempool transactions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-indigo-500">
                    <FaEyeSlash />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Enhanced Privacy</h4>
                    <p className="text-white/60 text-sm">
                      Your gaming transactions remain private until they appear in a block, preventing potential
                      front-running and protecting your gaming strategy.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 text-indigo-500">
                    <FaLock />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">VIP Gaming Rooms</h4>
                    <p className="text-white/60 text-sm">
                      Access exclusive high-stakes games with private transactions that keep your betting 
                      activity confidential until settled on-chain.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#15151C] rounded-xl p-6">
              <h3 className="text-white text-lg font-medium mb-4">How It Works with Alkanes</h3>
              
              <ol className="space-y-6 relative before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-20px)] before:w-[2px] before:bg-indigo-900/30">
                <li className="pl-10 relative">
                  <div className="absolute left-0 top-1 w-[30px] h-[30px] rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <span className="text-indigo-500 font-medium">1</span>
                  </div>
                  <h4 className="text-white font-medium mb-1">Transaction Creation</h4>
                  <p className="text-white/60 text-sm">
                    Your game action is converted to a Bitcoin transaction on the Alkanes smart contract platform.
                  </p>
                </li>
                
                <li className="pl-10 relative">
                  <div className="absolute left-0 top-1 w-[30px] h-[30px] rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <span className="text-indigo-500 font-medium">2</span>
                  </div>
                  <h4 className="text-white font-medium mb-1">Rebar Shield Processing</h4>
                  <p className="text-white/60 text-sm">
                    The transaction is encrypted and sent directly to mining pools via Rebar Shield's private channels.
                  </p>
                </li>
                
                <li className="pl-10 relative">
                  <div className="absolute left-0 top-1 w-[30px] h-[30px] rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <span className="text-indigo-500 font-medium">3</span>
                  </div>
                  <h4 className="text-white font-medium mb-1">Priority Mining</h4>
                  <p className="text-white/60 text-sm">
                    Miners receive and include your transaction with priority, bypassing the public mempool.
                  </p>
                </li>
                
                <li className="pl-10 relative">
                  <div className="absolute left-0 top-1 w-[30px] h-[30px] rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <span className="text-indigo-500 font-medium">4</span>
                  </div>
                  <h4 className="text-white font-medium mb-1">Fast Confirmation</h4>
                  <p className="text-white/60 text-sm">
                    Your game action is confirmed faster, appearing directly in a block without mempool exposure.
                  </p>
                </li>
              </ol>
            </div>
          </div>
          
          {/* Right column - Interactive Demo */}
          <div className="lg:col-span-7">
            <div className="bg-[#15151C] rounded-xl p-6 h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white text-xl font-medium">Transaction Privacy Demo</h3>
                <div className="flex border border-white/10 rounded-lg overflow-hidden">
                  <button
                    className={`px-4 py-2 text-sm ${activeTab === 'private' ? 'bg-indigo-500 text-white' : 'bg-transparent text-white/60'}`}
                    onClick={() => setActiveTab('private')}
                  >
                    Private
                  </button>
                  <button
                    className={`px-4 py-2 text-sm ${activeTab === 'standard' ? 'bg-indigo-500 text-white' : 'bg-transparent text-white/60'}`}
                    onClick={() => setActiveTab('standard')}
                  >
                    Standard
                  </button>
                </div>
              </div>
              
              <div className="bg-[#0A0A12] rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h4 className="text-white font-medium mb-1">
                      {activeTab === 'private' ? 'Rebar Shield Transaction' : 'Standard Mempool Transaction'}
                    </h4>
                    <p className="text-white/60 text-sm">
                      {activeTab === 'private' 
                        ? 'Your transaction goes directly to miners, bypassing the public mempool'
                        : 'Your transaction is visible in the public mempool before confirmation'}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-white/60 mr-2">Use Rebar Shield</span>
                    <div 
                      className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer ${useShield ? 'bg-indigo-500' : 'bg-gray-700'}`}
                      onClick={() => setUseShield(!useShield)}
                    >
                      <div 
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${useShield ? 'translate-x-6' : ''}`}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {/* Transaction Simulation */}
                {!showDemo ? (
                  <div className="text-center py-10">
                    <p className="text-white/70 mb-6">
                      This demo shows how Rebar Shield provides faster and more private transactions
                      compared to standard Bitcoin transactions.
                    </p>
                    <button
                      className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                      onClick={() => setShowDemo(true)}
                    >
                      Start Demo
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="h-[200px] bg-[#0D0D14] rounded-lg p-4 mb-4 flex flex-col justify-center items-center">
                      {txStatus === 'idle' && (
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center bg-indigo-500/10 p-3 rounded-full mb-4">
                            {useShield ? <FaShieldAlt className="text-indigo-500 text-xl" /> : <FaEye className="text-amber-500 text-xl" />}
                          </div>
                          <h5 className="text-white font-medium mb-2">
                            {useShield ? 'Private Transaction Ready' : 'Standard Transaction Ready'}
                          </h5>
                          <p className="text-white/60 text-sm mb-4">
                            {useShield 
                              ? 'This transaction will be sent directly to miners using Rebar Shield' 
                              : 'This transaction will be sent to the public mempool first'}
                          </p>
                          <button
                            className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
                            onClick={simulateTransaction}
                          >
                            Submit Transaction
                          </button>
                        </div>
                      )}
                      
                      {txStatus === 'sending' && (
                        <div className="text-center">
                          <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                          <h5 className="text-white font-medium mb-2">
                            {useShield ? 'Sending via Rebar Shield...' : 'Broadcasting to Mempool...'}
                          </h5>
                          <p className="text-white/60 text-sm">
                            {useShield 
                              ? 'Your transaction is being sent directly to mining pools' 
                              : 'Your transaction is being broadcast to the public mempool'}
                          </p>
                        </div>
                      )}
                      
                      {txStatus === 'confirmed' && (
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center bg-green-500/10 p-3 rounded-full mb-4">
                            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <h5 className="text-white font-medium mb-2">Transaction Confirmed!</h5>
                          <p className="text-white/60 text-sm">
                            {useShield 
                              ? 'Confirmed quickly via direct mining pool submission' 
                              : 'Confirmed after standard mempool processing'}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {txStatus === 'confirmed' && (
                      <div className="bg-[#0D0D14] rounded-lg p-4 mb-4">
                        <h5 className="text-white/80 text-sm mb-2">Transaction Hash</h5>
                        <div className="bg-[#0A0A10] p-3 rounded font-mono text-xs text-white/70 overflow-x-auto">
                          {txHash}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <div className="text-white/70 text-sm">
                        {useShield 
                          ? 'Rebar Shield: ~60% faster confirmation times' 
                          : 'Standard: Regular Bitcoin confirmation times'}
                      </div>
                      <button
                        className="text-indigo-400 hover:text-indigo-300 text-sm"
                        onClick={resetDemo}
                      >
                        Reset Demo
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 rounded-xl p-6">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <span className="text-xl mr-2">✨</span>
                  Exclusive VIP Gaming with Rebar Shield
                </h4>
                <p className="text-white/70 mb-4">
                  APT Casino's VIP gaming rooms leverage Rebar Shield on Alkanes to provide high-stakes
                  players with the fastest and most private gaming experience on Bitcoin.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-white/70 text-sm">
                    <FaChevronRight className="text-indigo-400 mr-2" size={10} />
                    <span>High-value transactions remain private until confirmed</span>
                  </li>
                  <li className="flex items-center text-white/70 text-sm">
                    <FaChevronRight className="text-indigo-400 mr-2" size={10} />
                    <span>Highest priority in mining pools for fastest gameplay</span>
                  </li>
                  <li className="flex items-center text-white/70 text-sm">
                    <FaChevronRight className="text-indigo-400 mr-2" size={10} />
                    <span>Protection from transaction analysis and strategy monitoring</span>
                  </li>
                </ul>
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-6 py-3 rounded-lg transition-all">
                  Access VIP Rooms
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RebarShieldIntegration; 