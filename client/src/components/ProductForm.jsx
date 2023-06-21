import React from "react";
import "../styles/form.css";
import { useAppContext } from "../hooks/AppContext";

const ProductForm = () => {
  const { showModal, setShowModal } = useAppContext();

  return (
    <div className={` ${showModal ? "modal-container" : ""}`}>
      <div
        className={`add-product-container flex flex-col ${
          showModal ? "inner-modal-container" : ""
        } `}
      >
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

        <form
          action="post"
          className={`container-form flex flex-col ${
            showModal ? "modal-container-form" : ""
          } `}
        >
          <div className="container-input-box flex flex-row modal-i-box">
          
            <input
              type="text"
              name="company-name"
              placeholder="Name of the company"
              className="container-input"
            />
          </div>
          <div className="container-input-box flex flex-row modal-i-box">
           
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="container-input"
            />
          </div>
         <div className="container-input-box flex flex-row modal-i-box">
           
           <input
             type="text"
             name="logo-url"
             placeholder="Add logo url"
             className="container-input"
           />
         </div>
       

         <div className="container-input-box flex flex-row modal-i-box">
           
           <input
             type="text"
             name="product-link"
             placeholder="Link of product"
             className="container-input"
           />
         </div>
 <div className="container-input-box flex flex-row modal-i-box">
           
           <input
             type="text"
             name="product-des"
             placeholder="Add description"
             className="container-input"
           />
         </div>


          
          <button
            type="submit"
            className={` btn btn-primary container-btn ${
              showModal ? "modal-container-btn" : ""
            }`}
          >
         +Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
