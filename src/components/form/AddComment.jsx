import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postComment } from "../../feature/firebase-feature";

const AddComment = ({ idFeedback }) => {
  const form = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectorUser = useSelector((state) => state.user);

  const [commentLength, setCommentLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isAuthenticated = selectorUser.isAuthenticated;
  const userInfo = selectorUser.userInfo;

  const handleSumit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const id = Date.now();
    const comment = form.current.comment.value;

    if (isAuthenticated) {
      let data = {
        content: comment,
        replies: [],
        id,
        user: {
          name: userInfo.displayName,
          username: userInfo.username,
          image: null,
        },
      };

      if (commentLength === 0) {
        setError("Comment can't be empty");
        setIsLoading(false);
        return false;
      }

      if (
        (userInfo.username || userInfo.name || userInfo.image) === undefined
      ) {
        setError("User information error");
        setIsLoading(false);
        return false;
      }

      dispatch(postComment({ id: idFeedback, data }))
        .unwrap()
        .then((res) => {
          res.status === "succes" && form.current.reset();
          setError("");
          setCommentLength(0);
          form.current.reset();
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      navigate("/account");
    }
  };

  return (
    <div className="addComment-container border-radius">
      <h3>Add Comment</h3>

      <form ref={form} onSubmit={(e) => handleSumit(e)}>
        <textarea
          id="comment"
          onChange={(e) => setCommentLength(e.target.value.length)}
          onKeyDown={(e) => {
            if (commentLength >= 250 && e.key !== "Backspace") {
              e.preventDefault();
            }
          }}
          placeholder="Type your comment here"
          required
        />

        {error !== "" && <p className="errorMessage">{error}</p>}

        <div className="flex flex__alignCenter flex__spaceBtw">
          <p>{250 - commentLength} Characters left</p>

          <input
            className={`border-radius ${
              isAuthenticated ? "active" : "inactive"
            } ${isLoading || commentLength > 250 ? "inactive" : "active"}`}
            type="submit"
            value="Post Comment"
          />
        </div>
      </form>
    </div>
  );
};

export default AddComment;
