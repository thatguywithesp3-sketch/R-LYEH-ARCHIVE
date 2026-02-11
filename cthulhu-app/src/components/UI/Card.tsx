import styled from 'styled-components';

interface CardProps {
  $hover?: boolean;
}

export const Card = styled.div.attrs<CardProps>((props) => ({
  // Фільтруємо props щоб не передавати їх в DOM
}))<CardProps>`
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 255, 136, 0.1);
  border-radius: 12px;
  padding: 32px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 255, 136, 0.1);
  
  ${props => props.$hover && `
    &:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 8px 32px rgba(0, 255, 136, 0.3);
      border-color: rgba(0, 255, 136, 0.3);
      z-index: 2;
    }
  `}
`;
