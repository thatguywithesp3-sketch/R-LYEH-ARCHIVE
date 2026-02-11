import React, { useState, useCallback, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Breathing animation - very subtle opacity change
const breathe = keyframes`
  0%, 100% { opacity: 0.55; }
  50% { opacity: 0.58; }
`;

// Eye glow pulse - extremely subtle
const eyeGlow = keyframes`
  0%, 100% { 
    filter: brightness(1) saturate(1);
  }
  50% { 
    filter: brightness(1.02) saturate(1.05);
  }
`;

const Section = styled.div`
  padding: 80px 16px 120px;
  min-height: 85vh;
  background: #000000;
  position: relative;
  overflow: hidden;
`;

const BackgroundLayer = styled.div.attrs<{ 
  $offsetX: number; 
  $offsetY: number; 
  $isHovered: boolean;
}>((props) => ({
  style: {
    transform: `translate(${props.$offsetX}px, ${props.$offsetY}px) scale(1.02)`,
    filter: props.$isHovered 
      ? 'brightness(1.15) saturate(1.2) contrast(1.05)' 
      : 'brightness(1) saturate(1)',
  },
}))<{ 
  $offsetX: number; 
  $offsetY: number; 
  $isHovered: boolean;
}>`
  position: absolute;
  top: 80px; /* Positioned lower from section top */
  right: -45px;
  bottom: -45px;
  left: -45px;
  z-index: 0;
  background: url('${process.env.PUBLIC_URL || ''}/Images/interaction-methods-bg.png') center top/cover no-repeat;
  will-change: transform, opacity, filter;
  transition: transform 0.15s ease-out, filter 0.5s ease-out, opacity 0.4s ease-out;
  
  /* Breathing animation */
  animation: ${breathe} 10s ease-in-out infinite;
  
  /* Glow enhancement on hover */
  ${props => props.$isHovered && css`
    animation: ${breathe} 10s ease-in-out infinite, ${eyeGlow} 4s ease-in-out infinite;
  `}
  
  /* Respect reduced motion preference - smooth fallback */
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: scale(1.02) !important;
    opacity: 0.55;
    transition: opacity 1s ease-out, filter 0.5s ease-out;
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.3) 15%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.3) 85%,
    rgba(0, 0, 0, 0.85) 100%
  );
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Title = styled.h2`
  font-family: 'UnifrakturCook', serif;
  font-weight: 700;
  font-size: clamp(3rem, 12vw, 9rem);
  line-height: 1.2;
  letter-spacing: -0.01em;
  width: 100%;
  margin-bottom: 24px;
  text-align: center;
  white-space: nowrap;
  background: linear-gradient(
    to bottom,
    #FFFFFF 0%,
    rgba(255, 255, 255, 0.95) 15%,
    rgba(200, 200, 200, 0.7) 35%,
    rgba(120, 120, 120, 0.35) 55%,
    rgba(60, 60, 60, 0.1) 75%,
    transparent 90%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0;
  margin-top: 60px;
  
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const StepBackgroundImage = styled.img<{ $isActive: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
    opacity: ${props => props.$isActive ? 1 : 0.01};
  visibility: visible;
  transition: opacity 0.5s ease-out;
  pointer-events: none;
  display: block;
`;

const Step = styled.div<{ $isActive: boolean }>`
  flex: ${props => props.$isActive ? '2' : '1'};
  min-width: 0;
  min-height: ${props => props.$isActive ? '600px' : 'auto'};
  padding: 0;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Green gradient overlay - light highlight */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: ${props => props.$isActive 
      ? 'linear-gradient(to top, rgba(0, 255, 136, 0.15) 0%, rgba(0, 255, 136, 0.05) 40%, transparent 70%)' 
      : 'transparent'};
    transition: background 0.4s ease-out;
  }
  
  /* Dashed top border for inactive */
  border-top: 1px dashed rgba(255, 255, 255, 0.2);
  
  /* Bottom border - green when active */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    z-index: 2;
    background: ${props => props.$isActive ? '#00FF88' : 'transparent'};
    transition: background 0.4s ease-out;
  }
  
  @media (max-width: 900px) {
    min-height: ${props => props.$isActive ? '500px' : 'auto'};
    border-top: none;
    border-left: 1px dashed rgba(255, 255, 255, 0.2);
    
    &::after {
      left: 0;
      top: 0;
      bottom: 0;
      right: auto;
      width: 2px;
      height: auto;
    }
    
    &::before {
      background: ${props => props.$isActive 
        ? 'linear-gradient(to right, rgba(0, 255, 136, 0.15) 0%, rgba(0, 255, 136, 0.05) 40%, transparent 70%)' 
        : 'transparent'};
    }
  }
`;

const StepNumber = styled.div<{ $isActive: boolean }>`
  position: relative;
  z-index: 1;
  font-family: 'Univa Nova', monospace;
  font-size: ${props => props.$isActive ? '1.5rem' : '1.25rem'};
  font-weight: 400;
  color: ${props => props.$isActive ? '#00FF88' : 'rgba(255, 255, 255, 0.4)'};
  margin-bottom: 12px;
  transition: all 0.4s ease-out;
`;

const StepContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
  width: 100%;
`;

const StepTitle = styled.h3<{ $isActive: boolean }>`
  font-family: ${props => props.$isActive ? "'UnifrakturCook', serif" : "'Univa Nova', sans-serif"};
  font-weight: ${props => props.$isActive ? 700 : 400};
  font-size: ${props => props.$isActive ? 'clamp(2rem, 5vw, 2.75rem)' : '1.25rem'};
  color: ${props => props.$isActive ? '#00FF88' : 'rgba(255, 255, 255, 0.6)'};
  margin: 0;
  line-height: 1.3;
  transition: all 0.4s ease-out;
`;

const StepDescription = styled.p<{ $isActive: boolean }>`
  font-family: 'Univa Nova', sans-serif;
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  max-height: ${props => props.$isActive ? '300px' : '0'};
  opacity: ${props => props.$isActive ? 1 : 0};
  overflow: hidden;
  margin: 0;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

const TellMeMore = styled.a<{ $isActive: boolean }>`
  position: relative;
  display: ${props => props.$isActive ? 'flex' : 'none'};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 15px;
  font-family: 'Univa Nova', sans-serif;
  font-style: normal;
  font-size: 1.125rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  border: none;
  background: transparent;
  text-decoration: none;
  margin-top: 16px;
  cursor: pointer;
  box-sizing: border-box;
  transition: font-family 0.55s cubic-bezier(0.25, 0.1, 0.25, 1),
              background 0.35s cubic-bezier(0.25, 0.1, 0.25, 1),
              color 0.35s cubic-bezier(0.25, 0.1, 0.25, 1),
              box-shadow 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
  
  &:hover {
    font-family: 'UnifrakturCook', serif;
    background: #00FF88;
    color: #000000;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.4),
                0 0 40px rgba(0, 255, 136, 0.2);
    
    &::after {
      transform: translateX(0);
    }
  }
  
  &::after {
    content: '⟶';
    font-size: 1.25rem;
    flex-shrink: 0;
    margin-left: auto;
    transform: translateX(-70%);
    transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  }
`;

const steps = [
  {
    number: '01',
    title: 'Preparation',
    description: 'Rituals and symbols, required materials, psychological preparation for contact.',
    image: `${process.env.PUBLIC_URL || ''}/Images/preparation-bg.png`,
  },
  {
    number: '02',
    title: 'Contact through dreams',
    description: 'Techniques for entering the state, role of the subconscious, safety of the interaction process.',
    image: `${process.env.PUBLIC_URL || ''}/Images/contact through dreams-bg.png`,
  },
  {
    number: '03',
    title: 'Subconscious and languages',
    description: 'Ancient languages, symbols and their meanings, communication protocols with the entity.',
    image: `${process.env.PUBLIC_URL || ''}/Images/subconscious and languages-bg.png`,
  },
  {
    number: '04',
    title: 'Phrases and formulae',
    description: 'Key phrases, correct pronunciation, sequence of actions for establishing contact.',
    image: `${process.env.PUBLIC_URL || ''}/Images/phrases and formulae-bg.png`,
  },
];

export const InteractionMethods: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(2); // Default to "Subconscious and languages"
  
  // Check for reduced motion preference
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion.current) return;
    
    const section = sectionRef.current;
    if (!section) return;
    
    const rect = section.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate offset from center (-1 to 1)
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);
    
    // Max 40px movement for stronger parallax effect
    const maxOffset = 40;
    setMouseOffset({
      x: normalizedX * maxOffset,
      y: normalizedY * maxOffset
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!prefersReducedMotion.current) {
      setIsHovered(true);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <Section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <BackgroundLayer 
        $offsetX={mouseOffset.x} 
        $offsetY={mouseOffset.y}
        $isHovered={isHovered}
      />
      <GradientOverlay />
      <Container>
        <Title>Interaction methods</Title>
        <StepsContainer>
          {steps.map((step, index) => {
            const isActive = index === activeIndex;
            return (
              <Step 
                key={index} 
                $isActive={isActive}
                onClick={() => setActiveIndex(index)}
              >
                {step.image && (
                  <StepBackgroundImage 
                    src={step.image.split('/').map((part, i, arr) => 
                      i === arr.length - 1 ? encodeURIComponent(part) : part
                    ).join('/')} 
                    alt="" 
                    $isActive={isActive}
                    onError={(e) => {
                      console.error('Failed to load image:', step.image);
                      const target = e.target as HTMLImageElement;
                      // Fallback: try original path
                      target.style.display = 'none';
                    }}
                    onLoad={() => {
                      console.log('Image loaded successfully:', step.image);
                    }}
                  />
                )}
                <StepNumber $isActive={isActive}>{step.number}</StepNumber>
                <StepContent>
                  <StepTitle $isActive={isActive}>{step.title}</StepTitle>
                  <StepDescription $isActive={isActive}>{step.description}</StepDescription>
                  <TellMeMore $isActive={isActive} href="#">Tell Me More</TellMeMore>
                </StepContent>
              </Step>
            );
          })}
        </StepsContainer>
      </Container>
    </Section>
  );
};
