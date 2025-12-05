import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import HardwareModel3D from "../3d/HardwareModel3D";
import Navbar from "../layout/Navbar";

export default function AdminShell() {
	const location = useLocation();

	// Center these specific admin pages in a narrower container
	const centeredPaths = [
		"/admin/dashboard",
		"/admin/history",
		"/admin/profile",
	];
	const isCentered = centeredPaths.includes(location.pathname);

	return (
		<div className="min-h-screen bg-black overflow-x-hidden relative font-sans">
			{/* Admin top navbar removed per request */}
			{/* 3D Background Layer */}
			<div className="fixed inset-0 z-0 pointer-events-none">
				<div className="w-full h-full opacity-40">
					<HardwareModel3D scrollProgress={0.8} />
				</div>
			</div>

			{/* Hero Background Styles */}
			<div className="fixed inset-0 pointer-events-none z-0">
				<div className="absolute inset-0 bg-linear-to-b from-cyan-900/30 via-cyan-800/35 to-cyan-900/25 pointer-events-none" />
				<div className="absolute inset-0 bg-linear-to-r from-cyan-900/20 via-transparent to-cyan-900/20 pointer-events-none" />

				{/* Background effects (radial glow + scan rings) copied from AdminPage for visual parity */}
				<div className="absolute inset-0">
					{/* Radial glow */}
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/25 via-cyan-600/12 to-transparent rounded-full blur-3xl"></div>

					{/* Scan rings */}
					<div className="absolute inset-0 w-[600px] h-[600px] m-auto border border-cyan-500/10 rounded-full animate-pulse"></div>
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

			<div className="relative z-10 pt-24 px-6 pb-12">
				{/* Use main site Navbar on admin nested pages so History/Profile match Dashboard */}
				<Navbar />
				<div
					className={`${
						isCentered ? "max-w-4xl" : "max-w-7xl"
					} mx-auto space-y-6 ${
						isCentered ? "flex flex-col items-center" : ""
					}`}
				>
					<div className="w-full">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}
