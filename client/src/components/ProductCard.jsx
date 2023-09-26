import React,{useState,useEffect} from "react";
import "../styles/productCard.css";
import CommentSection from "./CommentSection";
import { useAppContext } from "../hooks/AppContext";
import { upvoteProduct } from "../utils/productApis";


const ProductCard = ({product}) => {
  const [canEdit,setCanEdit] = useState(false);
  const {
    showComments,
    setShowComments,
    isAuth,
    setEditing,
    setShowModal,
    setEditId,
    mediaQuery,
    newProduct

  } = useAppContext();

  
  const{
    name,
    categories,
    logoUrl,
    link,
    description,
    comments,
    upvotes,

  } = product;
 
  
  const [upvote,setUpvote] = useState(upvotes);
  useEffect(() => {
    setUpvote(upvotes);
   }, [upvotes])


   useEffect(() => {
    const isProductAddedByCurrentUser = localStorage.getItem("userId") === product.addedBy;
    setCanEdit(isProductAddedByCurrentUser);
  }, [newProduct]);
  

  const handleShowComments = () => {
    setShowComments(!showComments);
  };
  const handleEditProduct = (productId) => {
    setEditId(productId);
    setEditing(true);
    setShowModal(true);
  };

  const handleUpvote = async() => {
  const res = await upvoteProduct(product._id);
  setUpvote(res.upvotes);
  };



  return (
    <>
      <div className="product" key={product._id}>
        <div className="product-image flex">
          <img src={logoUrl} width={mediaQuery.isDesktop ? 50 : 30 } height={mediaQuery.isDesktop ? 50 : 30} style={{borderRadius:"50%"}}/>

        </div>
        <div className="product-des flex flex-col">
          <div className="product-des-inner">
            <h4 className="product-name">{name}</h4>
            <p className="product-p">
           {description}
            </p>
          </div>
          <div className="categories-container">
            <div className="categories flex">
             
             {
              categories && categories.map((category) => (  
                <div className="filter p-filter">{category}</div>
              ))
             }
              <div
                className="make-comment flex"
                onClick={() => handleShowComments()}
              >
                <svg
                  style={{ marginLeft: "1rem" }}
                  width="21"
                  height="21"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 0.5C11.3584 0.5 9.73298 0.823322 8.21641 1.45151C6.69984 2.07969 5.32185 3.00043 4.16112 4.16117C1.81692 6.50537 0.499955 9.68479 0.499955 13C0.489027 15.8864 1.48845 18.6857 3.32495 20.9125L0.824955 23.4125C0.651508 23.5883 0.534012 23.8115 0.487295 24.054C0.440577 24.2965 0.46673 24.5474 0.562455 24.775C0.666277 24.9999 0.834585 25.1889 1.04601 25.318C1.25744 25.4471 1.50246 25.5104 1.74995 25.5H13C16.3152 25.5 19.4946 24.183 21.8388 21.8388C24.183 19.4946 25.5 16.3152 25.5 13C25.5 9.68479 24.183 6.50537 21.8388 4.16117C19.4946 1.81696 16.3152 0.5 13 0.5ZM13 23H4.76245L5.92495 21.8375C6.15777 21.6033 6.28845 21.2865 6.28845 20.9562C6.28845 20.626 6.15777 20.3092 5.92495 20.075C4.28819 18.4401 3.26892 16.2882 3.04082 13.986C2.81271 11.6838 3.38988 9.37376 4.67399 7.4494C5.95809 5.52505 7.86969 4.10545 10.0831 3.43247C12.2965 2.75948 14.6748 2.87476 16.8127 3.75864C18.9507 4.64253 20.716 6.24034 21.808 8.27986C22.9 10.3194 23.251 12.6744 22.8014 14.9438C22.3517 17.2131 21.1291 19.2563 19.3419 20.7253C17.5547 22.1943 15.3134 22.9982 13 23ZM19.25 11.75H6.74995C6.41843 11.75 6.10049 11.8817 5.86607 12.1161C5.63165 12.3505 5.49995 12.6685 5.49995 13C5.49995 13.3315 5.63165 13.6495 5.86607 13.8839C6.10049 14.1183 6.41843 14.25 6.74995 14.25H19.25C19.5815 14.25 19.8994 14.1183 20.1338 13.8839C20.3683 13.6495 20.5 13.3315 20.5 13C20.5 12.6685 20.3683 12.3505 20.1338 12.1161C19.8994 11.8817 19.5815 11.75 19.25 11.75ZM16.75 16.75H9.24995C8.91843 16.75 8.60049 16.8817 8.36607 17.1161C8.13165 17.3505 7.99995 17.6685 7.99995 18C7.99995 18.3315 8.13165 18.6495 8.36607 18.8839C8.60049 19.1183 8.91843 19.25 9.24995 19.25H16.75C17.0815 19.25 17.3994 19.1183 17.6338 18.8839C17.8683 18.6495 18 18.3315 18 18C18 17.6685 17.8683 17.3505 17.6338 17.1161C17.3994 16.8817 17.0815 16.75 16.75 16.75ZM9.24995 9.25H16.75C17.0815 9.25 17.3994 9.1183 17.6338 8.88388C17.8683 8.64946 18 8.33152 18 8C18 7.66848 17.8683 7.35054 17.6338 7.11612C17.3994 6.8817 17.0815 6.75 16.75 6.75H9.24995C8.91843 6.75 8.60049 6.8817 8.36607 7.11612C8.13165 7.35054 7.99995 7.66848 7.99995 8C7.99995 8.33152 8.13165 8.64946 8.36607 8.88388C8.60049 9.1183 8.91843 9.25 9.24995 9.25Z"
                    fill="#ABABAB"
                  />
                </svg>
                <p style={{margin:0, marginLeft: "0.2rem" }}>Comment</p>
              </div>
              { canEdit && mediaQuery.isMobile && isAuth && (
            <div className="edit">
              <button className="btn btn-primary" onClick={()=>handleEditProduct(product._id)}>
                Edit
              </button>
            </div>
          )}
            </div>
          </div>
        </div>
        <div className="product-actions flex flex-col">
          <div
            className="upvote-product flex flex-col"
            onClick={() => handleUpvote()}
          >
            <svg
              width="13"
              height="8"
              viewBox="0 0 13 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.794986 7.25407C0.59963 7.05872 0.501953 6.81008 0.501953 6.50817C0.501953 6.20626 0.59963 5.95762 0.794986 5.76227L5.69663 0.860629C5.80318 0.754071 5.91862 0.678771 6.04294 0.634727C6.16725 0.590684 6.30045 0.568307 6.44253 0.567596C6.5846 0.567596 6.72242 0.594236 6.85597 0.647514C6.98952 0.700793 7.10034 0.771831 7.18843 0.860629L12.0901 5.76227C12.2854 5.95762 12.3831 6.20626 12.3831 6.50817C12.3831 6.81008 12.2854 7.05872 12.0901 7.25407C11.8947 7.44943 11.6461 7.54711 11.3442 7.54711C11.0423 7.54711 10.7936 7.44943 10.5983 7.25407L6.44253 3.09833L2.28679 7.25407C2.09143 7.44943 1.8428 7.54711 1.54089 7.54711C1.23897 7.54711 0.990341 7.44943 0.794986 7.25407Z"
                fill="#36416A"
              />
            </svg>
            {upvote}
          </div>
      
         
          { canEdit && mediaQuery.isDesktop && isAuth && (
    
            <div className="edit">
              {console.log(canEdit)}
              <button className="btn btn-primary" onClick={()=>handleEditProduct(product._id)}>
                Edit
              </button>
            </div>
          )}
        
       
          <div
            className="comment-product flex"
            onClick={() => handleShowComments()}
          >
            <p>{comments && comments.length}</p>
            <svg
              style={{ marginLeft: "0.2rem" }}
              width={mediaQuery.isMobile ? "20" : "24"}
              height={mediaQuery.isMobile ? "20" : "23"}
              viewBox="0 0 24 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.6833 21.6833L18.9999 19H2.66659C2.02492 19 1.47542 18.7713 1.01809 18.314C0.560754 17.8566 0.332476 17.3075 0.333254 16.6666V2.66665C0.333254 2.02498 0.561921 1.47548 1.01925 1.01815C1.47659 0.560815 2.0257 0.332537 2.66659 0.333315H21.3333C21.9749 0.333315 22.5244 0.561982 22.9818 1.01932C23.4391 1.47665 23.6674 2.02576 23.6666 2.66665V20.8375C23.6666 21.3625 23.4282 21.7273 22.9514 21.9318C22.4746 22.1364 22.0519 22.0535 21.6833 21.6833Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </div>

      {showComments && <CommentSection  productId = {product._id}  comments={product.comments} />}
    </>
  );
};

export default ProductCard;
