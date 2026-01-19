import { useState } from 'react';
import Navbar from '../layout/Navbar';
import HardwareModel3D from '../3d/HardwareModel3D';
import { Link } from 'react-router-dom';

export default function SignupPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('worker');

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle signup logic here
		console.log('Signup:', { name, email, password, role });
	};

	return (
		<div className="min-h-screen bg-black overflow-x-hidden relative font-sans">
			<Navbar />
			
			{/* 3D Background Layer */}
			<div className="fixed inset-0 z-0 pointer-events-none">
				<div className="w-full h-full opacity-60">
					<HardwareModel3D scrollProgress={0.8} />
				</div>
			</div>

			{/* Hero Background Styles */}
			<div className="fixed inset-0 pointer-events-none z-0">
				{/* Cyan gradient background */}
				<div className="absolute inset-0 bg-gradient-to-b from-cyan-900/30 via-cyan-800/35 to-cyan-900/25"></div>
				<div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-transparent to-cyan-900/20"></div>
				
				{/* Background effects */}
				<div className="absolute inset-0">
					{/* Radial glow */}
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/25 via-cyan-600/12 to-transparent rounded-full blur-3xl"></div>

					{/* Scan rings */}
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
						<div className="w-[600px] h-[600px] border border-cyan-500/10 rounded-full animate-pulse"></div>
						<div className="absolute inset-0 w-[500px] h-[500px] m-auto border border-cyan-500/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
						<div className="absolute inset-0 w-[400px] h-[400px] m-auto border border-cyan-500/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
					</div>
				</div>
			</div>

			<div className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="w-full max-w-md p-8 text-white relative">
					<div className="text-center mb-10">
						<h2 className="text-5xl font-black bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-blue-500 animate-float drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
							Create account
						</h2>
						<p className="text-gray-400 text-sm">Join Authentichip to start verifying ICs</p>
					</div>

					<div className="flex gap-4 mb-8">
						<button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group">
							<svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
								<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
								<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
								<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
								<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
							</svg>
							<span className="text-sm font-medium">Google</span>
						</button>
						<button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group">
							<svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
							</svg>
							<span className="text-sm font-medium">GitHub</span>
						</button>
					</div>

					<div className="relative mb-8">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-white/10"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-transparent text-gray-500">Or register with email</span>
						</div>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Role Selector */}
						<div className="flex bg-white/5 p-1 rounded-xl mb-6 border border-white/10">
							<button
								type="button"
								onClick={() => setRole('worker')}
								className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
									role === 'worker'
										? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.3)]'
										: 'text-gray-400 hover:text-white hover:bg-white/5'
								}`}
							>
								Worker
							</button>
							<button
								type="button"
								onClick={() => setRole('admin')}
								className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
									role === 'admin'
										? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.3)]'
										: 'text-gray-400 hover:text-white hover:bg-white/5'
								}`}
							>
								Admin
							</button>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 ml-1">Full name</label>
							<input
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 hover:border-white/20"
								placeholder="Your full name"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 ml-1">Email</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 hover:border-white/20"
								placeholder="you@example.com"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 ml-1">Password</label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 hover:border-white/20"
								placeholder="Choose a password"
							/>
						</div>

									<button
							type="submit"
							className="w-full py-4 px-4 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded-xl transition-all duration-300 hover:scale-[1.02]"
						>
							Create account
						</button>
					</form>

					<div className="mt-8 text-center">
						<p className="text-gray-400 text-sm">
							Already have an account?{' '}
							<Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline transition-all duration-200">
								Log in
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
