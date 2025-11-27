import { useState } from 'react';

export default function HardwareSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
        setMousePosition({ x, y });
    };

    const specs = [
        {
            label: "OCR Accuracy",
            value: "95%+",
            unit: "precision",
            color: "from-cyan-400 to-blue-500"
        },
        {
            label: "Edge Inference",
            value: "<100ms",
            unit: "latency",
            color: "from-blue-400 to-cyan-500"
        },
        {
            label: "Anomaly Detection",
            value: "99.9%",
            unit: "accuracy",
            color: "from-cyan-500 to-teal-400"
        }
    ];

    const capabilities = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            title: "OCR + GAN Analysis",
            description: "Fine-tuned OCR for IC markings with GAN-based authenticity scoring"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
            ),
            title: "Edge Inference Layer",
            description: "Raspberry Pi/ESP32 deployment with optimized TorchScript models"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            title: "MongoDB Audit Logs",
            description: "Immutable scan records with tamper-evident logging and complete traceability"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "Audit & Compliance",
            description: "Role-based access with tamper-evident logs and dispute resolution"
        }
    ];

    return (
        <section 
            id="hardware" 
            className="min-h-screen flex items-center justify-center relative z-10 pointer-events-none px-6 sm:px-10 lg:px-20" 
            style={{ scrollMarginTop: '64px' }}
            onMouseMove={handleMouseMove}
        >
            
            {/* Cyan gradient background */}
            <div className="absolute inset-0 bg-linear-to-b from-cyan-900/30 via-cyan-800/35 to-cyan-900/25 pointer-events-none"></div>
            <div className="absolute inset-0 bg-linear-to-r from-cyan-900/20 via-transparent to-cyan-900/20 pointer-events-none"></div>

            {/* Floating particles that follow mouse */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + i * 10}%`,
                            transform: `translate(${mousePosition.x * (50 + i * 20)}px, ${mousePosition.y * (50 + i * 20)}px)`,
                            transition: `transform ${0.3 + i * 0.1}s ease-out`
                        }}
                    />
                ))}
            </div>

            {/* Content Container */}
            <div className="relative z-20 w-full max-w-8xl mx-auto flex items-center justify-between pointer-events-auto">
                
                {/* Left Side - Interactive Content */}
                <div className="w-full lg:w-3/5 space-y-10">
                    
                    {/* Heading with 3D tilt effect */}
                    <div 
                        className="space-y-4 transition-all duration-500 ease-out"
                        style={{
                            transform: `perspective(1000px) rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * 5}deg) translateZ(20px)`
                        }}
                    >
                       
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                            <span className="bg-clip-text text-transparent bg-linear-to-r from-white via-cyan-200 to-cyan-400">
                                AuthentiChip
                            </span>
                            <span className="block text-cyan-400 mt-2">Hardware Platform</span>
                        </h2>
                        
                        <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                            Camera-enabled capture with edge ML inference, backend microservices, and immutable audit logging for IC authentication
                        </p>
                    </div>

                    {/* Interactive Stats Cards */}
                    <div className="grid grid-cols-3 gap-3">
                        {specs.map((spec, index) => {
                            const tiltX = mousePosition.x * (10 - index * 2);
                            const tiltY = mousePosition.y * (10 - index * 2);
                            
                            return (
                                <div
                                    key={index}
                                    className="group relative bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-4 overflow-hidden transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]"
                                    style={{
                                        transform: `translate(${tiltX}px, ${tiltY}px) scale(${hoveredCard === index ? 1.05 : 1})`,
                                        transitionDelay: `${index * 0.05}s`
                                    }}
                                    onMouseEnter={() => setHoveredCard(index)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    {/* Animated gradient background */}
                                    <div className={`absolute inset-0 bg-linear-to-br ${spec.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                                    
                                    <div className="relative z-10">
                                        <div className="text-xs text-cyan-400 uppercase tracking-wider mb-2 opacity-70">
                                            {spec.label}
                                        </div>
                                        <div className="text-xl md:text-2xl font-bold text-white mb-1">
                                            {spec.value}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {spec.unit}
                                        </div>
                                    </div>
                                    
                                    {/* Corner accent */}
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-400/10 blur-2xl group-hover:bg-cyan-400/20 transition-all duration-300"></div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Capability Cards with advanced interactions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {capabilities.map((capability, index) => {
                            const delay = index * 0.05;
                            const offsetX = mousePosition.x * (25 - index * 4);
                            const offsetY = mousePosition.y * (25 - index * 4);
                            const rotation = hoveredCard === index + 100 ? mousePosition.x * 3 : 0;
                            
                            return (
                                <div
                                    key={index}
                                    className="group relative bg-cyan-950/30 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 transition-all duration-300 hover:bg-cyan-900/40 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(34,211,238,0.35)] cursor-pointer"
                                    style={{
                                        transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg)`,
                                        transitionDelay: `${delay}s`
                                    }}
                                    onMouseEnter={() => setHoveredCard(index + 100)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    {/* Animated border effect */}
                                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                                        <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 animate-pulse"></div>
                                    </div>
                                    
                                    {/* Spotlight effect following mouse */}
                                    <div 
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background: `radial-gradient(circle at ${(mousePosition.x + 0.5) * 100}% ${(mousePosition.y + 0.5) * 100}%, rgba(34,211,238,0.15), transparent 50%)`
                                        }}
                                    ></div>
                                    
                                    <div className="relative z-10">
                                        <div className="text-cyan-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                                            {capability.icon}
                                        </div>
                                        <h3 className="text-white font-bold text-base mb-2 group-hover:text-cyan-300 transition-colors">
                                            {capability.title}
                                        </h3>
                                        <p className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-300 transition-colors">
                                            {capability.description}
                                        </p>
                                    </div>
                                    
                                    {/* Corner decorations */}
                                    <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-cyan-400/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-cyan-400/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            );
                        })}
                    </div>

                </div>

                {/* Right Side - Reserved for 3D Model (positioned via fixed layer in App.jsx) */}
                <div className="hidden lg:block w-1/2"></div>
            </div>

            {/* Section Divider */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-500/60 to-transparent"></div>
        </section>
    );
}
