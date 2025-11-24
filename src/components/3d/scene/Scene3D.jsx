import { PerspectiveCamera, Environment } from '@react-three/drei';
import { ICJigModel, ICChipModel } from '../models';

/**
 * Main 3D Scene containing all models, lighting, and camera
 */
export default function Scene3D({ scrollProgress, isHovering }) {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={40} />

            {/* Lighting Setup */}
            <ambientLight intensity={0.3} />
            <spotLight
                position={[10, 10, 10]}
                angle={0.3}
                penumbra={1}
                intensity={isHovering ? 2 : 1.5}
                color="#22d3ee"
            />
            <spotLight
                position={[-10, -10, 10]}
                angle={0.3}
                penumbra={1}
                intensity={1}
                color="#3b82f6"
            />
            <pointLight position={[0, 0, 5]} intensity={isHovering ? 1.5 : 1} color="#06b6d4" />

            {/* wcJIG Inspection Rig Model */}
            <ICJigModel scrollProgress={scrollProgress} />

            {/* IC Chip Model (draggable, appears in 3rd section) */}
            <ICChipModel scrollProgress={scrollProgress} />

            {/* Environment for reflections */}
            <Environment preset="night" />
        </>
    );
}
