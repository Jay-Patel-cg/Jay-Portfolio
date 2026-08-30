import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import FigmaDesigns from './components/FigmaDesigns';
import Certificates from './components/Certificates';
import Hackathon from './components/Hackathon';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      {/* Navbar appears after intro starts completing */}
      {introComplete && <Navbar />}

      <main>
        <Hero onIntroComplete={handleIntroComplete} />

        {/* Portfolio Sections */}
        {introComplete && (
          <>
            <Skills />
            <Projects />
            <FigmaDesigns />
            <Certificates />
            <Hackathon />
            <Contact />
            <Footer />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
