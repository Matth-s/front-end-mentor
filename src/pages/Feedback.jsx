import GoBack from '../components/button/ButtonGoBack';
import ButtonEditfeedback from '../components/button/ButtonEditFeedback';
import Invoice from '../components/invoice/Invoice';
import AddComment from '../components/form/AddComment';
import Comments from '../components/comments/Comments';

import { getViewFeedback } from '../feature/firebase-feature';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import SubComments from '../components/comments/SubComments';

const Feedback = () => {
  const selectorViewFeedback = useSelector(
    (state) => state.feedback.viewFeedback
  );

  const username = useSelector(
    (state) => state.user.userInfo.username
  );
  const feedback = selectorViewFeedback[0];
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const idUrl = location.pathname
      .replace('feedback', '')
      .replaceAll('/', '');

    //getviewFeedback with url if selector view feedback is empty
    if (selectorViewFeedback.length === 0) {
      dispatch(getViewFeedback(idUrl))
        .unwrap()
        .catch((error) => {
          switch (error.message) {
            case 'No document found':
              navigate('/');
              window.location.reload();
              break;
            default:
              console.log(error);
          }
        });
    }
  }, [
    dispatch,
    location.pathname,
    selectorViewFeedback.length,
    navigate,
  ]);

  return (
    <div className="feedback-container">
      {selectorViewFeedback.length !== 0 && (
        <>
          <div className="header-div flex flex__spaceBtw flex__alignCenter">
            <GoBack />
            {username === feedback.author && <ButtonEditfeedback />}
          </div>
          <Invoice data={feedback} />
          <div className="commentary-div border-radius">
            <h3>{feedback.comments.length} Comments</h3>
            {feedback.comments.length > 0 &&
              feedback.comments.map((comment, i) => (
                <div key={i} className="regroupComment">
                  <Comments data={comment} />
                  {comment.replies.length > 0 &&
                    comment.replies.map((subComment, i) => (
                      <SubComments
                        key={i}
                        idCommentParent={comment.id}
                        data={subComment}
                      />
                    ))}
                </div>
              ))}
          </div>
          <AddComment idFeedback={feedback.id} />
        </>
      )}
    </div>
  );
};

export default Feedback;
