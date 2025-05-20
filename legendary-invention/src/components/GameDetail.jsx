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
      width: { xs: '95%', sm: '80%', md: '70%' },
      maxWidth: '750px',
      mx: 'auto',
      paddingTop: { xs: '53.25%', sm: '45%', md: '39.375%' },
      mb: 6,
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(104, 29, 219, 0.3)',
    }}>
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none'
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
        py: 10,
        px: { xs: 3, md: 8 },
        backgroundColor: '#090005',
        borderRadius: '24px',
        border: '1px solid rgba(104, 29, 219, 0.25)',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(15px)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
        mt: 8,
        mb: 8,
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23140009\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        backgroundBlendMode: 'soft-light',
        '&:hover': {
          boxShadow: '0 30px 70px rgba(0, 0, 0, 0.6)',
          transform: 'translateY(-5px)'
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-5px',
          left: '-5px',
          right: '-5px',
          bottom: '-5px',
          background: 'linear-gradient(125deg, rgba(9, 0, 5, 0.4), rgba(9, 0, 5, 0.4), rgba(9, 0, 5, 0.4))',
          zIndex: -1,
          filter: 'blur(20px)',
          opacity: 0.7,
          animation: 'bgPulse 15s ease-in-out infinite alternate',
          '@keyframes bgPulse': {
            '0%': { opacity: 0.5, transform: 'scale(0.98)' },
            '50%': { opacity: 0.7, transform: 'scale(1.02)' },
            '100%': { opacity: 0.5, transform: 'scale(0.98)' }
          }
        }
      }}
    >
      {/* Animated background accents */}
      <Box 
        sx={{ 
          position: 'absolute', 
          right: '-10%', 
          top: '-10%', 
          width: '40%', 
          height: '40%', 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(9, 0, 5, 0.25) 0%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
          opacity: 0.7,
          animation: 'float-slow 20s ease-in-out infinite',
          '@keyframes float-slow': {
            '0%, 100%': { transform: 'translate(0, 0)' },
            '50%': { transform: 'translate(-5%, 5%)' }
          }
        }} 
      />
      <Box 
        sx={{ 
          position: 'absolute', 
          left: '-5%', 
          bottom: '-5%', 
          width: '35%', 
          height: '35%', 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(9, 0, 5, 0.25) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
          opacity: 0.7,
          animation: 'float-slow2 18s ease-in-out infinite',
          '@keyframes float-slow2': {
            '0%, 100%': { transform: 'translate(0, 0)' },
            '50%': { transform: 'translate(5%, -5%)' }
          }
        }} 
      />
      <Box 
        sx={{ 
          position: 'absolute', 
          left: '50%', 
          top: '-5%', 
          width: '25%', 
          height: '25%', 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(9, 0, 5, 0.2) 0%, transparent 70%)',
          filter: 'blur(50px)',
          transform: 'translateX(-50%)',
          zIndex: 0,
          opacity: 0.6,
          animation: 'pulse 8s ease-in-out infinite alternate',
          '@keyframes pulse': {
            '0%': { opacity: 0.4, transform: 'translateX(-50%) scale(0.9)' },
            '100%': { opacity: 0.7, transform: 'translateX(-50%) scale(1.1)' }
          }
        }} 
      />
      
      {/* Subtle animated border glow */}
      <Box 
        sx={{ 
          position: 'absolute', 
          inset: 0,
          borderRadius: '24px',
          padding: '1px',
          background: 'linear-gradient(125deg, rgba(9, 0, 5, 0.5), rgba(9, 0, 5, 0.5))',
          opacity: 0.4,
          zIndex: 0,
          animation: 'borderPulse 4s ease-in-out infinite alternate',
          '@keyframes borderPulse': {
            '0%': { opacity: 0.2 },
            '100%': { opacity: 0.5 }
          }
        }} 
      />
      
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={5}>
          {/* Main content (full width without left sidebar) */}
          <Grid item xs={12}>
            <Box sx={{ mb: 6 }}>
              {/* Always show YouTube video at the top */}
              {gameData.youtube && (
                <Box sx={{ mb: 6 }}>
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
                    mb: 3.5,
                    lineHeight: 1.95,
                    fontSize: '1.05rem',
                    color: 'rgba(255, 255, 255, 0.92)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                    maxWidth: '95%',
                    mx: 'auto',
                    textAlign: { xs: 'left', md: 'center' },
                    letterSpacing: '0.015em',
                    '&::first-letter': {
                      fontSize: '1.4em',
                      fontWeight: 500,
                      color: '#ffffff',
                    }
                  }}
                >
                  {paragraph}
                </Typography>
              ))}
              
              {/* Game content sections */}
              {gameData.sections && (
                <Grid container spacing={4} sx={{ mt: 4 }}>
                  {gameData.sections.map((section, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Paper 
                        elevation={5}
                        sx={{
                          p: 4,
                          height: '100%',
                          borderRadius: 3,
                          backgroundColor: 'rgba(9, 0, 5, 0.75)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(104, 29, 219, 0.2)',
                          transition: 'all 0.4s ease',
                          position: 'relative',
                          overflow: 'hidden',
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h20L0 20z\' fill=\'%23140009\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                          backgroundSize: '20px 20px',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(125deg, rgba(9, 0, 5, 0.05) 0%, rgba(9, 0, 5, 0.05) 50%, rgba(9, 0, 5, 0.05) 100%)',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                          },
                          '&:hover': {
                            backgroundColor: 'rgba(9, 0, 5, 0.85)',
                            transform: 'translateY(-6px)',
                            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)',
                            '&::before': {
                              opacity: 1,
                            }
                          }
                        }}
                      >
                        <Typography 
                          variant="h6" 
                          fontWeight="bold" 
                          color="#d82633" 
                          gutterBottom
                          sx={{ 
                            borderBottom: '1px solid rgba(104, 29, 219, 0.3)',
                            pb: 1.5,
                            mb: 2.5
                          }}
                        >
                          {section.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="rgba(255, 255, 255, 0.9)"
                          sx={{ lineHeight: 1.8 }}
                        >
                          {section.content}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
            
            {/* Enhanced Game Statistics */}
            {showBettingTable && (
              <Paper 
                elevation={5}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  backgroundColor: 'rgba(9, 0, 5, 0.8)',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(104, 29, 219, 0.2)',
                  mb: 5,
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23140009\' fill-opacity=\'0.15\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'2\'/%3E%3C/g%3E%3C/svg%3E")',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: -250,
                    width: '70%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(9, 0, 5, 0.3), transparent)',
                    transform: 'skewX(-15deg)',
                    animation: 'shimmer 8s ease-in-out infinite',
                    '@keyframes shimmer': {
                      '0%': { left: '-80%' },
                      '100%': { left: '180%' }
                    }
                  },
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                  }
                }}
              >
                <Typography 
                  variant="h5" 
                  fontWeight="bold" 
                  color="#d82633" 
                  gutterBottom
                  sx={{ 
                    borderBottom: '1px solid rgba(104, 29, 219, 0.3)',
                    pb: 1.5,
                    pt: 2.5,
                    px: 4,
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: "'Playfair Display', serif",
                    letterSpacing: '0.03em',
                    fontSize: '1.6rem'
                  }}
                >
                  <FaChartLine color="#681DDB" size={22} style={{ marginRight: '10px' }} />
                  Game Statistics
                </Typography>
                <Grid container spacing={4} sx={{ mt: 1, px: 4, pb: 4 }}>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ 
                      textAlign: 'center', 
                      padding: 3, 
                      backgroundColor: 'rgba(9, 0, 5, 0.7)', 
                      borderRadius: 2,
                      border: '1px solid rgba(104, 29, 219, 0.2)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      transition: 'all 0.4s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\' viewBox=\'0 0 4 4\'%3E%3Cpath fill=\'%23140009\' fill-opacity=\'0.2\' d=\'M1 3h1v1H1V3zm2-2h1v1H3V1z\'%3E%3C/path%3E%3C/svg%3E")',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle at center, rgba(9, 0, 5, 0.25), transparent 70%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(10, 0, 5, 0.7)',
                        transform: 'translateY(-5px) scale(1.03)',
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                        '&::after': {
                          opacity: 1
                        }
                      }
                    }}>
                      <FaChartBar color="#681DDB" size={30} style={{ marginBottom: '12px' }} />
                      <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" gutterBottom>
                        Total Bets
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" color="white" sx={{ mt: 1 }}>
                        {gameStatistics.totalBets}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ 
                      textAlign: 'center', 
                      padding: 3, 
                      backgroundColor: 'rgba(9, 0, 5, 0.7)', 
                      borderRadius: 2,
                      border: '1px solid rgba(216, 38, 51, 0.2)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      transition: 'all 0.4s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\' viewBox=\'0 0 4 4\'%3E%3Cpath fill=\'%23140009\' fill-opacity=\'0.2\' d=\'M1 3h1v1H1V3zm2-2h1v1H3V1z\'%3E%3C/path%3E%3C/svg%3E")',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle at center, rgba(9, 0, 5, 0.25), transparent 70%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(10, 0, 5, 0.7)',
                        transform: 'translateY(-5px) scale(1.03)',
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                        '&::after': {
                          opacity: 1
                        }
                      }
                    }}>
                      <FaCoins color="#D82633" size={30} style={{ marginBottom: '12px' }} />
                      <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" gutterBottom>
                        Volume
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" color="white" sx={{ mt: 1 }}>
                        {gameStatistics.totalVolume}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ 
                      textAlign: 'center', 
                      padding: 3, 
                      backgroundColor: 'rgba(9, 0, 5, 0.7)', 
                      borderRadius: 2,
                      border: '1px solid rgba(20, 216, 84, 0.2)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      transition: 'all 0.4s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\' viewBox=\'0 0 4 4\'%3E%3Cpath fill=\'%23140009\' fill-opacity=\'0.2\' d=\'M1 3h1v1H1V3zm2-2h1v1H3V1z\'%3E%3C/path%3E%3C/svg%3E")',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle at center, rgba(9, 0, 5, 0.25), transparent 70%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(10, 0, 5, 0.7)',
                        transform: 'translateY(-5px) scale(1.03)',
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                        '&::after': {
                          opacity: 1
                        }
                      }
                    }}>
                      <FaFire color="#14D854" size={30} style={{ marginBottom: '12px' }} />
                      <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" gutterBottom>
                        Avg Bet
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" color="white" sx={{ mt: 1 }}>
                        {gameStatistics.avgBetSize}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ 
                      textAlign: 'center', 
                      padding: 3, 
                      backgroundColor: 'rgba(9, 0, 5, 0.7)', 
                      borderRadius: 2,
                      border: '1px solid rgba(104, 29, 219, 0.2)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      transition: 'all 0.4s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\' viewBox=\'0 0 4 4\'%3E%3Cpath fill=\'%23140009\' fill-opacity=\'0.2\' d=\'M1 3h1v1H1V3zm2-2h1v1H3V1z\'%3E%3C/path%3E%3C/svg%3E")',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle at center, rgba(9, 0, 5, 0.25), transparent 70%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(10, 0, 5, 0.7)',
                        transform: 'translateY(-5px) scale(1.03)',
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                        '&::after': {
                          opacity: 1
                        }
                      }
                    }}>
                      <FaTrophy color="#fdcb6e" size={30} style={{ marginBottom: '12px' }} />
                      <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" gutterBottom>
                        Max Win
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" color="white" sx={{ mt: 1 }}>
                        {gameStatistics.maxWin}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            )}
            
            {/* Enhanced Recent Big Wins */}
            {showBettingTable && (
              <Paper 
                elevation={5}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  backgroundColor: 'rgba(9, 0, 5, 0.8)',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(104, 29, 219, 0.2)',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'12\' viewBox=\'0 0 40 12\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 6.172L6.172 0h5.656L0 11.828V6.172zm40 5.656L28.172 0h5.656L40 6.172v5.656zM6.172 12l12-12h3.656l12 12h-5.656L20 3.828 11.828 12H6.172zm12 0L20 10.172 21.828 12h-3.656z\' fill=\'%23140009\' fill-opacity=\'0.15\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                  backgroundSize: '40px 12px',
                  backgroundPosition: 'bottom center',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: -250,
                    width: '70%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(9, 0, 5, 0.3), transparent)',
                    transform: 'skewX(-15deg)',
                    animation: 'shimmer2 8s ease-in-out infinite',
                    '@keyframes shimmer2': {
                      '0%': { left: '-80%' },
                      '100%': { left: '180%' }
                    },
                    animationDelay: '2s'
                  },
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                  }
                }}
              >
                <Typography 
                  variant="h5" 
                  fontWeight="bold" 
                  color="#d82633" 
                  gutterBottom
                  sx={{ 
                    borderBottom: '1px solid rgba(104, 29, 219, 0.3)',
                    pb: 1.5,
                    pt: 2.5,
                    px: 4,
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: "'Playfair Display', serif",
                    letterSpacing: '0.03em',
                    fontSize: '1.6rem'
                  }}
                >
                  <FaFire color="#D82633" size={22} style={{ marginRight: '10px' }} />
                  Recent Big Wins
                </Typography>
                <Grid container spacing={3} sx={{ mt: 1, px: 4, pb: 4 }}>
                  {recentBigWins.map((win, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                      <Paper 
                        elevation={3}
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          backgroundColor: 'rgba(9, 0, 5, 0.7)',
                          border: '1px solid rgba(104, 29, 219, 0.2)',
                          transition: 'all 0.4s ease',
                          position: 'relative',
                          overflow: 'hidden',
                          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25)',
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'12\' viewBox=\'0 0 40 12\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 6.172L6.172 0h5.656L0 11.828V6.172zm40 5.656L28.172 0h5.656L40 6.172v5.656zM6.172 12l12-12h3.656l12 12h-5.656L20 3.828 11.828 12H6.172zm12 0L20 10.172 21.828 12h-3.656z\' fill=\'%23140009\' fill-opacity=\'0.15\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                          backgroundSize: '40px 12px',
                          backgroundPosition: 'bottom center',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                            background: 'linear-gradient(125deg, rgba(9, 0, 5, 0.1), rgba(9, 0, 5, 0.1))',
                          },
                          '&:hover': {
                            backgroundColor: 'rgba(9, 0, 5, 0.8)',
                            transform: 'translateY(-6px) scale(1.02)',
                            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)',
                            '&::before': {
                              opacity: 1
                            }
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                          <Typography variant="body1" color="rgba(255, 255, 255, 0.9)" fontWeight="medium">
                            {win.player}
                          </Typography>
                          <Typography variant="body2" color="rgba(255, 255, 255, 0.6)" sx={{ display: 'flex', alignItems: 'center' }}>
                            <FaClock size={12} style={{ marginRight: '5px' }} />
                            {win.time}
                          </Typography>
                        </Box>
                        <Typography 
                          variant="h5" 
                          fontWeight="bold" 
                          sx={{ 
                            mb: 1.5,
                            background: 'linear-gradient(90deg, #090005, #090005)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 2px 10px rgba(104, 29, 219, 0.3)',
                            display: 'inline-block',
                            position: 'relative'
                          }}
                        >
                          {win.amount}
                        </Typography>
                        <Box 
                          sx={{ 
                            display: 'inline-block',
                            backgroundColor: 'rgba(20, 216, 84, 0.1)',
                            borderRadius: '4px',
                            px: 1.5,
                            py: 0.5,
                            border: '1px solid rgba(20, 216, 84, 0.2)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              backgroundColor: 'rgba(20, 216, 84, 0.15)',
                              transform: 'translateY(-2px)'
                            }
                          }}
                        >
                          <Typography variant="body2" color="rgba(255, 255, 255, 0.8)">
                            Bet: {win.bet}
                          </Typography>
                        </Box>
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
