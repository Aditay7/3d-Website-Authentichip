import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Animated chip crystal ──────────────────────────────────────── */
function ChipCrystal() {
  const outerWire   = useRef();
  const innerSolid  = useRef();
  const innerWire2  = useRef();
  const ring1       = useRef();
  const ring2       = useRef();
  const ring3       = useRef();
  const glow        = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (outerWire.current) {
      outerWire.current.rotation.y = t * 0.18;
      outerWire.current.rotation.x = Math.sin(t * 0.12) * 0.25;
      outerWire.current.material.emissiveIntensity = 0.4 + Math.sin(t * 1.2) * 0.15;
    }
    if (innerSolid.current) {
      innerSolid.current.rotation.y = -t * 0.12;
      innerSolid.current.rotation.z = Math.sin(t * 0.15) * 0.15;
      innerSolid.current.material.emissiveIntensity = 0.3 + Math.sin(t * 0.9 + 1) * 0.12;
    }
    if (innerWire2.current) {
      innerWire2.current.rotation.y = t * 0.22;
      innerWire2.current.rotation.x = -Math.sin(t * 0.18) * 0.2;
    }
    if (ring1.current) ring1.current.rotation.z = t * 0.35;
    if (ring2.current) ring2.current.rotation.z = -t * 0.28;
    if (ring3.current) {
      ring3.current.rotation.x = t * 0.2;
      ring3.current.rotation.z = -t * 0.15;
    }
    if (glow.current) {
      glow.current.material.opacity = 0.07 + Math.sin(t * 0.6) * 0.03;
    }
  });

  return (
    <group>
      {/* Background glow sphere */}
      <mesh ref={glow}>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshStandardMaterial
          color="#06B6D4"
          transparent opacity={0.07}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Core solid icosahedron */}
      <mesh ref={innerSolid}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={0.35}
          roughness={0.05}
          metalness={0.95}
          transparent opacity={0.75}
        />
      </mesh>

      {/* Mid wireframe */}
      <mesh ref={innerWire2} scale={1.35}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#818CF8"
          emissive="#818CF8"
          emissiveIntensity={0.5}
          wireframe
          transparent opacity={0.6}
        />
      </mesh>

      {/* Outer wireframe */}
      <mesh ref={outerWire} scale={1.85}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={0.4}
          wireframe
          transparent opacity={0.35}
        />
      </mesh>

      {/* Orbit ring 1 — cyan */}
      <group ref={ring1} rotation={[Math.PI / 5, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.6, 0.018, 8, 120]} />
          <meshStandardMaterial
            color="#06B6D4" emissive="#06B6D4" emissiveIntensity={1.2}
          />
        </mesh>
        {/* Ring glow dot — marker on ring */}
        <mesh position={[2.6, 0, 0]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* Orbit ring 2 — violet */}
      <group ref={ring2} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[2.1, 0.013, 8, 100]} />
          <meshStandardMaterial
            color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={1.0}
          />
        </mesh>
        <mesh position={[0, 2.1, 0]}>
          <sphereGeometry args={[0.065, 8, 8]} />
          <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* Orbit ring 3 — subtle */}
      <group ref={ring3} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[3.1, 0.01, 8, 120]} />
          <meshStandardMaterial
            color="#06B6D4" emissive="#06B6D4" emissiveIntensity={0.5}
            transparent opacity={0.4}
          />
        </mesh>
      </group>
    </group>
  );
}

/* ── Particle field ─────────────────────────────────────────────── */
function Particles() {
  const count = 280;
  const ref = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cyan   = new THREE.Color("#06B6D4");
    const violet = new THREE.Color("#8B5CF6");
    const white  = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      // Spherical distribution, pushed outward
      const r     = 3.5 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i*3+2] = r * Math.cos(phi);

      const pick = Math.random();
      const c    = pick < 0.5 ? cyan : pick < 0.8 ? violet : white;
      col[i*3]   = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.025;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  );
}

/* ── Orbiting lights ────────────────────────────────────────────── */
function OrbitLights() {
  const l1 = useRef();
  const l2 = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (l1.current) {
      l1.current.position.x = Math.sin(t * 0.4) * 5;
      l1.current.position.z = Math.cos(t * 0.4) * 5;
      l1.current.position.y = Math.sin(t * 0.25) * 2;
    }
    if (l2.current) {
      l2.current.position.x = -Math.sin(t * 0.3) * 4;
      l2.current.position.z = -Math.cos(t * 0.3) * 4;
      l2.current.position.y = Math.cos(t * 0.3) * 2;
    }
  });

  return (
    <>
      <pointLight ref={l1} color="#06B6D4" intensity={3.5} distance={14} />
      <pointLight ref={l2} color="#8B5CF6" intensity={2.5} distance={12} />
    </>
  );
}

/* ── Exported Canvas ────────────────────────────────────────────── */
export default function ChipScene({ style }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 48 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={style}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.15} />
      <directionalLight position={[0, 8, 4]} intensity={0.6} color="#ffffff" />
      <OrbitLights />
      <ChipCrystal />
      <Particles />
    </Canvas>
  );
}
