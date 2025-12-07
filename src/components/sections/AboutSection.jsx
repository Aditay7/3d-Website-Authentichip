import { useState, useEffect } from "react";

export default function AboutSection() {
	const [activeFeature, setActiveFeature] = useState(0);
	const [isVisible, setIsVisible] = useState(false);

	// UPDATED: Icons removed from features array and mission/vision sections are handled below
	const features = [
		{
			title: "Hybrid ML Architecture",
			description:
				"Concurrent parallel models (HOG/SVM, MiniCPM V8) running on a FastAPI backend.",
			// icon: "🧠" removed
			details: [
				"FastAPI Backend",
				"HOG Feature Analysis",
				"MiniCPM V8 (VLM)",
				"Edge Inference Optimization",
			],
		},
		{
			title: "Data & Access Compliance",
			description:
				"Role-based access control with secure, tamper-evident MongoDB audit logs.",
			// icon: "🔒" removed
			details: [
				"Role-Based Access (RBAC)",
				"MongoDB Audit Log",
				"Tamper-Evident Logging",
				"Dispute Resolution Support",
			],
		},
		{
			title: "Triple-Layer Forgery Detection",
			description:
				"Combines Texture Anomaly, Data Logic, and Geometrical Check results for decision.",
			// icon: "🛡️" removed
			details: [
				"Texture Anomaly (HOG)",
				"Data Logic Validation",
				"Homography Matrix (Geometry)",
				"Conditional Physical Checks",
			],
		},
		{
			title: "Supply Chain Integration",
			description:
				"Verifiable JSON export of scan results via REST API for ERP/SCM integration.",
			// icon: "⛓️" removed
			details: [
				"REST API Endpoint",
				"JSON Export Standard",
				"ERP/SCM Integration Ready",
				"LLM-Parsed Datasheets",
			],
		},
	];

	useEffect(() => {
		setIsVisible(true);
		const interval = setInterval(() => {
			setActiveFeature((prev) => (prev + 1) % features.length);
		}, 4000);
		return () => clearInterval(interval);
	}, []);

	return (
		<section
			id="about"
			className="min-h-screen py-12 relative z-20 pointer-events-none px-4 sm:px-6 lg:px-12"
			style={{ scrollMarginTop: "64px" }}
		>
			{/* Enhanced gradient background */}
			<div className="absolute inset-0 bg-linear-to-b from-cyan-900/30 via-cyan-800/35 to-cyan-900/25 pointer-events-none" />
			<div className="absolute inset-0 bg-linear-to-r from-cyan-900/20 via-transparent to-cyan-900/20 pointer-events-none" />

			{/* Reduced animated background particles */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(12)].map((_, i) => (
					<div
						key={i}
						className="absolute w-px h-px bg-cyan-400/15 rounded-full animate-pulse"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 4}s`,
							animationDuration: `${3 + Math.random() * 2}s`,
						}}
					/>
				))}
			</div>

			<div className="relative z-30 max-w-6xl mx-auto pointer-events-auto">
				{/* Compact Header */}
				<div className="text-center mb-12">
					<div className="inline-block mb-4">
						<span className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-semibold tracking-wider uppercase">
							Our Technology
						</span>
					</div>
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-white">
						About
						<span className="block bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
							AuthentiChip
						</span>
					</h2>
					<p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-3">
						Protecting electronics supply chain integrity through cutting-edge
						AI authentication technology
					</p>
					<p className="text-gray-400 text-sm max-w-xl mx-auto">
						Built by engineers, for engineers who demand certainty in component
						authenticity
					</p>
				</div>

				<div className="grid lg:grid-cols-3 gap-8 mb-10">
					{/* Left Column - Mission & Vision - ICONS REMOVED */}
					<div className="lg:col-span-1 space-y-6">
						<div className="p-6 rounded-xl border bg-gray-900/30 border-gray-700/30">
							<h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
								{/* REMOVED: <span className="text-cyan-400">🎯</span> */}
								Our Mission
							</h3>
							<p className="text-gray-300 text-sm leading-relaxed">
								To eliminate counterfeit components from electronics supply
								chains through advanced AI-powered authentication.
							</p>
						</div>

						<div className="p-6 rounded-xl border bg-gray-900/30 border-gray-700/30">
							<h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
								{/* REMOVED: <span className="text-blue-400">🚀</span> */}
								Our Vision
							</h3>
							<p className="text-gray-300 text-sm leading-relaxed">
								Creating a world where every electronic component has verifiable
								authenticity and complete supply chain transparency.
							</p>
						</div>
					</div>

					{/* Right Column - Features Grid */}
					<div className="lg:col-span-2">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{features.map((feature, index) => (
								<div
									key={index}
									className={`relative group cursor-pointer transition-all duration-300 ${
										activeFeature === index ? "scale-102" : "hover:scale-101"
									}`}
									onClick={() => setActiveFeature(index)}
								>
									<div
										className={`p-4 rounded-xl border transition-all duration-300 ${
											activeFeature === index
												? "bg-cyan-500/10 border-cyan-400/50 shadow-md shadow-cyan-500/20"
												: "bg-gray-900/30 border-gray-700/30 hover:border-cyan-500/30"
										}`}
									>
										<div className="flex items-start gap-3 mb-3">
											{/* FEATURE ICON REMOVED - The container is now empty */}
											{/* <div className={`text-2xl transition-all duration-300 ${
                                                activeFeature === index ? 'scale-105' : ''
                                            }`}>
                                                {feature.icon}
                                            </div> */}
											<div className="flex-1">
												<h3 className="text-lg font-bold text-white mb-1">
													{feature.title}
												</h3>
												<p className="text-gray-300 text-sm">
													{feature.description}
												</p>
											</div>
										</div>

										{/* Compact Feature details */}
										<div
											className={`grid grid-cols-2 gap-1.5 transition-all duration-300 ${
												activeFeature === index
													? "opacity-100 max-h-32"
													: "opacity-60 max-h-16"
											} overflow-hidden`}
										>
											{feature.details.map((detail, i) => (
												<div
													key={i}
													className="text-xs text-cyan-400 bg-cyan-500/5 px-1.5 py-0.5 rounded border border-cyan-500/20"
												>
													{detail}
												</div>
											))}
										</div>
									</div>

									{/* Subtle active indicator */}
									{activeFeature === index && (
										<div className="absolute -inset-0.5 bg-linear-to-r from-cyan-400/15 to-blue-400/15 rounded-xl blur-sm -z-10" />
									)}
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Compact Stats Row */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<div className="text-center p-4 bg-gray-900/30 rounded-xl border border-gray-700/30">
						<div className="text-2xl font-bold text-cyan-400 mb-1">99.9%</div>
						<div className="text-xs text-gray-400">Accuracy Rate</div>
					</div>
					<div className="text-center p-4 bg-gray-900/30 rounded-xl border border-gray-700/30">
						<div className="text-2xl font-bold text-blue-400 mb-1">
							&lt;100ms
						</div>
						<div className="text-xs text-gray-400">Edge Processing</div>
					</div>
					<div className="text-center p-4 bg-gray-900/30 rounded-xl border border-gray-700/30">
						<div className="text-2xl font-bold text-purple-400 mb-1">24/7</div>
						<div className="text-xs text-gray-400">Monitoring</div>
					</div>
					<div className="text-center p-4 bg-gray-900/30 rounded-xl border border-gray-700/30">
						<div className="text-2xl font-bold text-green-400 mb-1">
							Immutable
						</div>
						<div className="text-xs text-gray-400">Audit Trail</div>
					</div>
				</div>
			</div>

			{/* Section Divider */}
			<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-500/60 to-transparent"></div>
		</section>
	);
}
