export default function HowItWorksSection() {
    return (
        <section id="how-it-works" className="min-h-screen flex items-center justify-center relative z-20 pointer-events-none px-6 sm:px-10 lg:px-20" style={{ scrollMarginTop: '64px' }}>
            {/* Cyan gradient background matching Hardware section */}
            <div className="absolute inset-0 bg-linear-to-b from-cyan-900/30 via-cyan-800/35 to-cyan-900/25 pointer-events-none" />
            <div className="absolute inset-0 bg-linear-to-r from-cyan-900/20 via-transparent to-cyan-900/20 pointer-events-none" />
            
            <div className="relative z-30 text-center text-white max-w-4xl pointer-events-auto">
                <div className="inline-block mb-6">
                    <span className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
                        The Process
                    </span>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    How It
                    <span className="block bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        Works
                    </span>
                </h2>
                <p className="text-gray-300 text-lg">Seamless authentication in three simple steps</p>
            </div>

            {/* Section Divider */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-500/60 to-transparent"></div>
        </section>
    );
}
