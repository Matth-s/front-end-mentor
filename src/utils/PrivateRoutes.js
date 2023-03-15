import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const userAuth = useSelector((state) => state.user.isAuthenticated);

  return userAuth ? <Outlet /> : <Navigate to="/account" />;
};

export default PrivateRoutes;
