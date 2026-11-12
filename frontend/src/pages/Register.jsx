import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        try {
            await API.post("/auth/register", formData);

            setSuccess("Registration successful! Please login.");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            const detail = err.response?.data?.detail;

            setError(
                Array.isArray(detail)
                    ? detail.map(item => item.msg).join(", ")
                    : detail || "Registration failed."
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

                <h1 className="mb-2 text-center text-3xl font-bold text-blue-700">
                    Create Account
                </h1>

                <p className="mb-8 text-center text-gray-500">
                    Register as a student
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="mb-2 block font-medium">
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            placeholder="Enter username"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            placeholder="Enter email"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={8}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            placeholder="Enter password"
                        />
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-100 p-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="rounded-lg bg-green-100 p-3 text-sm text-green-600">
                            {success}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
                    >
                        Register
                    </button>

                </form>

                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Register;