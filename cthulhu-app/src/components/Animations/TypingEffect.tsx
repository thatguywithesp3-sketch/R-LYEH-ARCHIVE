import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Cursor = styled.span`
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;

interface TypingEffectProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export const TypingEffect: React.FC<TypingEffectProps> = ({ 
  text, 
  speed = 50,
  onComplete 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed, onComplete]);

  return (
    <>
      {displayedText}
      {!isComplete && <Cursor>|</Cursor>}
    </>
  );
};
