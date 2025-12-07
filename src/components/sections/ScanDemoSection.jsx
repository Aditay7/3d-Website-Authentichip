import { useState, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import {
	PerspectiveCamera,
	Environment,
	OrbitControls,
} from "@react-three/drei";
// Assuming ICJigModel is used in the 3D Canvas in the full application
import { ICJigModel } from "../3d/models";

export default function ScanDemoSection() {
	const navigate = useNavigate();
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [scannerStatus, setScannerStatus] = useState("ready"); // 'ready', 'scanning', 'complete'
	const [isAutoFocus, setIsAutoFocus] = useState(true);
	const [zoomLevel, setZoomLevel] = useState(1);
	const [scanProgress, setScanProgress] = useState(0);

	const handleMouseMove = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width - 0.5;
		const y = (e.clientY - rect.top) / rect.height - 0.5;
		setMousePosition({ x, y });
	};

	// UPDATED: Start scan simulation instead of navigation
	const startScan = () => {
		if (scannerStatus === "ready" || scannerStatus === "complete") {
			setScannerStatus("scanning");
			setScanProgress(0);
		} else if (scannerStatus === "scanning") {
			// Cancel scan if already scanning, though not strictly required by prompt
			setScannerStatus("ready");
			setScanProgress(0);
		}
	};

	// Removed the unused functions: toggleAutoFocus and adjustZoom

	// NEW: Scanning Simulation Logic
	useEffect(() => {
		let progressInterval;
		let resetTimeout;
		const scanDuration = 3000; // 3 seconds total scan time

		if (scannerStatus === "scanning") {
			const startTime = Date.now();

			progressInterval = setInterval(() => {
				const elapsed = Date.now() - startTime;
				const progressPercentage = Math.min(
					(elapsed / scanDuration) * 100,
					100
				);
				setScanProgress(progressPercentage);

				if (progressPercentage >= 100) {
					clearInterval(progressInterval);
					setScannerStatus("complete");

					// Reset to 'ready' after showing 'complete' for 2 seconds
					resetTimeout = setTimeout(() => {
						setScannerStatus("ready");
						setScanProgress(0);
						// Optionally navigate here after completion: navigate('/scan');
					}, 2000);
				}
			}, 50); // Update every 50ms
		}

		return () => {
			clearInterval(progressInterval);
			clearTimeout(resetTimeout);
		};
	}, [scannerStatus, navigate]);

	const steps = [
		{
			number: "01",
			title: "Position Scanner",
			description:
				"Automated positioning system aligns the inspection rig for optimal scanning",
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
						d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
					/>
				</svg>
			),
		},
		{
			number: "02",
			title: "Automated Scan",
			description:
				"High-resolution camera captures detailed images of IC markings",
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
						d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			),
		},
		{
			number: "03",
			title: "AI Analysis",
			description: "Machine learning models verify authenticity in real-time",
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
						d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
					/>
				</svg>
			),
		},
		{
			number: "04",
			title: "Instant Results",
			description:
				"Get authentication report with confidence score and verification",
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
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			),
		},
	];

	return (
		<section
			id="scandemo"
			className="min-h-screen flex items-center relative pointer-events-none px-6 sm:px-10 lg:px-20"
			style={{ scrollMarginTop: "64px" }}
			onMouseMove={handleMouseMove}
		>
			{/* Cyan gradient background matching Hardware section */}
			<div className="absolute inset-0 bg-linear-to-b from-cyan-900/30 via-cyan-800/35 to-cyan-900/25 pointer-events-none" />
			<div className="absolute inset-0 bg-linear-to-r from-cyan-900/20 via-transparent to-cyan-900/20 pointer-events-none" />

			{/* Content Container */}
			<div className="relative z-60 w-full max-w-9xl mx-auto pointer-events-auto flex items-center justify-start">
				{/* Left Side - Interactive Instructions */}
				<div className="w-full lg:w-1/3 space-y-4 pr-0 lg:pr-20">
					{/* Header with parallax */}
					<div
						className="space-y-2 transition-transform duration-500 ease-out"
						style={{
							transform: `perspective(1000px) rotateX(${
								mousePosition.y * -3
							}deg) rotateY(${mousePosition.x * 3}deg)`,
						}}
					>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
							<span className="bg-clip-text text-transparent bg-linear-to-r from-white via-cyan-200 to-cyan-400">
								Advanced IC Scanner
							</span>
						</h2>

						<p className="text-gray-300 text-xl leading-relaxed max-w-xl">
							Professional-grade inspection system with AI-powered
							authentication and real-time analysis
						</p>
					</div>

					{/* Drag Instruction Card */}
					<div
						className="relative bg-cyan-950/40 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-4 overflow-hidden group"
						style={{
							transform: `translate(${mousePosition.x * 10}px, ${
								mousePosition.y * 10
							}px)`,
						}}
						onMouseEnter={() => setIsDragging(true)}
						onMouseLeave={() => setIsDragging(false)}
					>
						<div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

						<div className="relative z-10 flex items-center gap-3">
							<div className="shrink-0 w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center border border-cyan-400/30">
								<svg
									className="w-5 h-5 text-cyan-400 animate-bounce"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
									/>
								</svg>
							</div>
							<div className="flex-1">
								<h3 className="text-white font-bold text-lg mb-0.5">
									Interactive Scanner
								</h3>
								<p className="text-gray-400 text-sm">
									Control the scanner settings and initiate authentication scans
								</p>
							</div>
							<div className="shrink-0">
								<div className="text-cyan-400 text-2xl">→</div>
							</div>
						</div>
					</div>

					{/* Process Steps */}
					<div className="space-y-2">
						{steps.map((step, index) => {
							const delay = index * 0.05;
							const offsetX = mousePosition.x * (15 - index * 2);
							const offsetY = mousePosition.y * (15 - index * 2);

							return (
								<div
									key={index}
									className="group relative bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-3 transition-all duration-300 hover:bg-cyan-950/30 hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]"
									style={{
										transform: `translate(${offsetX}px, ${offsetY}px)`,
										transitionDelay: `${delay}s`,
									}}
								>
									<div className="flex items-start gap-3">
										<div className="shrink-0">
											<div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/30 group-hover:bg-cyan-500/20 transition-colors">
												<span className="text-cyan-400 font-bold text-xs">
													{step.number}
												</span>
											</div>
										</div>
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2 mb-0.5">
												<div className="text-cyan-400 group-hover:scale-110 transition-transform">
													{step.icon}
												</div>
												<h4 className="text-white font-bold text-base group-hover:text-cyan-300 transition-colors">
													{step.title}
												</h4>
											</div>
											<p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
												{step.description}
											</p>
										</div>
									</div>

									{/* Progress indicator */}
									<div className="absolute left-[22px] top-14 bottom-0 w-px bg-cyan-500/20 group-hover:bg-cyan-400/40 transition-colors"></div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Right Side - 3D Model Area (wcJIG model is positioned here via App.jsx fixed layer) */}
				<div className="hidden lg:block w-2/3 relative min-h-[600px]">
					{/* Interactive UI Overlay */}
					<div className="absolute inset-0 z-10 pointer-events-none">
						{/* Feature Showcase Cards */}
						<div className="absolute -top-4 right-4 pointer-events-auto">
							<div className="space-y-4">
								{/* Modular System Card */}
								<div className="bg-black/60 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-6 w-72 relative overflow-hidden group hover:scale-105 hover:border-cyan-300/60 transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]">
									<div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

									<div className="relative z-10">
										<div className="flex items-center gap-3 mb-4">
											<div className="w-12 h-12 bg-linear-to-br from-cyan-400/20 to-blue-500/20 rounded-xl flex items-center justify-center">
												<svg
													className="w-7 h-7 text-cyan-400"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
													/>
												</svg>
											</div>
											<div>
												<h3 className="text-white font-bold text-xl">
													Crypto Passport
												</h3>
												<p className="text-cyan-400 text-sm">
													Immutable Provenance
												</p>
											</div>
										</div>

										<p className="text-gray-300 text-sm leading-relaxed mb-4">
											Every scan generates a cryptographic passport with SHA-256
											hash stored in append-only ledger for tamper-proof
											verification.
										</p>

										<div className="space-y-2">
											<div className="flex items-center gap-2">
												<div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
												<span className="text-gray-300 text-xs">
													SHA-256 Component Hash
												</span>
											</div>
											<div className="flex items-center gap-2">
												<div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
												<span className="text-gray-300 text-xs">
													Blockchain Verification
												</span>
											</div>
											<div className="flex items-center gap-2">
												<div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
												<span className="text-gray-300 text-xs">
													Digital Certificates
												</span>
											</div>
										</div>
									</div>
								</div>

								{/* AI Detection Card */}
								<div className="bg-black/60 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-6 w-72 relative overflow-hidden group hover:scale-105 hover:border-purple-300/60 transition-all duration-500 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)]">
									<div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

									<div className="relative z-10">
										<div className="flex items-center gap-3 mb-4">
											<div className="w-12 h-12 bg-linear-to-br from-purple-400/20 to-pink-500/20 rounded-xl flex items-center justify-center">
												<svg
													className="w-7 h-7 text-purple-400"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
													/>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
													/>
												</svg>
											</div>
											<div>
												<h3 className="text-white font-bold text-xl">
													Smart Workflow
												</h3>
												<p className="text-purple-400 text-sm">
													Multi-Role Decision Engine
												</p>
											</div>
										</div>

										<p className="text-gray-300 text-sm leading-relaxed mb-4">
											Automated decision engine with human-in-the-loop workflows
											for Admin, Worker, and User roles with dispute resolution.
										</p>

										<div className="space-y-2">
											<div className="flex items-center gap-2">
												<div className="w-2 h-2 bg-purple-400 rounded-full"></div>
												<span className="text-gray-300 text-xs">
													Green/Yellow/Red Scoring
												</span>
											</div>
											<div className="flex items-center gap-2">
												<div className="w-2 h-2 bg-purple-400 rounded-full"></div>
												<span className="text-gray-300 text-xs">
													Dispute Resolution
												</span>
											</div>
											<div className="flex items-center gap-2">
												<div className="w-2 h-2 bg-purple-400 rounded-full"></div>
												<span className="text-gray-300 text-xs">
													Quarantine Management
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Ultra Modern Interactive Scan Button - UPDATED to use scannerStatus/scanProgress */}
						<div className="absolute -bottom-18 right-23 pointer-events-auto">
							<div
								className="relative group cursor-pointer"
								onClick={startScan}
							>
								{/* Morphing Background Container */}
								<div
									className={`relative w-32 h-16 bg-black/30 backdrop-blur-2xl rounded-2xl border ${
										scannerStatus === "complete"
											? "border-green-400/60"
											: "border-cyan-400/20"
									} overflow-hidden transition-all duration-700 ease-out group-hover:w-36 group-hover:h-18 group-hover:bg-black/50 ${
										scannerStatus === "complete"
											? "group-hover:border-green-300/80"
											: "group-hover:border-cyan-300/40"
									}`}
								>
									{/* Animated gradient background */}
									<div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 via-blue-500/10 to-purple-500/20 opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>

									{/* Scanning beam effect */}
									{scannerStatus !== "complete" && (
										<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
											<div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-transparent via-cyan-400 to-transparent animate-pulse"></div>
											<div
												className="absolute top-0 right-0 w-1 h-full bg-linear-to-b from-transparent via-cyan-400 to-transparent animate-pulse"
												style={{ animationDelay: "0.3s" }}
											></div>
											<div
												className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent animate-pulse"
												style={{ animationDelay: "0.6s" }}
											></div>
											<div
												className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent animate-pulse"
												style={{ animationDelay: "0.9s" }}
											></div>
										</div>
									)}

									{/* Main Content */}
									<div className="relative z-10 flex items-center justify-center h-full px-4 gap-3">
										{/* Icon Section */}
										<div className="relative">
											{scannerStatus === "scanning" ? (
												<div className="relative">
													<div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
													<div className="absolute inset-2 bg-cyan-400 rounded-full animate-pulse"></div>
												</div>
											) : scannerStatus === "complete" ? (
												<div className="relative">
													<svg
														className="w-8 h-8 text-green-400 group-hover:text-white transition-all duration-500 group-hover:scale-110"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
														/>
													</svg>
												</div>
											) : (
												<div className="relative">
													<svg
														className="w-8 h-8 text-cyan-400 group-hover:text-white transition-all duration-500 group-hover:scale-110"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
														/>
													</svg>
													{/* Interactive crosshairs */}
													<div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
														<div className="absolute top-0 left-1/2 w-0.5 h-2 bg-cyan-400 transform -translate-x-1/2"></div>
														<div className="absolute bottom-0 left-1/2 w-0.5 h-2 bg-cyan-400 transform -translate-x-1/2"></div>
														<div className="absolute left-0 top-1/2 w-2 h-0.5 bg-cyan-400 transform -translate-y-1/2"></div>
														<div className="absolute right-0 top-1/2 w-2 h-0.5 bg-cyan-400 transform -translate-y-1/2"></div>
													</div>
												</div>
											)}
										</div>

										{/* Text Section */}
										<div className="flex flex-col">
											<span
												className={`text-sm font-bold leading-tight ${
													scannerStatus === "complete"
														? "text-green-400"
														: "text-white"
												}`}
											>
												{scannerStatus === "scanning"
													? "Scanning..."
													: scannerStatus === "complete"
													? "COMPLETE"
													: "SCAN"}
											</span>
											<span
												className={`text-xs opacity-80 ${
													scannerStatus === "complete"
														? "text-green-300"
														: "text-cyan-400"
												}`}
											>
												{scannerStatus === "scanning"
													? `${Math.round(scanProgress)}%`
													: scannerStatus === "complete"
													? "View Report"
													: "Start Analysis"}
											</span>
										</div>
									</div>

									{/* Progress indicator when scanning */}
									{scannerStatus === "scanning" && (
										<div
											className="absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-100 ease-out"
											style={{ width: `${scanProgress}%` }}
										></div>
									)}
								</div>

								{/* Floating particles */}
								<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
									<div
										className="absolute -top-1 left-4 w-1 h-1 bg-cyan-400 rounded-full animate-bounce"
										style={{ animationDelay: "0s" }}
									></div>
									<div
										className="absolute -top-2 right-6 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
										style={{ animationDelay: "0.2s" }}
									></div>
									<div
										className="absolute -bottom-1 left-8 w-1 h-1 bg-purple-400 rounded-full animate-bounce"
										style={{ animationDelay: "0.4s" }}
									></div>
									<div
										className="absolute -bottom-2 right-4 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"
										style={{ animationDelay: "0.6s" }}
									></div>
								</div>

								{/* Holographic glow effect */}
								<div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-700">
									<div className="absolute inset-0 bg-linear-to-r from-cyan-400/20 via-transparent to-blue-400/20 rounded-2xl animate-pulse"></div>
								</div>
							</div>
						</div>
					</div>

					{/* 3D Canvas */}
					<Canvas
						shadows
						gl={{ alpha: true, antialias: true }}
						dpr={[1, 2]}
						className="w-full h-full"
					>
						<PerspectiveCamera makeDefault position={[0, 0, 20]} fov={40} />

						<ambientLight intensity={1} />
						<spotLight
							position={[10, 10, 10]}
							angle={0.3}
							penumbra={1}
							intensity={3}
							color="#22d3ee"
						/>
						<pointLight position={[0, -10, 5]} intensity={3} color="#4dd0e1" />
						<pointLight position={[0, 0, 5]} intensity={3} color="#06b6d4" />

						<Suspense fallback={null}>
							{/* Assuming ICJigModel is rendered here */}
							{/* <ICJigModel /> */}
							<Environment preset="night" />
						</Suspense>

						<OrbitControls
							enableZoom={false}
							enablePan={false}
							enableRotate={false}
						/>
					</Canvas>

					{/* Success Animation Overlay - UPDATED to use scannerStatus */}
					{scannerStatus === "complete" && (
						<div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
							<div className="relative">
								<div className="w-32 h-32 border-4 border-green-400 rounded-full animate-ping"></div>
								<div className="absolute inset-4 w-24 h-24 border-2 border-green-300 rounded-full animate-pulse"></div>
								<div className="absolute inset-8 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center">
									<svg
										className="w-8 h-8 text-black"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={3}
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								{/* Sparkle effects */}
								<div className="absolute -top-2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
								<div className="absolute top-1/4 -right-2 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
								<div
									className="absolute bottom-1/4 -left-2 w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
									style={{ animationDelay: "0.2s" }}
								></div>
								<div
									className="absolute -bottom-2 right-1/3 w-1.5 h-1.5 bg-green-300 rounded-full animate-ping"
									style={{ animationDelay: "0.4s" }}
								></div>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Section Divider */}
			<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-500/60 to-transparent pointer-events-none"></div>
		</section>
	);
}
