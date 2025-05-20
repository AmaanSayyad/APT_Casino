'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FaLink, FaServer, FaNetworkWired, FaRocket, FaArrowRight } from 'react-icons/fa';

const BIP300Integration = () => {
  const [activeStep, setActiveStep] = useState(1);
  
  const steps = [
    {
      id: 1,
      title: "Sidechain Connection",
      description: "The APT Casino gaming sidechain connects to Bitcoin through LayerTwo Labs' BIP300 implementation, creating a secure two-way peg."
    },
    {
      id: 2,
      title: "Merged Mining Security",
      description: "The sidechain is secured by Bitcoin miners through merged mining, providing the same security guarantees as the main Bitcoin blockchain."
    },
    {
      id: 3,
      title: "Fast Game Execution",
      description: "Games execute on the high-throughput sidechain, enabling instant gameplay while maintaining Bitcoin's security model."
    },
    {
      id: 4,
      title: "Verified Settlements",
      description: "Game outcomes and rewards are settled on the sidechain with cryptographic proofs linked to Bitcoin, ensuring transparent and verifiable results."
    }
  ];
  
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 relative overflow-hidden" style={{background: 'linear-gradient(180deg, #080810 0%, #100825 100%)'}}>
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-full h-full">
        <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-purple-600/5 blur-[100px]"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-blue-600/5 blur-[100px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-purple-500/10 p-3 rounded-full mb-4">
            <FaLink className="text-stacks-purple text-2xl" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-3">LayerTwo Labs P2P Sidechain</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            APT Casino leverages BIP300 sidechains by LayerTwo Labs to provide lightning-fast gameplay
            with Bitcoin's unmatched security guarantees.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left column - Sidechain visualization */}
          <div className="lg:col-span-6">
            <div className="relative h-[450px] bg-[#0A0A16] rounded-2xl p-6 overflow-hidden border border-white/5">
              {/* Sidechain visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Bitcoin layer */}
                <div className="absolute bottom-16 w-[80%] h-20 bg-bitcoin-orange/10 rounded-xl border border-bitcoin-orange/30 flex items-center justify-center text-white">
                  <FaNetworkWired className="mr-2 text-bitcoin-orange" />
                  <span className="font-medium">Bitcoin Mainchain</span>
                </div>
                
                {/* Sidechain layer */}
                <div className="absolute top-40 w-[80%] h-20 bg-stacks-purple/10 rounded-xl border border-stacks-purple/30 flex items-center justify-center text-white">
                  <FaServer className="mr-2 text-stacks-purple" />
                  <span className="font-medium">Gaming Sidechain (BIP300)</span>
                </div>
                
                {/* Connecting arrows */}
                <div className="absolute left-[30%] h-[200px] w-1 bg-gradient-to-b from-bitcoin-orange to-stacks-purple"></div>
                <div className="absolute right-[30%] h-[200px] w-1 bg-gradient-to-t from-bitcoin-orange to-stacks-purple"></div>
                
                {/* Connection points */}
                <div className="absolute left-[30%] bottom-16 transform translate-y-2 w-3 h-3 rounded-full bg-bitcoin-orange"></div>
                <div className="absolute left-[30%] top-40 transform -translate-y-2 w-3 h-3 rounded-full bg-stacks-purple"></div>
                <div className="absolute right-[30%] bottom-16 transform translate-y-2 w-3 h-3 rounded-full bg-bitcoin-orange"></div>
                <div className="absolute right-[30%] top-40 transform -translate-y-2 w-3 h-3 rounded-full bg-stacks-purple"></div>
                
                {/* Data flow animation */}
                <div className="absolute left-[30%] animate-flow-up">
                  <div className="w-2 h-2 rounded-full bg-bitcoin-orange"></div>
                </div>
                <div className="absolute right-[30%] animate-flow-down">
                  <div className="w-2 h-2 rounded-full bg-stacks-purple"></div>
                </div>
                
                {/* Game instance */}
                <div className="absolute top-20 right-[35%] w-24 h-24 bg-[#131326] rounded-lg border border-stacks-purple/40 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-2xl">🎮</span>
                    <p className="text-white/80 text-xs mt-1">Mines Game</p>
                  </div>
                </div>
                
                <div className="absolute top-20 left-[35%] w-24 h-24 bg-[#131326] rounded-lg border border-stacks-purple/40 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-2xl">🎲</span>
                    <p className="text-white/80 text-xs mt-1">Dice Game</p>
                  </div>
                </div>
              </div>
              
              {/* Caption */}
              <div className="absolute bottom-6 inset-x-6">
                <div className="bg-[#0F0F1A] rounded-xl p-4 border border-white/10">
                  <h4 className="text-white font-medium mb-1 flex items-center">
                    <FaRocket className="text-stacks-purple mr-2" size={14} />
                    Lightning-Fast Gaming on Bitcoin
                  </h4>
                  <p className="text-white/60 text-sm">
                    BIP300 enables our games to run at high speeds while maintaining Bitcoin's security guarantees
                    through cryptographic verification and merged mining.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Features */}
          <div className="lg:col-span-6">
            <div className="bg-[#0A0A16] rounded-2xl p-6 border border-white/5">
              <h3 className="text-white text-xl font-medium mb-6">How BIP300 Powers Our Games</h3>
              
              {/* Steps */}
              <div className="space-y-6">
                {steps.map((step) => (
                  <div 
                    key={step.id}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      activeStep === step.id 
                        ? 'bg-stacks-purple/10 border border-stacks-purple/30' 
                        : 'bg-[#12121E] hover:bg-[#15152A]'
                    }`}
                    onClick={() => setActiveStep(step.id)}
                  >
                    <div className="flex items-start">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                        activeStep === step.id ? 'bg-stacks-purple text-white' : 'bg-[#1D1D32] text-white/60'
                      }`}>
                        <span>{step.id}</span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">{step.title}</h4>
                        <p className="text-white/60 text-sm">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Tech details for active step */}
              <div className="mt-6 p-4 bg-[#0F0F1A] rounded-xl border border-white/10">
                <h4 className="text-white font-medium mb-2">Technical Details</h4>
                
                {activeStep === 1 && (
                  <p className="text-white/70 text-sm">
                    BIP300 creates a two-way peg between Bitcoin and our gaming sidechain through a cryptographic
                    verification system that requires miners to validate withdrawals, providing robust security 
                    without centralized components or federation.
                  </p>
                )}
                
                {activeStep === 2 && (
                  <p className="text-white/70 text-sm">
                    Miners simultaneously mine both Bitcoin and our sidechain through merged mining, providing the full 
                    hashpower of Bitcoin to secure our gaming platform. This prevents double-spending attacks without 
                    requiring a separate token.
                  </p>
                )}
                
                {activeStep === 3 && (
                  <p className="text-white/70 text-sm">
                    Our gaming sidechain processes transactions in seconds rather than minutes, allowing for instant 
                    gameplay while maintaining cryptographic links to Bitcoin for final settlement. The sidechain 
                    can handle thousands of transactions per second.
                  </p>
                )}
                
                {activeStep === 4 && (
                  <p className="text-white/70 text-sm">
                    Every game outcome is cryptographically verified and linked to Bitcoin through the BIP300 
                    protocol. Players can verify results independently using LayerTwo Labs' verification tools 
                    to confirm the fairness of each game.
                  </p>
                )}
              </div>
              
              {/* CTA */}
              <div className="mt-6">
                <button className="flex items-center justify-center w-full bg-gradient-to-r from-stacks-purple to-blue-500 text-white font-medium py-3 px-6 rounded-xl hover:opacity-90 transition-opacity">
                  <span>Experience Lightning-Fast Gaming</span>
                  <FaArrowRight className="ml-2" size={14} />
                </button>
                <p className="text-center text-white/40 text-xs mt-2">
                  Powered by LayerTwo Labs' BIP300 Implementation
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
          <div className="bg-[#0A0A16] rounded-xl p-4 border border-white/5">
            <p className="text-white/60 text-sm">Throughput</p>
            <p className="text-white text-2xl font-bold">5,000+ TPS</p>
            <p className="text-white/40 text-xs">Transactions per second</p>
          </div>
          
          <div className="bg-[#0A0A16] rounded-xl p-4 border border-white/5">
            <p className="text-white/60 text-sm">Confirmation Time</p>
            <p className="text-white text-2xl font-bold">~3 seconds</p>
            <p className="text-white/40 text-xs">Average block time</p>
          </div>
          
          <div className="bg-[#0A0A16] rounded-xl p-4 border border-white/5">
            <p className="text-white/60 text-sm">Security</p>
            <p className="text-white text-2xl font-bold">100%</p>
            <p className="text-white/40 text-xs">Of Bitcoin's hashpower</p>
          </div>
          
          <div className="bg-[#0A0A16] rounded-xl p-4 border border-white/5">
            <p className="text-white/60 text-sm">Games</p>
            <p className="text-white text-2xl font-bold">12+</p>
            <p className="text-white/40 text-xs">BIP300-powered games</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BIP300Integration; 