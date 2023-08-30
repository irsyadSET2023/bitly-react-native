import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

const Home = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Home</Text>
      <View style={{ gap: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            width: 100,
          }}
          onPress={() => navigate("Register")}
        >
          <Text style={{ color: "white" }}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            width: 100,
          }}
          onPress={() => navigate("Login")}
        >
          <Text style={{ color: "white" }}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
