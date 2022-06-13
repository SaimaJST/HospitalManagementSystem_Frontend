import { React, useState } from "react";
import { View } from "react-native";
import { updateUser } from "../../services/userService";
import { useNavigation } from "@react-navigation/native";

const ProfileForm = ({ user }) => {
  const [state, setState] = useState({
    userid: user._id,
    name: user.name != null ? user.name : "",
    gender: user.gender != null ? user.gender : "",
    email: user.email != null ? user.email : "",
    contact: user.contact != null ? user.contact : "",
    address: user.address != null ? user.address : "",
  });

  const navigation = useNavigation();

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SoA:: ", state);
    const res = await updateUser(user._id, state);
    console.log(res);
    navigation.navigate("Profile");
  };

  console.log("SoA-> ", user);

  return (
    <View>
      <h1>Profile Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Full Name:</label>
        <input
          name="name"
          type="text"
          placeholder=""
          value={state.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="gender">Gender:</label>
        <input
          name="gender"
          type="gender"
          placeholder=""
          value={state.gender}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          placeholder=""
          value={state.email}
          onChange={handleChange}
        />
        <label htmlFor="contact">Contact:</label>
        <input
          name="contact"
          type="text"
          placeholder="Enter contact"
          value={state.contact}
          onChange={handleChange}
        />
        <label htmlFor="address">Address:</label>
        <input
          name="address"
          type="text"
          placeholder="Enter address"
          value={state.address}
          onChange={handleChange}
        />
        <button>Edit Profile</button>
      </form>
    </View>
  );
};

export default ProfileForm;

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
