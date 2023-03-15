import EditFeedback from "../components/form/EditFeedback";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getViewFeedback } from "../feature/firebase-feature";
import { useLocation, useNavigate } from "react-router-dom";

const FeedbackEdit = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [controlCheck, setControlCheck] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewFeedback = useSelector((state) => state.feedback.viewFeedback[0]);
  const username = useSelector((state) => state.user.userInfo.username);
  const idFeedback = location.pathname
    .replaceAll("/", "")
    .replace("feedback", "")
    .replace("edit", "");

  useEffect(() => {
    if (viewFeedback === undefined) {
      setIsLoading(true);
      dispatch(getViewFeedback(idFeedback))
        .unwrap()
        .then((res) => res.status === "success" && setIsLoading(false))
        .catch((error) => {
          console.log(error);
          setIsLoading(true);
          navigate(-2);
        });
    } else {
      setIsLoading(false);
    }
  }, [viewFeedback, idFeedback, dispatch, navigate]);

  useEffect(() => {
    if (!isLoading) {
      if (username !== viewFeedback.author) {
        setControlCheck(true);
        return navigate(-1);
      }
      setControlCheck(true);
    }
  }, [isLoading, navigate, username, viewFeedback]);

  return (
    <div className="feedbackEdit-container positionCenter">
      {!isLoading && controlCheck && <EditFeedback data={viewFeedback} />}
    </div>
  );
};

export default FeedbackEdit;
