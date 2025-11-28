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
  const heroRot = (Math.PI*3); // 270° initial
  const hardwareRot = 0;             // ⭐ front-facing in section 2 (adjust if needed)
  const frozenRot = Math.PI; // (example — you can change this)

  useFrame(() => {
  if (!groupRef.current) return;

  const t = progressRef.current; // 0 → 1

  // Hide after t >= 0.5
  if (t >= 0.5) {
    groupRef.current.visible = false;
    return;
  } else {
    groupRef.current.visible = true;
  }

  // CONSTANT angles
  const startRot = heroRot;      // 270°
  const endRot = hardwareRot;    // 0°

  if (t < 0.25) {
    const rotT = t / 0.25;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(heroRot, frozenRot, rotT);
  } else {
    groupRef.current.rotation.y = frozenRot; // ← stays at this angle
  }


  // 🎯 Your same movement (keeping unchanged)
  if (t < 0.2) {
    const subT = t / 0.2;
    groupRef.current.position.lerpVectors(
      heroLowPos.current,
      heroHighPos.current,
      subT
    );
  } else if (t < 0.5) {
    const subT = (t - 0.2) / 0.3;
    groupRef.current.position.lerpVectors(
      heroHighPos.current,
      hardwarePos.current,
      subT
    );
  } else {
    groupRef.current.position.copy(hardwarePos.current);
  }
});


  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={0.22} />
    </group>
  );
}

useGLTF.preload('/models/wcJIG.glb');
