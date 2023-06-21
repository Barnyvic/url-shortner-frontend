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
      <h1>hello world </h1>
    </div>
  );
}

export default App;
