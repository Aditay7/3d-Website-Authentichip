// src/components/3d/FloatingICChip.jsx
import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import ICChipModel from './models/ICChipModel';

export default function FloatingICChip() {
  const [pos, setPos] = useState({ x: 40, y: 40 }); // start position
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation(); // so you don’t click things behind it

    setIsDragging(true);

    const rect = e.currentTarget.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e) => {
      setPos({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging]);

  return (
    <div
      onPointerDown={handlePointerDown}
      style={{
        position: 'fixed',         // <-- floats on top of whole site
        left: pos.x,
        top: pos.y,
        width: 180,
        height: 180,
        zIndex: 9999,
        cursor: isDragging ? 'grabbing' : 'grab',
        borderRadius: '999px',
        overflow: 'hidden',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
        background: 'radial-gradient(circle at top, #1f2937, #020617)',
      }}
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
        <ICChipModel />
      </Canvas>
    </div>
  );
}
