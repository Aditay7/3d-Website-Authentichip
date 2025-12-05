import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ScanPage from "./pages/ScanPage";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import WorkerPage from "./pages/WorkerPage";

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminPage from "./pages/AdminPage";
import ScanHistoryPage from "./pages/admin/ScanHistoryPage";
import UserProfilePage from "./pages/admin/UserProfilePage";
import AdminShell from "./components/admin/AdminShell";

function App() {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/scan" element={<ScanPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/signup" element={<SignupPage />} />

			{/* Render the full AdminPage at /admin/dashboard (actual page, not nested component) */}
			<Route path="/admin/dashboard" element={<AdminPage />} />

			<Route path="/admin" element={<AdminShell />}>
				<Route index element={<Navigate to="/admin/dashboard" replace />} />
				<Route path="history" element={<ScanHistoryPage />} />
				<Route path="profile" element={<UserProfilePage />} />
			</Route>

			<Route path="/worker" element={<WorkerPage />} />
			{/* base /admin handled by nested Route above */}
		</Routes>
	);
}

export default App;
