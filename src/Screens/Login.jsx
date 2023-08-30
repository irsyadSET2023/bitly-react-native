import React, { useContext, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Input from "../Components/Input";
import { useForm, Controller } from "react-hook-form";
import { loginUser } from "../utils/api";
import { AuthContext } from "../Context/AuthContext";
// import { AuthContext } from "../../App";

const Login = () => {
  const [fetchState, setFetchState] = useState("pending");
  const [data, setData] = useState({});
  const { setJwt } = useContext(AuthContext);

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const user = await loginUser({
        identifier: data.identifier,
        password: data.password,
      });
      console.log(user);
      setData(user.data.jwt);
      setJwt(user.data.jwt);
      setFetchState("success");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {fetchState === "pending" && (
        <>
          <Text>Login</Text>
          <View
            style={{
              flex: 1,
              width: "100%",
              alignItems: "start",
              padding: 10,
              gap: 10,
            }}
          >
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Identifier"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="identifier"
              rules={{ required: "identifier is required" }}
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Password"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="password"
              rules={{ required: "Password is required" }}
            />
            <View
              style={{
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "black",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "80%",
                }}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={{ color: "white" }}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
      {fetchState === "success" && (
        <View>
          <Text>Success Login {JSON.stringify(data)}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Login;
