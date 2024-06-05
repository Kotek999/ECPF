import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "native-base";
import { ChildProps as AreaContainerProps } from "../../../types";

export const AreaContainer = (props: AreaContainerProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        ...styles.mainContainer,
        marginTop: insets.top + 40,
        paddingBottom: insets.bottom + 60,
      }}
    >
      <View style={styles.container}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  container: {
    alignItems: "center",
  },
});
