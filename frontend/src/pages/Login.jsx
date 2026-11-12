import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();

    const { setUser } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const loginData = new URLSearchParams();

            loginData.append("username", formData.username);
            loginData.append("password", formData.password);

            const response = await API.post(
                "/auth/login",
                loginData,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            const token = response.data.access_token;

            localStorage.setItem("access_token", token);

            const userResponse = await API.get("/auth/me");

            const user = userResponse.data;

            localStorage.setItem("role", user.role);
            localStorage.setItem("username", user.username);

            // Update shared authentication state
            setUser({
                username: user.username,
                role: user.role,
            });

            if (user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/student");
            }

        } catch (err) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("role");
            localStorage.removeItem("username");

            setUser(null);

            setError(
                err.response?.data?.detail || "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

                <h1 className="mb-2 text-center text-3xl font-bold text-blue-700">
                    College Complaint System
                </h1>

                <p className="mb-8 text-center text-gray-500">
                    Login to your account
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
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            placeholder="Enter password"
                        />
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-100 p-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="mt-6 text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;