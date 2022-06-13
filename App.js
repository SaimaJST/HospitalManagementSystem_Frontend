import react from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/pages/Auth/login";
import { AuthProvider } from "./src/context/AuthContext/context";
import Temp from "./src/config/temp";

export default function App() {
  return (
    <View>
      <AuthProvider>
        <Temp />
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
