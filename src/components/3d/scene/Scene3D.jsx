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
            <ambientLight intensity={1} />
            
            {/* Main spotlights */}
            <spotLight
                position={[10, 10, 10]}
                angle={0.3}
                penumbra={1}
                intensity={isHovering ? 3 : 2.5}
                color="#22d3ee"
            />
            <spotLight
                position={[-10, -10, 10]}
                angle={0.3}
                penumbra={1}
                intensity={2}
                color="#3b82f6"
            />
            
            {/* Strong rim lights to outline dark surfaces */}
            <pointLight position={[0, -10, 5]} intensity={3} color="#4dd0e1" />
            <pointLight position={[0, 10, -5]} intensity={2.5} color="#80deea" />
            <pointLight position={[15, 0, 5]} intensity={3} color="#26c6da" />
            <pointLight position={[-15, 0, 5]} intensity={2.5} color="#00acc1" />
            
            {/* Strong backlight from behind */}
            <pointLight position={[0, 0, -10]} intensity={4} color="#4dd0e1" />
            
            {/* Front fill light */}
            <pointLight position={[0, 0, 5]} intensity={isHovering ? 3 : 2.5} color="#06b6d4" />

            {/* wcJIG Inspection Rig Model */}
            <ICJigModel scrollProgress={scrollProgress} />

            {/* IC Chip Model (draggable, appears in 3rd section) */}
            <ICChipModel scrollProgress={scrollProgress} />

            {/* Environment for reflections */}
            <Environment preset="night" />
        </>
    );
}
