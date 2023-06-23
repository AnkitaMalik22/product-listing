import React from "react";
import "../styles/header.css";
import "../styles/common.css";
import heroImg from "../imgs/image_1.png";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../hooks/AppContext";

const Header = () => {
  const navigate = useNavigate();
  const { isAuth,userName ,setAuth} = useAppContext();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setAuth(false);
    navigate("/login");
  };

  return (
    <header className="header flex flex-col">
      <nav className="nav flex">
        <h1 className="logo">Feedback</h1>
        <div className="nav-btns flex ">
          {!isAuth && (
            <>
              {" "}
              <button
                className="login-btn nav-btn"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
              <button
                className="reg-btn nav-btn"
                onClick={() => navigate("/register")}
              >
                Signup
              </button>
            </>
          )}
          {isAuth && (
            <>
           
              <p className="logout nav-btn"
            onClick={handleLogout}
              >Log out</p>
              <div className="user ">Hello! {userName} </div>
            </>
          )}
        </div>
      </nav>
      <div className="hero flex ">
        <div className="hero-img">
          <img src={heroImg} className="hero-image" width={450} />
        </div>
        <div className="hero-des">
          <h1 className="hero-des-title">
            Add your products and give your valuable feedback
          </h1>
          <p className="hero-des-para">
            Easily give your feedback in a matter of minutes. Access your
            audience on all platforms. Observe result manually in real time
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
