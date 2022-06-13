import { react, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { loginUser, useAuthDispatch } from "../../context/AuthContext/index";
import { StyleSheet } from "react-native";

const LoginForm = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigation = useNavigation();
  const dispatch = useAuthDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await loginUser(dispatch, state);
    console.log(res);
    if (res !== undefined && res !== null) {
      console.log("Success");
      navigation.navigate("Home");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          placeholder="Enter email"
          value={state.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          name="password"
          type="password"
          placeholder="Enter password"
          value={state.password}
          onChange={handleChange}
          required
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "silver",
  },
  buttonsContainer: {
    position: "absolute",
    top: 100,
    padding: 20,
  },
});
