import React from "react";
import Category from "../Category";
import Upvotes from "../Upvotes";
import QuantityComments from "../QuantityComments";

import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setViewFeedback } from "../../feature/feedback.slice";

const Invoice = ({ data }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewFeedback = (id) => {
    dispatch(setViewFeedback(id));
    navigate(`/feedback/${id}`);
  };

  return (
    <div className="invoice-container border-radius flex">
      <Upvotes upvotes={data.upvotes} id={data.id} />
      <section>
        <h3
          className={location.pathname === "/" ? "clickable" : "unclickable"}
          onClick={() => handleViewFeedback(data.id)}
        >
          {data.title}
        </h3>
        <p className="description body2">{data.description}</p>
        <Category category={data.category} />
      </section>
      <QuantityComments quantity={data.comments.length} />
    </div>
  );
};

export default Invoice;
