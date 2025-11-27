import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const navLinks = [
		{ label: "Home", href: "#home" },
		{ label: "Hardware", href: "#hardware" },
		{ label: "Scan Demo", href: "#scan" },
		{ label: "How It Works", href: "#how-it-works" },
		{ label: "About", href: "#about" },
	];

	const handleNavClick = (e, href) => {
		e.preventDefault();
		const element = document.querySelector(href);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
			setMobileMenuOpen(false);
		}
	};

	return (
		<nav className="fixed top-0 left-0 right-0 w-full z-50 bg-cyan-900/30 backdrop-blur-md border-b border-cyan-500/20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo & Brand */}
					<div className="flex items-center space-x-3">
						<div className="w-8 h-8 bg-linear-to-br from-cyan-400 to-blue-600 rounded flex items-center justify-center font-bold text-sm">
							AC
						</div>
						<span className="text-white font-semibold text-lg tracking-tight">
							Authentichip
						</span>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						{navLinks.map((link) => (
							<a
								key={link.label}
								href={link.href}
								onClick={(e) => handleNavClick(e, link.href)}
								className="text-gray-300 hover:text-cyan-400 text-xs uppercase tracking-wider transition-colors duration-200 relative group cursor-pointer"
							>
								{link.label}
								<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
							</a>
						))}
					</div>

					{/* Auth Buttons */}
					<div className="hidden md:flex items-center space-x-3">
						{/* unified dimensions: px-5 py-2 for both buttons */}
						<Link
							to="/login"
							className="px-5 py-2 bg-transparent border border-cyan-400 text-cyan-300 rounded-full text-sm hover:bg-cyan-500/8 transition flex items-center justify-center"
						>
							Login
						</Link>
						<Link
							to="/signup"
							className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-full text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center"
						>
							Sign Up
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="md:hidden text-white focus:outline-none"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							{mobileMenuOpen ? (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							) : (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							)}
						</svg>
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={`md:hidden transition-all duration-300 overflow-hidden ${
					mobileMenuOpen ? "max-h-screen" : "max-h-0"
				}`}
			>
				<div className="px-4 pt-2 pb-4 space-y-2 bg-cyan-900/30 backdrop-blur-md border-b border-cyan-500/20">
					{navLinks.map((link) => (
						<a
							key={link.label}
							href={link.href}
							onClick={(e) => handleNavClick(e, link.href)}
							className="block px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded text-sm uppercase tracking-wider transition-colors duration-200 cursor-pointer"
						>
							{link.label}
						</a>
					))}
					<div className="w-full mt-4 space-y-2">
						<Link
							to="/login"
							className="block w-full text-center px-5 py-2 bg-transparent border border-cyan-400 text-cyan-300 rounded-full text-sm"
						>
							Login
						</Link>
						<Link
							to="/signup"
							className="block w-full text-center px-5 py-2 bg-cyan-500 text-black font-semibold rounded-full text-sm"
						>
							Sign Up
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
