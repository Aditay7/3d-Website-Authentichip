import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import { Canvas } from '@react-three/fiber';
import { ScanScene3D } from '../../components/3d';
import DraggableScanChip from '../../components/3d/DraggableScanChip';

export default function ScanPage() {
  const location = useLocation();
  const [icNumber, setIcNumber] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // Handle incoming data from ScanDemoSection
  useEffect(() => {
    if (location.state?.icNumber) {
      setIcNumber(location.state.icNumber);

      if (location.state?.autoStart) {
        // Auto-start scanning after a brief delay
        setTimeout(() => {
          handleDrop();
        }, 1000);
      }
    }
  }, [location.state]);

  const handleSearch = () => {
    if (!icNumber.trim()) return;
    console.log('Searching for IC:', icNumber);
    // Add search logic here
  };

  const handleDrop = () => {
    if (!icNumber.trim()) {
      alert('Please enter an IC number first');
      return;
    }

    setIsScanning(true);
    console.log('Starting scan for IC:', icNumber);

    // Simulate scanning process
    setTimeout(() => {
      const mockResult = {
        icNumber: icNumber,
        status: Math.random() > 0.3 ? 'PASS' : 'FAIL',
        confidence: (85 + Math.random() * 15).toFixed(1),
        timestamp: new Date().toISOString()
      };

      setScanResult(mockResult);
      setIsScanning(false);
    }, 3000);
  };
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden" style={{ background: 'transparent' }}>
      {/* Navbar - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Enhanced gradient background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-linear-to-b from-cyan-900/30 via-cyan-800/35 to-cyan-900/25 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-r from-cyan-900/20 via-transparent to-cyan-900/20 pointer-events-none" />
      </div>



      {/* Full Width - 3D Scanner Model */}
      <div className="fixed top-16 left-0 right-0 w-full h-full z-10">
        <Canvas
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            background: 'transparent'
          }}
          camera={{
            position: [-2, 1, 8],
            fov: 45,
            near: 0.1,
            far: 1000
          }}
          gl={{
            preserveDrawingBuffer: true,
            antialias: true,
            alpha: true
          }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          resize={{ scroll: false }}
        >
          <ScanScene3D />
        </Canvas>
      </div>

      {/* Draggable Chip Overlay */}
      <DraggableScanChip onDrop={handleDrop} disabled={!icNumber.trim() || isScanning} />
    </div>
  );
}

