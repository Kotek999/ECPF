import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

export const Spinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ff1744" />
      <Text style={styles.value}>Wczytywanie...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#262626",
  },
  value: {
    margin: 12,
    color: "white",
    fontSize: 16,
    lineHeight: 25,
    letterSpacing: 0.5,
  },
});
