import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
    FileText,
    PlusCircle,
    Clock,
    CheckCircle,
    LogOut,
    List
} from "lucide-react";

function StudentDashboard() {
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
                    Student Dashboard
                </h2>

                <p className="mb-8 text-gray-500">
                    Manage and track your complaints.
                </p>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

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

                </div>

                {/* Submit Complaint */}
                <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

                    <h3 className="mb-3 text-xl font-semibold text-gray-800">
                        Submit a Complaint
                    </h3>

                    <p className="mb-5 text-gray-500">
                        Have an issue? Submit a complaint to the college administration.
                    </p>

                    <button
                        onClick={() => navigate("/student/submit-complaint")}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                    >
                        <PlusCircle size={20} />
                        Submit Complaint
                    </button>

                </div>

                {/* My Complaints */}
                <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">

                    <h3 className="mb-3 text-xl font-semibold text-gray-800">
                        My Complaints
                    </h3>

                    <p className="mb-5 text-gray-500">
                        View your submitted complaints and track their status.
                    </p>

                    <button
                        onClick={() => navigate("/student/my-complaints")}
                        className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
                    >
                        <List size={20} />
                        View My Complaints
                    </button>

                </div>

            </main>
        </div>
    );
}

export default StudentDashboard;