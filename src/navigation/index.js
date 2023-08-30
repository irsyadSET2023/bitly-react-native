import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useEffect } from "react";
import Register from "../Screens/Register";
import Login from "../Screens/Login";
import Dashboard from "../Screens/Dashboard";
import Home from "../Screens/Home";
import { getValueKey, setValueKey } from "../utils/helper/secureStore";
import { AuthContext } from "../Context/AuthContext";
import { AuthNavigator } from "./AuthNavigator";

const AppNavigator = () => {
  const { Navigator, Screen } = createNativeStackNavigator();
  const { jwt, setJwt } = useContext(AuthContext);

  const fetchSecureStore = async () => {
    try {
      const jwtSecureStore = await getValueKey("jwt");
      setJwt(jwtSecureStore);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (jwt) {
      //setValueKey JWT in secure store
      setValueKey("jwt", jwt);
    }
    // getValueKey("jwt");
  }, [jwt]);

  useEffect(() => {
    if (!jwt) {
      fetchSecureStore();
    }
  }, []);

  console.log(jwt);
  return (
    <NavigationContainer>
      <Navigator>
        {jwt ? (
          <Screen
            name="AuthStack"
            options={{ headerShown: false }}
            component={AuthNavigator}
          />
        ) : (
          <>
            <Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
