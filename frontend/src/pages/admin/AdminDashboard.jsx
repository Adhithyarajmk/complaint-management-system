import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
    Users,
    FileText,
    Clock,
    CheckCircle,
    LogOut,
} from "lucide-react";

function AdminDashboard() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <nav className="flex items-center justify-between bg-white px-8 py-4 shadow-sm">

                <h1 className="text-xl font-bold text-blue-700">
                    College Complaint System
                </h1>

                <div className="flex items-center gap-4">

                    <span className="font-medium text-gray-700">
                        Welcome, {user?.username}
                    </span>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>

            </nav>

            {/* Dashboard Content */}
            <main className="p-8">

                <h2 className="mb-2 text-2xl font-bold text-gray-800">
                    Admin Dashboard
                </h2>

                <p className="mb-8 text-gray-500">
                    Manage and monitor student complaints.
                </p>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <FileText className="mb-4 text-blue-600" size={32} />

                        <h3 className="text-gray-500">
                            Total Complaints
                        </h3>

                        <p className="mt-2 text-3xl font-bold text-gray-800">
                            0
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <Clock className="mb-4 text-orange-500" size={32} />

                        <h3 className="text-gray-500">
                            Pending Complaints
                        </h3>

                        <p className="mt-2 text-3xl font-bold text-gray-800">
                            0
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <CheckCircle className="mb-4 text-green-600" size={32} />

                        <h3 className="text-gray-500">
                            Resolved Complaints
                        </h3>

                        <p className="mt-2 text-3xl font-bold text-gray-800">
                            0
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <Users className="mb-4 text-purple-600" size={32} />

                        <h3 className="text-gray-500">
                            Total Students
                        </h3>

                        <p className="mt-2 text-3xl font-bold text-gray-800">
                            0
                        </p>
                    </div>

                </div>

                {/* Complaint Management */}
                <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

                    <h3 className="mb-3 text-xl font-semibold text-gray-800">
                        Complaint Management
                    </h3>

                    <p className="mb-5 text-gray-500">
                        View student complaints, update their status,
                        and provide responses.
                    </p>

                    <button
                        onClick={() => navigate("/admin/manage-complaints")}
                        className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                    >
                        Manage Complaints
                    </button>
                    <button
    onClick={() => navigate("/admin/manage-categories")}
    className="ml-3 rounded-lg bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
>
    Manage Categories
</button>
                </div>

            </main>
        </div>
    );
}

export default AdminDashboard;