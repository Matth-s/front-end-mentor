import { useSelector } from 'react-redux';
import Aside from '../components/Aside';
import HeaderBoard from '../components/header/HeaderBoard';
import Invoice from '../components/invoice/Invoice';
import NoInvoice from '../components/invoice/NoInvoice';
import Params from '../components/Params';

const Home = () => {
  const selectorFeedback = useSelector((state) => state.feedback);
  const feedback = selectorFeedback.feedback;
  const lengthOfFeedback = selectorFeedback.quantityFeedback;
  const filter = selectorFeedback.filter.toLowerCase();
  const sortBy = selectorFeedback.sortBy;

  return (
    <div className="home-container auto">
      <Params />
      <div className="main-home flex flex__spaceBtw">
        <Aside />
        <div className="main-right">
          <HeaderBoard />
          {lengthOfFeedback > 0 ? (
            feedback
              .filter((feedback) =>
                feedback.category.includes(filter)
              )
              .sort((a, b) => {
                switch (sortBy) {
                  case 'MU':
                    return b.upvotes.length - a.upvotes.length;
                  case 'ML':
                    return a.upvotes.length - b.upvotes.length;
                  case 'MC':
                    return b.comments.length - a.comments.length;
                  case 'LC':
                    return a.comments.length - b.comments.length;
                  default:
                    return 0;
                }
              })
              .map((item) => <Invoice key={item.id} data={item} />)
          ) : (
            <NoInvoice />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
