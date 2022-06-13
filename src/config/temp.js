import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import routes from "./routes";
import AppRoute from "./appRoute";
import { useAuthState } from "../context/AuthContext/context";
import Login from "../pages/Auth/login";
import Register from "../pages/Auth/register";
import Welcome from "../pages/welcome";

const Stack = createNativeStackNavigator();

const Temp = () => {
  const userDetails = useAuthState();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          {Boolean(userDetails.token) ? (
            routes.map((route) => (
              <Stack.Screen
                name={route.name}
                children={() => (
                  <AppRoute
                    Component={route.element}
                    isPrivate={route.isPrivate}
                  />
                )}
              />
            ))
          ) : (
            <>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Temp;
