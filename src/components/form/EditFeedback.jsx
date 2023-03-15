import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { deleteFeedback, updateFeedback } from "../../feature/firebase-feature";
import { useDispatch } from "react-redux";

const EditFeedback = ({ data }) => {
  const form = useRef();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    switch (e.target.id) {
      case "Delete":
        handleDelete();
        break;
      case "Save":
        handleUpdate();
        break;
      case "Cancel":
        navigate(-1);
        break;
      default:
        return 0;
    }
  };

  const handleDelete = () => {
    setIsLoading(true);
    dispatch(deleteFeedback(data.id))
      .unwrap()
      .then((res) => {
        res.status === "succes" && navigate("/");
      })
      .catch((error) => setError(error.message))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdate = () => {
    setIsLoading(true);
    const title = form.current.title.value.trim();
    const category = form.current.category.value;
    const description = form.current.description.value.trim();

    if (title.length === 0) {
      setError("Title can't be empty");
      setIsLoading(false);
      return false;
    }

    if (description.length === 0) {
      setError("Description can't be empty");
      setIsLoading(false);
      return false;
    }

    if (description.length > 250) {
      setError(`Max length 250 character you have ${description.length}`);
      setIsLoading(false);
      return false;
    }

    const upDate = {
      title,
      category,
      description,
    };

    if (
      title === data.title &&
      category === data.category &&
      description === data.description
    ) {
      setIsLoading(false);
      return false;
    }

    dispatch(updateFeedback({ upDate, oldTitle: data.title, id: data.id }))
      .unwrap()
      .then(
        (res) => res.status === "success" && navigate(`/feedback/${data.id}`)
      )
      .catch((error) => setError(error.message))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="createEditFeedback-container editFeedback border-radius">
      <span className="flex">
        <img src="/assets/shared/icon-edit-feedback.svg" alt="icon edit" />
      </span>
      <h1>Editing ‘{data.title}’</h1>

      <form ref={form} onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Feedback Title</label>
        <p>Add a short, descriptive headline</p>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={data.title}
          required
        />

        <label htmlFor="category">Category</label>
        <p>Choose a category for your feedback</p>
        <select name="category" id="category" defaultValue={data.category}>
          <option value="feature">Feature</option>
          <option value="ui">UI</option>
          <option value="ux">UX</option>
          <option value="enhancement">Enhancement</option>
          <option value="bug">Bug</option>
        </select>

        <label htmlFor="description">Feedback Detail</label>
        <p>
          Include any specific comments on what should be improved, added, etc.
        </p>
        <textarea
          name="description"
          id="description"
          defaultValue={data.description}
          required
        ></textarea>

        {error !== "" && <p className="errorMessage">{error}</p>}

        <div className="submit-div flex">
          <input
            className={`border-radius ${isLoading ? "inactive" : "active"}`}
            type="submit"
            value="Delete"
            id="Delete"
            onClick={(e) => handleSubmit(e)}
          />

          <input
            className={`border-radius ${isLoading ? "inactive" : "active"}`}
            type="submit"
            value="Cancel"
            id="Cancel"
            onClick={(e) => handleSubmit(e)}
          />
          <input
            className={`border-radius ${isLoading ? "inactive" : "active"}`}
            type="submit"
            value="Save Changes"
            id="Save"
            onClick={(e) => handleSubmit(e)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditFeedback;
