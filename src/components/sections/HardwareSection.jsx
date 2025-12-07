import { useState } from "react";

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
			label: "Texture Anomaly (HOG)",
			value: "99.7%",
			unit: "Blacktopping detection",
			color: "from-cyan-400 to-blue-500",
		},
		{
			label: "Vision-Language Model",
			value: "MiniCPM V8",
			unit: "OCR engine",
			color: "from-blue-400 to-cyan-500",
		},
		{
			label: "Dimensional Check",
			value: "± 0.05mm",
			unit: "tolerance threshold",
			color: "from-cyan-500 to-teal-400",
		},
	];

	const capabilities = [
		{
			icon: (
				<svg
					className="w-6 h-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
			),
			title: "Controlled Image Acquisition",
			description:
				"Custom 3D-printed jig, Raspberry Pi HQ Camera, and consistent Ring Light eliminate environmental variables.",
		},
		{
			icon: (
				<svg
					className="w-6 h-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
					/>
				</svg>
			),
			title: "Texture Anomaly Detection",
			description:
				"HOG features analyzed by SVM to detect subtle surface inconsistencies (sanding/blacktopping) after dynamic image pre-processing (CLAHE, Bilateral).",
		},
		{
			icon: (
				<svg
					className="w-6 h-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2h-1a2 2 0 00-2 2v2m-2-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			),
			title: "OCR and Data Logic Validation",
			description:
				"MiniCPM V8 (VLM) extracts Part ID/Date Code, followed by custom logic checks for format validity and logical fallacies (e.g., future dates).",
		},
		{
			icon: (
				<svg
					className="w-6 h-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
					/>
				</svg>
			),
			title: "Advanced Geometrical Checks",
			description:
				"Homography Matrix verifies IC width/height ratios. Optional Pin 1 marker checks (eroded/filled indentations) and Hough Lines for pin straightness.",
		},
	];

	return (
		<section
			id="hardware"
			className="min-h-screen flex items-center justify-center relative z-10 pointer-events-none px-6 sm:px-10 lg:px-20"
			style={{ scrollMarginTop: "64px" }}
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
							transform: `translate(${mousePosition.x * (50 + i * 20)}px, ${
								mousePosition.y * (50 + i * 20)
							}px)`,
							transition: `transform ${0.3 + i * 0.1}s ease-out`,
						}}
					/>
				))}
			</div>

			{/* Content Container */}
			<div className="relative z-20 w-full max-w-8xl mx-auto flex items-center justify-between pointer-events-auto">
				{/* Left Side - Interactive Content */}
				<div className="w-full lg:w-3/5 space-y-10">
					{/* Heading with 3D tilt effect - UPDATED FONT SIZE AND LINE HEIGHT */}
					<div
						className="space-y-4 transition-all duration-500 ease-out"
						style={{
							transform: `perspective(1000px) rotateX(${
								mousePosition.y * -5
							}deg) rotateY(${mousePosition.x * 5}deg) translateZ(20px)`,
						}}
					>
						<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug">
							<span className="bg-clip-text text-transparent bg-linear-to-r from-white via-cyan-200 to-cyan-400">
								System Uniqueness: The Custom Jig
							</span>
							<span className="block text-cyan-400 mt-2">
								Precision Imaging for AI Fidelity
							</span>
						</h2>

						<p className="text-gray-300 text-lg leading-relaxed max-w-xl">
							A custom-fabricated 3D-printed jig ensures precise Z-axis focal
							adjustment. Paired with the Raspberry Pi HQ Camera and fixed Ring
							Light, it guarantees high-fidelity, shadowless input for the ML
							pipeline.
						</p>
					</div>

					{/* Interactive Stats Cards - UPDATED DURATION AND DELAY */}
					<div className="grid grid-cols-3 gap-3">
						{specs.map((spec, index) => {
							const tiltX = mousePosition.x * (10 - index * 2);
							const tiltY = mousePosition.y * (10 - index * 2);

							return (
								<div
									key={index}
									className="group relative bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-4 overflow-hidden transition-all duration-500 hover:border-cyan-400/40 hover:shadow-[0_0_12px_rgba(34,211,238,0.10)]"
									style={{
										transform: `translate(${tiltX}px, ${tiltY}px) scale(${
											hoveredCard === index ? 1.02 : 1
										})`,
										transitionDelay: `${index * 0.08}s`,
									}}
									onMouseEnter={() => setHoveredCard(index)}
									onMouseLeave={() => setHoveredCard(null)}
								>
									{/* Animated gradient background (more subtle) */}
									<div
										className={`absolute inset-0 bg-linear-to-br ${spec.color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500`}
									></div>

									<div className="relative z-10">
										<div className="text-xs text-cyan-400 uppercase tracking-wider mb-2 opacity-70">
											{spec.label}
										</div>
										<div className="text-xl md:text-2xl font-bold text-white mb-1">
											{spec.value}
										</div>
										<div className="text-xs text-gray-400">{spec.unit}</div>
									</div>

									{/* Corner accent (no blur, faint color only) */}
									<div className="absolute top-0 right-0 w-16 h-16 bg-cyan-400/06 group-hover:bg-cyan-400/12 transition-all duration-500"></div>
								</div>
							);
						})}
					</div>

					{/* Capability Cards with advanced interactions - UPDATED DURATION AND DELAY */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{capabilities.map((capability, index) => {
							const delay = index * 0.08;
							const offsetX = mousePosition.x * (25 - index * 4);
							const offsetY = mousePosition.y * (25 - index * 4);
							const rotation =
								hoveredCard === index + 100 ? mousePosition.x * 3 : 0;

							return (
								<div
									key={index}
									className="group relative bg-cyan-950/30 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 transition-all duration-500 hover:bg-cyan-900/35 hover:border-cyan-400/40 hover:shadow-[0_0_12px_rgba(34,211,238,0.10)] cursor-pointer"
									style={{
										transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg)`,
										transitionDelay: `${delay}s`,
									}}
									onMouseEnter={() => setHoveredCard(index + 100)}
									onMouseLeave={() => setHoveredCard(null)}
								>
									{/* Animated border effect (even subtler) */}
									<div className="absolute inset-0 rounded-2xl overflow-hidden">
										<div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-[0.18] transition-opacity duration-500 animate-pulse-slow"></div>
									</div>

									{/* Spotlight effect following mouse (reduced intensity) */}
									<div
										className="absolute inset-0 opacity-0 group-hover:opacity-[0.12] transition-opacity duration-500"
										style={{
											background: `radial-gradient(circle at ${
												(mousePosition.x + 0.5) * 100
											}% ${
												(mousePosition.y + 0.5) * 100
											}%, rgba(34,211,238,0.08), transparent 50%)`,
										}}
									></div>

									<div className="relative z-10">
										<div className="text-cyan-400 mb-3 group-hover:scale-110 transition-transform duration-500">
											{capability.icon}
										</div>
										<h3 className="text-white font-bold text-base mb-2 group-hover:text-cyan-300 transition-colors duration-500">
											{capability.title}
										</h3>
										<p className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
											{capability.description}
										</p>
									</div>

									{/* Corner decorations */}
									<div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-cyan-400/40 opacity-0 group-hover:opacity-[0.16] transition-opacity duration-500"></div>
									<div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-cyan-400/40 opacity-0 group-hover:opacity-[0.16] transition-opacity duration-500"></div>
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
