import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Scene3D from './scene/Scene3D';

/**
 * Main 3D Canvas container for all models
 * Handles global canvas settings, controls, and effects
 */
export default function HardwareModel3D({ scrollProgress }) {
    const [isHovering, setIsHovering] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    return (
        <div 
            className="w-full h-full"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
        >
            <Canvas
                shadows
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
                onCreated={({ gl }) => {
                    gl.setClearColor('#000000', 0);
                }}
                style={{ cursor: isDragging ? 'grabbing' : (isHovering ? 'grab' : 'default') }}
            >
                <Suspense fallback={
                    <mesh>
                        <boxGeometry args={[2, 2, 2]} />
                        <meshStandardMaterial color="#22d3ee" wireframe />
                    </mesh>
                }>
                    <Scene3D scrollProgress={scrollProgress} isHovering={isHovering} />
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={true}
                    minAzimuthAngle={-Math.PI}
                    maxAzimuthAngle={Math.PI}
                    minPolarAngle={Math.PI / 2}
                    maxPolarAngle={Math.PI / 2}
                    rotateSpeed={0.5}
                />
            </Canvas>

            {/* Glow effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-60'}`}></div>
            </div>
        </div>
    );
}
