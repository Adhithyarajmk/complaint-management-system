import { useEffect, useState } from "react";
import API from "../../services/api";

function ManageComplaints() {
    const [complaints, setComplaints] = useState([]);
    const [drafts, setDrafts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const fetchComplaints = async () => {
        try {
            const response = await API.get("/complaints/admin/");

            setComplaints(response.data);

            const initialDrafts = {};

            response.data.forEach((complaint) => {
                initialDrafts[complaint.id] = {
                    status: complaint.status,
                    priority: complaint.priority,
                    admin_response: complaint.admin_response || "",
                };
            });

            setDrafts(initialDrafts);

        } catch (err) {
            setError("Unable to load complaints.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    const handleChange = (id, field, value) => {
        setDrafts((previous) => ({
            ...previous,
            [id]: {
                ...previous[id],
                [field]: value,
            },
        }));
    };

    const handleUpdate = async (id) => {
        try {
            setMessage("");
            setError("");

            await API.patch(`/complaints/admin/${id}`, drafts[id]);

            setMessage("Complaint updated successfully.");

            fetchComplaints();

        } catch (err) {
            setError("Unable to update complaint.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-7xl">

                <h1 className="mb-2 text-2xl font-bold text-gray-800">
                    Manage Complaints
                </h1>

                <p className="mb-8 text-gray-500">
                    View and update student complaints.
                </p>

                {message && (
                    <p className="mb-4 rounded-lg bg-green-100 p-3 text-green-700">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="mb-4 rounded-lg bg-red-100 p-3 text-red-600">
                        {error}
                    </p>
                )}

                {loading && <p>Loading complaints...</p>}

                {!loading && complaints.length === 0 && (
                    <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                        No complaints found.
                    </div>
                )}

                {!loading && complaints.length > 0 && (
                    <div className="space-y-6">

                        {complaints.map((complaint) => (
                            <div
                                key={complaint.id}
                                className="rounded-xl bg-white p-6 shadow-sm"
                            >

                                <h2 className="mb-2 text-xl font-semibold text-gray-800">
                                    {complaint.title}
                                </h2>

                                <p className="mb-4 text-gray-600">
                                    {complaint.description}
                                </p>

                                <div className="mb-5 grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-3">
                                    <p>
                                        Student ID: {complaint.user_id}
                                    </p>

                                    <p>
                                        Category ID: {complaint.category_id}
                                    </p>

                                    <p>
                                        Date: {new Date(
                                            complaint.created_at
                                        ).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                    {/* Status */}
                                    <div>
                                        <label className="mb-2 block font-medium text-gray-700">
                                            Status
                                        </label>

                                        <select
                                            value={drafts[complaint.id]?.status || ""}
                                            onChange={(e) =>
                                                handleChange(
                                                    complaint.id,
                                                    "status",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-lg border p-3"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Resolved">Resolved</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </div>

                                    {/* Priority */}
                                    <div>
                                        <label className="mb-2 block font-medium text-gray-700">
                                            Priority
                                        </label>

                                        <select
                                            value={drafts[complaint.id]?.priority || ""}
                                            onChange={(e) =>
                                                handleChange(
                                                    complaint.id,
                                                    "priority",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-lg border p-3"
                                        >
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </select>
                                    </div>

                                </div>

                                {/* Admin Response */}
                                <div className="mt-4">
                                    <label className="mb-2 block font-medium text-gray-700">
                                        Admin Response
                                    </label>

                                    <textarea
                                        value={drafts[complaint.id]?.admin_response || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                complaint.id,
                                                "admin_response",
                                                e.target.value
                                            )
                                        }
                                        rows="3"
                                        placeholder="Enter your response..."
                                        className="w-full rounded-lg border p-3"
                                    />
                                </div>

                                <button
                                    onClick={() => handleUpdate(complaint.id)}
                                    className="mt-4 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
}

export default ManageComplaints;