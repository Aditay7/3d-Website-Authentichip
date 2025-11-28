// src/components/3d/models/ICChipModel.jsx
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function ICChipModel(props) {
  const groupRef = useRef();
  const { scene } = useGLTF('/models/icCHIP.glb');

  // Fix materials
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.isMesh) {
        if (!child.material) {
          child.material = new THREE.MeshStandardMaterial({
            color: '#888888',
            metalness: 0.8,
            roughness: 0.2,
          });
        } else {
          child.material.transparent = false;
          child.material.opacity = 1;
          child.material.side = THREE.DoubleSide;
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  // Tiny float + rotate animation
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 2) * 0.1;
    groupRef.current.rotation.y = t * 0.7;
  });

  return (
    <group ref={groupRef} {...props}>
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 3, 4]} intensity={2} />
      <pointLight position={[-2, -3, -4]} intensity={1.2} />

      {/* Make it big enough */}
      <primitive object={scene} scale={5} />
    </group>
  );
}

useGLTF.preload('/models/icCHIP.glb');
