import { useNavigate } from "react-router-dom";

const ButtonGoBack = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <button
      onClick={() => handleGoBack()}
      className="buttonGoBack-container flex flex__alignCenter"
    >
      <img src="/assets/shared/icon-arrow-left.svg" alt="arrow left" />
      <h4>Go Back</h4>
    </button>
  );
};

export default ButtonGoBack;
