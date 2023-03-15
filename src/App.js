import Account from "./pages/Account";
import Home from "./pages/Home";
import Feedback from "./pages/Feedback";
import CreateFeedback from "./pages/CreateFeedback";
import FeedbackEdit from "./pages/FeedbackEdit";

import Loader from "./components/Loader";
import PrivateRoutes from "./utils/PrivateRoutes";

import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkUserStatus, getAllfeedback } from "./feature/firebase-feature";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorStatus, setErrorStatus] = useState(true);
  const [errorFeedback, setErrorFeedback] = useState(true);

  useEffect(() => {
    dispatch(checkUserStatus())
      .unwrap()
      .then((res) => res.status === "success" && setErrorStatus(false))
      .catch(() => navigate("/error"));

    dispatch(getAllfeedback())
      .unwrap()
      .then((res) => res.status === "success" && setErrorFeedback(false))
      .catch(() => navigate("/error"));
  }, [dispatch]);

  return (
    <>
      {!errorStatus && !errorFeedback ? (
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/create-feedback" element={<CreateFeedback />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="account" element={<Account />} />
          <Route path="feedback/:id" element={<Feedback />} />
          <Route path="feedback/:id/edit" element={<FeedbackEdit />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default App;
