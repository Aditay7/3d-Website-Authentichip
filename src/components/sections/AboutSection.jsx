export default function AboutSection() {
    return (
        <section id="about" className="min-h-screen flex items-center justify-center relative z-20 pointer-events-none px-6 sm:px-10 lg:px-20" style={{ scrollMarginTop: '64px' }}>
            {/* Gradient overlays for depth */}
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />
            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/30 pointer-events-none" />
            
            <div className="relative z-30 text-center text-white max-w-4xl pointer-events-auto">
                <div className="inline-block mb-6">
                    <span className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
                        Our Mission
                    </span>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    About
                    <span className="block bg-linear-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        Authentichip
                    </span>
                </h2>
                <p className="text-gray-300 text-lg mb-4">Protecting the integrity of electronics supply chains through cutting-edge authentication technology.</p>
                <p className="text-gray-400">Built by engineers, for engineers who demand certainty.</p>
            </div>

            {/* Section Divider */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-green-500/60 to-transparent"></div>
        </section>
    );
}
