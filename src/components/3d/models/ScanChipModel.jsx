import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function ScanIcChipModel({ 
    position = [0, 0, 0], 
    rotation = [0, 0, 0], 
    scale = 1, 
    onCollision = () => {},
    jigPosition = [0, 0, 0] 
}) {
    const meshRef = useRef();
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(new THREE.Vector3());
    const { scene } = useGLTF('/models/icCHIP.glb');
    const { camera, raycaster, gl } = useThree();

    // Handle mouse/touch interactions for dragging
    const handlePointerDown = (event) => {
        event.stopPropagation();
        setIsDragging(true);
        
        // Calculate offset between pointer and object position
        const intersectionPoint = event.point;
        const offset = new THREE.Vector3().subVectors(meshRef.current.position, intersectionPoint);
        setDragOffset(offset);
        
        gl.domElement.style.cursor = 'grabbing';
    };

    const handlePointerUp = (event) => {
        if (isDragging) {
            setIsDragging(false);
            gl.domElement.style.cursor = 'grab';
            
            // Check collision with jig model (plate area)
            const chipPosition = meshRef.current.position;
            const distance = chipPosition.distanceTo(new THREE.Vector3(...jigPosition));
            
            // If chip is close enough to jig plate (within collision radius)
            if (distance < 2.5) { // Adjust collision radius as needed
                onCollision();
            }
        }
    };

    const handlePointerMove = (event) => {
        if (isDragging && meshRef.current) {
            // Update position based on mouse/pointer movement
            const newPosition = new THREE.Vector3().addVectors(event.point, dragOffset);
            meshRef.current.position.copy(newPosition);
        }
    };

    // Add hover effect
    const handlePointerEnter = () => {
        if (!isDragging) {
            gl.domElement.style.cursor = 'grab';
        }
    };

    const handlePointerLeave = () => {
        if (!isDragging) {
            gl.domElement.style.cursor = 'default';
        }
    };

    // Optional: Add floating animation when not being dragged
    useFrame((state) => {
        if (meshRef.current && !isDragging) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
        }
    });

    return (
        <group 
            ref={meshRef} 
            position={position} 
            rotation={rotation} 
            scale={scale}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
        >
            <primitive object={scene.clone()} />
            
            {/* Add a subtle glow effect when dragging */}
            {isDragging && (
                <pointLight 
                    position={[0, 0, 0]} 
                    intensity={0.5} 
                    color="#00ffff" 
                    distance={5} 
                />
            )}
        </group>
    );
}

// Preload the model
useGLTF.preload('/models/icCHIP.glb');