import React,{ useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const envUser = process.env.REACT_APP_USER;
  const envPassword = process.env.REACT_APP_PASSWORD;
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("auth") === "true"
  );
  const [credentials, setCredentials] = useState({ user: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = () => {
    
    
    if (credentials.user === envUser && credentials.password === envPassword) {
      sessionStorage.setItem("auth", "true");
      setIsAuthenticated(true);
    } else {
      if(counter === 3) navigate('/');
      else {
        setCounter(counter + 1);
        setError("Usuario o contraseña incorrectos. Intentos restantes: " + (3 - counter));
      }
    }
  };

  if (isAuthenticated) {
    return <Outlet />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h2>Acceso Restringido</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Usuario"
        value={credentials.user}
        onChange={(e) => setCredentials({ ...credentials, user: e.target.value })}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
};

export default ProtectedRoute;