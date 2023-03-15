import ButtonGoBack from "../components/button/ButtonGoBack";
import CreateNewFeedback from "../components/form/CreateNewFeedback";

const CreateFeedback = () => {
  return (
    <div className="createFeedback-container positionCenter flex flex__column flex__spaceBtw">
      <ButtonGoBack />
      <CreateNewFeedback />
    </div>
  );
};

export default CreateFeedback;
