import React, { useState, useEffect } from "react";
import "../styles/form.css";
import { useAppContext } from "../hooks/AppContext";
import {
  addProduct,
  editProduct,
  getProductDetails,
} from "../utils/productApis";
import { AlertError, AlertSuccess } from "../components/Alert";

const ProductForm = () => {
  const {
    showModal,
    isEditing,
    editId,
    setShowModal,
    setNewProduct,
    isAuth,
    mediaQuery,
  } = useAppContext();
  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [linkError, setLinkError] = useState("");
  const [desError, setDesError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [productData, setProductData] = useState({
    name: "",
    categories: [],
    logoUrl: "",
    link: "",
    description: "",
  });

  const { name, logoUrl, link, description, categories } = productData;

  // get product details --

  useEffect(() => {
    const productDetails = async () => {
      if (isEditing && editId) {
        const product = await getProductDetails(editId);
        console.log(product);
        setProductData(product);
      }
    };
    productDetails();
  }, [isEditing, editId]);

  useEffect(() => {
    const clearMessage = () => {
      
      setErrorMessage("");
      setSuccessMessage("");
     
 
    };

    if (successMessage) {
      
      setProductData({
        name: "",
        categories: [],
        logoUrl: "",
        link: "",
        description: "",
       
      })
     
      setTimeout(clearMessage,1000)
      setTimeout(()=>{
        setShowModal(false);
      },1000)
    
      
    }else{
    
        setTimeout(clearMessage,1000)
      };
      
    
  
  }, [successMessage,errorMessage]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "categories") {
      const categoriesArray = value
        .split(",")
        .map((category) => category.trim());
      setProductData((prevData) => ({
        ...prevData,
        categories: categoriesArray,
      }));
    } else {
      setProductData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleErrors = () => {
    setNameError("");
    setCategoryError("");
    setLinkError("");
    setUrlError("");
    setDesError("");

    if (!name) {
      setNameError(" Product Name is required.");
    }

    if (categories && categories.length ===0) {
      setCategoryError("Category is required.");
    }
    if (!logoUrl) {
      setUrlError(" Logo URL is required.");
    }
    if (!link) {
      setLinkError("Link is required.");
    }
    if (!description) {
      setDesError("Description is required.");
    }
  };

  const handleSubmit = async (event) => {
    if (!isAuth) {
      alert("Please Login to add product");
      return;
    }

    event.preventDefault();
    handleErrors();

    // ------------EDIT PRODUCT --------------
    if (isEditing) {
      try {
        const response = await editProduct(editId, productData);
        setSuccessMessage(response.message);
        setErrorMessage("Product Updated SuccessFully");
        setNewProduct(true);
        setShowModal(false);
      } catch (error) {
        // alert("Product Not Updated");
        setErrorMessage("Product Not Updated");
        setSuccessMessage("")


        
      }
    } else {
      // ------------ADD PRODUCT --------------
      const response = await addProduct(productData);

      if (response && response.success) {
        setNewProduct(true);
        setSuccessMessage(response.message);
        setErrorMessage("");
        // alert(response.message);
      } else {
        setSuccessMessage("");
        setErrorMessage(response.message);

        // alert(response.message);
      }
    }

    // setShowModal(false);
  };

  return (
    <>
      {successMessage && <AlertSuccess successMessage={successMessage} />}
      {errorMessage && <AlertError errorMessage={errorMessage} />}

      <div className={` ${showModal ? "modal-container" : ""}`}>
        <div
          className={`add-product-container flex flex-col ${
            showModal ? "inner-modal-container" : ""
          } `}
        >
          {mediaQuery.isDesktop && (
            <>
              {" "}
              {showModal ? (
                <div className="modal-form-title">
                  <h1 className="contatiner-h1">Feedback</h1>
                  <p className="modal-container-p">
                    {isEditing
                      ? "Edit your product and rate other items............."
                      : "Add your product and rate other items............."}
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
            </>
          )}

          <div
            className={`container-form flex flex-col ${
              showModal ? "modal-container-form" : ""
            } `}
          >
            <div className=" container-input-box flex flex-col modal-i-box">
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Name of the company"
                className={`container-input ${
                  nameError === "" ? "" : "input-error"
                }`}
              />
              <span className="i-error">{nameError}</span>
            </div>
            <div className=" container-input-box flex flex-col modal-i-box">
              <input
                type="text"
                name="categories"
                value={categories}
                onChange={handleChange}
                placeholder="Category"
                className={`container-input ${
                  categoryError === "" ? "" : "input-error"
                }`}
              />
              <span className="i-error">{categoryError}</span>
            </div>
            <div className=" container-input-box flex flex-col modal-i-box">
              <input
                type="text"
                name="logoUrl"
                value={logoUrl}
                onChange={handleChange}
                placeholder="Add logo url"
                className={`container-input ${
                  urlError === "" ? "" : "input-error"
                }`}
              />
              <span className="i-error">{urlError}</span>
            </div>
            <div className=" container-input-box flex flex-col modal-i-box">
              <input
                type="text"
                name="link"
                value={link}
                onChange={handleChange}
                placeholder="Link of product"
                className={`container-input ${
                  linkError === "" ? "" : "input-error"
                }`}
              />
              <span className="i-error">{linkError}</span>
            </div>
            <div className=" container-input-box flex flex-col modal-i-box">
              <input
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Add description"
                className={`container-input ${
                  desError === "" ? "" : "input-error"
                }`}
              />
              <span className="i-error">{desError}</span>
            </div>

            <button
              onClick={handleSubmit}
              className={` btn btn-primary container-btn ${
                showModal ? "modal-container-btn" : ""
              }`}
            >
              {isEditing ? "Update" : "+Add"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
