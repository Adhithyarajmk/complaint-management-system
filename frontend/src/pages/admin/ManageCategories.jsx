import { useEffect, useState } from "react";
import API from "../../services/api";

function ManageCategories() {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const response = await API.get("/categories/");
            setCategories(response.data);
        } catch (err) {
            setError("Unable to load categories.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            await API.post("/categories/", formData);

            setMessage("Category created successfully.");

            setFormData({
                name: "",
                description: "",
            });

            fetchCategories();

        } catch (err) {
            setError(
                err.response?.data?.detail || "Unable to create category."
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-4xl">

                <h1 className="mb-2 text-2xl font-bold text-gray-800">
                    Manage Categories
                </h1>

                <p className="mb-8 text-gray-500">
                    Create and view complaint categories.
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

                {/* Create Category Form */}
                <form
                    onSubmit={handleSubmit}
                    className="mb-8 rounded-xl bg-white p-6 shadow-sm"
                >
                    <h2 className="mb-5 text-lg font-semibold text-gray-800">
                        Add New Category
                    </h2>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Category name"
                        required
                        className="mb-4 w-full rounded-lg border p-3"
                    />

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Category description"
                        rows="3"
                        className="mb-4 w-full rounded-lg border p-3"
                    />

                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                    >
                        Add Category
                    </button>
                </form>

                {/* Category List */}
                <div className="rounded-xl bg-white p-6 shadow-sm">

                    <h2 className="mb-5 text-lg font-semibold text-gray-800">
                        Existing Categories
                    </h2>

                    {loading && <p>Loading categories...</p>}

                    {!loading && categories.length === 0 && (
                        <p className="text-gray-500">
                            No categories found.
                        </p>
                    )}

                    <div className="space-y-3">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="rounded-lg border p-4"
                            >
                                <h3 className="font-semibold text-gray-800">
                                    {category.name}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    {category.description || "No description"}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
}

export default ManageCategories;