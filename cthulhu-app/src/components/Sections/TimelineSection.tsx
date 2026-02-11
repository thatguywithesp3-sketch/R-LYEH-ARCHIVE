import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface TimelineData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bgImage: string;
}

const timelineData: TimelineData[] = [
  {
    id: 'before-humanity',
    title: 'Before Humanity',
    subtitle: 'Arrival of Cthulhu and the Old Ones on Earth',
    description: 'Millions of years before the first humans walked the Earth, cosmic entities descended from the stars. The Old Ones established their dominion over the primordial world, building cyclopean cities of impossible geometry.',
    bgImage: `${process.env.PUBLIC_URL || ''}/Images/before%20humanity%20-%20bg.png`,
  },
  {
    id: 'ancient-times',
    title: 'Ancient Times',
    subtitle: 'Construction of R\'lyeh and establishment of influence',
    description: 'The great city of R\'lyeh rose from the depths of the Pacific Ocean. Within its non-Euclidean walls, Cthulhu slumbers, waiting for the stars to align once more.',
    bgImage: `${process.env.PUBLIC_URL || ''}/Images/ancient%20times%20-%20bg.png`,
  },
  {
    id: 'present-day',
    title: 'Present Day',
    subtitle: 'Slumbering state and influence through dreams',
    description: 'Though physically dormant, Cthulhu\'s psychic influence reaches across the globe. Sensitive minds receive fragmented visions, artists create disturbing works, and cults gather in secret worship.',
    bgImage: `${process.env.PUBLIC_URL || ''}/Images/present%20day%20-%20bg.png`,
  },
];

const Section = styled.section`
  position: relative;
  padding: 100px 16px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const BackgroundImage = styled.div.attrs<{ $bgImage: string; $isVisible: boolean; $offset: number }>((props) => ({
  style: {
    backgroundImage: `url(${props.$bgImage})`,
    opacity: props.$isVisible ? 1 : 0,
    transform: `translateY(${props.$offset}px)`,
  },
}))<{ $bgImage: string; $isVisible: boolean; $offset: number }>`
  position: absolute;
  top: -150px;
  left: 0;
  right: 0;
  bottom: -150px;
  z-index: 0;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  transition: opacity 0.8s ease-out;
  will-change: transform;
`;

const TopGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 35%;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    #000000 0%,
    rgba(0, 0, 0, 0.8) 40%,
    rgba(0, 0, 0, 0.4) 70%,
    transparent 100%
  );
`;

const BottomGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 35%;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    to top,
    #000000 0%,
    rgba(0, 0, 0, 0.8) 40%,
    rgba(0, 0, 0, 0.4) 70%,
    transparent 100%
  );
`;

const Container = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  gap: 24px;
  justify-content: center;
  align-items: stretch;
  
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const TimelineCard = styled.div<{ $isActive: boolean; $isVisible: boolean; $delay: number }>`
  position: relative;
  flex: ${props => props.$isActive ? '1.5' : '1'};
  min-width: ${props => props.$isActive ? '340px' : '200px'};
  max-width: ${props => props.$isActive ? '420px' : '280px'};
  min-height: ${props => props.$isActive ? '320px' : '200px'};
  padding: 28px;
  border-radius: 16px;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  background: ${props => props.$isActive 
    ? 'linear-gradient(135deg, rgba(0, 40, 30, 0.85) 0%, rgba(0, 50, 60, 0.8) 100%)'
    : 'rgba(0, 20, 15, 0.75)'};
  border-left: 4px solid ${props => props.$isActive ? '#00FF88' : 'rgba(0, 255, 136, 0.5)'};
  backdrop-filter: blur(${props => props.$isActive ? '12px' : '8px'});
  -webkit-backdrop-filter: blur(${props => props.$isActive ? '12px' : '8px'});
  
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(30px)'};
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${props => props.$delay}s;
  
  &:hover {
    border-left-color: #00D4FF;
  }
  
  @media (max-width: 900px) {
    min-width: 100%;
    max-width: 100%;
    min-height: ${props => props.$isActive ? '280px' : '120px'};
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

const CardTitle = styled.h3<{ $isActive: boolean }>`
  font-family: ${props => props.$isActive ? "'UnifrakturCook', serif" : "'Univa Nova', sans-serif"};
  font-weight: 700;
  font-size: ${props => props.$isActive ? 'clamp(1.75rem, 3.5vw, 2.5rem)' : '1.125rem'};
  color: #00FF88;
  margin: 0;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

const CardSubtitle = styled.p<{ $isActive: boolean }>`
  font-family: 'Univa Nova', sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
  margin: 0;
  opacity: ${props => props.$isActive ? 1 : 0.7};
  transition: all 0.5s ease-out;
`;

const CardDescription = styled.p<{ $isActive: boolean }>`
  font-family: 'Univa Nova', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 0;
  max-height: ${props => props.$isActive ? '200px' : '0'};
  opacity: ${props => props.$isActive ? 1 : 0};
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;


const CTAButton = styled.div<{ $isActive: boolean }>`
  position: relative;
  display: flex;
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
  cursor: pointer;
  max-height: ${props => props.$isActive ? '48px' : '0'};
  opacity: ${props => props.$isActive ? 1 : 0};
  overflow: hidden;
  box-sizing: border-box;
  transition: max-height 0.55s cubic-bezier(0.25, 0.1, 0.25, 1),
              opacity 0.55s cubic-bezier(0.25, 0.1, 0.25, 1),
              font-family 0.55s cubic-bezier(0.25, 0.1, 0.25, 1),
              background 0.35s cubic-bezier(0.25, 0.1, 0.25, 1),
              color 0.35s cubic-bezier(0.25, 0.1, 0.25, 1),
              box-shadow 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
  
  &:hover {
    font-family: 'UnifrakturCook', serif;
    background: #00FF88;
    color: #000000;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.4),
                0 0 40px rgba(0, 255, 136, 0.2);
    
    svg {
      transform: translateX(0);
      filter: drop-shadow(0 0 4px rgba(0, 255, 136, 0.5));
      color: #000000;
    }
  }
  
  svg {
    flex-shrink: 0;
    margin-left: auto;
    transform: translateX(-70%);
    transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1),
                filter 0.55s cubic-bezier(0.25, 0.1, 0.25, 1),
                color 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
    color: inherit;
  }
`;

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const TimelineSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('before-humanity');
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Calculate offset based on section position relative to viewport
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const offset = (sectionCenter - viewportCenter) * 0.15;
      setParallaxOffset(Math.max(-80, Math.min(80, offset)));
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Section ref={sectionRef}>
      {timelineData.map(item => (
        <BackgroundImage
          key={item.id}
          $offset={parallaxOffset}
          $bgImage={item.bgImage}
          $isVisible={activeId === item.id}
          aria-hidden
        />
      ))}
      <TopGradient aria-hidden />
      <BottomGradient aria-hidden />
      <Container>
        {timelineData.map((item, index) => (
          <TimelineCard
            key={item.id}
            $isActive={activeId === item.id}
            $isVisible={isIntersecting}
            $delay={0.2 + index * 0.15}
            onMouseEnter={() => setActiveId(item.id)}
          >
            <CardContent>
              <CardTitle $isActive={activeId === item.id}>{item.title}</CardTitle>
              <CardSubtitle $isActive={activeId === item.id}>{item.subtitle}</CardSubtitle>
              <CardDescription $isActive={activeId === item.id}>
                {item.description}
              </CardDescription>
              <CTAButton $isActive={activeId === item.id}>
                Tell me more <ArrowIcon />
              </CTAButton>
            </CardContent>
          </TimelineCard>
        ))}
      </Container>
    </Section>
  );
};
