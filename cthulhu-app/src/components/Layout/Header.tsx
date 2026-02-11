import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.6) 40%,
    rgba(0, 0, 0, 0.2) 70%,
    transparent 100%
  );
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(0, 255, 136, 0.1);
  transition: all 0.3s ease;
`;

const Nav = styled.nav`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 50px;
  min-height: 72px;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 24px;
  box-sizing: border-box;
`;

const Logo = styled(Link)<{ $isMenuOpen: boolean }>`
  align-self: center;
  font-family: 'UnifrakturCook', serif;
  font-weight: 700;
  font-size: 1.25rem;
  background: linear-gradient(135deg, #FFFFFF 0%, #00FF88 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  transition: all 0.3s ease;
  opacity: ${props => props.$isMenuOpen ? 0 : 1};
  visibility: ${props => props.$isMenuOpen ? 'hidden' : 'visible'};
  position: ${props => props.$isMenuOpen ? 'absolute' : 'static'};
  
  &:hover {
    filter: drop-shadow(0 0 10px rgba(0, 255, 136, 0.5));
    transform: scale(1.05);
  }
`;

const NavLinks = styled.div<{ $isOpen: boolean }>`
  display: flex;
  gap: 32px;
  align-items: stretch;
  flex: 1;
  justify-content: center;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(10px)'};
  transition: all 0.3s ease;
  position: ${props => props.$isOpen ? 'static' : 'absolute'};
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$isActive ? '#00FF88' : 'rgba(255, 255, 255, 0.7)'};
  text-decoration: none;
  font-family: ${props => props.$isActive ? "'UnifrakturCook', serif" : "'Univa Nova', sans-serif"};
  font-size: ${props => props.$isActive ? '1.875rem' : '1.5rem'};
  font-weight: ${props => props.$isActive ? 700 : 400};
  padding: 0 24px;
  min-height: 100%;
  background: ${props => props.$isActive 
    ? 'linear-gradient(to top, rgba(0, 255, 136, 0.18) 0%, rgba(0, 255, 136, 0.05) 50%, transparent 100%)' 
    : 'transparent'};
  border-radius: 0;
  border-bottom: ${props => props.$isActive ? '2px solid #00FF88' : '2px solid transparent'};
  transition: all 0.3s ease;
  position: relative;
  box-sizing: border-box;
  
  &:hover {
    color: #00FF88;
  }
`;

const ContactIcon = styled(Link)`
  flex-shrink: 0;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: #00FF88;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #00FF88;
    transform: scale(1.1);
    filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.6));
  }
  
  svg {
    width: 100%;
    height: 100%;
    stroke: currentColor;
    fill: none;
  }
`;

const HamburgerButton = styled.button<{ $isOpen: boolean }>`
  align-self: center;
  background: transparent;
  border: none;
  color: #FFFFFF;
  font-size: 24px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 2px;
    background: #FFFFFF;
    transition: all 0.3s ease;
  }
  
  ${props => props.$isOpen ? `
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  ` : `
    &::before {
      top: 8px;
    }
    &::after {
      bottom: 8px;
    }
    &::before,
    &::after {
      box-shadow: 0 6px 0 #FFFFFF;
    }
  `}
  
  &:hover {
    color: #00FF88;
    &::before,
    &::after {
      background: #00FF88;
      ${props => !props.$isOpen ? 'box-shadow: 0 6px 0 #00FF88;' : ''}
    }
  }
`;

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <FooterContainer>
      <Nav>
        <ContactIcon to="/contact" aria-label="Contact">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </ContactIcon>
        
        <Logo to="/" $isMenuOpen={isMenuOpen}>
          R'LYEH ARCHIVE
        </Logo>
        
        <NavLinks $isOpen={isMenuOpen}>
          <NavLink to="/" $isActive={isActive('/')}>
            Home
          </NavLink>
          <NavLink to="/archive" $isActive={isActive('/archive')}>
            Archive
          </NavLink>
          <NavLink to="/challenge" $isActive={isActive('/challenge')}>
            Challenge
          </NavLink>
        </NavLinks>
        
        <HamburgerButton 
          $isOpen={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        />
      </Nav>
    </FooterContainer>
  );
};
