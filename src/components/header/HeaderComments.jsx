import { useSelector } from "react-redux";

const HeaderComments = ({
  userInfo,
  handleShowReply,
  showReply,
  handleShowEdit,
  showEdit,
}) => {
  const usernameSelector = useSelector((state) => state.user.userInfo.username);
  const usernameInfo = userInfo.username;
  const imageUserInfo = userInfo.image;
  const nameUserInfo = userInfo.name;

  return (
    <div className="headerComments-container flex flex__alignCenter">
      <img
        src={
          imageUserInfo === null
            ? "/assets/shared/empty-user.png"
            : imageUserInfo
        }
        alt={`illustration ${nameUserInfo}`}
      />
      <section>
        <h4>{nameUserInfo}</h4>
        <p className="body2">@{userInfo.username}</p>
      </section>
      {usernameSelector === usernameInfo ? (
        <p className="reply body4" onClick={() => handleShowEdit()}>
          {showEdit ? "Close" : "Edit"}
        </p>
      ) : (
        <p className="reply body4" onClick={() => handleShowReply()}>
          {showReply ? "Close" : "Reply"}
        </p>
      )}
    </div>
  );
};

export default HeaderComments;
