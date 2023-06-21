import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Layout from "./components/layout";
import Login from "./components/login";
import SignUp from "./components/signup";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      <Router>
        <Routes>
          {/*  */}
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <SignUp onSignup={handleLogin} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Layout /> : <Navigate to="/login" />}
          />
          {/*  */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
