// src/components/3d/DraggableICChip.jsx
import React, { useState, useRef, useEffect, useLayoutEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';

function ICChip3DModel({ rotationDeg = [6.5, 93.5, 11.5], sizeMultiplier = 0.94 }) {
  const groupRef = useRef();
  const { scene } = useGLTF('/models/icCHIP.glb');
  const baseScaleRef = useRef(1);

  useEffect(() => {
    if (!scene || !groupRef.current) return;

    const cloned = scene.clone(true);

    const box = new THREE.Box3().setFromObject(cloned);
    const center = new THREE.Vector3();
    box.getCenter(center);
    cloned.position.x -= center.x;
    cloned.position.y -= center.y;
    cloned.position.z -= center.z;

    const sizeVec = new THREE.Vector3();
    box.getSize(sizeVec);
    const maxDim = Math.max(sizeVec.x, sizeVec.y, sizeVec.z);
    const targetSize = 4.5;
    const scale = maxDim > 0 ? targetSize / maxDim : 1;
    baseScaleRef.current = scale;

    // Keep original materials from GLB file - no color changes
    cloned.traverse((child) => {
      if (child.isMesh) {
        // Preserve the original material from the GLB
        if (child.material) {
          // Just ensure it's set up for rendering
          child.material.needsUpdate = true;
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const g = groupRef.current;
    while (g.children.length) g.remove(g.children[0]);
    g.add(cloned);

    g.scale.setScalar(baseScaleRef.current * sizeMultiplier);
    const [dx = 0, dy = 0, dz = 0] = rotationDeg;
    g.rotation.set(
      THREE.MathUtils.degToRad(dx),
      THREE.MathUtils.degToRad(dy),
      THREE.MathUtils.degToRad(dz)
    );
  }, [scene, rotationDeg, sizeMultiplier]);

  // update rotation dynamically if props change
  useLayoutEffect(() => {
    if (!groupRef.current) return;
    const [dx = 0, dy = 0, dz = 0] = rotationDeg;
    groupRef.current.rotation.set(
      THREE.MathUtils.degToRad(dx),
      THREE.MathUtils.degToRad(dy),
      THREE.MathUtils.degToRad(dz)
    );
  }, [rotationDeg]);

  // update scale dynamically if sizeMultiplier changes
  useLayoutEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.scale.setScalar(baseScaleRef.current * sizeMultiplier);
  }, [sizeMultiplier]);

  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      <ambientLight intensity={3} />
      <directionalLight position={[5, 5, 5]} intensity={4} />
      <directionalLight position={[-5, -5, -5]} intensity={2.5} />
      <pointLight position={[0, 0, 8]} intensity={4} color="#ffffff" />
      <pointLight position={[3, 3, 3]} intensity={2} color="#60a5fa" />
    </group>
  );
}

export default function DraggableICChip({
  initialRotation = [6.5, 93.5, 11.5],
  initialSize = 0.94,
}) {
  const wrapperRef = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const WIDTH = 450;
  const HEIGHT = 450;

  const [rotX, setRotX] = useState(initialRotation[0]);
  const [rotY, setRotY] = useState(initialRotation[1]);
  const [rotZ, setRotZ] = useState(initialRotation[2]);
  const [sizeMultiplier, setSizeMultiplier] = useState(initialSize);

  useEffect(() => {
    const placeChip = () => {
      const section = document.getElementById('scan');
      if (!section || !wrapperRef.current) return;
      const sectionRect = section.getBoundingClientRect();
      const targetCenterX = Math.round(sectionRect.width * 0.8);
      const targetCenterY = Math.round(sectionRect.height * 0.55);

      let leftX = targetCenterX - WIDTH / 2;
      let topY = targetCenterY - HEIGHT / 2;

      leftX = Math.max(0, Math.min(leftX, sectionRect.width - WIDTH));
      topY = Math.max(0, Math.min(topY, sectionRect.height - HEIGHT));

      setPos({ x: leftX, y: topY });
    };

    placeChip();
    window.addEventListener('resize', placeChip);
    return () => window.removeEventListener('resize', placeChip);
  }, []);

  const handlePointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    const rect = wrapperRef.current.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  useEffect(() => {
    if (!isDragging) return;
    const handlePointerMove = (e) => {
      const section = document.getElementById('scan');
      if (!wrapperRef.current || !section) return;
      const sectionRect = section.getBoundingClientRect();

      let newX = e.clientX - sectionRect.left - dragOffset.current.x;
      let newY = e.clientY - sectionRect.top - dragOffset.current.y;

      newX = Math.max(0, Math.min(newX, sectionRect.width - WIDTH));
      newY = Math.max(0, Math.min(newY, sectionRect.height - HEIGHT));

      setPos({ x: newX, y: newY });
    };

    const handlePointerUp = () => setIsDragging(false);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={wrapperRef}
      onPointerDown={handlePointerDown}
      className="absolute"
      style={{ left: pos.x, top: pos.y, width: WIDTH, height: HEIGHT, zIndex: 100 }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full bg-transparent touch-none"
        style={{
          filter: isDragging
            ? 'drop-shadow(0 0 35px rgba(59,130,246,0.7))'
            : 'drop-shadow(0 0 20px rgba(59,130,246,0.4))',
        }}
      >
        <Suspense fallback={<Html center><div className="text-sky-400">Loading IC...</div></Html>}>
          <ICChip3DModel rotationDeg={[rotX, rotY, rotZ]} sizeMultiplier={sizeMultiplier} />
        </Suspense>
      </Canvas>

      {/* Drag hint */}
      {!isDragging && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-sky-900/10 border border-sky-500/20 text-sky-100 text-xs pointer-events-none shadow-lg">
          Click & Drag
        </div>
      )}
    </div>
  );
}

useGLTF.preload('/models/icCHIP.glb');
