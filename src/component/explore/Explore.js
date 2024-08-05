import { Box } from '@mui/system';
import React from 'react';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { exploreImage, blue_wave } from '../../image/image';
import { colors, font_Size } from '../../comon/Common';

const Explore = () => {
  return (
    <Box
      sx={{
        backgroundColor: colors.primary,
        height: '597.11px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: {
          xs: '12px',
          sm: '14px',
          md: '16px',
          lg: '18px',
          xl: '20px',
        },
      
      }}
    >
      <img
        src={exploreImage}
        alt="Explore"
        style={{
          maxWidth: '20%',
          height: 'auto',
          borderRadius: '50%',
          marginBottom: '20px',
          padding: '10px',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#6C63FF',
          padding: '10px',
          borderRadius: '10px',
          marginTop: '20px',
        }}
      >
        <Typography
          sx={{
            fontSize: font_Size.title,
            color: colors.white_color,
            marginRight: 1,
          }}
        >
          Explore
        </Typography>
        <img
          src={blue_wave}
          alt="Explorewave"
          style={{
            maxWidth: '20%',
            height: 'auto',
          }}
        />
        <Link to="/login">
          <ArrowForwardIcon
            style={{
              marginTop: '20px',
              marginLeft: '10px',
              height: '50px',
              width: 'auto', // Adjust width to auto to prevent overflow
              color: 'white',
            }}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default Explore;
