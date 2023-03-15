import HeaderComments from "../header/HeaderComments";
import AddReply from "../form/AddReply";
import { useState } from "react";
import EditReply from "../form/EditReply";

const Comments = ({ data }) => {
  const [showReply, setShowReplyOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const usernameToReply = data.user.username;

  const handleShowReply = () => {
    setShowReplyOpen(!showReply);
  };

  const handleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  return (
    <div className="comment-container">
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
          editSubComment={false}
          reply={data.content}
          handleShowEdit={handleShowEdit}
        />
      ) : (
        <p className="content body2">{data.content}</p>
      )}

      {showReply && (
        <AddReply
          usernameToReply={usernameToReply}
          idComment={data.id}
          replySubComment={false}
          closeForm={handleShowReply}
        />
      )}
    </div>
  );
};

export default Comments;
