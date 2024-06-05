import React from "react";
import { View, Text } from "native-base";
import { InfoMessageProps } from "../../../types";
import { screenWidth } from "../../../helpers/dimensions";

export const InfoMessage = (props: InfoMessageProps) => {
  return (
    <View
      style={{
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <Text
        color="trueGray.400"
        fontSize="sm"
        letterSpacing={0.8}
        fontWeight="semibold"
      >
        {props.title}
      </Text>
    </View>
  );
};
