import { useState, useEffect } from "react";
import api from "../services/api";

interface UserData {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    updated_at: string;
}

export default function Profile() {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Adjust this endpoint to match your 'users/me/' path
                const response = await api.get("/users/me/");
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading profile...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Profile Header */}
                <div className="bg-blue-600 h-32 w-full"></div>
                <div className="px-8 pb-8">
                    <div className="relative -top-12 flex items-end justify-between">
                        <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-md">
                            <div className="w-full h-full rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
                                {user?.first_name?.[0] || "U"}
                            </div>
                        </div>
                    </div>

                    <div className="-mt-8">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {user?.first_name} {user?.last_name}
                        </h1>
                        <p className="text-gray-500">{user?.email}</p>
                    </div>

                    <div className="mt-8 space-y-4">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Account Details</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <p className="text-xs text-gray-400 mb-1">User ID</p>
                                <p className="text-sm font-mono text-gray-700 truncate">{user?.id}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <p className="text-xs text-gray-400 mb-1">Last Updated</p>
                                <p className="text-sm text-gray-700">
                                    {user?.updated_at ? new Date(user.updated_at).toLocaleDateString() : "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                            Edit Profile Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}