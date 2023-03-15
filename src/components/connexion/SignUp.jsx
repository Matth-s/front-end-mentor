import { useRef, useState } from "react";
import { createUser } from "../../feature/firebase-feature";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const form = useRef();
  const isAlreadyAuthenticated = useSelector(
    (state) => state.user.isAuthenticated
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (isAlreadyAuthenticated) {
      setError("You are already connected");
      return false;
    }

    const name = form.current.name.value.trim();
    const username = form.current.username.value.trim();
    const email = form.current.email.value.trim();
    const password = form.current.password.value.trim();
    const confirmPassword = form.current.confirmPassword.value.trim();

    if (password !== confirmPassword) {
      setError("Password don't match");
      setIsLoading(false);
      return false;
    }

    if (username.includes(" ")) {
      setError("Username cannot contain spaces");
      setIsLoading(false);
      return false;
    }

    if (username.length < 4) {
      setError("The username must contain at least 4 characters");
      setIsLoading(false);
      return false;
    }

    const userInfo = {
      name,
      username,
      email,
      password,
    };

    dispatch(createUser(userInfo))
      .unwrap()
      .then((res) => res.status === "success" && navigate(-1))
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
      <label htmlFor="name">Full name</label>
      <input type="text" name="name" id="name" required />

      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" required />

      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" required />

      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" required />

      <label htmlFor="confirmPassword">Confirm password</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        required
      />

      {error !== "" && <p className="errorMessage">{error}</p>}

      <input
        type="submit"
        value="Sign Up"
        disabled={isLoading}
        className={isLoading ? "inactive" : "active"}
      />
    </form>
  );
};

export default SignUp;
