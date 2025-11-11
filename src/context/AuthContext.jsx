import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error al carregar usuari:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Error a l'iniciar sessió");
      }

      // Guardar token
      localStorage.setItem("token", data.token);
      
      // Guardar datos de usuario
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: data.username,
          fullName: data.fullName,
          email: data.email,
          role: data.role,
          expiresAt: data.expiresAt,
        })
      );

      // Establecer usuario en estado
      setUser({
        username: data.username,
        fullName: data.fullName,
        email: data.email,
        role: data.role,
        expiresAt: data.expiresAt,
      });

      return { success: true };
      
    } catch (error) {
      console.error("Error en l'inici de sessió:", error);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAdmin = () => user?.role === "Administrator";
  
  const getToken = () => localStorage.getItem("token");

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        login, 
        logout, 
        isAdmin, 
        getToken, 
        isAuthenticated: !!user, 
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth s'ha d'utilitzar dins d'AuthProvider");
  }
  return context;
};