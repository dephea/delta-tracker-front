import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

type User = {
    login: string;
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void; 
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchAuthStatus = async () => {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            console.log('Stored token:', storedToken);
            console.log('Stored user:', storedUser);

            if (storedToken && storedUser) {
                try {
                    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/status`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${storedToken}`,
                        },
                    });

                    if (!res.ok) {
                        console.error('Failed to fetch auth status:', res);
                        throw new Error('Invalid token');
                    }

                    localStorage.setItem('token', storedToken);
                    localStorage.setItem('user', storedUser);

                    setUser(JSON.parse(storedUser));
                    setToken(storedToken);
                } catch (error) {
                    console.error('Invalid token or user data:', error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setUser(null);
                    setToken(null);
                    navigate('/login');
                }
            }
        };

        fetchAuthStatus();
    }, []);

    const login = (user: User, token: string) => {
        if (!user || !token) {
            console.error('Invalid user or token provided for login.');
            return;
        }
        setUser(user);
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user)); 
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user'); 
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
