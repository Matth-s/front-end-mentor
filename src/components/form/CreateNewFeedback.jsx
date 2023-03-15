import { useRef, useState } from "react";
import { createNewFeedback } from "../../feature/firebase-feature";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateNewFeedback = () => {
  const usernameSelector = useSelector((state) => state.user.userInfo.username);
  const filterSelector = useSelector((state) => state.feedback.filter);
  const form = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    setIsLoading(true);
    const id = Date.now();
    e.preventDefault();
    setError("");

    const title = form.current.title.value.trim();
    const category = form.current.category.value.trim();
    const content = form.current.content.value.trim();

    if (title.length === 0) {
      setError("Title can't be empty");
      setIsLoading(false);
      return false;
    }

    if (title.length < 5) {
      setError("The title must have a minimum length of 5 characters");
      setIsLoading(false);
      return false;
    }

    if (content.length === 0) {
      setError("Details empty");
      setIsLoading(false);
      return false;
    }

    if (content.length > 250) {
      setError(`Max length 250 character you have ${content.length}`);
      setIsLoading(false);
      return false;
    }

    const data = {
      title,
      id: `${id}F`,
      category,
      description: content,
      author: usernameSelector,
      comments: [],
      upvotes: [],
      status: "",
    };

    dispatch(createNewFeedback(data))
      .unwrap()
      .then((res) => {
        res.status === "succes" && form.current.reset();
        navigate(`/feedback/${id}F`);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="createEditFeedback-container createNewFeedback border-radius flex flex__column">
      <span className="flex">
        <img src="/assets/shared/icon-plus.svg" alt="icon plus" />
      </span>
      <h1>Create New Feedback</h1>
      <form ref={form} onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Feedback Title</label>
        <p>Add a short, descriptive headline</p>
        <input type="text" name="title" id="title" required />

        <label htmlFor="category">Category</label>
        <p>Choose a category for your feedback</p>
        <select
          name="category"
          id="category"
          defaultValue={filterSelector.toLowerCase()}
        >
          <option value="feature">Feature</option>
          <option value="ui">UI</option>
          <option value="ux">UX</option>
          <option value="enhancement">Enhancement</option>
          <option value="bug">Bug</option>
        </select>

        <label htmlFor="content">Feedback Detail</label>
        <p>
          Include any specific comments on what should be improved, added, etc.
        </p>
        <textarea name="content" id="content" required></textarea>

        {error !== "" && <p className="errorMessage">{error}</p>}

        <input
          className={`border-radius ${isLoading ? "inactive" : "active"}`}
          type="submit"
          value="Add Feedback"
        />
      </form>
    </div>
  );
};

export default CreateNewFeedback;
