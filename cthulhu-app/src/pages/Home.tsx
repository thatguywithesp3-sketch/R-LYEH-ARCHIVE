import React from 'react';
import styled from 'styled-components';
import { Header } from '../components/Layout/Header';
import { HeroAboutSection } from '../components/Hero/HeroAboutSection';
import { TimelineSection } from '../components/Sections/TimelineSection';
import { ImpactCases } from '../components/Sections/ImpactCases';
import { InteractionMethods } from '../components/Sections/InteractionMethods';
import { Warnings } from '../components/Sections/Warnings';
import { ArchiveFooterFrame } from '../components/Layout/ArchiveFooterFrame';

const PageContainer = styled.div`
  min-height: 100vh;
  /* Видалено background: #000000 - він перекривав фон ArchiveFooterFrame */
  background: transparent;
  padding-bottom: 100px; /* Space for footer */
`;

const Home: React.FC = () => {
  return (
    <PageContainer>
      <Header />
      <HeroAboutSection />
      <TimelineSection />
      <ImpactCases />
      <InteractionMethods />
      <Warnings />
      <ArchiveFooterFrame />
    </PageContainer>
  );
};

export default Home;
