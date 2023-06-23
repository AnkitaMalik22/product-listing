import React, { useState, useEffect } from "react";
import "../styles/productFilter.css";
import { getAllCategories } from "../utils/productApis";
import { useAppContext } from "../hooks/AppContext";

const ProductFilters = () => {
  const { setFilter,filter } = useAppContext();
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getAllCategories();
      setCategories(response);
    };
    fetchCategories();
  }, []);
  return (
    <div className="product-filters">
      <div className="filter-heading">
        <h1 className="filter-heading-title">Feedback</h1>
        <p className="filter-heading-p">Apply Filter</p>
      </div>
      <div className="filter-options flex">
        <div className={`filter ${filter === 'All' && "active-filter"}`} onClick={() => setFilter("All")}>
          All
        </div>
        {categories &&
          categories.map((category, index) => (
            <div
              className={`filter ${filter === category ? "active-filter" : ""}`}
              onClick={() => setFilter(category)}
              key={index}
            >
              {category}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductFilters;
