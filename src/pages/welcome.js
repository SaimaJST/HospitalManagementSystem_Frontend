import React from "react";
import { Button, View, Text, Image } from "react-native";
import { ImageBackground, StyleSheet } from "react-native";
import TypeWriterEffect from "react-typewriter-effect";
import AllButton from "../components/Auth/Allbutton";
import Login from "./Auth/login";
import Register from "./Auth/register";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.background}>
      <TypeWriterEffect
        textStyle={{
          position: "absolute",
          left: 55,
          top: 30,
          alignItems: "center",
          color: "#B22222",
          fontWeight: 500,
          fontSize: 25,
        }}
        startDelay={1000}
        cursorColor="black"
        multiText={["Let's Get Started...", "Medical Information System!"]}
        loop={true}
        nextTextDelay={500}
        typeSpeed={70}
        hideCursorAfterText={true}
      />

      <View style={styles.buttonsContainer}>
        <AllButton
          title="Login"
          onPress={() => navigation.navigate("Login")}
          color="fourth"
        />
        <AllButton
          title="Register"
          onPress={() => navigation.navigate("Home")}
          color="third"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    position: "absolute",
    top: 150,
    padding: 20,
  },
});

export default Welcome;
