import React, { createContext, useContext, useEffect, useState } from "react";


const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isAuth, setAuth] = useState(false);
  const [upvote, setUpvote] = useState(0);
  const [isEditing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("All");
  const [isSignup , setIsSignup] = useState(false);
const [newComment , setNewComment] = useState(false);
const [newProduct , setNewProduct] = useState(false);


  const [userName, setUserName] = useState(JSON.parse(localStorage.getItem('userName')));


  const [mediaQuery, setMediaQuery] = useState({
    isMobile: false,
    isDesktop: false,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMediaQuery({
          isMobile: true,
          isTablet: false,
          isDesktop: false,
        });
      } else {
        setMediaQuery({
          isMobile: false,
          isTablet: false,
          isDesktop: true,
        });
      }
    };
    window.addEventListener("resize", handleResize);

 
    handleResize();
  }, []);



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, [setAuth, setUserName]);

  function scrollToTop(top) {

    window.scrollTo({
      top: top || 0,
      behavior: "smooth"
    });
  }

  
  useEffect (() => {
 if (filter){
  scrollToTop(450);
 }else
  {
    scrollToTop(0);
  }
  }, [filter]);

  return (
    <AppContext.Provider
      value={{
        showModal,
        setShowModal,
        showComments,
        setShowComments,
        isAuth,
        setAuth,
        upvote,
        setUpvote,
        isEditing,
        setEditing,
        editId,
        setEditId,
        userName,
        setUserName,
        filter,
        setFilter,
        isSignup,
        setIsSignup,
        newComment,
        setNewComment,
        newProduct,
        setNewProduct,
        mediaQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
