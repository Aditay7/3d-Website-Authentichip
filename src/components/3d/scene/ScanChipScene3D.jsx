import React, { Suspense } from 'react';
import { OrbitControls, Environment, Center } from '@react-three/drei';
import ScanChipModel from '../models/ScanChipModel';

/**
 * Only the 3D scene (NO Canvas here)
 */
export default function ScanChipScene3D() {
  return (
    <>
      {/* Lights */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 3, 5]} intensity={2} />
      <pointLight position={[0, 0, 2]} intensity={1} />

      {/* Model */}
      <Suspense fallback={null}>
        {/* Center & scale to fit nicely */}
        <Center scale={0.3}>
          <ScanChipModel />
        </Center>
      </Suspense>

      {/* Rotate chip, but no zoom/pan for user */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.5}
      />

      <Environment preset="studio" />
    </>
  );
}
