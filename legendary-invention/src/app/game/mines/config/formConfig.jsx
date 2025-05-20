export const manualFormConfig = {
  fields: [
    {
      id: "betAmount",
      label: "Bet Amount",
      type: "singleSelect",
      options: [10, 25, 50, 100, 250, 500, 1000],
      defaultValue: 50,
    },
    {
      id: "mines",
      label: "Mines Count",
      type: "singleSelect",
      options: Array.from({ length: 24 }, (_, i) => i + 1),
      defaultValue: 5,
    }
  ],
  submitButton: "Place Bet",
};

export const autoFormConfig = {
  submitButton: "Start Auto Betting",
  fields: [
    {
      id: "betAmount",
      label: "Bet Amount",
      type: "singleSelect",
      options: [10, 25, 50, 100, 250, 500, 1000],
      defaultValue: 50,
      placeholder: "Enter Bet Amount",
    },
    {
      id: "mines",
      label: "Mines Count",
      type: "singleSelect",
      options: Array.from({ length: 24 }, (_, i) => i + 1),
      defaultValue: 5,
      placeholder: "Select Mines",
    },
    {
      id: "tilesToReveal",
      label: "Tiles to Reveal",
      type: "singleSelect",
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      defaultValue: 5,
      placeholder: "Select how many tiles to reveal",
    },
    {
      id: "numberOfBets",
      label: "Number of Rounds",
      type: "number",
      defaultValue: 10,
      placeholder: "Enter Number of Rounds",
    },
    {
      id: "onWin",
      label: "On Win",
      type: "singleSelect",
      options: ["Reset", "+10%", "+25%", "+50%", "+100%", "-10%", "-25%"],
      defaultValue: "Reset",
      placeholder: "What to do after a win",
    },
    {
      id: "onLoss",
      label: "On Loss",
      type: "singleSelect",
      options: ["Reset", "+10%", "+25%", "+50%", "+100%", "-10%", "-25%"],
      defaultValue: "+50%",
      placeholder: "What to do after a loss",
    },
    {
      id: "stopOnProfit",
      label: "Stop on Profit",
      type: "text",
      defaultValue: "500",
      placeholder: "Enter profit amount to stop",
    },
    {
      id: "stopOnLoss",
      label: "Stop on Loss",
      type: "text",
      defaultValue: "500",
      placeholder: "Enter loss amount to stop",
    },
  ],
};
