import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { redirect } from 'next/navigation';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (formData) => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errors = await response.json();
            throw new Error(JSON.stringify(errors));
        }

        const { token } = await response.json();
        const decoded = jwtDecode(token);
        setUser(decoded);
    };

    const signUp = async (formData) => {
        return await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
    };

    const logout = async () => {
        await fetch('/api/logout', {
            method: 'GET',
        });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
