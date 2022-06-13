import {
  logout,
  useAuthDispatch,
  useAuthState,
} from "../context/AuthContext/index";
import { StyleSheet } from "react-native";
import DashboardUser from "./patient/dashboard";

const Home = () => {
  const dispatch = useAuthDispatch();
  const { user } = useAuthState();

  return <DashboardUser />;
};

export default Home;
