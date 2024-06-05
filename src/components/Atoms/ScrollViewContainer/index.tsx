import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "native-base";
import { StatusBar } from "expo-status-bar";
import { screenWidth, screenHeight } from "../../../helpers/dimensions";
import { ChildProps as ScrollViewContainerProps } from "../../../types";

export const ScrollViewContainer = (props: ScrollViewContainerProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        ...styles.container,
        marginTop: insets.top,
      }}
    >
      <ScrollView
        style={{
          ...styles.scrollView,
          marginBottom: insets.bottom + screenHeight / 40,
        }}
        contentContainerStyle={styles.scrollViewContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {props.children}
      </ScrollView>
      <StatusBar style="light" backgroundColor="#ff1744" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#262626",
  },
  scrollView: {
    width: screenWidth,
    height: screenHeight,
  },
  scrollViewContentContainer: {
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: "transparent",
  },
});
