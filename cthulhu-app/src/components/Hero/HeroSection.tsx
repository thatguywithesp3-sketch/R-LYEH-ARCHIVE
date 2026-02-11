import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button } from '../UI/Button';
import { useParallax } from '../../hooks/useParallax';

// Шлях до відео - використовуємо абсолютний шлях для GitHub Pages
const HERO_VIDEO_URL = `${process.env.PUBLIC_URL || ''}/videos/hero-background.mp4`;

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #000000;
  overflow: hidden;
`;

const HeroBackgroundVideo = styled.video<{ $offset: number }>`
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  object-position: center;
  transform: translateY(${props => props.$offset}px);
  will-change: transform;
  background: #000000;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  /* Light vignette along edges */
  box-shadow: inset 0 0 20vmin 6vmin rgba(0, 0, 0, 0.35);
  
  /* Ocean visuals */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(circle at 30% 30%, rgba(0, 255, 136, 0.1) 0%, transparent 70%),
      radial-gradient(circle at 70% 70%, rgba(0, 212, 255, 0.08) 0%, transparent 70%),
      radial-gradient(circle at 50% 50%, rgba(123, 44, 191, 0.05) 0%, transparent 70%);
    animation: breathe 8s ease-in-out infinite;
  }
  
  /* Film grain */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    opacity: 0.4;
  }
  
  @keyframes breathe {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.9;
    }
  }
`;

const HeroTitleBackdrop = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(95vw, 1000px);
  height: min(80vh, 580px);
  z-index: 1;
  pointer-events: none;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.28) 45%,
    rgba(0, 0, 0, 0.1) 70%,
    transparent 100%
  );
  filter: blur(20px);
  -webkit-filter: blur(20px);
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 1200px;
  padding: 0 12px;
  width: 100%;
`;

const Title = styled.h1<{ $isVisible: boolean }>`
  font-family: 'UnifrakturCook', serif;
  font-weight: 700;
  font-size: clamp(4rem, 13vw, 7.5rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #00FF88 0%, #00D4FF 50%, #7B2CBF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 24px;
  opacity: ${props => props.$isVisible ? 1 : 0};
  filter: ${props => props.$isVisible ? 'blur(0px)' : 'blur(20px)'};
  transition: all 1.5s ease-out;
  position: relative;
  z-index: 2;
  
  /* Glow */
  text-shadow: 0 0 40px rgba(0, 255, 136, 0.3);
`;

const Subtitle = styled.p<{ $isVisible: boolean }>`
  font-family: 'Univa Nova', sans-serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 400;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 48px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  opacity: ${props => props.$isVisible ? 1 : 0};
  transition: all 1.5s ease-out 0.5s;
  position: relative;
  z-index: 2;
`;

const ButtonGroup = styled.div<{ $isVisible: boolean }>`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(20px)'};
  transition: all 0.8s ease-out 1s;
`;

const Cursor = styled.span`
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;

const HeroAreaWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
`;

export const HeroSection: React.FC<{ embedded?: boolean }> = ({ embedded = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const parallaxOffset = useParallax(0.6);
  const videoRef = useRef<HTMLVideoElement>(null);

  const fullText = 'Archive of cosmic phenomena and ancient entities';

  useEffect(() => {
    setIsVisible(true);
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowButtons(true), 300);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  // Обробка завантаження відео з детальною діагностикою
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      console.log('🎥 Initializing video element');
      console.log('🎥 Video URL:', HERO_VIDEO_URL);
      console.log('🎥 PUBLIC_URL:', process.env.PUBLIC_URL);
      console.log('🎥 Video element:', video);
      
      const handleCanPlay = () => {
        console.log('✅ Video can play');
        video.play().catch((error) => {
          console.error('❌ Error playing video:', error);
          setVideoError(true);
        });
      };

      const handleLoadedData = () => {
        console.log('✅ Video loaded successfully');
        console.log('📊 Video dimensions:', video.videoWidth, 'x', video.videoHeight);
        video.play().catch((error) => {
          console.error('❌ Error playing video after load:', error);
          setVideoError(true);
        });
      };

      const handlePlaying = () => {
        console.log('▶️ Video is playing');
      };

      const handlePause = () => {
        console.log('⏸️ Video paused');
      };

      const handleError = (e: Event) => {
        console.error('❌ Video loading error:', e);
        console.error('❌ Video URL:', HERO_VIDEO_URL);
        console.error('❌ Video element:', video);
        if (video.error) {
          console.error('❌ Video error code:', video.error.code);
          console.error('❌ Video error message:', video.error.message);
        }
        setVideoError(true);
      };

      const handleLoadStart = () => {
        console.log('🔄 Video load started');
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('playing', handlePlaying);
      video.addEventListener('pause', handlePause);
      video.addEventListener('error', handleError);
      video.addEventListener('loadstart', handleLoadStart);

      // Перевірка через невеликий таймаут
      setTimeout(() => {
        console.log('🔍 Video check after 1s:');
        console.log('  - readyState:', video.readyState);
        console.log('  - networkState:', video.networkState);
        console.log('  - paused:', video.paused);
        console.log('  - currentSrc:', video.currentSrc);
        if (video.readyState >= 2) {
          video.play().catch((error) => {
            console.error('❌ Error playing video after timeout:', error);
          });
        }
      }, 1000);

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('playing', handlePlaying);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('error', handleError);
        video.removeEventListener('loadstart', handleLoadStart);
      };
    } else {
      console.error('❌ Video ref is null!');
    }
  }, []);

  const heroContent = (
    <Content>
        <Title $isVisible={isVisible}>
          Research into the entity
          <br />
          that sleeps beneath the ocean
        </Title>
        <Subtitle $isVisible={isVisible}>
          {displayedText}
          {displayedText.length < fullText.length && <Cursor>|</Cursor>}
        </Subtitle>
        <ButtonGroup $isVisible={showButtons}>
          <Button $variant="primary" $size="lg">
            Explore the myth
          </Button>
          <Button $variant="secondary" $size="lg">
            Initiate contact
          </Button>
        </ButtonGroup>
      </Content>
  );

  if (embedded) {
    return <HeroAreaWrapper>{heroContent}</HeroAreaWrapper>;
  }

  return (
    <HeroContainer>
      <HeroBackgroundVideo
        ref={videoRef}
        $offset={parallaxOffset}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_URL} type="video/mp4" />
      </HeroBackgroundVideo>
      {videoError && (
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage: `url('${process.env.PUBLIC_URL || ''}/Images/ctulhu-hero-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
      )}
      <HeroOverlay aria-hidden />
      <HeroTitleBackdrop aria-hidden />
      {heroContent}
    </HeroContainer>
  );
};
