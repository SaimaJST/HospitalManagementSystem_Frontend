import react from "react";
import { Button, View } from "react-native-web";
import RegisterForm from "../../components/Auth/registerForm";

const Register = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <h1>Registration Page</h1>
      <RegisterForm />
      <>
        <Button
          title="Goto Login"
          onPress={() => navigation.navigate("Login")}
        />
      </>
    </View>
  );
};

export default Register;
