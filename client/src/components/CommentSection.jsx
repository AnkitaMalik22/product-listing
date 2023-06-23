import React, { useState } from "react";
import "../styles/productCard.css";
import { addComment } from "../utils/productApis";
import { useAppContext } from "../hooks/AppContext";

const CommentSection = ({ productId, comments }) => {
  const { setNewComment } = useAppContext();
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(false);

  const handleChange = (e) => {
    if (commentError) {
      setCommentError(false);
    }

    setComment(e.target.value);
  };

  const handleAddComment = async () => {
    if (comment.length === 0) {
      setCommentError(true);
      return;
    }

    try {
      await addComment(productId, { comment: comment });
      setNewComment(true);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="CommentSection">
      <div className="input-comment-box flex">
        <input
          name="comment"
          value={comment}
          onChange={handleChange}
          placeholder="Add a comment...."
          className="input-comment"
          style={{
            border: commentError ? "1px solid red" : "1px solid #ABABAB",
          }}
        />
        <svg
          className="commend-send"
          width="30"
          height="25"
          viewBox="0 0 30 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleAddComment}
        >
          <path
            d="M0.76375 24.875L29.625 12.5L0.76375 0.125L0.75 9.75L21.375 12.5L0.75 15.25L0.76375 24.875Z"
            fill="#ABABAB"
          />
        </svg>
        {commentError && (
          <p
            style={{
              color: "red",
              fontSize: "0.8rem",
              marginLeft: "1rem",
              position: "absolute",
            }}
          >
            Please enter a comment
          </p>
        )}
      </div>
      <div className="comments flex flex-col">
        {comments &&
          comments.map((comment, index) => {
            return (
              <div className="product-comment flex " key={index}>
                <svg
                  style={{ margin: "0 1rem" }}
                  width="22"
                  height="21"
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse cx="7.5" cy="7" rx="7.5" ry="7" fill="#36416A" />
                </svg>
                {<p className="comment">{comment ?? comment}</p>}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CommentSection;
