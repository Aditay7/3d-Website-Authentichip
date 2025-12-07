import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(() => {
		try {
			return JSON.parse(localStorage.getItem("auth")) || null;
		} catch (e) {
			return null;
		}
	});

	const loginAsAdmin = () => {
		const u = { role: "admin", ts: Date.now(), email: "admin@example.com" };
		setUser(u);
		try {
			localStorage.setItem("auth", JSON.stringify(u));
		} catch (e) {}
	};

	const loginAsWorker = () => {
		const u = { role: "worker", ts: Date.now(), email: "worker@example.com" };
		setUser(u);
		try {
			localStorage.setItem("auth", JSON.stringify(u));
		} catch (e) {}
	};

	const logout = () => {
		setUser(null);
		try {
			localStorage.removeItem("auth");
		} catch (e) {}
	};

	useEffect(() => {
		const handle = () => {
			try {
				setUser(JSON.parse(localStorage.getItem("auth")) || null);
			} catch {
				setUser(null);
			}
		};
		window.addEventListener("storage", handle);
		return () => window.removeEventListener("storage", handle);
	}, []);

	// DEBUG: log auth changes to help verify role propagation
	useEffect(() => {
		console.debug("AuthProvider - user changed:", user);
	}, [user]);

	const userRole = user?.role || null;
	const isLoggedIn = !!user;

	return (
		<AuthContext.Provider
			value={{
				user,
				userRole,
				isLoggedIn,
				loginAsAdmin,
				loginAsWorker,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
