import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import ScanJigModel from '../models/ScanJigModel';

/**
 * 3D Scene specifically for the Scan Page
 * Contains the ScanJig model with appropriate lighting and controls
 */
export default function ScanScene3D() {
    return (
        <>
            {/* Natural lighting for model colors */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, 5]} intensity={0.5} />

            {/* ScanJig Model centered and left-aligned */}
            <Suspense fallback={<mesh position={[-2, 0, 0]} scale={[0.1, 0.1, 0.1]}><boxGeometry args={[2, 2, 2]} /><meshStandardMaterial color="#22d3ee" opacity={0.5} transparent /></mesh>}>
                <ScanJigModel 
                    key="scan-jig-model"
                    position={[-2, 0, 0]} 
                    rotation={[0, 0.2, 0]} 
                    scale={[0.15, 0.15, 0.15]}
                />
            </Suspense>
            
            {/* Interactive Controls targeting centered left-aligned model */}
            <OrbitControls 
                enableZoom={true}
                enablePan={false}
                enableRotate={true}
                autoRotate={false}
                autoRotateSpeed={0.5}
                target={[-2, 0, 0]}
                minDistance={4}
                maxDistance={12}
            />
            
            {/* Environment for natural reflections */}
            <Environment preset="night" />
        </>
    );
}