import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    
    // FIX: Changed "access_token" to "access" to match your Login.tsx logic
    const isAuthenticated = !!localStorage.getItem("access");

    const handleLogout = () => {
        // FIX: Remove "access" instead of "access_token"
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login");
    };

    return (
        <nav className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm w-full">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                
                {/* Logo / Brand */}
                <Link to="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                        </svg>
                    </div>
                    <span>TaskMaster</span>
                </Link>

                {/* Conditional Rendering based on Auth */}
                <div className="flex items-center gap-6">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-6">
                            <Link 
                                to="/dashboard" 
                                className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                Dashboard
                            </Link>
                            
                            {/* Profile & Logout Section */}
                            <div className="flex items-center gap-4 pl-6 border-l border-gray-200">
                                <Link to="/profile" className="flex items-center gap-2 group">
                                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:bg-blue-700 transition-all">
                                        M
                                    </div>
                                    <div className="hidden sm:block">
                                        <p className="text-xs text-gray-400 font-medium leading-none">User</p>
                                        <p className="text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">Manohar</p>
                                    </div>
                                </Link>
                                
                                <button 
                                    onClick={handleLogout}
                                    className="ml-2 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Login / Register Buttons */
                        <div className="flex items-center gap-3">
                            <Link 
                                to="/login" 
                                className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/register" 
                                className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}