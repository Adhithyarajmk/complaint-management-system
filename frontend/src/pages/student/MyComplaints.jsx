import { useEffect, useState } from "react";
import API from "../../services/api";

function MyComplaints() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await API.get("/complaints/");
                setComplaints(response.data);
            } catch (err) {
                setError("Unable to load your complaints.");
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-700";
            case "In Progress":
                return "bg-blue-100 text-blue-700";
            case "Resolved":
                return "bg-green-100 text-green-700";
            case "Rejected":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="mx-auto max-w-6xl">

                <h1 className="mb-2 text-2xl font-bold text-gray-800">
                    My Complaints
                </h1>

                <p className="mb-8 text-gray-500">
                    View and track the complaints you have submitted.
                </p>

                {loading && (
                    <p className="text-gray-600">Loading complaints...</p>
                )}

                {error && (
                    <p className="rounded-lg bg-red-100 p-4 text-red-600">
                        {error}
                    </p>
                )}

                {!loading && !error && complaints.length === 0 && (
                    <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                        <p className="text-gray-500">
                            You haven't submitted any complaints yet.
                        </p>
                    </div>
                )}

                {!loading && complaints.length > 0 && (
                    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">

                        <table className="w-full text-left">

                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Category ID</th>
                                    <th className="p-4">Priority</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Admin Response</th>
                                </tr>
                            </thead>

                            <tbody>
                                {complaints.map((complaint) => (
                                    <tr
                                        key={complaint.id}
                                        className="border-t border-gray-100"
                                    >
                                        <td className="p-4 font-medium text-gray-800">
                                            {complaint.title}
                                        </td>

                                        <td className="p-4 text-gray-600">
                                            {complaint.category_id}
                                        </td>

                                        <td className="p-4 text-gray-600">
                                            {complaint.priority}
                                        </td>

                                        <td className="p-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusStyle(complaint.status)}`}
                                            >
                                                {complaint.status}
                                            </span>
                                        </td>

                                        <td className="p-4 text-gray-600">
                                            {new Date(
                                                complaint.created_at
                                            ).toLocaleDateString()}
                                        </td>

                                        <td className="p-4 text-gray-600">
                                            {complaint.admin_response || "No response yet"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>
                )}

            </div>

        </div>
    );
}

export default MyComplaints;