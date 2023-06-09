import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../feature/feedback.slice";

const Aside = () => {
  const dispatch = useDispatch();
  const selectorFeedback = useSelector((state) => state.feedback.filter);
  const [openMenu, setOpenMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState(
    selectorFeedback === "" ? "All" : selectorFeedback
  );

  const filters = [
    { name: "All" },
    { name: "UI" },
    { name: "UX" },
    { name: "Enhancement" },
    { name: "Bug" },
    { name: "Feature" },
  ];

  useEffect(() => {
    setOpenMenu(false);
  }, []);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      setOpenMenu(width > 640 ? false : openMenu);
      document.body.style.overflow =
        width > 640 || !openMenu ? "unset" : "hidden";
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openMenu]);

  const handleSetFilter = (filter) => {
    setActiveFilter(filter);
    dispatch(setFilter(filter));
  };

  return (
    <div className="aside-container">
      <div className="front-end-div border-radius">
        <section>
          <h2>Frontend Mentor</h2>
          <p className="body3">Feedback Board</p>
        </section>
        <div className="icon-div" onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? (
            <img src="/assets/shared/mobile/icon-close.svg" alt="icon close" />
          ) : (
            <img
              src="/assets/shared/mobile/icon-hamburger.svg"
              alt="icon hamburger"
            />
          )}
        </div>
      </div>
      <div className={`filter-div border-radius ${openMenu ? "open" : null}`}>
        <ul className="filter-ul flex flex__wrap border-radius">
          {filters.map((filter) => (
            <li
              className={`border-radius flex flex__alignCenter body4 ${
                activeFilter === filter.name && "active"
              }`}
              onClick={() => handleSetFilter(filter.name)}
              key={filter.name}
            >
              {filter.name}
            </li>
          ))}
        </ul>
      </div>
      <span className={openMenu ? "blur" : null}></span>
    </div>
  );
};

export default Aside;
