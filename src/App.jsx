import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      {/* Navbar appears only after intro is complete */}
      {introComplete && <Navbar />}

      <main>
        <Hero onIntroComplete={handleIntroComplete} />

        {/* Sections fade in as user scrolls (handled by their own viewport animations) */}
        {introComplete && (
          <>
            <Skills />
            <Projects />
            <Certificates />
            <Contact />
            {/* <Footer /> */}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
