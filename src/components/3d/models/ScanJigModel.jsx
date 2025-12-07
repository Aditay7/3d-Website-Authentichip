import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function ScanJigModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
    const meshRef = useRef();
    const { scene } = useGLTF('/models/wcJIG.glb');
    
    // Normalize the cloned scene to prevent scaling conflicts
    useEffect(() => {
        if (scene && meshRef.current) {
            // Reset any existing transforms on the primitive object
            const primitive = meshRef.current.children[0];
            if (primitive) {
                primitive.scale.set(1, 1, 1);
                primitive.position.set(0, 0, 0);
                primitive.rotation.set(0, 0, 0);
            }
        }
    }, [scene]);
    
    // Handle both array and scalar scale values
    const scaleValue = Array.isArray(scale) ? scale : [scale, scale, scale];

    // Optional: Add subtle rotation animation
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
        }
    });

    return (
        <group ref={meshRef} position={position} rotation={rotation} scale={scaleValue}>
            <primitive object={scene.clone()} />
        </group>
    );
}

// Preload the model
useGLTF.preload('/models/wcJIG.glb');