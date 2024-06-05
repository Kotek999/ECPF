import React from "react";
import { View, Heading } from "native-base";
import { StyleSheet } from "react-native";
import { screenWidth } from "../../../helpers/dimensions";
import { HeaderProps } from "../../../types";

export const Header = (props: HeaderProps) => {
  return (
    <View style={styles.container}>
      <Heading
        textAlign="center"
        fontSize="2xl"
        color="white"
        letterSpacing={1.2}
        fontWeight="semibold"
      >
        {props.screenTitle}
      </Heading>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: screenWidth,
    height: 60,
    backgroundColor: "#ff1744",
  },
});
