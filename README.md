## Inspiration
One of our team-mate was on etherscan exploring some transactions and saw an advertisement of [https://stake.com/](url) which was giving 200% bonus on first deposit, when our team-mate deposited the 120 USDT into this platform they gave him 360 USDT as total balance and when our teammate started playing game he was shocked to see that he was only able to play with $1 per game of Play Plinko Online - Pachinko Casino Game on Stake.com and was unable to increase the betting amount beyond $1 coz he was using the bonus scheme of 200% and when he tried to explore and play other games on the platform he got to know that this platform has cheated him under the name of wager limits.

When he tried to withdraw money they showed him this rule list of wager limit which said that if he wants to withdraw the deposited amount then he have to play $12,300 worth of game play and this was the big shock for him where he was explained a maths logic by their live support. Thereby, In the hope of getting the deposited money back he played the game Plinko entire night and lost all money.

He was very annoyed of this and that's how APT-Casino was born, which is a combination of AI, gamefi and defi all in one platform where new web3 users can play games, perform gambling but have a safe, secure, transparent platform that does not scam any of their users. Also we wanted to address common issues in traditional gaming platforms.

## Problem
The traditional online gambling industry is plagued by several issues, including:
- Unfair Game Outcomes: Many platforms manipulate game results, leading to unfair play.

- High Fees: Users face exorbitant fees for deposits, withdrawals, and gameplay.

- Restrictive Withdrawal Policies: Withdrawal limits and conditions often prevent users from accessing their funds.

- Bonus Drawbacks: Misleading bonus schemes trap users with unrealistic wagering requirements.

- Lack of True Asset Ownership: Centralized platforms retain control over user assets, limiting their freedom and security.

## Solution
APT-Casino addresses these problems by offering:

- Provably Fair Gaming: Utilizing the Chainlink VRF and Aptos on-chain randomness module to ensure all game outcomes are transparent and verifiably fair.

- Low Fees: Leveraging the efficiency of Linea blockchain to minimize transaction costs.

- Flexible Withdrawal Policies: Providing users with unrestricted access to their funds.

- Transparent Bonus Schemes: Clear and Clean bonus terms without hidden traps.

- True Asset Ownership: Decentralized asset management ensures users have full control over their assets.

## 3 Main Features
**APT-Casino** offers a multifaceted platform with three main features:

### Social Aspect:
- Users create **AI-generated NFT profile pictures** based on keywords.
- View a **community leaderboard**.
- Explore other **players' profiles, recent activity, and ENS**.

### Gaming Aspect:
- **APT-Casino** includes a fully functional **European roulette game**.
- Users can place various types of bets such as **straight, split, street, corner, six line, column, dozen, red, black, high, low, even, and odd.**
- The **roulette wheel**, powered by **Chainlink VRF and Aptos on-chain randomness module, randomly generates winning values.**
- Winnings are automatically calculated and transferred to the users wallets on Linea Blockchain.
- Cross-Chain Interactions: Seamless asset transfers and interactions between EVM(Linea) and Aptos blockchain.

### Lending Aspect:
- Users can **deposit any tokens on any chain as collateral to borrow in game asset APTC token.**
- Facilitates gameplay without the need to sell existing holdings.
- Ensures players have the assets to participate in games seamlessly for real-time asset prices.
- Users retain full control over their funds through secure and transparent blockchain transactions.

Diverse Game Selection: A variety of fully on-chain games, including roulette, blackjack, plinko, mines and more. As a (POC) Proof of Concept we developed fully on-chain Roulette Game but similar model can be applied to introduce the new casino games to the platform.

EVM Linea Deployed Contract Address: 

APTC Token Contract: https://sepolia.lineascan.build/address/0x9814e85e06d660978e3fc2db1cb12b3ba0367a9e

Roulette Token Contract: https://sepolia.lineascan.build/address/0x5b247c6fbac6171226251ca87d12b2ad1969be11

## Challenges we ran into
- Implementing On-Chain Randomness
Ensuring fair play in the casino games was critical, and implementing on-chain randomness was a significant challenge. We utilized Aptos randomness module: aptos_framework::randomness to achieve provably fair outcomes for our games. This required a deep understanding of the randomness mechanisms and careful integration into our smart contracts.
- Cost Management: Developing and maintaining our own IPFS server to store NFTs and metadata was a cost-effective solution but required significant initial setup and ongoing maintenance.
- Cross-Chain Compatibility: Deploying smart contracts across multiple chains and ensuring smooth interoperability was a complex task that demanded thorough testing and troubleshooting.
- Setting up the DeFi part also posed challenges, as we contemplated creating our own platform token.
- Time constraints did not allowed us for implementing gasless transactions but we prioritized delivering a functional and reliable platform.

## Technology Stack
- Linea and Aptos Blockchain: Ensures transparency, security, and efficiency in all transactions and game outcomes.

- Chainlink VRF and Aptos On-Chain Randomness Module: Guarantees fair and unbiased game results.

- Cross-Chain Functionality: Enables seamless asset transfers between Aptos and other blockchains.

- Defi Bank: User can stake their tokens on our currently supported chains EVM(Linea) & Aptos chain and get collateralized loans in form of in game currency APTC.

- Next.js, Javascript, Tailwind CSS, Move, Solidity, Chainlink VRF, Aptos randomness module: aptos_framework::randomness, Petra Wallet, Metamask Wallet.

## What's next for APT-Casino
All though started as a idea but now we are thinking to carry forward as a business model and expand further.
- Applying for Grants: Seeking funding to further develop and expand the platform.
- Mainnet Launch: Deploying on the mainnet for real-world use.
- User Testing: Conducting extensive user testing to refine the platform.
- Promoting the Product: Marketing to attract a wider audience.
- Mobile App Development: Launching Android and iOS application.
- Designing and Creating Unreal Engine Graphics and Game
- Introducing new games to the platform
- Enhance the AI capabilities used for generating NFT profiles to provide even more personalized and engaging user experiences.
- Explore additional DeFi features like staking, farming, yield strategies to offer more financial services within the platform.
- We also aim to implement gasless transactions to enhance user convenience.
- Enabling Developers to build mini games and host it inside the platform and Bringing in new monetization to compensate the casino games/ game creators.
- Having a inbuilt live streaming for gameplay, allow players to do streaming within the application.
- Support 50+ new tokens and 20+ new chains within the next few months after the end of the hackathon.

Be the biggest gamefi/ gambling / games hub centre of the web3 gaming/gambling industry.
