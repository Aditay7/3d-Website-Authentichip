import { useState, useEffect } from "react";

export default function HowItWorksSection() {
	const [activeStep, setActiveStep] = useState(0);
	const [progress, setProgress] = useState(0);
	const [isPlaying, setIsPlaying] = useState(true);
	const [hoveredStep, setHoveredStep] = useState(null);

	// UPDATED: Content to reflect Authentichip's specific Process Flow (Section 5)
	const steps = [
		{
			number: "01",
			title: "Initialization & Acquisition",
			subtitle: "Data Retrieval & Imaging Unit",
			description:
				"User inputs Part Number, triggering local MongoDB lookup. If missing, secure web scraping (Selenium/Requests) extracts datasheet specs via the FastAPI backend. Pi Camera captures the HQ image.",
			details: [
				{ icon: "🔢", text: "Part Number Input", color: "text-cyan-400" },
				{ icon: "🔍", text: "MongoDB/Web Scraping", color: "text-blue-400" },
				{ icon: "📸", text: "HQ Image Capture (Pi)", color: "text-purple-400" },
				{ icon: "🔗", text: "LAN Data Transfer", color: "text-green-400" },
			],
			icon: "💾",
			bgGradient:
				"bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-cyan-400/10",
			borderColor: "border-cyan-400/30",
			glowColor: "shadow-cyan-500/25",
		},
		{
			number: "02",
			title: "Parallel Forgery Detection",
			subtitle: "HOG/SVM & MiniCPM V8 Pipeline",
			description:
				"The captured image is auto-cropped and normalized. The backend triggers concurrent tasks: Texture Anomaly (HOG+SVM) and OCR Verification (MiniCPM V8) run simultaneously.",
			details: [
				{ icon: "✂️", text: "Auto-Crop & Normalize", color: "text-blue-400" },
				{
					icon: "🧠",
					text: "HOG+SVM (Blacktopping)",
					color: "text-purple-400",
				},
				{ icon: "🔤", text: "MiniCPM V8 (OCR)", color: "text-pink-400" },
				{ icon: "⚡", text: "Parallel Processing", color: "text-indigo-400" },
			],
			icon: "🤖",
			bgGradient:
				"bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-blue-400/10",
			borderColor: "border-blue-400/30",
			glowColor: "shadow-blue-500/25",
		},
		{
			number: "03",
			title: "Geometry & Data Validation",
			subtitle: "Dimensional Analysis & Logic Check",
			description:
				"Homography Matrix verifies IC width/height ratios against OEM specs. The LLM-parsed data informs logic checks, validating Date Code format and finding logical fallacies (e.g., future dates).",
			details: [
				{
					icon: "📐",
					text: "Homography Matrix (Dimensions)",
					color: "text-purple-400",
				},
				{ icon: "📑", text: "LLM Datasheet Parsing", color: "text-green-400" },
				{ icon: "📅", text: "Date Code Logic Check", color: "text-pink-400" },
				{
					icon: "⚙️",
					text: "Dynamic Pre-processing",
					color: "text-yellow-400",
				},
			],
			icon: "📊",
			bgGradient:
				"bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-purple-400/10",
			borderColor: "border-purple-400/30",
			glowColor: "shadow-purple-500/25",
		},
		{
			number: "04",
			title: "Advanced Conditional Checks",
			subtitle: "Physical Defect & Indentation Analysis",
			description:
				"If selected, the system prompts for side-profile views to check for Rust (HSL Color Space) and Pin Straightness (Hough Lines). Geometrical comparison flags eroded Pin 1 markers.",
			details: [
				{ icon: "🧲", text: "Rust Detection (HSL)", color: "text-pink-400" },
				{ icon: "📏", text: "Pin Straightness (Hough)", color: "text-red-400" },
				{
					icon: "🔺",
					text: "Indentation Geometry Check",
					color: "text-orange-400",
				},
				{
					icon: "🧪",
					text: "Golden Reference Compare",
					color: "text-yellow-400",
				},
			],
			icon: "🛡️",
			bgGradient:
				"bg-gradient-to-br from-pink-500/20 via-red-500/15 to-pink-400/10",
			borderColor: "border-pink-400/30",
			glowColor: "shadow-pink-500/25",
		},
		{
			number: "05",
			title: "Reporting & Aggregation",
			subtitle: "Final Decision Output",
			description:
				"Results from all parallel and conditional checks are aggregated. The Frontend displays a comprehensive Pass/Fail report with specific flags indicating detected anomalies or invalid data.",
			details: [
				{ icon: "✅", text: "Aggregated Results", color: "text-red-400" },
				{
					icon: "🚩",
					text: "Specific Anomaly Flags",
					color: "text-orange-400",
				},
				{
					icon: "📄",
					text: "Frontend Pass/Fail Report",
					color: "text-yellow-400",
				},
				{
					icon: "🔒",
					text: "Secure Audit Logging (MongoDB)",
					color: "text-green-400",
				},
			],
			icon: "📋",
			bgGradient:
				"bg-gradient-to-br from-red-500/20 via-orange-500/15 to-red-400/10",
			borderColor: "border-red-400/30",
			glowColor: "shadow-red-500/25",
		},
	];

	// Auto-play carousel logic - cycles through steps 0→1→2→3→4→0 (displayed as 1→2→3→4→5→1)
	// Fixed: Separated state updates to prevent race conditions
	useEffect(() => {
		if (!isPlaying) return;

		const stepDuration = 6700; // Total duration per step in ms (100ms * 67 intervals ≈ 100% progress)
		const intervalDuration = 100; // Interval duration in ms

		let startTime = Date.now();
		let currentStepStart = startTime;

		const interval = setInterval(() => {
			const now = Date.now();
			const elapsedInCurrentStep = now - currentStepStart;

			// Calculate progress percentage for current step
			const newProgress = Math.min(
				(elapsedInCurrentStep / stepDuration) * 100,
				100
			);

			setProgress(newProgress);

			// When step duration is complete, advance to next step
			if (elapsedInCurrentStep >= stepDuration) {
				setActiveStep((currentStep) => {
					const nextStep = (currentStep + 1) % 5; // Cycle through 0,1,2,3,4
					return nextStep;
				});
				currentStepStart = now; // Reset timer for next step
				setProgress(0);
			}
		}, intervalDuration);

		return () => clearInterval(interval);
	}, [isPlaying, activeStep]); // Added activeStep to dependencies to reset timer on manual changes

	// Handle manual step click
	const handleStepClick = (index) => {
		setActiveStep(index);
		setProgress(0);
		setIsPlaying(false);
		// Resume auto-play after 3 seconds
		setTimeout(() => {
			setIsPlaying(true);
		}, 3000);
	};

	return (
		<section
			id="how-it-works"
			className="min-h-screen py-12 relative z-20 pointer-events-none px-4 sm:px-6 lg:px-12"
			style={{ scrollMarginTop: "64px" }}
		>
			{/* Enhanced gradient background */}
			<div className="absolute inset-0 bg-gradient-to-b from-cyan-900/30 via-cyan-800/35 to-cyan-900/25 pointer-events-none" />
			<div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-transparent to-cyan-900/20 pointer-events-none" />

			{/* Dynamic animated background */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute inset-0 opacity-20">
					{[...Array(20)].map((_, i) => (
						<div
							key={i}
							className="absolute w-px h-px bg-cyan-400 rounded-full animate-pulse"
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
								animationDelay: `${Math.random() * 5}s`,
								animationDuration: `${3 + Math.random() * 2}s`,
							}}
						/>
					))}
				</div>

				{/* Flowing data streams */}
				<svg className="absolute inset-0 w-full h-full">
					<defs>
						<linearGradient
							id="streamGradient"
							x1="0%"
							y1="0%"
							x2="100%"
							y2="100%"
						>
							<stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
							<stop offset="50%" stopColor="rgba(34, 211, 238, 0.15)" />
							<stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
						</linearGradient>
					</defs>
					{[...Array(4)].map((_, i) => (
						<path
							key={i}
							d={`M ${10 + i * 25}% 0% Q ${25 + i * 25}% 50% ${
								40 + i * 25
							}% 100%`}
							stroke="url(#streamGradient)"
							strokeWidth="1"
							fill="none"
							className="animate-pulse"
							style={{
								animationDelay: `${i * 1.5}s`,
								animationDuration: `${5 + Math.random()}s`,
							}}
						/>
					))}
				</svg>
			</div>

			<div className="relative z-30 max-w-7xl mx-auto pointer-events-auto">
				{/* Enhanced Header */}
				<div className="text-center mb-12">
					<div className="relative inline-block mb-4">
						<span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 rounded-full text-cyan-300 text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
							✨ The Authentication Process
						</span>
						<div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-sm -z-10"></div>
					</div>
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
						<span className="text-white">How It Works</span>
					</h2>
					<p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
						End-to-end component authentication through five intelligent,
						interconnected steps
					</p>
				</div>

				{/* Redesigned Steps - Responsive Grid Layout */}
				<div className="w-full max-w-7xl mx-auto mb-12">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 py-4">
						{steps.map((step, index) => (
							<div
								key={index}
								className="relative group"
								onMouseEnter={() => setHoveredStep(index)}
								onMouseLeave={() => setHoveredStep(null)}
							>
								<button
									onClick={() => handleStepClick(index)}
									className={`w-full h-full p-3 rounded-2xl border transition-all duration-500 transform ${
										activeStep === index
											? `${step.bgGradient} ${step.borderColor} scale-105 shadow-lg ${step.glowColor}`
											: hoveredStep === index
											? "bg-gray-800/40 border-gray-600/50 scale-102 shadow-md"
											: "bg-gray-900/20 border-gray-700/30 hover:bg-gray-800/30"
									}`}
								>
									{/* Step Icon */}
									<div
										className={`text-3xl mb-2 transition-all duration-300 ${
											activeStep === index
												? "scale-110"
												: hoveredStep === index
												? "scale-105"
												: ""
										}`}
									>
										{step.icon}
									</div>

									{/* Step Number */}
									<div
										className={`text-lg font-black mb-1 transition-all duration-300 ${
											activeStep === index ? "text-cyan-300" : "text-gray-500"
										}`}
									>
										{step.number}
									</div>

									{/* Step Title */}
									<h3 className="text-white text-sm font-bold mb-1 leading-tight">
										{step.title}
									</h3>

									{/* Step Subtitle */}
									<p
										className={`text-xs font-medium transition-all duration-300 ${
											activeStep === index ? "text-cyan-400" : "text-gray-400"
										}`}
									>
										{step.subtitle}
									</p>

									{/* Progress Bar */}
									{activeStep === index && (
										<div className="mt-4 w-full h-2 bg-gray-800/50 rounded-full overflow-hidden">
											<div
												className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-100 rounded-full"
												style={{ width: `${progress}%` }}
											/>
										</div>
									)}
								</button>

								{/* Glowing border for active step */}
								{activeStep === index && (
									<div
										className={`absolute -inset-1 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-3xl blur-lg animate-pulse -z-10`}
									></div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Enhanced Active Step Details */}
				<div className="relative max-w-5xl mx-auto mb-10">
					<div
						className={`${steps[activeStep].bgGradient} p-4 md:p-6 rounded-2xl border ${steps[activeStep].borderColor} backdrop-blur-sm shadow-lg ${steps[activeStep].glowColor} transition-all duration-500`}
					>
						<div className="grid md:grid-cols-4 gap-4 items-start">
							{/* Left: Icon and Number */}
							<div className="text-center md:text-left">
								<div className="text-4xl mb-2">{steps[activeStep].icon}</div>
								<div className="text-4xl font-black text-white/10 leading-none">
									{steps[activeStep].number}
								</div>
							</div>

							{/* Center: Content */}
							<div className="md:col-span-3">
								<div className="mb-4">
									<h3 className="text-xl md:text-2xl font-bold text-white mb-2">
										{steps[activeStep].title}
									</h3>
									<p className="text-cyan-300 text-sm font-semibold mb-3">
										{steps[activeStep].subtitle}
									</p>
									<p className="text-gray-300 text-sm leading-relaxed">
										{steps[activeStep].description}
									</p>
								</div>

								{/* Enhanced Step Details */}
								<div className="grid grid-cols-2 gap-2">
									{steps[activeStep].details.map((detail, i) => (
										<div
											key={i}
											className="group bg-black/30 backdrop-blur-sm p-2 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-102"
										>
											<div className="flex items-center gap-2">
												<span className="text-lg group-hover:scale-110 transition-transform duration-300">
													{detail.icon}
												</span>
												<span
													className={`font-medium text-xs ${detail.color} group-hover:text-white transition-colors duration-300`}
												>
													{detail.text}
												</span>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Glowing background */}
					<div
						className={`absolute -inset-1 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-2xl blur-lg -z-10`}
					></div>
				</div>

				{/* Enhanced Process Flow */}
				<div className="flex justify-center items-center">
					<div className="flex items-center gap-2 overflow-x-auto pb-2 max-w-full">
						{steps.map((step, index) => (
							<div key={index} className="flex items-center shrink-0">
								<div
									className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 cursor-pointer ${
										index <= activeStep
											? "bg-gradient-to-br from-cyan-400/30 to-blue-500/30 border-cyan-400 text-cyan-300 scale-105 shadow-md shadow-cyan-500/20"
											: "bg-gray-800/50 border-gray-600 text-gray-500 hover:border-gray-500"
									}`}
									onClick={() => handleStepClick(index)}
								>
									<span className="font-bold text-sm">{step.number}</span>
								</div>
								{index < steps.length - 1 && (
									<div className="flex items-center">
										<div
											className={`w-6 h-0.5 transition-all duration-300 ${
												index < activeStep
													? "bg-gradient-to-r from-cyan-400 to-blue-500"
													: "bg-gray-600"
											}`}
										/>
										<div
											className={`w-1 h-1 rounded-full transition-all duration-300 ${
												index < activeStep ? "bg-cyan-400" : "bg-gray-600"
											}`}
										/>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Enhanced Section Divider */}
			<div className="absolute bottom-0 left-0 right-0">
				<div className="h-1 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent"></div>
				<div className="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
			</div>

			{/* Custom CSS for floating animation */}
			<style jsx>{`
				@keyframes float {
					0%,
					100% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(-10px);
					}
				}
				.animate-float {
					animation: float 3s ease-in-out infinite;
				}
				/* Horizontal scroll container for steps */
				.snap-x {
					scroll-behavior: smooth;
				}
				/* Enhanced scrollbar for step container */
				.overflow-x-auto {
					scrollbar-width: thin;
					scrollbar-color: rgba(34, 211, 238, 0.4) rgba(17, 24, 39, 0.3);
				}
				.overflow-x-auto::-webkit-scrollbar {
					height: 8px;
				}
				.overflow-x-auto::-webkit-scrollbar-track {
					background: rgba(17, 24, 39, 0.3);
					border-radius: 4px;
				}
				.overflow-x-auto::-webkit-scrollbar-thumb {
					background: rgba(34, 211, 238, 0.4);
					border-radius: 4px;
				}
				.overflow-x-auto::-webkit-scrollbar-thumb:hover {
					background: rgba(34, 211, 238, 0.6);
				}
			`}</style>
		</section>
	);
}
