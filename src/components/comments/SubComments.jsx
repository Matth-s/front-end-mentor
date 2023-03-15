import React, { useState } from "react";
import AddReply from "../form/AddReply";
import EditReply from "../form/EditReply";
import HeaderComments from "../header/HeaderComments";

const SubComments = ({ data, idCommentParent }) => {
  const [showReply, setShowReply] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const usernameToReply = data.user.username;

  const handleShowReply = () => {
    setShowReply(!showReply);
  };

  const handleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  return (
    <div className="subComment-container">
      <HeaderComments
        userInfo={data.user}
        handleShowReply={handleShowReply}
        showReply={showReply}
        handleShowEdit={handleShowEdit}
        showEdit={showEdit}
      />
      {showEdit ? (
        <EditReply
          idComment={data.id}
          idCommentParent={idCommentParent}
          editSubComment={true}
          reply={data.content}
          handleShowEdit={handleShowEdit}
        />
      ) : (
        <p className="content body2">
          <span>@{data.replyingTo} </span>
          {data.content}
        </p>
      )}

      {showReply && (
        <AddReply
          usernameToReply={usernameToReply}
          idComment={data.id}
          idCommentParent={idCommentParent}
          replySubComment={true}
          closeForm={handleShowReply}
        />
      )}
    </div>
  );
};

export default SubComments;
