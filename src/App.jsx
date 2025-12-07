import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ScanPage from "./pages/ScanPage";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminPage from "./pages/admin/AdminPage";
import ScanHistoryPage from "./pages/admin/ScanHistoryPage";
import UserProfilePage from "./pages/admin/UserProfilePage";
import AdminShell from "./components/admin/AdminShell";

import WorkerDashboard from "./pages/worker/WorkerDashboard";
import WorkerHistoryPage from "./pages/worker/HistoryPage";
import WorkerProfilePage from "./pages/worker/ProfilePage";
import WorkerScanPage from "./pages/worker/ScanPage";

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

			{/* Worker Routes */}
			<Route path="/worker">
				<Route index element={<Navigate to="/worker/dashboard" replace />} />
				<Route path="dashboard" element={<WorkerDashboard />} />
				<Route path="history" element={<WorkerHistoryPage />} />
				<Route path="profile" element={<WorkerProfilePage />} />
				<Route path="scan" element={<WorkerScanPage />} />
			</Route>

		</Routes>
	);
}

export default App;
