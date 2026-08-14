import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function ScanChipModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}) {
  const groupRef = useRef();
  const { scene } = useGLTF('/models/icCHIP.glb');

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={Array.isArray(scale) ? scale : [scale, scale, scale]}
    >
      <primitive object={scene.clone()} />
    </group>
  );
}

// Preload the model
useGLTF.preload('/models/icCHIP.glb');
