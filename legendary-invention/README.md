# APT Casino - Mines Game

A modern web3 casino game where players search for hidden gems while avoiding mines. The more mines you choose, the higher your potential rewards!

## Features

### Game Mechanics
- 📊 Dynamic difficulty: Choose how many mines to place on the grid
- 💎 Strategic gameplay: Reveal gems to increase your multiplier
- 💰 Cash out anytime: Secure your winnings when the risk gets too high
- 🎮 Auto mode: Set up automatic betting with custom strategies

### User Experience
- 🎨 Beautiful, responsive UI with animations and visual effects
- 🎵 Sound effects for all game actions
- 📱 Works perfectly on mobile and desktop devices
- 🌓 Light and dark theme support

## Technical Details

- Built with Next.js, React, and TailwindCSS
- Web3 integration with Wagmi, RainbowKit, and Viem
- Animation system using Framer Motion
- Sound effects system

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/your-username/apt-casino.git
cd apt-casino
```

2. Install dependencies
```bash
npm install --legacy-peer-deps
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000/game/mines](http://localhost:3000/game/mines) in your browser

## Game Instructions

1. **Connect Your Wallet**: Link your Web3 wallet to start playing
2. **Choose Game Settings**:
   - Set your bet amount
   - Select the number of mines to place (more mines = higher potential rewards)
   - Configure auto-cashout settings if desired
3. **Place Your Bet**: Click the "Place Bet" button to start
4. **Reveal Tiles**: Click on tiles to reveal what's underneath
   - Gems: Increase your multiplier
   - Mines: End your game and lose your bet
5. **Cash Out**: Click "Cash Out" anytime to secure your current winnings

## Production Build

```bash
npm run build
npm run start
```

## License

This project is licensed under the MIT License - see the LICENSE file for details. 