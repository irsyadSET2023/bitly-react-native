import React from "react";
import { View, Text, TextInput } from "react-native";

const Input = ({ label = "Input", ...rest }) => {
  return (
    <View style={{ width: "100%" }}>
      <Text>{label}</Text>
      <TextInput
        {...rest}
        style={{ height: 40, borderWidth: 1, padding: 10, width: "100%" }}
      ></TextInput>
    </View>
  );
};

export default Input;
