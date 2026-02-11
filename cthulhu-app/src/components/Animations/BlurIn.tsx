import React from 'react';
import styled, { keyframes } from 'styled-components';

const blurIn = keyframes`
  0% {
    filter: blur(20px);
    opacity: 0;
  }
  100% {
    filter: blur(0px);
    opacity: 1;
  }
`;

const BlurInContainer = styled.div<{ $delay?: number }>`
  animation: ${blurIn} 1.5s ease-out forwards;
  animation-delay: ${props => props.$delay || 0}s;
  opacity: 0;
`;

interface BlurInProps {
  children: React.ReactNode;
  delay?: number;
}

export const BlurIn: React.FC<BlurInProps> = ({ children, delay = 0 }) => {
  return <BlurInContainer $delay={delay}>{children}</BlurInContainer>;
};
