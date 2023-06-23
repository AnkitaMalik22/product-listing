import React, { useState ,useEffect} from "react";
import "../styles/form.css";
import "../styles/common.css";
import { useAppContext } from "../hooks/AppContext";
import { registerUser } from "../utils/userApis";
import { useNavigate,Link } from "react-router-dom";
import { AlertError, AlertSuccess } from "../components/Alert";

const Register = () => {
  const navigate = useNavigate();
  const { showModal ,setUserName ,setIsSignup,setAuth,setShowModal,mediaQuery } = useAppContext();
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const { name, email, mobile, password } = userData;
  useEffect(() => {
    const clearMessage = () => {

      setErrorMessage('');
      setSuccessMessage('');
     
    };
    
  if ( successMessage) {
    setTimeout(clearMessage, 1000);
    navigate("/");
  }else{
    setTimeout(clearMessage, 1000);
  }
}, [errorMessage,successMessage]);


  const handleErrors = () => {
    setNameError("");
    setEmailError("");
    setMobileError("");
    setPasswordError("");

    if (!name) {
      setNameError("Name is required.");
    }
    if (!email) {
      setEmailError("Email is required.");
    }
    if (!mobile) {
      setMobileError("Mobile is required.");
    }
    if (!password) {
      setPasswordError("Password is required.");
    }
  };

  const handleSubmit = async () => {
    handleErrors();
  
    if (name && email && password && mobile) {
      try {
        const response = await registerUser(userData);
        console.log(response);
  
        if (response.status === "SUCCESS") {
          setAuth(true);
          setUserName(response.userName);
          setSuccessMessage(response.message);
          setErrorMessage("");
          setShowModal(false);
        } else {
          setSuccessMessage("");
          setErrorMessage(response.message);
        }
      } catch (error) {
        console.error("Error registering user:", error);
        setErrorMessage("An error occurred while registering the user.");
      }
    }
  };
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
   <>
    {successMessage && <AlertSuccess successMessage={successMessage} />}
   {errorMessage &&  <AlertError errorMessage={errorMessage}  />}


    <div className={` ${showModal ? "modal-container" : "container"}`}>
     
      <div
        className={`register-container flex flex-col ${
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
                width="21"
                height="21"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 0.166664C14.1355 0.166664 15.704 0.816364 16.8605 1.97284C18.017 3.12931 18.6667 4.69783 18.6667 6.33333C18.6667 7.96883 18.017 9.53735 16.8605 10.6938C15.704 11.8503 14.1355 12.5 12.5 12.5C10.8645 12.5 9.29597 11.8503 8.1395 10.6938C6.98302 9.53735 6.33332 7.96883 6.33332 6.33333C6.33332 4.69783 6.98302 3.12931 8.1395 1.97284C9.29597 0.816364 10.8645 0.166664 12.5 0.166664ZM12.5 15.5833C19.3142 15.5833 24.8333 18.3429 24.8333 21.75V24.8333H0.166656V21.75C0.166656 18.3429 5.68582 15.5833 12.5 15.5833Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className={` i-error-box flex flex-col`}>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Name"
                className={`register-input ${
                  nameError === "" ? "" : "input-error"
                }`}
              />
              <span className="i-error">{nameError}</span>
            </div>
          </div>
          <div className="container-input-box flex flex-row">
            <div className="container-icon">
              <svg
                width="19"
                height="15"
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
            <div className={` i-error-box flex flex-col`}>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
                className={`register-input ${
                  emailError === "" ? "" : "input-error"
                }`}
              />
              <span className="i-error">{emailError}</span>
            </div>
          </div>
          <div className="container-input-box flex flex-row">
            <div className="container-icon">
              <svg
                width="13"
                height="23"
                viewBox="0 0 17 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.9375 0.8125H3.0625C2.34144 0.8125 1.64992 1.09894 1.14005 1.6088C0.630189 2.11867 0.34375 2.81019 0.34375 3.53125V23.4688C0.34375 24.1898 0.630189 24.8813 1.14005 25.3912C1.64992 25.9011 2.34144 26.1875 3.0625 26.1875H13.9375C14.6586 26.1875 15.3501 25.9011 15.8599 25.3912C16.3698 24.8813 16.6562 24.1898 16.6562 23.4688V3.53125C16.6562 2.81019 16.3698 2.11867 15.8599 1.6088C15.3501 1.09894 14.6586 0.8125 13.9375 0.8125ZM2.15625 6.25H14.8438V20.75H2.15625V6.25ZM3.0625 2.625H13.9375C14.1779 2.625 14.4084 2.72048 14.5783 2.89043C14.7483 3.06039 14.8438 3.2909 14.8438 3.53125V4.4375H2.15625V3.53125C2.15625 3.2909 2.25173 3.06039 2.42168 2.89043C2.59164 2.72048 2.82215 2.625 3.0625 2.625ZM13.9375 24.375H3.0625C2.82215 24.375 2.59164 24.2795 2.42168 24.1096C2.25173 23.9396 2.15625 23.7091 2.15625 23.4688V22.5625H14.8438V23.4688C14.8438 23.7091 14.7483 23.9396 14.5783 24.1096C14.4084 24.2795 14.1779 24.375 13.9375 24.375Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className=" i-error-box flex flex-col">
              <input
                type="text"
                name="mobile"
                value={mobile}
                onChange={handleChange}
                placeholder="Mobile"
                className={`register-input ${
                  mobileError === "" ? "" : "input-error"
                }`}
              />
              <span className="i-error">{mobileError}</span>
            </div>
          </div>
          <div className="container-input-box flex flex-row">
            <div className="container-icon">
              <svg
                width="15"
                height="20"
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
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
                className={`register-input ${
                  passwordError === "" ? "" : "input-error"
                }`}
              />
              <span className="i-error">{passwordError}</span>
            </div>
          </div>
          <p className="container-bottom-text">
            Already have an account?
            {showModal ? (  <a className="bottom-link" onClick={()=>setIsSignup(false)}>Login</a> ) : (    <Link to="/login" className="bottom-link">Sign up</Link> )}

            <a className="bottom-link"></a>
          </p>

          <button
            className=" btn btn-primary container-btn"
            onClick={handleSubmit}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
   </>
  );
};

export default Register;
