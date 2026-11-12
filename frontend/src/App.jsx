import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import StudentDashboard from "./pages/student/StudentDashboard";
import SubmitComplaint from "./pages/student/SubmitComplaint";
import MyComplaints from "./pages/student/MyComplaints";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageComplaints from "./pages/admin/ManageComplaints";
import ManageCategories from "./pages/admin/ManageCategories";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>

                    {/* Default Route */}
                    <Route
                        path="/"
                        element={<Navigate to="/login" replace />}
                    />

                    {/* Authentication Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Student Routes */}
                    <Route
                        path="/student"
                        element={
                            <ProtectedRoute allowedRole="student">
                                <StudentDashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/student/submit-complaint"
                        element={
                            <ProtectedRoute allowedRole="student">
                                <SubmitComplaint />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/student/my-complaints"
                        element={
                            <ProtectedRoute allowedRole="student">
                                <MyComplaints />
                            </ProtectedRoute>
                        }
                    />

                    {/* Admin Dashboard */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute allowedRole="admin">
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Admin Complaint Management */}
                    <Route
                        path="/admin/manage-complaints"
                        element={
                            <ProtectedRoute allowedRole="admin">
                                <ManageComplaints />
                            </ProtectedRoute>
                        }
                    />

                    {/* Admin Category Management */}
                    <Route
                        path="/admin/manage-categories"
                        element={
                            <ProtectedRoute allowedRole="admin">
                                <ManageCategories />
                            </ProtectedRoute>
                        }
                    />

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;