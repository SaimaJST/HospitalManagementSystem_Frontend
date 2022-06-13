import { React, useState } from "react";
import { StyleSheet } from "react-native";
import { Moment } from "react-moment";
import { Button } from "react-native-web";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { signupUser, useAuthDispatch } from "../../context/AuthContext/index";

const RegisterForm = () => {
  const [state, setState] = useState({
    name: "",
    gender: "",
    birthdate: "",
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
    console.log("SoA:: ", state);
    let res = await signupUser(dispatch, state);
    console.log(res);
    if (res !== undefined && res !== null) {
      console.log("Success");
      navigation.navigate("Home");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} color="gray">
        <label htmlFor="username">Full Name:</label>
        <input
          name="name"
          type="text"
          placeholder="Nuzat Tasnim"
          value={state.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="gender">Gender:</label>
        <input
          name="gender"
          type="gender"
          placeholder="Female"
          value={state.gender}
          onChange={handleChange}
          required
        />
        <label htmlFor="birthdate">BirthDate:</label>
        <input
          name="birthdate"
          type="date"
          placeholder="YYYY-MM-DD"
          value={state.birthdate}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          placeholder="example.gmail.com"
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
        <button>Register</button>
      </form>
    </>
  );
};

export default RegisterForm;

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
