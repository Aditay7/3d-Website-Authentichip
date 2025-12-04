import { Outlet } from 'react-router-dom';
import Navbar from '../layout/Navbar';

export default function WorkerLayout() {
    return (
        <div className="min-h-screen bg-black">
            {/* Navbar */}
            <Navbar />

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/20 to-black" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
            </div>

            {/* Main Content */}
            <main className="relative z-10 pt-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
