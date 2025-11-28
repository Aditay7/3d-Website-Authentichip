import Navbar from '../components/layout/Navbar';

export default function ScanPage() {
    return (
        <div className="min-h-screen bg-black overflow-x-hidden">
            <Navbar />
            
            {/* Background effects matching landing page theme */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Cyan gradient background matching Hero section */}
                <div className="absolute inset-0 bg-linear-to-b from-cyan-900/30 via-cyan-800/35 to-cyan-900/25"></div>
                <div className="absolute inset-0 bg-linear-to-r from-cyan-900/20 via-transparent to-cyan-900/20"></div>
                
                {/* Radial glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/25 via-cyan-600/12 to-transparent rounded-full blur-3xl"></div>

                {/* Scan rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-[600px] h-[600px] border border-cyan-500/10 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-[500px] h-[500px] m-auto border border-cyan-500/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute inset-0 w-[400px] h-[400px] m-auto border border-cyan-500/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>
            </div>
            
            {/* Main content */}
            <div className="relative z-10 pt-20">
                {/* Content will go here */}
            </div>
        </div>
    );
}