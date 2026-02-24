import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen bg-linear-to-b from-blue-50 to-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center">
                {/* Main Heading */}
                <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                    Welcome to <span className="text-blue-600">TaskMaster</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    The ultimate tool to organize your life, manage priorities, 
                    and get things done efficiently.
                </p>
                
                {/* Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link 
                        to="/register" 
                        className="w-full sm:w-auto px-8 py-3.5 text-base font-medium bg-blue-900  text-white hover:bg-blue-700 rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center"
                    >
                        Get Started for Free
                    </Link>
                    
                    <Link 
                        to="/login" 
                        className="w-full sm:w-auto px-8 py-3.5 text-base font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 text-center"
                    >
                        Login to Your Account
                    </Link>
                </div>

                {/* Optional: Add a subtle feature highlight or visual element below */}
                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-500">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Secure Login
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Real-time Sync
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Clean Interface
                    </div>
                </div>
            </div>
            
        </div>
    );
}