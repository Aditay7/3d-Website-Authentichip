import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function ICJigModel({ scrollProgress }) {
  const groupRef = useRef();
  const { scene } = useGLTF('/models/wcJIG.glb');

  // Store scroll in a ref so useFrame sees latest value
  const progressRef = useRef(0);
  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  // Positions

  // Hero: low (only ~20% visible)
  const heroLowPos = useRef(new THREE.Vector3(10, -12, 0));
  // Hero: higher (~50–60% visible)
  const heroHighPos = useRef(new THREE.Vector3(10, -4, 0));

  // Hardware: final position in section 2 (fully visible, right side, centered vertically)
  const hardwarePos = useRef(new THREE.Vector3(5, -5, 0));

  // Scan Demo: center of screen (third section)
  const scanPos = useRef(new THREE.Vector3(0, -3, 0));
  
  const howItWorksPos = useRef(new THREE.Vector3(7, -4, 0));
  const aboutPos = useRef(new THREE.Vector3(0, -4, 0));

  // Rotations
  const heroRot = (Math.PI * 3); // 270° initial (or Math.PI * 1.5)
  const hardwareRot = Math.PI; // 360° (full rotation to front) in section 2
  const scanRot = Math.PI * 2; // 540° (another 180° rotation) for section 3

  useFrame(() => {
  if (!groupRef.current) return;

  const t = progressRef.current; // 0 → 1

  // Make visible through sections 1, 2, and 3 (hide after section 3)
  if (t >= 0.75) {
    groupRef.current.visible = false;
    return;
  } else {
    groupRef.current.visible = true;
  }

  // Position logic
  if (t < 0.2) {
    // Stage 1: Hero section - move from low to high
    const subT = t / 0.2;
    groupRef.current.position.lerpVectors(
      heroLowPos.current,
      heroHighPos.current,
      subT
    );
    // First rotation during movement from hero section
    groupRef.current.rotation.y = THREE.MathUtils.lerp(heroRot, hardwareRot, subT);
  } else if (t < 0.35) {
    // Stage 2: Stay in Hardware section
    groupRef.current.position.lerpVectors(
      heroHighPos.current,
      hardwarePos.current,
      (t - 0.2) / 0.15
    );
    // Keep rotation at hardware angle
    groupRef.current.rotation.y = hardwareRot;
  } else if (t < 0.55) {
    // Stage 3: Transition from Hardware (section 2) to Scan Demo (section 3)
    // This starts earlier in section 2 and ends in section 3
    const subT = (t - 0.35) / (0.55 - 0.35);
    groupRef.current.position.lerpVectors(
      hardwarePos.current,
      scanPos.current,
      subT
    );
    // Second rotation during movement to scan section (starts earlier from section 2)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(hardwareRot, scanRot, subT);
  } else {
    // Stay at scan position
    groupRef.current.position.copy(scanPos.current);
    groupRef.current.rotation.y = scanRot;
  }
});


  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={0.22} />
    </group>
  );
}

useGLTF.preload('/models/wcJIG.glb');
