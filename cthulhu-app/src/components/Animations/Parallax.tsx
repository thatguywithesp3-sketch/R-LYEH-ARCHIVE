import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const ParallaxContainer = styled.div<{ $offset: number }>`
  transform: translateY(${props => props.$offset}px);
  transition: transform 0.1s ease-out;
`;

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
}

export const Parallax: React.FC<ParallaxProps> = ({ children, speed = 0.5 }) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrollY = window.scrollY;
        const elementTop = rect.top + scrollY;
        const newOffset = (scrollY - elementTop) * speed;
        setOffset(newOffset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <ParallaxContainer ref={ref} $offset={offset}>
      {children}
    </ParallaxContainer>
  );
};
