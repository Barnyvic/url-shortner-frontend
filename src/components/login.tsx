import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim() === "") {
      toast.error("Please enter your email address");
      return;
    }

    if (password.trim() === "") {
      toast.error("Please enter your password");
      return;
    }

    if (email && password) {
      try {
        const response = await axios.post("http://localhost:5000/auth/login", {
          email,
          password,
        });

        if (response.data.statusCode === 200) {
          localStorage.setItem("token", response.data.data);

          toast.success(response.data.message);

          setTimeout(() => {
            onLogin();
            navigate("/dashboard");
          }, 2000);
        }
        // Save token to local storage
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.error);
        } else if (error.response && error.response.status === 500) {
          toast.error(error.response.data.error);
        }
      }
    }

    // Clear input fields
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      {/* <!-- Pills content --> */}
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">
                      Please enter your login and password!
                    </p>
                    <form onSubmit={handleSubmit}>
                      <ToastContainer />
                      <div className="form-outline form-white mb-4">
                        <input
                          type="email"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                          placeholder="input email address"
                          value={email}
                          onChange={handleEmailChange}
                        />
                      </div>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                          placeholder="input password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mx-2 mb-4 px-5 ml-auto"
                      >
                        Login
                      </button>
                    </form>
                    <div className="mt-5">
                      <p className="mb-0">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-success-50 fw-bold">
                          Signup
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Pills content --> */}
    </div>
  );
};

export default Login;
