import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import WorkerLayout from './components/worker/WorkerLayout';
import WorkerDashboard from './pages/worker/WorkerDashboard';
import HistoryPage from './pages/worker/HistoryPage';
import ProfilePage from './pages/worker/ProfilePage';
import ScanPage  from './pages/worker/ScanPage';
function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      {/* Admin Route */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      
      {/* Worker Routes with Layout - Now Public for Testing */}
      <Route path="/worker/*" element={<WorkerLayout />}>
        <Route index element={<WorkerDashboard />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="scan" element={<ScanPage />} />
      </Route>

      {/* Fallback Routes */}
      <Route path="/unauthorized" element={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-500 mb-4">Unauthorized</h1>
            <p className="text-gray-400 mb-6">You don't have permission to access this page.</p>
            <a href="/login" className="text-cyan-400 hover:text-cyan-300">Go to Login</a>
          </div>
        </div>
      } />
      
      <Route path="*" element={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-cyan-400 mb-4">404</h1>
            <p className="text-gray-400 mb-6">Page not found</p>
            <a href="/" className="text-cyan-400 hover:text-cyan-300">Go Home</a>
          </div>
        </div>
      } />
    </Routes>
  );
}

export default App;
