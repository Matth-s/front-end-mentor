import { useNavigate } from "react-router-dom";

const ButtonAddFeedback = () => {
  const navigate = useNavigate();

  const handleAddFeedback = () => {
    navigate("/create-feedback");
  };

  return (
    <button
      className="buttonAddFeedback border-radius"
      onClick={() => handleAddFeedback()}
    >
      <h4>+ Add Feedback</h4>
    </button>
  );
};

export default ButtonAddFeedback;
