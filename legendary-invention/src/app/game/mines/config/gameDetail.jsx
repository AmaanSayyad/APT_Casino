export const gameData = {
  label: "Game Description",
  title: "Mines",
  image: "/images/games/mines.png",
  paragraphs: [
    "APT Casino's Mines is an exhilarating crypto game where every decision matters. Players begin by selecting the number of mines to place on a 5x5 grid – the more mines you choose, the higher the potential reward but the greater the risk.",
    "The objective is to uncover gems while avoiding hidden mines. Each successful gem discovery increases your multiplier, and you can cash out anytime. Will you play it safe with a small win or risk everything for a massive payout? In Mines, the choice is entirely yours!",
    "With a dynamic difficulty system, provably fair gameplay, and instant payouts, our Mines game offers an unmatched gaming experience. Set your bet amount, customize your risk level, and step into the thrilling world of strategic crypto gaming.",
  ],
  youtube: "https://www.youtube.com/embed/Aqz5C7GPrvQ"
};

export const bettingTableData = {
  title: "Mines Payouts",
  description:
    "Your potential payout increases with each safe tile you reveal. The more mines you select at the start, the higher your potential rewards will be.",
  table: [
    {
      mines: 1,
      tiles: [
        { revealed: 1, multiplier: "1.05x" },
        { revealed: 5, multiplier: "1.27x" },
        { revealed: 10, multiplier: "1.69x" },
        { revealed: 15, multiplier: "2.53x" },
        { revealed: 20, multiplier: "5.06x" }
      ]
    },
    {
      mines: 3,
      tiles: [
        { revealed: 1, multiplier: "1.17x" },
        { revealed: 5, multiplier: "2.10x" },
        { revealed: 10, multiplier: "4.44x" },
        { revealed: 15, multiplier: "13.31x" },
        { revealed: 20, multiplier: "105.01x" }
      ]
    },
    {
      mines: 5,
      tiles: [
        { revealed: 1, multiplier: "1.32x" },
        { revealed: 5, multiplier: "3.30x" },
        { revealed: 10, multiplier: "10.94x" },
        { revealed: 15, multiplier: "54.73x" },
        { revealed: 18, multiplier: "219.01x" }
      ]
    },
    {
      mines: 10,
      tiles: [
        { revealed: 1, multiplier: "1.79x" },
        { revealed: 5, multiplier: "8.91x" },
        { revealed: 10, multiplier: "71.33x" },
        { revealed: 12, multiplier: "213.98x" },
        { revealed: 14, multiplier: "1,068.95x" }
      ]
    }
  ]
};

export const gameStatistics = {
  totalBets: '956,421',
  totalVolume: '4.7M APTC',
  avgBetSize: '185 APTC',
  maxWin: '121,750 APTC'
};

export const recentBigWins = [
  { player: "CryptoMiner", amount: "121,750 APTC", time: "3m ago", config: "10 mines" },
  { player: "DiamondHands", amount: "89,250 APTC", time: "10m ago", config: "5 mines" },
  { player: "GemHunter", amount: "65,300 APTC", time: "22m ago", config: "3 mines" },
  { player: "RiskTaker", amount: "43,700 APTC", time: "45m ago", config: "3 mines" },
  { player: "TreasureSeeker", amount: "38,150 APTC", time: "1h ago", config: "1 mine" }
];

export const winProbabilities = [
  { config: '1 mine (24 safe tiles)', probability: 96.0, color: 'from-green-500 to-green-700' },
  { config: '3 mines (22 safe tiles)', probability: 88.0, color: 'from-teal-500 to-teal-700' },
  { config: '5 mines (20 safe tiles)', probability: 80.0, color: 'from-blue-500 to-blue-700' },
  { config: '10 mines (15 safe tiles)', probability: 60.0, color: 'from-yellow-500 to-yellow-700' },
  { config: '15 mines (10 safe tiles)', probability: 40.0, color: 'from-red-500 to-red-700' }
];
