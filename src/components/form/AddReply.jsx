import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postReply } from "../../feature/firebase-feature";

const AddReply = ({
  usernameToReply,
  idComment,
  replySubComment,
  idCommentParent,
  closeForm,
}) => {
  const navigate = useNavigate();
  const form = useRef();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const viewFeedback = useSelector((state) => state.feedback.viewFeedback);
  const selectorUser = useSelector((state) => state.user);

  const idFeedback = viewFeedback[0].id;
  const isAuthenticated = selectorUser.isAuthenticated;
  const username = selectorUser.userInfo.username;
  const name = selectorUser.userInfo.displayName;
  const image = selectorUser.userInfo.image;

  const handleReply = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/account");
      return false;
    }

    if ((username || name) === undefined) {
      setError("Problem with user information");
      return false;
    }

    const content = form.current.content.value.trim();
    setIsLoading(true);
    const id = Date.now();

    if (content.length === 0) {
      setError("Can't be empty");
      setIsLoading(false);
      return false;
    }

    if (content.length > 250) {
      setError(`Max length 250 character you have ${content.length}`);
      setIsLoading(false);
      return false;
    }

    const data = {
      replyingTo: usernameToReply,
      content,
      replies: [],
      id,
      user: {
        image,
        username,
        name,
      },
    };

    dispatch(
      postReply({
        data,
        idFeedback,
        idComment,
        replySubComment,
        idCommentParent,
      })
    )
      .unwrap()
      .then((res) => {
        res.status === "success" && form.current.reset();
        closeForm();
      })
      .catch(() => {
        setError("Error unexpected");
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      ref={form}
      onSubmit={(e) => handleReply(e)}
      className="addReply-container flex"
    >
      <div>
        <textarea
          className="border-radius"
          id="content"
          maxLength={250}
          autoFocus
        ></textarea>
        {error !== "" && <p className="errorMessage">{error}</p>}
      </div>

      <input
        className={`border-radius ${isLoading ? "inactive" : "active"}`}
        type="submit"
        value="Post Reply"
      />
    </form>
  );
};

export default AddReply;
