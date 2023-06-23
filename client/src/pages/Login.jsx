import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import "../styles/form.css";
import "../styles/common.css";
import { useAppContext } from "../hooks/AppContext";
import { loginUser } from "../utils/userApis";
import { AlertError, AlertSuccess } from "../components/Alert";

const Login = () => {
  const navigate = useNavigate();
  const { showModal, setUserName ,setIsSignup ,setAuth,setShowModal,mediaQuery} = useAppContext();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userData;
  useEffect(() => {
    const clearMessage = () => {
      setErrorMessage("");
      setSuccessMessage("");

    };

    if (successMessage) {
      setTimeout(() => {
        clearMessage();
        navigate("/");
      }, 1500);
    } else {
      setTimeout(clearMessage, 1000);
    }
  }, [errorMessage, successMessage]);

  const handleErrors = () => {
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required.");
    }

    if (!password) {
      setPasswordError("Password is required.");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = async () => {
    handleErrors();
    if (email && password) {
      const response = await loginUser(userData);
      console.log(response);
      if (response.status === "SUCCESS") {
        setAuth(true)
        setUserName(response.userName);
        setSuccessMessage(response.message);
        setErrorMessage("");
      } else {
        setSuccessMessage("");
        setErrorMessage(response.message);
      }
      setShowModal(false);
    }
  };

  return (
    <>
      {successMessage && <AlertSuccess successMessage={successMessage} />}
      {errorMessage && <AlertError errorMessage={errorMessage} />}
      <div className={` ${showModal ? "modal-container" : "container"}`}>
        <div
          className={`login-container flex flex-col ${
            showModal ? "inner-modal-container" : ""
          } `}
        >
          {mediaQuery.isDesktop && <>
          {showModal ? (
            <div className="modal-form-title">
              <h1 className="contatiner-h1">Feedback</h1>
              <p className="modal-container-p">
                Add your product and rate other items.............
              </p>
            </div>
          ) : (
            <>
              <h1 className="contatiner-h1">Feedback</h1>
              <p className="conatiner-p">
                Add your products and give us your valuable feedback
              </p>
            </>
          )}
          </>}

          <div
            className={`container-form flex flex-col ${
              showModal ? "modal-container-form" : ""
            } `}
          >
            <div className="container-input-box flex flex-row">
              <div className="container-icon">
                <svg
                  width="23"
                  height="19"
                  viewBox="0 0 23 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.75 2.75C22.75 1.5125 21.7375 0.5 20.5 0.5H2.5C1.2625 0.5 0.25 1.5125 0.25 2.75V16.25C0.25 17.4875 1.2625 18.5 2.5 18.5H20.5C21.7375 18.5 22.75 17.4875 22.75 16.25V2.75ZM20.5 2.75L11.5 8.375L2.5 2.75H20.5ZM20.5 16.25H2.5V5L11.5 10.625L20.5 5V16.25Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className=" i-error-box flex flex-col">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`container-input ${
                    emailError === "" ? "" : "input-error"
                  }`}
                />
                <span className="i-error">{emailError}</span>
              </div>
            </div>
            <div className="container-input-box flex flex-row">
              <div className="container-icon">
                <svg
                  width="19"
                  height="24"
                  viewBox="0 0 19 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 18.125C10.0967 18.125 10.669 17.8879 11.091 17.466C11.5129 17.044 11.75 16.4717 11.75 15.875C11.75 15.2783 11.5129 14.706 11.091 14.284C10.669 13.8621 10.0967 13.625 9.5 13.625C8.90326 13.625 8.33097 13.8621 7.90901 14.284C7.48705 14.706 7.25 15.2783 7.25 15.875C7.25 16.4717 7.48705 17.044 7.90901 17.466C8.33097 17.8879 8.90326 18.125 9.5 18.125ZM16.25 8C16.8467 8 17.419 8.23705 17.841 8.65901C18.2629 9.08097 18.5 9.65326 18.5 10.25V21.5C18.5 22.0967 18.2629 22.669 17.841 23.091C17.419 23.5129 16.8467 23.75 16.25 23.75H2.75C2.15326 23.75 1.58097 23.5129 1.15901 23.091C0.737053 22.669 0.5 22.0967 0.5 21.5V10.25C0.5 9.65326 0.737053 9.08097 1.15901 8.65901C1.58097 8.23705 2.15326 8 2.75 8H3.875V5.75C3.875 4.25816 4.46763 2.82742 5.52252 1.77252C6.57742 0.717632 8.00816 0.125 9.5 0.125C10.2387 0.125 10.9701 0.270495 11.6526 0.553178C12.3351 0.83586 12.9551 1.25019 13.4775 1.77252C13.9998 2.29485 14.4141 2.91495 14.6968 3.59741C14.9795 4.27986 15.125 5.01131 15.125 5.75V8H16.25ZM9.5 2.375C8.60489 2.375 7.74645 2.73058 7.11351 3.36351C6.48058 3.99645 6.125 4.85489 6.125 5.75V8H12.875V5.75C12.875 4.85489 12.5194 3.99645 11.8865 3.36351C11.2536 2.73058 10.3951 2.375 9.5 2.375Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className=" i-error-box flex flex-col">
                <input
                  type="text"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={`container-input ${
                    passwordError === "" ? "" : "input-error"
                  }`}
                />
                <span className="i-error">{passwordError}</span>
              </div>
            </div>
            <p
              className={`container-bottom-text ${
                showModal ? "modal-container-bottom-text" : ""
              }`}
            >
              Don’t have an account?{" "}
            {showModal ? (  <a  className="bottom-link" onClick={()=>setIsSignup(true)}>Sign up</a> ) : (    <Link to="/register" className="bottom-link">Sign up</Link> )}
            </p>

            <button
              onClick={handleSubmit}
              className={` btn btn-primary container-btn ${
                showModal ? "modal-container-btn" : ""
              }`}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
