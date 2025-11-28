import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Hardware', href: '#hardware' },
    { label: 'Scan Demo', href: '/scan' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'About', href: '#about' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-cyan-900/30 backdrop-blur-md border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 bg-linear-to-br from-cyan-400 to-blue-600 rounded flex items-center justify-center font-bold text-sm group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300">
              AC
            </div>
            <span className="text-white font-semibold text-lg tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
              Authentichip
            </span>
          </Link>

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

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login"
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200"
            >
              Login
            </Link>
            <Link 
              to="/signup"
              className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-full text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]"
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
          mobileMenuOpen ? 'max-h-screen' : 'max-h-0'
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
          <div className="flex flex-col space-y-3 mt-4">
            <Link 
              to="/login"
              className="w-full text-center py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/signup"
              className="w-full px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-full text-sm transition-all duration-300 text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
