export default function HardwareSection() {
    return (
        <section id="hardware" className="min-h-screen flex items-center justify-center relative z-20 pointer-events-none px-6 sm:px-10 lg:px-20" style={{ scrollMarginTop: '64px' }}>
            {/* Gradient overlays for depth */}
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/40 pointer-events-none" />
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{
                     backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                                       linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)`,
                     backgroundSize: '50px 50px'
                 }}>
            </div>

            {/* Section Divider */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-500/60 to-transparent"></div>
        </section>
    );
}
