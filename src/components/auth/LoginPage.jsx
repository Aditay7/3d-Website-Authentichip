import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	const navigate = useNavigate();
	const [role, setRole] = useState("worker");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!email || !password) return alert("Please enter email and password");

		const session = { email, role, type: "login", ts: Date.now() };
		localStorage.setItem("auth", JSON.stringify(session));
		navigate("/", { replace: true });
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-cyan-900 p-6">
			<div className="w-full max-w-md bg-linear-to-br from-white/5 to-white/3 backdrop-blur-md border border-white/6 rounded-2xl p-6 text-white shadow-xl">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-2xl font-semibold">Welcome back</h2>
					<span className="text-sm text-gray-300">
						{role === "admin" ? "Admin" : "Worker"}
					</span>
				</div>

				<div className="flex gap-2 mb-4 bg-white/3 p-1 rounded-full">
					<button
						type="button"
						onClick={() => setRole("worker")}
						className={`flex-1 text-sm rounded-full py-2 ${
							role === "worker"
								? "bg-black/80 text-white"
								: "bg-transparent text-gray-200"
						}`}
					>
						Worker
					</button>
					<button
						type="button"
						onClick={() => setRole("admin")}
						className={`flex-1 text-sm rounded-full py-2 ${
							role === "admin"
								? "bg-black/80 text-white"
								: "bg-transparent text-gray-200"
						}`}
					>
						Admin
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="text-sm text-gray-300">Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full mt-1 p-3 rounded-lg bg-black/40 border border-white/6 text-white placeholder-gray-400"
							placeholder="you@example.com"
						/>
					</div>

					<div>
						<label className="text-sm text-gray-300">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full mt-1 p-3 rounded-lg bg-black/40 border border-white/6 text-white placeholder-gray-400"
							placeholder="••••••••"
						/>
					</div>

					<div className="flex items-center justify-between">
						<button className="px-5 py-2 bg-cyan-500 text-black rounded-full font-semibold shadow-md hover:scale-[1.02] transition-transform">
							Login
						</button>
						<button
							type="button"
							onClick={() => {
								setEmail("");
								setPassword("");
							}}
							className="text-sm text-gray-300 underline"
						>
							Clear
						</button>
					</div>
				</form>

				<p className="mt-4 text-sm text-gray-300">
					Logged in role will be stored locally for this demo.
				</p>
			</div>
		</div>
	);
}
