import { useNavigate, useLocation } from "react-router-dom";

const ButtonEditFeedback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;

  const handleLocationEdit = () => {
    navigate(`${url}/edit`);
  };

  return (
    <button
      onClick={() => handleLocationEdit()}
      className="buttonEditFeedback-container border-radius"
    >
      Edit Feedback
    </button>
  );
};

export default ButtonEditFeedback;
