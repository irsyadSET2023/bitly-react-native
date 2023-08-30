import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../Screens/Dashboard";
import Links from "../Screens/Links";
import Account from "../Screens/Account";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const AuthNavigator = () => {
  const { Navigator, Screen } = createBottomTabNavigator();

  return (
    <Navigator>
      <Screen
        name="Analytics"
        options={{
          tabBarLabel: "Analytics",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="desktop-mac-dashboard"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
        component={Dashboard}
      ></Screen>
      <Screen
        name="Links"
        options={{
          tabBarLabel: "Links",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="link" color={color} size={size} />
          ),
          headerShown: false,
        }}
        component={Links}
      ></Screen>
      <Screen
        name="Account"
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown: false,
        }}
        component={Account}
      ></Screen>
    </Navigator>
  );
};
