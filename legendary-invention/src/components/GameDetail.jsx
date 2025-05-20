"use client";
import React, { useState, useMemo, lazy, Suspense } from 'react';
import { Box, Typography, Container, Grid, Paper, Avatar, Tabs, Tab, Button, Tooltip, LinearProgress } from '@mui/material';
import Image from 'next/image';
import { FaChartLine, FaInfoCircle, FaHistory, FaQuestionCircle, FaTrophy, FaFire, FaCoins, FaChartBar, FaClock, FaPlayCircle } from 'react-icons/fa';

// Custom TabPanel component
const TabPanel = ({ children, value, index, ...props }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`game-tabpanel-${index}`}
    aria-labelledby={`game-tab-${index}`}
    {...props}
  >
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

// A tab accessor function for accessibility
const a11yProps = (index) => ({
  id: `game-tab-${index}`,
  'aria-controls': `game-tabpanel-${index}`,
});

// Custom YouTube video component
const YouTubeVideo = ({ videoUrl }) => {
  if (!videoUrl) return null;
  
  return (
    <Box sx={{ 
      position: 'relative',
      width: { xs: '90%', sm: '70%', md: '60%' }, // Reduced width for smaller appearance
      maxWidth: '650px',
      mx: 'auto', // Center the video
      paddingTop: { xs: '50.25%', sm: '40%', md: '33.75%' }, // Adjusted aspect ratio
      mb: 4,
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
    }}>
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
        src={videoUrl}
        title="Game Tutorial"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Box>
  );
};

// Memoized components for better performance
const MemoizedTabPanel = React.memo(TabPanel);
const MemoizedYouTubeVideo = React.memo(YouTubeVideo);

// Lazy loaded tab contents
const BettingOptionsContent = lazy(() => import('./BettingTable'));
const GameHistoryContent = lazy(() => import('./GameHistory'));
const FAQContent = lazy(() => import('./FAQContent'));

const GameDetail = ({ gameData = {}, bettingTableData = {}, showBettingTable = true, showProbabilities = true }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showVideo, setShowVideo] = useState(true); // Set to true by default

  // Memoize expensive calculations
  const hotNumbers = useMemo(() => [19, 7, 32], []);
  const coldNumbers = useMemo(() => [13, 6, 34], []);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Memoize game statistics
  const gameStatistics = useMemo(() => ({
    totalBets: '1,234,567',
    totalVolume: '5.6M APTC',
    avgBetSize: '245 APTC',
    maxWin: '35,000 APTC'
  }), []);

  // Memoize recent big wins
  const recentBigWins = useMemo(() => [
    { player: "LuckyDragon", amount: "12,500 APTC", time: "2m ago", bet: "Straight Up" },
    { player: "CryptoWhale", amount: "8,750 APTC", time: "5m ago", bet: "Split" },
    { player: "RoulettePro", amount: "6,300 APTC", time: "12m ago", bet: "Corner" }
  ], []);

  // Add win probability data
  const winProbabilities = useMemo(() => [
    { type: 'Even/Odd', probability: 48.6 },
    { type: 'Red/Black', probability: 48.6 },
    { type: 'Dozens', probability: 32.4 },
    { type: 'Single Number', probability: 2.7 }
  ], []);

  // Toggle YouTube video
  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  return (
    <Box
      id="game-details"
      sx={{
        py: 8,
        px: { xs: 2, md: 6 },
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(104, 29, 219, 0.2) 0%, transparent 40%),
          radial-gradient(circle at 90% 90%, rgba(216, 38, 51, 0.15) 0%, transparent 40%),
          radial-gradient(circle at 10% 90%, rgba(20, 216, 84, 0.1) 0%, transparent 40%)
        `,
        borderRadius: '16px',
        border: '2px solid rgba(104, 29, 219, 0.2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background accents */}
      <Box 
        sx={{ 
          position: 'absolute', 
          right: -100, 
          top: -100, 
          width: 300, 
          height: 300, 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(216, 38, 51, 0.2) 0%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 0
        }} 
      />
      <Box 
        sx={{ 
          position: 'absolute', 
          left: -50, 
          bottom: -50, 
          width: 250, 
          height: 250, 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(104, 29, 219, 0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 0
        }} 
      />
      
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* Main content (full width without left sidebar) */}
          <Grid item xs={12}>
            <Box sx={{ mb: 4 }}>
              {/* Always show YouTube video at the top */}
              {gameData.youtube && (
                <Box sx={{ mb: 4 }}>
                  <MemoizedYouTubeVideo videoUrl={gameData.youtube} />
                </Box>
              )}
              
              {/* Game description paragraphs */}
              {gameData.paragraphs && gameData.paragraphs.map((paragraph, index) => (
                <Typography 
                  key={index} 
                  variant="body1" 
                  color="white" 
                  sx={{ 
                    mb: 2,
                    lineHeight: 1.8,
                    fontSize: '1rem',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}
                >
                  {paragraph}
                </Typography>
              ))}
              
              {/* Game content sections */}
              {gameData.sections && (
                <Grid container spacing={3} sx={{ mt: 3 }}>
                  {gameData.sections.map((section, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Paper 
                        elevation={3}
                        sx={{
                          p: 3,
                          height: '100%',
                          borderRadius: 2,
                          backgroundColor: 'rgba(22, 11, 54, 0.5)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(22, 11, 54, 0.7)',
                            transform: 'translateY(-5px)',
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
                          }
                        }}
                      >
                        <Typography 
                          variant="h6" 
                          fontWeight="bold" 
                          color="white" 
                          gutterBottom
                          sx={{ 
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            pb: 1,
                            mb: 2
                          }}
                        >
                          {section.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="rgba(255, 255, 255, 0.8)"
                          sx={{ lineHeight: 1.7 }}
                        >
                          {section.content}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
            
            {/* Additional content like game statistics */}
            {showBettingTable && (
              <Paper 
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: 'rgba(22, 11, 54, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  mb: 4
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="white" gutterBottom>
                  Game Statistics
                </Typography>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <FaChartBar color="#6c5ce7" size={24} style={{ marginBottom: '8px' }} />
                      <Typography variant="body2" color="grey.500">
                        Total Bets
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" color="white">
                        {gameStatistics.totalBets}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <FaCoins color="#fdcb6e" size={24} style={{ marginBottom: '8px' }} />
                      <Typography variant="body2" color="grey.500">
                        Volume
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" color="white">
                        {gameStatistics.totalVolume}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <FaFire color="#ff7675" size={24} style={{ marginBottom: '8px' }} />
                      <Typography variant="body2" color="grey.500">
                        Avg Bet
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" color="white">
                        {gameStatistics.avgBetSize}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <FaTrophy color="#ffeaa7" size={24} style={{ marginBottom: '8px' }} />
                      <Typography variant="body2" color="grey.500">
                        Max Win
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" color="white">
                        {gameStatistics.maxWin}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            )}
            
            {/* Recent big wins */}
            {showBettingTable && (
              <Paper 
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: 'rgba(22, 11, 54, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="white" gutterBottom>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FaFire color="#ff7675" size={20} style={{ marginRight: '8px' }} />
                    Recent Big Wins
                  </Box>
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {recentBigWins.map((win, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                      <Paper 
                        elevation={2}
                        sx={{
                          p: 2,
                          borderRadius: 1,
                          backgroundColor: 'rgba(0, 0, 0, 0.3)',
                          border: '1px solid rgba(255, 255, 255, 0.05)'
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" color="grey.400">
                            {win.player}
                          </Typography>
                          <Typography variant="caption" color="grey.500">
                            <FaClock size={10} style={{ marginRight: '4px', display: 'inline' }} />
                            {win.time}
                          </Typography>
                        </Box>
                        <Typography variant="h6" fontWeight="bold" color="#74b9ff">
                          {win.amount}
                        </Typography>
                        <Typography variant="caption" color="grey.500">
                          Bet: {win.bet}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default GameDetail;
