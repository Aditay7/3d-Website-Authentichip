export default function HardwareSection() {
    return (
        <section id="hardware" className="min-h-screen flex items-center relative z-20 pointer-events-none px-6 sm:px-10 lg:px-20" style={{ scrollMarginTop: '64px' }}>
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

            <div className="relative z-30 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center pointer-events-auto">
                
                {/* Left Content */}
                <div className="space-y-6">
                    <div className="inline-block">
                        <span className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
                            wcJIG Inspection Rig
                        </span>
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                        Hardware That
                        <span className="block bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            Never Lies
                        </span>
                    </h2>
                    
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                        Our custom-built inspection rig combines precision optics, multi-spectrum imaging, and real-time data acquisition to capture every microscopic detail of your IC.
                    </p>

                    <div className="space-y-4 pt-4">
                        {[
                            { title: 'Sub-micron Imaging', desc: 'Capture die-level features with optical precision' },
                            { title: 'Multi-Angle Capture', desc: 'Automated positioning for complete surface analysis' },
                            { title: 'Instant Data Pipeline', desc: 'Results streamed to AI engine in real-time' }
                        ].map((feature, i) => (
                            <div key={i} className="flex items-start gap-4 group">
                                <div className="w-2 h-2 mt-2 bg-cyan-500 rounded-full group-hover:shadow-[0_0_15px_rgba(34,211,238,0.8)] transition-all duration-300"></div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Content */}
                <div className="space-y-6 lg:pl-10">
                    <div className="bg-linear-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/20 rounded-2xl p-8 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            Lab-Grade Precision
                        </h3>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            Built with industrial-grade components and calibrated to research standards. Every scan delivers consistent, repeatable results you can trust.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-black/40 rounded-xl border border-cyan-500/10">
                                <div className="text-3xl font-bold text-cyan-400">0.5µm</div>
                                <div className="text-xs text-gray-400 mt-1">Resolution</div>
                            </div>
                            <div className="text-center p-4 bg-black/40 rounded-xl border border-cyan-500/10">
                                <div className="text-3xl font-bold text-cyan-400">&lt;2s</div>
                                <div className="text-xs text-gray-400 mt-1">Scan Time</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                            <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            <span className="text-sm">Automated calibration & quality checks</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                            <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            <span className="text-sm">Non-destructive testing for all package types</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                            <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            <span className="text-sm">Seamless integration with existing workflows</span>
                        </div>
                    </div>

                    <button className="w-full sm:w-auto px-8 py-3 bg-transparent border-2 border-cyan-500 hover:bg-cyan-500/10 text-cyan-400 font-semibold rounded-full text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105">
                        Explore Technical Specs →
                    </button>
                </div>
            </div>
        </section>
    );
}
