import React from 'react';
import styled from 'styled-components';
import { Header } from '../components/Layout/Header';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 16px 100px; /* Extra bottom padding for footer */
`;

const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-family: 'UnifrakturCook', serif;
  font-weight: 700;
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  background: linear-gradient(135deg, #00FF88 0%, #00D4FF 50%, #7B2CBF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 24px;
`;

const Challenge: React.FC = () => {
  return (
    <PageContainer>
      <Header />
      <Content>
        <Title>Challenge</Title>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: "'Univa Nova', sans-serif" }}>
          Interactive page will be implemented here
        </p>
      </Content>
    </PageContainer>
  );
};

export default Challenge;
