"use client";
import React, { useState } from 'react';
import { Box, Typography, Paper, Avatar, Chip, Tooltip, LinearProgress, IconButton, Collapse } from '@mui/material';
import { FaTrophy, FaFire, FaMedal, FaCrown, FaChevronRight, FaChevronDown, FaChevronUp, FaGlobe, FaUserFriends, FaStar } from 'react-icons/fa';
import { GiPokerChips, GiMineExplosion, GiDiamonds, GiGoldBar } from 'react-icons/gi';

// Sample data - in real application this would come from API
const leaderboardData = [
  { 
    id: 1, 
    username: 'MineMaster', 
    avatar: '/images/avatars/avatar1.png', 
    winnings: 256780,
    winStreak: 8,
    winRate: 72,
    isVIP: true,
    badge: 'diamond',
    country: 'United States',
    flag: '🇺🇸',
    bestConfig: '5 mines',
    maxMultiplier: '17.2x',
    lastWin: '1 hour ago'
  },
  { 
    id: 2, 
    username: 'GemHunter', 
    avatar: '/images/avatars/avatar2.png', 
    winnings: 195420,
    winStreak: 5,
    winRate: 65,
    isVIP: true, 
    badge: 'platinum',
    country: 'Canada',
    flag: '🇨🇦',
    bestConfig: '8 mines',
    maxMultiplier: '38.4x',
    lastWin: '4 hours ago'
  },
  { 
    id: 3, 
    username: 'DiamondDigger', 
    avatar: '/images/avatars/avatar3.png', 
    winnings: 167890,
    winStreak: 3,
    winRate: 61,
    isVIP: false,
    badge: 'gold',
    country: 'UK',
    flag: '🇬🇧',
    bestConfig: '3 mines',
    maxMultiplier: '9.8x',
    lastWin: '1 day ago'
  },
  { 
    id: 4, 
    username: 'TreasureSeeker', 
    avatar: '/images/avatars/avatar4.png', 
    winnings: 103450,
    winStreak: 2,
    winRate: 54,
    isVIP: false,
    badge: 'silver',
    country: 'Germany',
    flag: '🇩🇪',
    bestConfig: '10 mines',
    maxMultiplier: '72.5x',
    lastWin: '3 days ago'
  },
  { 
    id: 5, 
    username: 'LuckyMiner', 
    avatar: '/images/avatars/avatar5.png', 
    winnings: 92370,
    winStreak: 2,
    winRate: 49,
    isVIP: false,
    badge: 'bronze',
    country: 'Japan',
    flag: '🇯🇵',
    bestConfig: '7 mines',
    maxMultiplier: '24.9x',
    lastWin: '4 days ago'
  }
];

// Badge components with different colors
const BadgeIcon = ({ type }) => {
  switch(type) {
    case 'diamond':
      return <FaCrown style={{ color: '#00bcd4' }} />;
    case 'platinum':
      return <FaCrown style={{ color: '#e0e0e0' }} />;
    case 'gold':
      return <FaStar style={{ color: '#ffc107' }} />;
    case 'silver':
      return <FaMedal style={{ color: '#b0bec5' }} />;
    case 'bronze':
      return <FaMedal style={{ color: '#bf8970' }} />;
    default:
      return null;
  }
};

const MinesLeaderboard = () => {
  const [expanded, setExpanded] = useState({});
  
  const handleExpandClick = (id) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  return (
    <Paper
      elevation={5}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 3,
        background: 'linear-gradient(135deg, rgba(9, 0, 5, 0.9) 0%, rgba(25, 5, 30, 0.85) 100%)',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(104, 29, 219, 0.2)',
        mb: 5,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        height: '100%',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '5px',
          background: 'linear-gradient(90deg, #d82633, #681DDB)',
        }
      }}
    >
      {/* Header */}
      <Typography 
        variant="h5" 
        fontWeight="bold" 
        gutterBottom
        sx={{ 
          borderBottom: '1px solid rgba(104, 29, 219, 0.3)',
          pb: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          color: 'white',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}
      >
        <GiMineExplosion color="#d82633" size={22} />
        <span style={{ background: 'linear-gradient(90deg, #FFFFFF, #FFA500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Mines Leaderboard
        </span>
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mb: 3 }}>
        <Typography variant="body2" color="rgba(255,255,255,0.7)">
          Top players by winnings
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip 
            icon={<FaGlobe size={12} />} 
            label="Global" 
            size="small" 
            sx={{ 
              backgroundColor: 'rgba(104, 29, 219, 0.3)', 
              color: 'white',
              fontWeight: 'medium'
            }} 
          />
        </Box>
      </Box>
      
      {/* Leaderboard Entries */}
      <Box>
        {leaderboardData.map((player, index) => (
          <Box 
            key={player.id}
            sx={{
              mb: 2
            }}
          >
            <Box 
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                background: index === 0 
                  ? 'linear-gradient(90deg, rgba(255, 215, 0, 0.08), rgba(9, 0, 5, 0.3))'
                  : index === 1 
                  ? 'linear-gradient(90deg, rgba(224, 224, 224, 0.05), rgba(9, 0, 5, 0.3))'
                  : index === 2 
                  ? 'linear-gradient(90deg, rgba(191, 137, 112, 0.05), rgba(9, 0, 5, 0.3))'
                  : 'rgba(0, 0, 0, 0.25)',
                borderRadius: 2,
                border: index === 0 ? '1px solid rgba(255, 215, 0, 0.3)' : 
                        index === 1 ? '1px solid rgba(224, 224, 224, 0.2)' :
                        index === 2 ? '1px solid rgba(191, 137, 112, 0.2)' :
                        '1px solid rgba(104, 29, 219, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: index === 0 
                    ? 'linear-gradient(90deg, rgba(255, 215, 0, 0.15), rgba(9, 0, 5, 0.4))'
                    : index === 1 
                    ? 'linear-gradient(90deg, rgba(224, 224, 224, 0.1), rgba(9, 0, 5, 0.4))'
                    : index === 2 
                    ? 'linear-gradient(90deg, rgba(191, 137, 112, 0.1), rgba(9, 0, 5, 0.4))'
                    : 'rgba(25, 5, 30, 0.3)',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
                },
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '3px',
                  height: '100%',
                  backgroundColor: index === 0 ? '#ffc107' : 
                                index === 1 ? '#e0e0e0' : 
                                index === 2 ? '#bf8970' : 'rgba(104, 29, 219, 0.3)',
                  boxShadow: index < 3 ? `0 0 8px ${index === 0 ? '#ffc107' : index === 1 ? '#e0e0e0' : '#bf8970'}40` : 'none'
                }
              }}
            >
              {/* Rank */}
              <Box 
                sx={{ 
                  width: 36, 
                  height: 36, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: index === 0 ? '#ffc107' : 
                              index === 1 ? '#e0e0e0' : 
                              index === 2 ? '#bf8970' : 'rgba(104, 29, 219, 0.2)',
                  color: index < 3 ? '#000' : '#fff',
                  fontWeight: 'bold',
                  mr: 2,
                  boxShadow: index < 3 ? '0 2px 8px rgba(0, 0, 0, 0.3)' : 'none',
                  fontSize: '0.9rem'
                }}
              >
                {index + 1}
              </Box>
              
              {/* Avatar and Username */}
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 3, flexGrow: 1 }}>
                <Avatar 
                  src={player.avatar} 
                  alt={player.username}
                  sx={{ 
                    mr: 2,
                    border: player.isVIP ? '2px solid #ffc107' : '1px solid rgba(104, 29, 219, 0.2)',
                    width: 40,
                    height: 40,
                    boxShadow: player.isVIP ? '0 0 8px rgba(255, 193, 7, 0.5)' : 'none'
                  }}
                >
                  {player.username.charAt(0)}
                </Avatar>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography 
                      fontWeight="bold" 
                      color="white"
                      sx={{ 
                        fontSize: index === 0 ? '1.05rem' : '1rem',
                        textShadow: index < 3 ? '0 1px 3px rgba(0,0,0,0.4)' : 'none'
                      }}
                    >
                      {player.username}
                    </Typography>
                    <BadgeIcon type={player.badge} />
                    {player.isVIP && (
                      <Chip 
                        label="VIP" 
                        size="small" 
                        sx={{ 
                          height: 20,
                          backgroundColor: 'rgba(255, 215, 0, 0.2)',
                          color: '#ffc107',
                          fontSize: '0.6rem',
                          fontWeight: 'bold',
                          border: '1px solid rgba(255, 215, 0, 0.1)'
                        }} 
                      />
                    )}
                    <Typography variant="caption" sx={{ ml: 0.5, color: 'rgba(255,255,255,0.5)' }}>
                      {player.flag}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                    <Tooltip title="Win rate">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={player.winRate} 
                          sx={{ 
                            width: 50, 
                            height: 4, 
                            borderRadius: 2,
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            '& .MuiLinearProgress-bar': {
                              background: 'linear-gradient(90deg, #14D854, #00bcd4)',
                              borderRadius: 2
                            }
                          }} 
                        />
                        <Typography variant="caption" color="rgba(255,255,255,0.7)">
                          {player.winRate}%
                        </Typography>
                      </Box>
                    </Tooltip>
                    
                    {player.winStreak > 0 && (
                      <Tooltip title={`${player.winStreak} win streak`}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 0.5,
                          px: 1,
                          py: 0.25,
                          borderRadius: 5,
                          backgroundColor: 'rgba(216, 38, 51, 0.1)',
                          border: '1px solid rgba(216, 38, 51, 0.1)'
                        }}>
                          <FaFire color="#d82633" size={12} />
                          <Typography variant="caption" color="#ff8a80" fontWeight="bold">
                            {player.winStreak}
                          </Typography>
                        </Box>
                      </Tooltip>
                    )}
                    
                    <Typography variant="caption" color="rgba(255,255,255,0.5)">
                      {player.lastWin}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              {/* Winnings */}
              <Box sx={{ textAlign: 'right', mr: 1 }}>
                <Typography variant="body2" color="rgba(255,255,255,0.7)">
                  Winnings
                </Typography>
                <Typography 
                  fontWeight="bold" 
                  sx={{ 
                    background: index === 0 ? 'linear-gradient(90deg, #14D854, #00e676)' : 'none',
                    WebkitBackgroundClip: index === 0 ? 'text' : 'none',
                    WebkitTextFillColor: index === 0 ? 'transparent' : 'none',
                    color: index === 0 ? 'none' : '#14D854',
                    fontSize: index === 0 ? '1.05rem' : '1rem'
                  }}
                >
                  {player.winnings.toLocaleString()} APTC
                </Typography>
              </Box>
              
              {/* Expand button */}
              <IconButton 
                size="small"
                onClick={() => handleExpandClick(player.id)}
                sx={{ 
                  color: 'rgba(255,255,255,0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(104, 29, 219, 0.2)',
                    color: 'white'
                  }
                }}
              >
                {expanded[player.id] ? <FaChevronUp /> : <FaChevronDown />}
              </IconButton>
              
              {/* Expandable section with player details */}
              <Collapse in={expanded[player.id]} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                <Box 
                  sx={{ 
                    mt: 2,
                    pt: 2,
                    borderTop: '1px dashed rgba(104, 29, 219, 0.2)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 3,
                    justifyContent: 'center'
                  }}
                >
                  {/* Best Config */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box 
                      sx={{ 
                        p: 1,
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        backgroundColor: 'rgba(216, 38, 51, 0.2)',
                        color: '#ff8a80',
                        borderRadius: '50%',
                        width: 28,
                        height: 28
                      }}
                    >
                      <GiMineExplosion size={16} />
                    </Box>
                    <Typography variant="body2" color="rgba(255,255,255,0.7)">
                      Best Setup: <span style={{ color: 'white', fontWeight: 500 }}>{player.bestConfig}</span>
                    </Typography>
                  </Box>
                  
                  {/* Max Multiplier */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box 
                      sx={{ 
                        p: 1,
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        backgroundColor: 'rgba(20, 216, 84, 0.2)',
                        color: '#14D854',
                        borderRadius: '50%',
                        width: 28,
                        height: 28
                      }}
                    >
                      <GiGoldBar size={16} />
                    </Box>
                    <Typography variant="body2" color="rgba(255,255,255,0.7)">
                      Max Multiplier: <span style={{ color: 'white', fontWeight: 500 }}>{player.maxMultiplier}</span>
                    </Typography>
                  </Box>
                </Box>
              </Collapse>
            </Box>
          </Box>
        ))}
      </Box>
      
      {/* Bottom info */}
      <Box 
        sx={{ 
          mt: 3, 
          pt: 2, 
          borderTop: '1px solid rgba(104, 29, 219, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="caption" color="rgba(255,255,255,0.5)">
          <Box 
            component="span" 
            sx={{ 
              display: 'inline-block',
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: '#14D854',
              mr: 1,
              verticalAlign: 'middle'
            }} 
          />
          Updated every hour
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.5,
            color: 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
            '&:hover': { 
              color: 'white',
              '& .arrow-icon': {
                transform: 'translateX(3px)'
              }
            }
          }}
        >
          <Typography variant="caption">
            All-time leaderboard
          </Typography>
          <FaChevronRight size={10} className="arrow-icon" sx={{ transition: 'transform 0.2s ease' }} />
        </Box>
      </Box>
    </Paper>
  );
};

export default MinesLeaderboard; 