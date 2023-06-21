import React from "react";
import "../styles/productCard.css";

const CommentSection = () => {
  return (
    <div className="CommentSection">
      <div className="input-comment-box flex">
        <input
          name="comment"
          placeholder="Add a comment...."
          className="input-comment"
        />
        <svg
          className="commend-send"
          width="30"
          height="25"
          viewBox="0 0 30 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.76375 24.875L29.625 12.5L0.76375 0.125L0.75 9.75L21.375 12.5L0.75 15.25L0.76375 24.875Z"
            fill="#ABABAB"
          />
        </svg>
      </div>
      <div className="comments flex flex-col">
        
        <div className="product-comment flex">
        <svg
          style={{margin:'0 1rem'}}
            width="22"
            height="21"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="7.5" cy="7" rx="7.5" ry="7" fill="#36416A" />
          </svg>
         <p className="comment"> Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
          tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrum exercitationem ullam corporis suscipit
          laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure
          reprehenderit in voluptate velit esse cillum dolore</p>
        </div>
        <div className="product-comment flex">
        <svg
          style={{margin:'0 1rem'}}
            width="22"
            height="21"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="7.5" cy="7" rx="7.5" ry="7" fill="#36416A" />
          </svg>
         <p className="comment"> Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
          tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrum exercitationem ullam corporis suscipit
          laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure
          reprehenderit in voluptate velit esse cillum dolore</p>
        </div>
        
      </div>
    </div>
  );
};

export default CommentSection;
