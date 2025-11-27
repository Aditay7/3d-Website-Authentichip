import DraggableICChip from '../3d/DraggableICChip';

export default function ScanDemoSection() {
    return (
        <section id="scan" className="min-h-screen flex items-center relative z-20 pointer-events-none px-6 sm:px-10 lg:px-20" style={{ scrollMarginTop: '64px' }}>
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-black/20 pointer-events-none" />
            <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/20 pointer-events-none" />
            
            {/* Scan line effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute w-full h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent top-1/2 animate-pulse"></div>
            </div>

            <div className="relative z-30 w-full max-w-7xl mx-auto pointer-events-auto">
                
                {/* Full width area for model */}
                <div className="relative min-h-[600px] pointer-events-none">
                    {/* Draggable IC Chip - starts from right side */}
                    <DraggableICChip />
                </div>
            </div>

            {/* Section Divider */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-cyan-500/60 to-transparent"></div>
        </section>
    );
}
