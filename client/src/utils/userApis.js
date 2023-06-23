import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/user`;


// ----------------------------------------- Register a user  ------------------------------------------------

const registerUser = async (userData) => {
  try {
  
    const response = await axios.post(`${API_URL}/register`, userData);
    localStorage.setItem('token' ,JSON.stringify(response.data.token));
    localStorage.setItem('userName' ,JSON.stringify(response.data.userName));
    return response.data;

  } catch (error) {
   return error.response.data;
  }
};

// ----------------------------------------- Login a user ---------------------------------------------

const loginUser = async (userData) => {

  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    localStorage.setItem('token' ,JSON.stringify(response.data.token))
    localStorage.setItem('userName' ,JSON.stringify(response.data.userName));
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export { registerUser, loginUser };
