import React from 'react'
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../hooks/AppContext";
import "../styles/header.css";

const ProductList = () => {
    const { setShowModal } = useAppContext();

    const handleAddProduct = () => {
      setShowModal(true);
      console.log('fghu');
    };
  return (
    <div className="product-div">
    <div className="product-heading flex ">
      <div className="left flex">
        <div className="suggesions">10 Suggestions</div>
        <div className="sort-by flex">
          <span style={{ color: " #8B8B8B", marginRight: "0.5rem" }}>
            Sort by:
          </span>{" "}
          Upvotes{" "}
          <div style={{ marginLeft: "0.5rem",zIndex :'-1' }}>
            <svg
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.700048 6.69999C0.516715 6.51665 0.425049 6.28332 0.425049 5.99999C0.425049 5.71665 0.516715 5.48332 0.700048 5.29999L5.30005 0.699987C5.40005 0.599987 5.50838 0.529321 5.62505 0.487988C5.74172 0.446654 5.86672 0.425654 6.00005 0.424988C6.13338 0.424988 6.26271 0.449988 6.38805 0.499988C6.51338 0.549988 6.61738 0.616654 6.70005 0.699987L11.3 5.29999C11.4834 5.48332 11.575 5.71665 11.575 5.99999C11.575 6.28332 11.4834 6.51665 11.3 6.69999C11.1167 6.88332 10.8834 6.97499 10.6 6.97499C10.3167 6.97499 10.0834 6.88332 9.90005 6.69999L6.00005 2.79999L2.10005 6.69999C1.91672 6.88332 1.68338 6.97499 1.40005 6.97499C1.11672 6.97499 0.883382 6.88332 0.700048 6.69999Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="right">
        <button
          className="button btn btn-primary"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>
    </div>
    <div className="products">
      <ProductCard />
      <ProductCard />
    </div>
  </div>
  )
}

export default ProductList