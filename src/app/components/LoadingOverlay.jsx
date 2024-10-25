// LoadingOverlay.js
// import React from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
// import { styled } from '@mui/material/styles';
// import { Bars } from 'react-loader-spinner';

// const Overlay = styled(Box)(({ theme }) => ({
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
//   backdropFilter: 'blur(5px)', // Blur effect
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   zIndex: 9999, // Make sure it appears on top of everything
//   overflowY:'hidden'
// }));

// const LoadingOverlay = () => (
//   <Overlay>
//     {/* <CircularProgress 
//     sx={{
//       color: '#bed4c2', // Custom color
//       width: '200px', // Custom size
//       height: 'auto', // Custom size
//       '@media (max-width:600px)': { // Responsive size
//         width: '60px',
//         height: '60px',
//       },
//     }}
//     /> */}
//      {/* <Bars color="#bed4c2" height={80} width={80} />  it is good  */}  
//   </Overlay>
// );

// export default LoadingOverlay;

// import React from 'react';
// import Box from '@mui/material/Box';
// import { styled } from '@mui/material/styles';

// const Overlay = styled(Box)(({ theme }) => ({
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   backgroundColor: 'rgba(255, 255, 255, 0.8)',
//   backdropFilter: 'blur(5px)',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   zIndex: 9999,
// }));

// const Dot = styled('div')(({ theme }) => ({
//   backgroundColor: 'green',
//   borderRadius: '50%',
//   width: '20px',
//   height: '20px',
//   animation: 'bounce 1.5s infinite ease-in-out',
//   margin: '0 5px',
//   '@keyframes bounce': {
//     '0%, 20%, 50%, 80%, 100%': {
//       transform: 'translateY(0)',
//     },
//     '40%': {
//       transform: 'translateY(-30px)',
//     },
//     '60%': {
//       transform: 'translateY(-15px)',
//     },
//   },
// }));

// const DotWrapper = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
// }));

// const LoadingOverlay = () => (
//   <Overlay>
//     <DotWrapper>
//       <Dot style={{ animationDelay: '0s' }} />
//       <Dot style={{ animationDelay: '0.2s' }} />
//       <Dot style={{ animationDelay: '0.4s' }} />
//     </DotWrapper>
//   </Overlay>
// );

// export default LoadingOverlay;

// import React from 'react';
// import { ThreeDots } from 'react-loader-spinner';
// import Box from '@mui/material/Box';
// import { styled } from '@mui/material/styles';

// const Overlay = styled(Box)(({ theme }) => ({
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   backgroundColor: 'rgba(255, 255, 255, 0.8)',
//   backdropFilter: 'blur(5px)',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   zIndex: 9999,
// }));

// const LoadingOverlay = () => (
//   <Overlay>
//     <ThreeDots color="green" height={80} width={80} />
//   </Overlay>
// );

// export default LoadingOverlay;

// import React from 'react';
// import Box from '@mui/material/Box';
// import { styled } from '@mui/material/styles';

// const Overlay = styled(Box)(({ theme }) => ({
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   backgroundColor: 'rgba(255, 255, 255, 0.8)',
//   backdropFilter: 'blur(5px)',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   zIndex: 9999,
// }));

// const Ball = styled('div')(({ theme }) => ({
//   backgroundColor: 'green',
//   borderRadius: '50%',
//   width: '20px',
//   height: '20px',
//   animation: 'bounce 1.5s infinite',
//   '@keyframes bounce': {
//     '0%, 20%, 50%, 80%, 100%': {
//       transform: 'translateY(0)',
//     },
//     '40%': {
//       transform: 'translateY(-30px)',
//     },
//     '60%': {
//       transform: 'translateY(-15px)',
//     },
//   },
// }));

// const BallWrapper = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   width: '100px',
// }));

// const LoadingOverlay = () => (
//   <Overlay>
//     <BallWrapper>
//       <Ball style={{ animationDelay: '0s' }} />
//       <Ball style={{ animationDelay: '0.2s' }} />
//       <Ball style={{ animationDelay: '0.4s' }} />
//     </BallWrapper>
//   </Overlay>
// );

// export default LoadingOverlay;

// import React from 'react';
// import Box from '@mui/material/Box';
// import { styled } from '@mui/material/styles';

// const Overlay = styled(Box)(({ theme }) => ({
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   backgroundColor: 'rgba(255, 255, 255, 0.8)',
//   backdropFilter: 'blur(5px)',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   zIndex: 9999,
// }));

// const Dot = styled('div')(({ theme }) => ({
//   width: '20px',
//   height: '20px',
//   backgroundColor: 'green',
//   borderRadius: '50%',
//   position: 'absolute',
//   animation: 'fall 1.5s infinite ease-in-out',
//   '@keyframes fall': {
//     '0%': {
//       transform: 'translateY(-50px)',
//       opacity: 1,
//     },
//     '50%': {
//       opacity: 0.5,
//     },
//     '100%': {
//       transform: 'translateY(50px)',
//       opacity: 0,
//     },
//   },
// }));

// const DotWrapper = styled(Box)(({ theme }) => ({
//   position: 'relative',
//   display: 'flex',
//   alignItems: 'flex-start',
//   justifyContent: 'center',
//   width: '100px', // Adjust width as needed
//   height: '60px',
// }));

// const LoadingOverlay = () => (
//   <Overlay>
//     <DotWrapper>
//       <Dot style={{ animationDelay: '0s', left: '0' }} />
//       <Dot style={{ animationDelay: '0.3s', left: '30px' }} />
//       <Dot style={{ animationDelay: '0.6s', left: '60px' }} />
//     </DotWrapper>
//   </Overlay>
// );

// export default LoadingOverlay;


import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Overlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(5px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
}));

const Dot = styled('div')(({ theme }) => ({
  width: '12px', // Reduced size
  height: '12px', // Reduced size
  backgroundColor: '#3f3b3f80',
  borderRadius: '50%',
  position: 'absolute',
  animation: 'fade 1.5s infinite ease-in-out',
  opacity: 0,
  '@keyframes fade': {
    '0%': {
      opacity: 0,
    },
    '50%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    },
  },
}));

const DotWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '60px', // Adjusted size to fit smaller dots
  height: '60px', // Adjusted size to fit smaller dots
}));

const generateDots = () => {
  const numDots = 8;
  const radius = 30; // Adjusted radius to fit smaller dots
  const angleStep = (2 * Math.PI) / numDots;
  const dots = [];

  for (let i = 0; i < numDots; i++) {
    const angle = i * angleStep;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    dots.push(
      <Dot
        key={i}
        style={{
          top: `50%`,
          left: `50%`,
          transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
          animationDelay: `${i * 0.2}s`,
        }}
      />
    );
  }
  return dots;
};

const LoadingOverlay = () => (
  <Overlay>
    <DotWrapper>
      {generateDots()}
    </DotWrapper>
  </Overlay>
);

export default LoadingOverlay;
