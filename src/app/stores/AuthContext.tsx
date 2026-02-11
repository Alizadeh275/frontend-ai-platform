import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  user: string | null; // or full user object
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // ✅ Load initial user from localStorage
  const [user, setUser] = useState<string | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // login → save to state + localStorage
  const login = (username: string) => {
    setUser(username);
    localStorage.setItem("user", JSON.stringify(username));
  };

  // logout → clear state + localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // optional: keep localStorage in sync if user changes elsewhere
  useEffect(() => {
    if (user === null) {
      localStorage.removeItem("user");
    } else {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
