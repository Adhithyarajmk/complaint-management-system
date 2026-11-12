// In React, Context API allows us to share data between multiple components without passing props through every component.

import { createContext, useState } from "react";

// Create a context
export const AuthContext = createContext();

export function AuthProvider({ children }) {

    // Get existing user details from localStorage
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("access_token");
        const role = localStorage.getItem("role");
        const username = localStorage.getItem("username");

        if (token) {
            return {
                username,
                role,
            };
        }

        return null;
    });

    // Check whether the user is logged in
    const isAuthenticated = !!user;

    // Logout function
    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isAuthenticated,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}