import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  gap: 32px;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-family: 'Univa Nova', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: #00FF88;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: #00FF88;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

interface NavigationProps {
  mobile?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ mobile = false }) => {
  return (
    <NavContainer>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/archive">Archive</NavLink>
      <NavLink to="/challenge">Challenge</NavLink>
    </NavContainer>
  );
};
