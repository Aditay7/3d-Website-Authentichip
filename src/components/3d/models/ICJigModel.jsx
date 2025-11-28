import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function ICJigModel({ scrollProgress, children }) {
  const groupRef = useRef();
  const { scene } = useGLTF('/models/wcJIG.glb');

  const progressRef = useRef(0);
  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  // 📌 Scroll Ranges (adjusted to reach center of scan demo section)
  const SCAN_START = 0.45;      // Model reaches center of scan demo section
  const SCAN_PIN_END = 0.55;    // Model stays pinned in center briefly
  const SCAN_SCROLL_END = 0.85; // Model scrolls up with section and disappears

  // 📌 Positions
  const heroLowPos = useRef(new THREE.Vector3(10, -12, 0));
  const heroHighPos = useRef(new THREE.Vector3(10, -4, 0));
  const hardwarePos = useRef(new THREE.Vector3(5, -5, 0));
  const scanPos = useRef(new THREE.Vector3(2, -3.5, 0));

  // 📌 Rotations
  const heroRot = Math.PI * 3;
  const hardwareRot = Math.PI;
  const scanRot = Math.PI * 2;

  useFrame(() => {
    if (!groupRef.current) return;

    const t = progressRef.current;

    // 🔹 Hide completely after Scan section is gone
    if (t >= SCAN_SCROLL_END) {
      groupRef.current.visible = false;
      return;
    }

    groupRef.current.visible = true; // Default visible

    // 🔹 SCAN DEMO FIXED PHASE
    if (t >= SCAN_START && t < SCAN_PIN_END) {
      groupRef.current.position.copy(scanPos.current);
      groupRef.current.rotation.y = scanRot;
      return;
    }

    // 🔹 SCAN DEMO SCROLL-UP PHASE
    if (t >= SCAN_PIN_END && t < SCAN_SCROLL_END) {
      const scanT = (t - SCAN_PIN_END) / (SCAN_SCROLL_END - SCAN_PIN_END);
      const maxScrollOffset = 20; // scroll ke sath kitna upar

      const adjustedScanPos = new THREE.Vector3(
        scanPos.current.x,
        scanPos.current.y + scanT * maxScrollOffset,
        scanPos.current.z
      );

      groupRef.current.position.copy(adjustedScanPos);
      groupRef.current.rotation.y = scanRot;
      return;
    }

    // 🔹 HERO + HARDWARE Transition
    if (t < 0.2) {
      const subT = t / 0.2;
      groupRef.current.position.lerpVectors(
        heroLowPos.current,
        heroHighPos.current,
        subT
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(heroRot, hardwareRot, subT);
    } else if (t < 0.35) {
      const subT = (t - 0.2) / 0.15;
      groupRef.current.position.lerpVectors(
        heroHighPos.current,
        hardwarePos.current,
        subT
      );
      groupRef.current.rotation.y = hardwareRot;
    } else if (t < SCAN_START) {
      const subT = (t - 0.35) / (SCAN_START - 0.35);
      groupRef.current.position.lerpVectors(
        hardwarePos.current,
        scanPos.current,
        subT
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(hardwareRot, scanRot, subT);
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={0.22} />
      {children}
    </group>
  );
}

useGLTF.preload('/models/wcJIG.glb');
