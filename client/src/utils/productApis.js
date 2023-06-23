import axios from "axios";
const API_URL = `${process.env.REACT_APP_API_URL}/api/product`;

let token = localStorage.getItem("token");


// ----------------------------------------- Add a product  ------------------------------------------------

const addProduct = async (productData) => {
  if(token){
   token =  token.replace(/"/g, "");
  }

  try {
    const response = await axios.post(`${API_URL}/add`, productData, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//----------------------------------------- Get Product Details  ------------------------------------------------

const getProductDetails = async (productId) => {
  if(token){
   token = token.replace(/"/g, "");
  }
  try {
    const response = await axios.get(`${API_URL}/details/${productId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// ----------------------------------------- Get all products ---------------------------------------------

const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// ----------------------------------------- Edit a product  ------------------------------------------------

const editProduct = async (productId, productData) => {
  try {
    const response = await axios.put(
      `${API_URL}/edit/${productId}`,
      productData,
      {
        headers: {
          token: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// ----------------------------------------- Upvote a product ---------------------------------------------

const upvoteProduct = async (productId) => {
  try {
    const response = await axios.put(`${API_URL}/upvote/${productId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

// ----------------------------------------- Filter products  ------------------------------------------------

const filterProducts = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/filter`, {
      params: { category },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// ----------------------------------------- Add comment  ------------------------------------------------

const addComment = async (productId, comment) => {
  try {
    const response = await axios.put(
      `${API_URL}/comment/${productId}`,
      comment
    );
    console.log(response.data); 
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all categories

const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};



export {
  addProduct,
  getAllProducts,
  getProductDetails,
  getAllCategories,
  editProduct,
  upvoteProduct,
  filterProducts,
  addComment,

};
