import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "native-base";
import { screenWidth } from "../../../helpers/dimensions";
import { ButtonProps } from "../../../types";

export const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        width: screenWidth / props.divideValue,
        backgroundColor: "#ff1744",
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
        alignContent: "center",
      }}
      onPress={props.onPress}
    >
      <Text
        style={{
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
