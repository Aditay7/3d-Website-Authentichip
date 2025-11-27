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

  const scanPos = useRef(new THREE.Vector3(-7, -4, 0));
  const howItWorksPos = useRef(new THREE.Vector3(7, -4, 0));
  const aboutPos = useRef(new THREE.Vector3(0, -4, 0));

  // Rotations
  const heroRot = (Math.PI * 3) / 2; // 270° initial
  const hardwareRot = 0;             // ⭐ front-facing in section 2 (adjust if needed)

  useFrame(() => {
    if (!groupRef.current) return;

    const t = progressRef.current; // 0 → 1
    
    // Only visible in hero and hardware sections (hide after t >= 0.5)
    if (t >= 0.5) {
      groupRef.current.visible = false;
      return;
    } else {
      groupRef.current.visible = true;
    }

    if (t < 0.2) {
      // ⭐ Stage 0: scroll inside FIRST section (0 to 0.2)
      // Hero low (20%) → Hero higher (~50%)

      const localT = t / 0.2; // 0–0.2 → 0–1

      groupRef.current.position.lerpVectors(
        heroLowPos.current,
        heroHighPos.current,
        localT
      );

      // Rotate a bit while in hero
      const startRot = heroRot;
      const endRot = heroRot + Math.PI / 2; // small turn
      groupRef.current.rotation.y = THREE.MathUtils.lerp(startRot, endRot, localT);

    } else if (t < 0.3) {
      // ⭐ Stage 1: Transition from FIRST → SECOND section (0.2 to 0.3)
      // Hero higher → hardwarePos (fully visible, right side)
      // ALL ANIMATION HAPPENS HERE

      const localT = (t - 0.2) / 0.1; // 0.2–0.3 → 0–1

      groupRef.current.position.lerpVectors(
        heroHighPos.current,
        hardwarePos.current,
        localT
      );

      // Rotate from last hero angle to FRONT (hardwareRot)
      const startRot = heroRot + Math.PI / 2; // where stage 0 ended
      const endRot = hardwareRot;             // front
      groupRef.current.rotation.y = THREE.MathUtils.lerp(startRot, endRot, localT);

    } else {
      // ⭐ Stage 2: SECOND section (0.3 to 0.5)
      // Model is FIXED at hardware position - NO ANIMATION

      groupRef.current.position.copy(hardwarePos.current);
      groupRef.current.rotation.y = hardwareRot;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={0.22} />
    </group>
  );
}

useGLTF.preload('/models/wcJIG.glb');
