const Category = ({ category }) => {
  return (
    <div className="category-container border-radius flex flex__alignCenter">
      <p className="body4">{category}</p>
    </div>
  );
};

export default Category;
