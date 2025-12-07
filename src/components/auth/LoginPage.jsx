import { useState, useContext } from "react";
import Navbar from "../layout/Navbar";
import HardwareModel3D from "../3d/HardwareModel3D";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function LoginPage() {
	const navigate = useNavigate();
	const { loginAsAdmin, loginAsWorker } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		// Frontend-only mock login (no API requests)
		setTimeout(() => {
			// Simple heuristic: email containing "admin" or password "admin" => admin
			const isAdmin =
				email.toLowerCase().includes("admin") || password === "admin";

			if (isAdmin) {
				loginAsAdmin();
				navigate("/admin/dashboard");
			} else {
				loginAsWorker();
				navigate("/");
			}

			setLoading(false);
		}, 600);
	};

	return (
		<div className="min-h-screen bg-black overflow-x-hidden relative font-sans">
			<Navbar />

			{/* 3D Background Layer */}
			<div className="fixed inset-0 z-0 pointer-events-none">
				<div className="w-full h-full opacity-60">
					<HardwareModel3D scrollProgress={0.2} />
				</div>
			</div>

			{/* Hero Background Styles */}
			<div className="fixed inset-0 pointer-events-none z-0">
				{/* Cyan gradient background */}
				<div className="absolute inset-0 bg-linear-to-b from-cyan-900/30 via-cyan-800/35 to-cyan-900/25"></div>
				<div className="absolute inset-0 bg-linear-to-r from-cyan-900/20 via-transparent to-cyan-900/20"></div>

				{/* Background effects */}
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

			<div className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="w-full max-w-md p-8 text-white relative">
					<div className="text-center mb-10">
						<h2
							className="text-5xl font-black bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-blue-500 animate-float drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] mb-2"
							style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
						>
							Welcome back
						</h2>
						<p className="text-gray-400 text-sm">
							Enter your details to access your workspace
						</p>
					</div>

					{error && (
						<div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 ml-1">
								Email
							</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 hover:border-white/20"
								placeholder="you@example.com"
								required
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 ml-1">
								Password
							</label>
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full p-4 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 hover:border-white/20"
									placeholder="••••••••"
									required
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
								>
									{showPassword ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
											/>
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
										</svg>
									)}
								</button>
							</div>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full py-4 px-4 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? "Signing in..." : "Sign in"}
						</button>
					</form>

					<div className="mt-8 text-center">
						<p className="text-gray-400 text-sm">
							Don't have an account?{" "}
							<Link
								to="/signup"
								className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline transition-all duration-200"
							>
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
