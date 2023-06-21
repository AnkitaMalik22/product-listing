import React from 'react';
import '../styles/productFilter.css'

const ProductFilters = () => {
  return (
    <div className="product-filters">
<div className="filter-heading">
  <h1 className="filter-heading-title">Feedback</h1>
  <p className="filter-heading-p">Apply Filter</p>
</div>
<div className="filter-options flex">
<div className="filter">All</div>
<div className="filter">Fintech</div>
<div className="filter">Edtech</div>
<div className="filter">All</div>
</div>


    </div>
  )
}

export default ProductFilters