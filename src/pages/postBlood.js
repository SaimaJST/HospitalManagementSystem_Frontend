import React, { useState, useEffect, Component } from "react";
import { Searchbar } from "react-native-paper";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Vibration,
  TextInput,
  Button,
} from "react-native";
import { useAuthState } from "../context/AuthContext";
import { postBlood } from "../services/postService";
import { useNavigation } from "@react-navigation/native";

const PostBlood = () => {
  const [state, setState] = useState({
    bloodtype: "",
    text: "",
    contact: "",
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
    const res = await postBlood(state);
    console.log(res);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Blood Type."
          onChangeText={(value) => setState({ ...state, ["bloodtype"]: value })}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Text.."
          onChangeText={(value) => setState({ ...state, ["text"]: value })}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Contact No."
          onChangeText={(value) => setState({ ...state, ["contact"]: value })}
        />
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.postbtn}>
        <Text>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 150,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },

  inputView: {
    backgroundColor: "#F5FCFF",
    borderRadius: 5,
    width: "100%",
    height: 50,
    marginBottom: 20,
    alignItems: "left",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  postbtn: {
    width: "50%",
    borderRadius: 5,
    height: 30,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "cornflowerblue",
  },
  btn: {
    backgroundColor: "skyblue",
    height: 40,
    color: "#fff",
    justifyContent: "center",
    alignItems: "centre",
  },
});

export default PostBlood;
