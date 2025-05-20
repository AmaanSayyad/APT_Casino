'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBitcoin, FaLock, FaShieldAlt, FaCheck } from 'react-icons/fa';

const ProvablyFairSection = () => {
  const [activeTab, setActiveTab] = useState(1);
  
  const steps = [
    {
      id: 1,
      title: 'Client Seed Generation',
      description: 'When you begin a game session, your browser generates a random client seed. This seed is hashed and stored, and you can verify it at any time.',
      icon: 'client-seed',
      technology: 'Base cryptography'
    },
    {
      id: 2,
      title: 'Server Seed + exSat Metadata',
      description: 'Our system generates a server seed that is secured through exSat\'s hybrid PoW+PoS consensus mechanism. This metadata is anchored to Bitcoin, making it tamper-proof and verifiable by anyone.',
      icon: 'server-seed',
      technology: 'exSat'
    },
    {
      id: 3,
      title: 'Game Result on Bitcoin Sidechain',
      description: 'Game outcomes are calculated on a BIP300 sidechain with merged-mining security. This gives you high-speed gameplay with Bitcoin\'s full security guarantees.',
      icon: 'calculation',
      technology: 'BIP300'
    },
    {
      id: 4,
      title: 'On-Chain Verification via Rebar Data',
      description: 'After each game, all data is published to the Bitcoin blockchain and accessible through Rebar Data\'s comprehensive APIs. Verify your game results directly against the Bitcoin ledger.',
      icon: 'verification',
      technology: 'Rebar Data'
    },
  ];
  
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 relative">
      {/* Background accents */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-red-magic/5 blur-[100px] z-0"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-magic/5 blur-[100px] z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center mb-8">
          <div className="w-1 h-6 bg-gradient-to-r from-red-magic to-blue-magic rounded-full mr-3"></div>
          <h2 className="text-2xl font-display font-bold text-white">Bitcoin-Powered Fairness</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left explanation column */}
          <div className="lg:col-span-5">
            <div className="p-[1px] bg-gradient-to-r from-red-magic to-blue-magic rounded-xl h-full">
              <div className="bg-[#1A0015] rounded-xl p-6 h-full">
                <h3 className="text-white text-xl font-medium mb-4">
                  <span className="inline-block mr-2 text-bitcoin-orange">
                    <FaBitcoin />
                  </span>
                  Bitcoin-Verified Fairness
                </h3>
                <p className="text-white/80 mb-6">
                  Our provably fair system leverages Bitcoin's powerful security and the advanced features of the Bitcoin ecosystem.
                  Game outcomes are secured by multiple Bitcoin technologies including exSat's hybrid consensus and BIP300 sidechains,
                  making it mathematically impossible for anyone to manipulate results.
                </p>
                
                <div className="bg-[#250020] p-4 rounded-lg mb-6 border-l-2 border-bitcoin-orange">
                  <h4 className="text-white font-medium mb-2">Bitcoin Advantages</h4>
                  <ul className="text-white/70 text-sm space-y-2 pl-4">
                    <li className="flex items-start">
                      <span className="text-bitcoin-orange mr-2"><FaShieldAlt /></span>
                      <span>Secured by Bitcoin's immutable ledger</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-bitcoin-orange mr-2"><FaLock /></span>
                      <span>exSat hybrid consensus for unhackable metadata</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-bitcoin-orange mr-2"><FaCheck /></span>
                      <span>BIP300 sidechains for fast, secure gameplay</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-bitcoin-orange mr-2"><FaBitcoin /></span>
                      <span>Full verification via Rebar Data's Bitcoin APIs</span>
                    </li>
                  </ul>
                </div>
                
                <Link href="/bitcoin-verification">
                  <div className="inline-block">
                    <div className="p-[1px] bg-gradient-to-r from-bitcoin-orange to-blue-magic rounded-md inline-block">
                      <button className="bg-[#1A0015] hover:bg-[#250020] transition-colors text-white px-6 py-2 rounded-md flex items-center">
                        Verify On Bitcoin
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right steps column */}
          <div className="lg:col-span-7">
            <div className="p-[1px] bg-gradient-to-r from-red-magic/40 to-blue-magic/40 rounded-xl">
              <div className="bg-[#1A0015] rounded-xl p-6">
                <h3 className="text-white text-xl font-medium mb-4">Bitcoin Verification Process</h3>
                
                {/* Steps tabs */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
                  {steps.map((step) => (
                    <button
                      key={step.id}
                      className={`p-2 rounded-md text-sm font-medium transition-all text-center ${
                        activeTab === step.id
                          ? 'bg-gradient-to-r from-bitcoin-orange/80 to-blue-magic/80 text-white'
                          : 'bg-[#250020] text-white/70 hover:text-white'
                      }`}
                      onClick={() => setActiveTab(step.id)}
                    >
                      Step {step.id}
                    </button>
                  ))}
                </div>
                
                {/* Active tab content */}
                <div className="min-h-[250px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      {/* Step icon placeholder - would be actual icons in production */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-bitcoin-orange/60 to-blue-magic/60 flex items-center justify-center mr-4">
                        <span className="text-white font-bold">{activeTab}</span>
                      </div>
                      <div>
                        <h4 className="text-white text-lg font-medium">{steps[activeTab-1].title}</h4>
                        <span className="text-xs bg-bitcoin-orange/20 text-bitcoin-orange px-2 py-0.5 rounded-full">
                          {steps[activeTab-1].technology}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-white/80 leading-relaxed mb-8">
                      {steps[activeTab-1].description}
                    </p>
                  </div>
                  
                  {/* Code examples with Bitcoin technologies */}
                  <div className="bg-[#0D0D0D] rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-green-400 font-mono">
                      {activeTab === 1 && 'clientSeed = generateRandomSeed(32);\nhash = SHA256(clientSeed);\nconsole.log("Client seed hash:", hash);'}
                      {activeTab === 2 && '// exSat metadata anchoring\nserverSeed = generateSecureSeed(64);\nexSatTransaction = exSat.createMetadata({\n  gameId: "mines-12345",\n  serverSeedHash: SHA256(serverSeed),\n  timestamp: Date.now()\n});\n\n// Commit to Bitcoin via hybrid consensus\nexSatResult = await exSat.commitToBitcoin(exSatTransaction);'}
                      {activeTab === 3 && '// BIP300 sidechain processing\nsidechainTx = await layerTwo.createTransaction({\n  clientSeed: clientSeedHash,\n  serverSeedHash: serverSeedHash,\n  gameParams: { mines: 5, grid: 5x5 }\n});\n\n// Get result with Bitcoin security\nconst { gameOutcome, proof } = await layerTwo.executeWithProof(sidechainTx);'}
                      {activeTab === 4 && '// After game completes, verify with Rebar Data\nconst txData = await rebarData.getTxDetails(exSatResult.txid);\nconst sidechainProof = await rebarData.getSidechainProof(gameOutcome.txid);\n\n// Verify on Bitcoin\nconst verified = BitcoinVerifier.verify({\n  clientSeed,\n  serverSeed,\n  exSatProof: txData,\n  sidechainProof,\n  gameOutcome\n});\n\nconsole.log("Bitcoin-verified:", verified);'}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProvablyFairSection; 