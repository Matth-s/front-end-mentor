import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postLike } from "../feature/firebase-feature";

const Upvotes = ({ upvotes, id }) => {
  const dispatch = useDispatch();
  const selectorUser = useSelector((state) => state.user);
  const username = selectorUser.userInfo.username;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = (id) => {
    if (selectorUser.isAuthenticated) {
      setIsLoading(true);
      dispatch(postLike({ id, username: username }))
        .unwrap()
        .finally(() => setIsLoading(false));
    } else {
      navigate("/account");
    }
  };

  return (
    <div
      onClick={() => handleLike(id)}
      className={`upvotes-container border-radius flex flex__column flex__alignCenter flex__justifyCenter ${
        upvotes.find((x) => x === username)
          ? "upvotes-container__liked"
          : "upvotes-container__default"
      } ${isLoading ? "inactive" : "active"}`}
    >
      <img src="/assets/shared/icon-arrow-up.svg" alt="icon arrow up" />
      <h4>{upvotes.length}</h4>
    </div>
  );
};

export default Upvotes;
