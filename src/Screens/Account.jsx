import React, { useContext } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../Context/AuthContext";
import { setValueKey } from "../utils/helper/secureStore";

const Account = () => {
  const { setJwt } = useContext(AuthContext);
  const handleLogout = async () => {
    setJwt("");
    await setValueKey("jwt", "");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          width: 100,
        }}
        onPress={handleLogout}
      >
        <Text style={{ color: "white" }}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Account;
