import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout";
import {
	Hero,
	HardwareSection,
	ScanDemoSection,
	HowItWorksSection,
	AboutSection,
} from "./components/sections";
import { HardwareModel3D } from "./components/3d";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";

function App() {
	const [scrollProgress, setScrollProgress] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const heroHeight = window.innerHeight;
			const maxScroll = heroHeight * 4; // Track through 4 sections (hero, hardware, scan demo, how it works)

			const y = window.scrollY;
			const progress = Math.min(Math.max(y / maxScroll, 0), 1);

			setScrollProgress(progress);
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<BrowserRouter>
			<div className="min-h-screen bg-black overflow-x-hidden">
				<Navbar />

				{/* Fixed 3D model layer */}
				<div className="fixed inset-0 z-50 pointer-events-none pt-16">
					<div className="pointer-events-auto w-full h-full">
						<HardwareModel3D scrollProgress={scrollProgress} />
					</div>
				</div>

				<div className="pt-16">
					<Routes>
						<Route
							path="/"
							element={
								<>
									<Hero />
									<HardwareSection />
									<ScanDemoSection />
									<HowItWorksSection />
									<AboutSection />
								</>
							}
						/>

						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
