import { useState } from 'react';

export default function Hero() {
    const features = [
        'Hardware-Verified',
        'ML-Powered Decisions',
        'Real-Time Scan',
        'Lab-Grade Confidence',
    ];

    return (
        <section id="home" className="relative h-screen w-full bg-transparent overflow-hidden pt-16 pointer-events-none">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Radial glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>

                {/* Scan rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-[600px] h-[600px] border border-cyan-500/10 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-[500px] h-[500px] m-auto border border-cyan-500/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute inset-0 w-[400px] h-[400px] m-auto border border-cyan-500/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>
            </div>

            {/* Content Container */}
            <div className="relative z-30 h-full flex flex-col items-center justify-center px-6 sm:px-10 lg:px-20 pointer-events-none">
                
                {/* Text Block */}
                <div className="pointer-events-auto text-center space-y-6 max-w-5xl mb-10">
                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                        <span className="bg-linear-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                            Authentichip
                        </span>
                        <br />
                        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                            Trust Every IC You Touch.
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        A dedicated inspection rig fused with AI that tells you—instantly—if your IC is genuine or counterfeit.
                    </p>

                    {/* Feature Pills */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-2">
                        {features.map((feature) => (
                            <span
                                key={feature}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-black/50 border border-cyan-500/30 rounded-full text-cyan-300 text-xs sm:text-sm hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300 cursor-default"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
                        <button className="px-6 py-2.5 sm:px-8 sm:py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-full text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]">
                            Start Scan Demo
                        </button>
                        <button className="px-6 py-2.5 sm:px-8 sm:py-3 bg-transparent border-2 border-cyan-500 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 font-semibold rounded-full text-sm sm:text-base transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                            Meet the Hardware
                        </button>
                    </div>
                </div>

                {/* Label */}
                <div className="pointer-events-auto inline-block mt-8">
                    <span className="text-cyan-400 text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold">
                        Real-Time Chip Authentication
                    </span>
                </div>

                {/* Scroll Cue */}
                <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 animate-bounce">
                    <span className="text-gray-500 text-xs uppercase tracking-widest">
                        Scroll to Explore Authentichip
                    </span>
                    <svg
                        className="w-6 h-6 text-cyan-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </div>
        </section>
    );
}
