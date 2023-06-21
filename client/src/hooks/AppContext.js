import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isAuth ,setAuth]= useState(true);
  const [upvote ,setUpvote] =useState(0)

  return (
    <AppContext.Provider value={{ showModal, setShowModal, showComments, setShowComments ,isAuth,setAuth,upvote,setUpvote}}>
      {children}
    </AppContext.Provider>
  );
};
