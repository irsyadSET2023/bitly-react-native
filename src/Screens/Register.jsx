import React, { useState } from "react";
import {
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../Components/Input";
import { useForm, Controller } from "react-hook-form";
import { registerUser } from "../utils/api";

const Register = () => {
  const [fetchState, setFetchState] = useState("pending");

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const newUser = await registerUser({
        user_name: data.username,
        email: data.email,
        password: data.password,
      });
      console.log(newUser);
      setFetchState("success");
    } catch (error) {
      console.log(error);
    }
  };

  const onError = (errors, e) => {
    return console.log(errors);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {fetchState === "pending" && (
        <>
          <Text>Register</Text>
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
                  label="Email"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="email"
              rules={{ required: "Email is required" }}
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Username"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="username"
              rules={{ required: "Required" }}
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
                <Text style={{ color: "white" }}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
      {fetchState === "success" && (
        <View>
          <Text>Success Register</Text>
        </View>
      )}
      {/* <Text>Register</Text>
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
              label="Email"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="email"
          rules={{ required: "Email is required" }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Username"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="username"
          rules={{ required: "Required" }}
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
            <Text style={{ color: "white" }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </SafeAreaView>
  );
};

export default Register;
