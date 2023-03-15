import React from "react";

const QuantityComments = ({ quantity }) => {
  return (
    <div className="quantityComments-container flex flex__alignCenter">
      <img src="/assets/shared/icon-comments.svg" alt="icon comment" />
      <p>{quantity}</p>
    </div>
  );
};

export default QuantityComments;
