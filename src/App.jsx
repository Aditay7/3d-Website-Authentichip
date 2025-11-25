import { useEffect, useState } from 'react';
import { Navbar } from './components/layout';
import { 
  Hero, 
  HardwareSection, 
  ScanDemoSection, 
  HowItWorksSection, 
  AboutSection 
} from './components/sections';
import { HardwareModel3D } from './components/3d';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const maxScroll = heroHeight * 4; // Track through 4 sections (hero, hardware, scan demo, how it works)

      const y = window.scrollY;
      const progress = Math.min(Math.max(y / maxScroll, 0), 1);

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Fixed 3D model layer */}
      <div className="fixed inset-0 z-10 pointer-events-none pt-16">
        <div className="pointer-events-auto w-full h-full">
          <HardwareModel3D scrollProgress={scrollProgress} />
        </div>
      </div>

      <div className="pt-16">
        <Hero />
        <HardwareSection />
        <ScanDemoSection />
        <HowItWorksSection />
        <AboutSection />
      </div>
    </div>
  );
}

export default App;
