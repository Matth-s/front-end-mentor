import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editReply } from "../../feature/firebase-feature";

const EditReply = ({
  reply,
  idComment,
  idCommentParent,
  editSubComment,
  handleShowEdit,
}) => {
  const selectorFeedback = useSelector((state) => state.feedback.viewFeedback);
  const id = selectorFeedback[0].id;
  const dispatch = useDispatch();
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const content = form.current.content.value.trim();

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

    dispatch(
      editReply({
        id,
        idComment,
        content,
        editSubComment,
        idCommentParent,
      })
    )
      .unwrap()
      .then((res) => res.status === "success" && handleShowEdit())
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      ref={form}
      className="addReply-container flex"
    >
      <div>
        <textarea
          className="border-radius"
          name="content"
          defaultValue={reply}
        ></textarea>
        {error !== "" && <p className="errorMessage">{error}</p>}
      </div>

      <input
        className={`border-radius ${isLoading ? "inactive" : "active"}`}
        type="submit"
        value="Edit Reply"
      />
    </form>
  );
};

export default EditReply;
