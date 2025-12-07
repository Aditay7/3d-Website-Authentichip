import { useState } from "react";

export default function Hero() {
	// UPDATED: Features list based on the project description
	const features = [
		"Hybrid AI Pipeline",
		"Non-Invasive AOI",
		"Security-First (Offline)",
		"Dimensional Analysis",
	];

	return (
		<section
			id="home"
			className="relative h-screen w-full bg-transparent overflow-hidden pt-16 pointer-events-none"
		>
			{/* Cyan gradient background matching Hardware section */}
			<div className="absolute inset-0 bg-linear-to-b from-cyan-900/30 via-cyan-800/35 to-cyan-900/25 pointer-events-none"></div>
			<div className="absolute inset-0 bg-linear-to-r from-cyan-900/20 via-transparent to-cyan-900/20 pointer-events-none"></div>

			{/* Background effects */}
			<div className="absolute inset-0 pointer-events-none">
				{/* Radial glow */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/25 via-cyan-600/12 to-transparent rounded-full blur-3xl"></div>

				{/* Scan rings */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<div className="w-[600px] h-[600px] border border-cyan-500/10 rounded-full animate-pulse"></div>
					<div
						className="absolute inset-0 w-[500px] h-[500px] m-auto border border-cyan-500/5 rounded-full animate-pulse"
						style={{ animationDelay: "1s" }}
					></div>
					<div
						className="absolute inset-0 w-[400px] h-[400px] m-auto border border-cyan-500/5 rounded-full animate-pulse"
						style={{ animationDelay: "2s" }}
					></div>
				</div>
			</div>

			{/* Content Container */}
			<div className="relative z-30 h-full flex flex-col items-center justify-center px-6 sm:px-10 lg:px-20 pointer-events-none">
				{/* Text Block */}
				<div className="pointer-events-auto text-center space-y-6 max-w-5xl mb-10">
					{/* Main Heading (H1) - Updated for Core Value */}
					<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
						<span className="bg-linear-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
							Authentichip: Secure Every Component
						</span>
						<br />
						{/* Secondary Headline - Updated for System Name & Impact */}
						<span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
							Counterfeit IC Detection
						</span>
					</h1>

					{/* Subheadline - Updated for Mechanism and Benefit */}
					<p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
						The Automated Optical Inspection (AOI) System securing critical
						supply chains with a dedicated hardware rig and hybrid machine
						learning pipeline.
					</p>

					{/* Feature Pills - Updated based on new list */}
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

					{/* CTAs removed per request */}
				</div>

				{/* Label - Kept/Slightly refined */}
				<div className="pointer-events-auto inline-block mt-8">
					<span className="text-cyan-400 text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold">
						Critical Component Authentication Platform
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

			{/* Section Divider */}
			<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-500/60 to-transparent"></div>
		</section>
	);
}
