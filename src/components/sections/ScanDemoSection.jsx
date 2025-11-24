export default function ScanDemoSection() {
    return (
        <section id="scan" className="min-h-screen flex items-center relative z-20 pointer-events-none px-6 sm:px-10 lg:px-20" style={{ scrollMarginTop: '64px' }}>
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-transparent to-black/50 pointer-events-none" />
            <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/40 pointer-events-none" />
            
            {/* Scan line effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute w-full h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent top-1/2 animate-pulse"></div>
            </div>

            <div className="relative z-30 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center pointer-events-auto">
                
                {/* Left Content - More space for model */}
                <div className="lg:col-span-1">
                    {/* Empty space for model visibility */}
                </div>

                {/* Right Content */}
                <div className="space-y-6 lg:pl-10">
                    <div className="inline-block">
                        <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
                            AI-Powered Analysis
                        </span>
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                        See the Scan
                        <span className="block bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            In Action
                        </span>
                    </h2>
                    
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                        Watch as our ML model processes high-resolution chip imagery in real-time, identifying subtle anomalies and authenticating with confidence.
                    </p>

                    <div className="space-y-5 pt-4">
                        {[
                            { 
                                title: 'Instant Detection', 
                                desc: 'AI flags counterfeits within seconds of scanning',
                                color: 'blue'
                            },
                            { 
                                title: 'Visual Feedback', 
                                desc: 'See exactly what the model sees with heatmap overlays',
                                color: 'purple'
                            },
                            { 
                                title: 'Confidence Scoring', 
                                desc: 'Every result backed by quantifiable certainty metrics',
                                color: 'cyan'
                            }
                        ].map((feature, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 bg-black/30 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all duration-300 group">
                                <div className={`w-12 h-12 rounded-lg bg-${feature.color}-500/10 border border-${feature.color}-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-${feature.color}-500/20 transition-all duration-300`}>
                                    <div className={`w-3 h-3 bg-${feature.color}-500 rounded-full group-hover:shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all duration-300`}></div>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1 text-lg">{feature.title}</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 space-y-3">
                        <div className="flex items-center justify-between p-4 bg-linear-to-r from-blue-500/5 to-purple-500/5 rounded-xl border border-blue-500/20">
                            <span className="text-gray-300 text-sm">Average Scan Time</span>
                            <span className="text-2xl font-bold text-blue-400">1.8s</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-linear-to-r from-purple-500/5 to-cyan-500/5 rounded-xl border border-purple-500/20">
                            <span className="text-gray-300 text-sm">Detection Accuracy</span>
                            <span className="text-2xl font-bold text-purple-400">99.7%</span>
                        </div>
                    </div>

                    <button className="w-full sm:w-auto px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-full text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-105">
                        Try Live Demo →
                    </button>
                </div>
            </div>
        </section>
    );
}
