import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postComment } from "../../feature/firebase-feature";

const AddComment = ({ idFeedback }) => {
  const form = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectorUser = useSelector((state) => state.user);

  const [dataTextarea, setdataTextarea] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isAuthenticated = selectorUser.isAuthenticated;
  const userInfo = selectorUser.userInfo;

  const handleSumit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const id = Date.now();

    if (isAuthenticated) {
      let data = {
        content: dataTextarea,
        replies: [],
        id,
        user: {
          name: userInfo.displayName,
          username: userInfo.username,
          image: "image",
        },
      };

      if (dataTextarea.trim().length === 0) {
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
          setdataTextarea("");
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
          name="textarea"
          onChange={(e) => setdataTextarea(e.target.value)}
          placeholder="Type your comment here"
          required
        ></textarea>

        {error !== "" && <p className="errorMessage">{error}</p>}

        <div className="flex flex__alignCenter flex__spaceBtw">
          <p>{250 - dataTextarea.length} Characters left</p>

          <input
            className={`border-radius ${
              isAuthenticated ? "active" : "inactive"
            } ${isLoading ? "inactive" : "active"}`}
            type="submit"
            value="Post Comment"
          />
        </div>
      </form>
    </div>
  );
};

export default AddComment;
