import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function ScanIcJigModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
    const meshRef = useRef();
    const { scene } = useGLTF('/models/icJIG.glb');

    // Optional: Add subtle rotation animation
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
        }
    });

    return (
        <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
            <primitive object={scene.clone()} />
        </group>
    );
}

// Preload the model
useGLTF.preload('/models/icJIG.glb');