import SignUp from "../components/connexion/SignUp";
import SignIn from "../components/connexion/SignIn";
import ButtonGoBack from "../components/button/ButtonGoBack";
import { useState } from "react";
import { useSelector } from "react-redux";

const Account = () => {
  const pageAtuthentification = useSelector(
    (state) => state.user.pageAtuthentification
  );
  const [whatForm, setWhatFrom] = useState(pageAtuthentification);

  return (
    <div className="account-container flex flex__column">
      <ButtonGoBack />
      <div className="choice-div flex">
        <button
          className={whatForm === "signUp" ? "activeLink" : null}
          onClick={() => setWhatFrom("signUp")}
        >
          <h3>Sign Up</h3>
        </button>
        <button
          className={whatForm === "signIn" ? "activeLink" : null}
          onClick={() => setWhatFrom("signIn")}
        >
          <h3>Sign In</h3>
        </button>
      </div>
      {whatForm === "signUp" ? <SignUp /> : <SignIn />}
    </div>
  );
};

export default Account;
