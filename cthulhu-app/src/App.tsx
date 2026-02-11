import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import Home from './pages/Home';
import Challenge from './pages/Challenge';
import Archive from './pages/Archive';
import './styles/globals.css';
import './styles/animations.css';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router basename="/R-LYEH-ARCHIVE">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
