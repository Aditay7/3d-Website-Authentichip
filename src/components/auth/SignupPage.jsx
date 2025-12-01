import { useState } from 'react';
import Navbar from '../layout/Navbar';
import HardwareModel3D from '../3d/HardwareModel3D';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		contact: '',
		organization: ''
	});
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const response = await fetch('/api/v1/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...formData,
					role: 'worker' // Hardcoded as per requirements
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.detail || 'Signup failed');
			}

			// Signup successful
			console.log('Signup successful:', data);
			navigate('/login'); // Redirect to login page
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
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
				<div className="absolute inset-0 bg-linear-to-b from-cyan-900/30 via-cyan-800/35 to-cyan-900/25"></div>
				<div className="absolute inset-0 bg-linear-to-r from-cyan-900/20 via-transparent to-cyan-900/20"></div>

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

					{error && (
						<div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 ml-1">Full name</label>
							<input
								name="name"
								value={formData.name}
								onChange={handleChange}
								className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 hover:border-white/20"
								placeholder="Your full name"
								required
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 ml-1">Email</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 hover:border-white/20"
								placeholder="you@example.com"
								required
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 ml-1">Password</label>
							<input
								type="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 hover:border-white/20"
								placeholder="Choose a password"
								required
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 ml-1">Contact Number</label>
							<input
								type="tel"
								name="contact"
								value={formData.contact}
								onChange={handleChange}
								className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 hover:border-white/20"
								placeholder="+91 1234567890"
								required
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 ml-1">Organization</label>
							<input
								type="text"
								name="organization"
								value={formData.organization}
								onChange={handleChange}
								className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 hover:border-white/20"
								placeholder="Factory A"
								required
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full py-4 px-4 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? 'Creating account...' : 'Create account'}
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
