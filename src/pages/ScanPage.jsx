import Navbar from '../components/layout/Navbar';
import { Canvas } from '@react-three/fiber';
import { ScanScene3D } from '../components/3d';
import DraggableScanChip from '../components/3d/DraggableScanChip';

export default function ScanPage() {
  return (
    <div className="h-screen bg-black overflow-hidden">
      <Navbar />

      {/* Background effects matching landing page theme */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Cyan gradient background matching Hero section */}
        <div className="absolute inset-0 bg-linear-to-b from-cyan-900/30 via-cyan-800/35 to-cyan-900/25" />
        <div className="absolute inset-0 bg-linear-to-r from-cyan-900/20 via-transparent to-cyan-900/20" />
      </div>

      {/* Main content */}
      <div className="relative z-10 pt-20 h-full">
        <div className="flex h-full">

          {/* Left side - 3D Model */}
          <div className="w-1/2 h-full relative">
            <Canvas
              style={{ background: 'transparent', width: '100%', height: '100%' }}
              camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 1000 }}
              gl={{ preserveDrawingBuffer: true, antialias: true }}
              dpr={1}
              resize={{ scroll: false }}
            >
              <ScanScene3D />
            </Canvas>
          </div>

          {/* Right side - Instructions & Draggable Area */}
          <div className="w-1/2 h-full relative pointer-events-none">
            {/* Instructions overlay */}
            <div className="absolute top-8 left-8 right-8 text-white text-center pointer-events-none">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">Drag Your IC Chip</h2>
              <p className="text-sm opacity-75">
                Click and drag the chip to position it in the scanning jig
              </p>
            </div>
          </div>
        </div>

        {/* Draggable Chip Overlay */}
        <DraggableScanChip />
      </div>
    </div>
  );
}

