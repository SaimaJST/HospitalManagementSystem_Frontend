import { useAuthState } from "../context/AuthContext/context";
import Login from "../pages/Auth/login";

const AppRoute = ({ Component, isPrivate, ...rest }) => {
  const userDetails = useAuthState();

  return isPrivate && !Boolean(userDetails.token) ? (
    <>
      <Login />
    </>
  ) : (
    <Component />
  );
};

export default AppRoute;
