import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import ProductFilters from "../components/ProductFilters";
import "../styles/header.css";

import ProductForm from "../components/ProductForm";
import { useAppContext } from "../hooks/AppContext";
import ProductList from "../components/ProductList";
import Login from "./Login";

const Home = () => {
  const { showModal, setShowModal ,isAuth} = useAppContext();
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, setShowModal]);

  return (
    <>
    {showModal && (
      <>
        <div ref={modalRef}>
        {isAuth ? <ProductForm /> : <Login/>}
        </div>
        <div className="modal-back" onClick={handleClickOutside}></div>
      </>
    )}
    <div className="home">
     
      <Header />
      <div className="home-container flex">
        <ProductFilters />
        <ProductList />
      </div>
    </div>
    </>
  );
};

export default Home;
