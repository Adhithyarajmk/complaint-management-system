import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function SubmitComplaint() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        category_id: "",
        description: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // Load complaint categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await API.get("/categories/");
                setCategories(response.data);
            } catch (err) {
                setError("Unable to load complaint categories.");
            }
        };

        fetchCategories();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Submit complaint
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            await API.post("/complaints/", {
                ...formData,
                category_id: Number(formData.category_id),
            });

            setSuccess("Complaint submitted successfully!");

            setFormData({
                title: "",
                category_id: "",
                description: "",
            });

        } catch (err) {
            setError(
                err.response?.data?.detail || "Failed to submit complaint."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-sm">

                <h1 className="mb-2 text-2xl font-bold text-gray-800">
                    Submit a Complaint
                </h1>

                <p className="mb-8 text-gray-500">
                    Provide the details of your complaint below.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="mb-2 block font-medium">
                            Complaint Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            placeholder="Enter complaint title"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="mb-2 block font-medium">
                            Category
                        </label>

                        <select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        >
                            <option value="">Select a category</option>

                            {categories.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-2 block font-medium">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="5"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            placeholder="Describe your complaint..."
                        />
                    </div>

                    {/* Messages */}
                    {error && (
                        <p className="rounded-lg bg-red-100 p-3 text-red-600">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="rounded-lg bg-green-100 p-3 text-green-600">
                            {success}
                        </p>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-4">

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Submitting..." : "Submit Complaint"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/student")}
                            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default SubmitComplaint;