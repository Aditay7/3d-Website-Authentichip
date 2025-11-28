import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import ScanChipScene3D from './scene/ScanChipScene3D';

/**
 * A small 3D chip widget that you can drag
 * anywhere on the ScanPage with the mouse.
 */
export default function DraggableScanChip() {
  // starting position on the page
  const [position, setPosition] = useState({ x: 120, y: 120 });
  const [dragging, setDragging] = useState(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    offsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;
      setPosition({
        x: e.clientX - offsetRef.current.x,
        y: e.clientY - offsetRef.current.y,
      });
    };

    const handleMouseUp = () => setDragging(false);

    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, position.x, position.y]);

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: 180,
        height: 180,
        cursor: dragging ? 'grabbing' : 'grab',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 10px 25px rgba(0,0,0,0.35)',
        background: '#020617',
        zIndex: 1000, // stay above page content
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 35 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ScanChipScene3D />
      </Canvas>
    </div>
  );
}
