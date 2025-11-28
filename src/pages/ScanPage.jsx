import Navbar from '../components/layout/Navbar';
import { Canvas } from '@react-three/fiber';
import { ScanScene3D } from '../components/3d';

export default function ScanPage() {
    return (
        <div className="min-h-screen bg-black overflow-x-hidden">
            <Navbar />
            
            {/* Background effects matching landing page theme */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Cyan gradient background matching Hero section */}
                <div className="absolute inset-0 bg-linear-to-b from-cyan-900/30 via-cyan-800/35 to-cyan-900/25"></div>
                <div className="absolute inset-0 bg-linear-to-r from-cyan-900/20 via-transparent to-cyan-900/20"></div>
                
            </div>
            
            {/* Main content */}
            <div className="relative z-10 pt-20">
                <div className="flex h-screen">
                    {/* Left side - 3D Model */}
                    <div className="w-1/2 h-full relative">
                        <Canvas
                            style={{ 
                                background: 'transparent',
                                width: '100%',
                                height: '100%'
                            }}
                            camera={{ 
                                position: [0, 0, 8], 
                                fov: 45,
                                near: 0.1,
                                far: 1000
                            }}
                            gl={{ 
                                preserveDrawingBuffer: true,
                                antialias: true
                            }}
                            dpr={1}
                            resize={{ scroll: false }}
                        >
                            <ScanScene3D />
                        </Canvas>
                    </div>
                    
                    {/* Right side - Content */}
                    <div className="w-1/2 h-full p-8 flex items-center justify-center">
                        <div className="text-white text-center">
                            <h1 className="text-4xl font-bold mb-6 text-cyan-400">Scan Your IC</h1>
                            <p className="text-lg mb-8">Place your IC chip in the scanning jig and start the authentication process.</p>
                            {/* Additional scan page content will go here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}