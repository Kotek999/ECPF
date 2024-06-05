import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "native-base";
import { screenWidth } from "../../../helpers/dimensions";
import { TextInputsContainerProps } from "../../../types";

export const TextInputsContainer = (props: TextInputsContainerProps) => {
  return (
    <View style={styles.container}>
      <Text
        alignSelf="flex-start"
        marginBottom="4"
        fontSize="xl"
        color="gray.300"
        letterSpacing={0.8}
        fontWeight="medium"
      >
        {props.inputTitle}
      </Text>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth / 1.5,
    alignItems: "center",
  },
});
