import { useSelector } from "react-redux";
import ButtonAddFeedback from "../button/ButtonAddFeedback";
import { useDispatch } from "react-redux";
import { setSortBy } from "../../feature/feedback.slice";

const HeaderBoard = () => {
  const dispatch = useDispatch();
  const quantityFeedback = useSelector(
    (state) => state.feedback.quantityFeedback
  );

  const handleChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  return (
    <div className="headerBoard-container border-radius flex flex__alignCenter">
      <section className="flex">
        <img src="./assets/shared/icon-ligth.svg" alt="icon" />
        <h3>{quantityFeedback} Suggestions</h3>
      </section>

      <p>Sort By : </p>
      <select onChange={(e) => handleChange(e)}>
        <option value="MU">Most Upvotes</option>
        <option value="LU">Least Upvotes</option>
        <option value="MC">Most Comments</option>
        <option value="LC">Least Comments</option>
      </select>

      <ButtonAddFeedback />
    </div>
  );
};

export default HeaderBoard;
