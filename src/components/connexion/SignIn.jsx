import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../feature/firebase-feature";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const form = useRef();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const email = form.current.email.value.trim();
    const password = form.current.password.value.trim();

    if (isAuthenticated) {
      setError("You are ready connected");
      return false;
    }

    if (email.length === 0) {
      setError("email can't be empty");
      return false;
    }

    if (password.length === 0) {
      setError("Password can't be empty");
      return false;
    }

    const data = {
      email,
      password,
    };

    dispatch(logIn(data))
      .unwrap()
      .then((res) => {
        res.status === "succes" && form.current.reset();
        setError("");
        navigate(-1);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form
      ref={form}
      onSubmit={(e) => handleSubmit(e)}
      className="sign-container border-radius"
    >
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" required />

      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" required />

      {error !== "" && <p className="errorMessage"> {error} </p>}

      <input
        type="submit"
        value="Sign In"
        disabled={isLoading}
        className={isLoading ? "inactive" : "active"}
      />
    </form>
  );
};

export default SignIn;
