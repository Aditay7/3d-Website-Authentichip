import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/**
 * wcJIG Inspection Rig Model
 * Animates position based on scroll progress and supports manual rotation
 */
export default function ICJigModel({ scrollProgress }) {
    const groupRef = useRef();
    const { scene } = useGLTF('/models/wcJIG.glb');

    // Store scroll in a ref so useFrame sees latest value
    const progressRef = useRef(0);
    useEffect(() => {
        progressRef.current = scrollProgress;
    }, [scrollProgress]);

    // Define positions for each section
    const heroPos = useRef(new THREE.Vector3(0, -4, 0));         // Center in hero
    const hardwarePos = useRef(new THREE.Vector3(0, -4, 0));    // Stay center in hardware
    const scanPos = useRef(new THREE.Vector3(-7, -4, 0));       // Far left in scan demo
    const howItWorksPos = useRef(new THREE.Vector3(7, -4, 0));  // Far right in how it works
    const aboutPos = useRef(new THREE.Vector3(0, -4, 0));       // Back to center in about

    // Store base rotation from OrbitControls
    const baseRotationY = useRef(0);
    const lastScrollRotation = useRef(0);

    useFrame((state) => {
        if (!groupRef.current) return;

        const t = progressRef.current; // 0 → 1

        // Position interpolation with 5 stages
        if (t < 0.25) {
            // Stage 1: hero to hardware (0 to 0.25) - stay in center
            groupRef.current.position.copy(heroPos.current);
        } else if (t < 0.5) {
            // Stage 2: hardware to scan demo (0.25 to 0.5) - move left
            const localT = (t - 0.25) / 0.25; // remap to 0→1
            groupRef.current.position.lerpVectors(
                hardwarePos.current,
                scanPos.current,
                localT
            );
        } else if (t < 0.75) {
            // Stage 3: scan demo to how it works (0.5 to 0.75) - move right
            const localT = (t - 0.5) / 0.25; // remap to 0→1
            groupRef.current.position.lerpVectors(
                scanPos.current,
                howItWorksPos.current,
                localT
            );
        } else {
            // Stage 4: how it works to about (0.75 to 1) - back to center
            const localT = (t - 0.75) / 0.25; // remap to 0→1
            groupRef.current.position.lerpVectors(
                howItWorksPos.current,
                aboutPos.current,
                localT
            );
        }

        // Scroll-based rotation (continuous rotation throughout scroll)
        const scrollRotY = (Math.PI * 4) * t; // 720° (2 full rotations) based on scroll
        lastScrollRotation.current = scrollRotY;
        groupRef.current.rotation.y = baseRotationY.current + scrollRotY;

        // Small breathing effect (optional)
        const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
        groupRef.current.position.y += breathe;
    });

    return (
        <group ref={groupRef} onPointerDown={() => {
            baseRotationY.current = groupRef.current.rotation.y - lastScrollRotation.current;
        }}>
            <primitive object={scene} scale={0.22} />
        </group>
    );
}

// Preload the model
useGLTF.preload('/models/wcJIG.glb');
