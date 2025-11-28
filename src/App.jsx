import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ScanPage from './pages/ScanPage';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/scan" element={<ScanPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
