import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim() === "") {
      toast.error("Please enter your email address");
      return;
    }

    if (fullName.trim() === "") {
      toast.error("Please enter your full name");
      return;
    }

    if (password.trim() === "") {
      toast.error("Please enter a password");
      return;
    }


    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://barny.cyclic.app/auth/register",
        {
          email,
          fullName,
          password,
        }
      );

    if (response.status === 201) {
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Failed to sign up. Please try again later.");
    }

    setEmail("");
    setFullName("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <div>
        {/* <!-- Pills content --> */}
        <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white">
                  <div className="card-body p-5 text-center">
                    <div className="mb-md-5 mt-md-4 pb-5">
                      <ToastContainer />
                      <h2 className="fw-bold mb-2 text-uppercase">Sign-Up</h2>
                      <p className="text-white-50 mb-5">
                        Please enter your details!
                      </p>
                      <form onSubmit={handleSubmit}>
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
                            type="text"
                            id="typeTextX"
                            className="form-control form-control-lg"
                            placeholder="input fullName"
                            value={fullName}
                            onChange={handleFullNameChange}
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

                        <div className="form-outline form-white mb-4">
                          <input
                            type="password"
                            id="typePasswordX"
                            className="form-control form-control-lg"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary mx-2 mb-4 px-5 ml-auto"
                        >
                          Sign-Up
                        </button>
                      </form>
                      <div className="mt-5">
                        <p className="mb-0">
                          have an account?{" "}
                          <Link to="/login" className="text-success-50 fw-bold">
                            Login
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
    </>
  );
};

export default SignUp;
