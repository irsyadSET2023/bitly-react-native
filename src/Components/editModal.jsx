import React, { useContext, useState } from "react";
import { Text, Touchable, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Input from "./Input";
import { AuthContext } from "../Context/AuthContext";
import { deleteLink, editLink, redirectLink } from "../utils/api";
import Web from "../Screens/Web";

const EditModal = ({ setShow, slug }) => {
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
    console.log(data);
    try {
      const editedLink = await editLink(jwt, {
        link: data.link,
        slug: slug,
      });
      console.log(editedLink);
      setShow(false);
    } catch (error) {
      console.log(error);
      setShow(false);
    }
  };

  const cancel = () => {
    setShow(false);
  };

  const deleteSelectedLink = async () => {
    console.log("delete");
    try {
      const res = await deleteLink(jwt, { slug: slug });
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setShow(false);
    }
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
        <Text>Insert New Link</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Update Your Link"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="link"
          rules={{ required: "Link is required to update" }}
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
          <Text style={{ color: "white" }}>Update Link</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
          }}
          onPress={deleteSelectedLink}
        >
          <Text style={{ color: "white" }}>Delete</Text>
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
          <Text style={{ color: "white" }}>Redirect to this page</Text>
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

export default EditModal;
