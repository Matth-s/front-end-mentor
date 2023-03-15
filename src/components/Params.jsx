import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "../feature/firebase-feature";
import { setPageAtuthentification } from "../feature/user.slice";

const Params = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const userSelector = useSelector((state) => state.user);
  const isAuthenticated = userSelector.isAuthenticated;

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleWhatForm = (form) => {
    dispatch(setPageAtuthentification(form));
    navigate("/account");
  };

  const handleLougOut = () => {
    dispatch(LogOut());
    window.location.reload();
  };

  return (
    <div className="params-container flex flex__alignCenter">
      <ul
        className="flex"
        style={{
          transform: isOpen ? "scaleX(1)" : "scaleX(0)",
        }}
      >
        {isAuthenticated ? (
          <li onClick={() => handleLougOut()}>Logout</li>
        ) : (
          <>
            <li onClick={() => handleWhatForm("signUp")}>Sign Up</li>
            <li onClick={() => handleWhatForm("signIn")}>Sign In</li>
          </>
        )}
      </ul>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="div flex flex__alignCenter flex__justifyCenter"
      >
        {isOpen ? (
          <img src="/assets/shared/icon-close.png" alt="icon close" />
        ) : (
          <img src="/assets/shared/icon-settings.png" alt="icon params" />
        )}
      </div>
    </div>
  );
};

export default Params;
