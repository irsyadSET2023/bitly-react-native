import React, { useContext } from "react";
import { Text, Touchable, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { addLink } from "../utils/api";
import Input from "./Input";
import { AuthContext } from "../Context/AuthContext";

const Modal = ({ setShow }) => {
  const { jwt } = useContext(AuthContext);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log("hai");
    console.log(data);
    try {
      const newLink = await addLink(jwt, {
        link: data.link,
      });
      console.log(newLink);
      setShow(false);
    } catch (error) {
      console.log(error);
      setShow(false);
    }
  };

  const cancel = () => {
    setShow(false);
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "start",
          padding: 10,
          gap: 10,
          marginTop: 50,
        }}
      >
        <Text>Add New Link</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="New Link"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="link"
          rules={{ required: "Link is required" }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
          }}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={{ color: "white" }}>Add Link</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
          }}
          onPress={cancel}
        >
          <Text style={{ color: "white" }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Modal;
