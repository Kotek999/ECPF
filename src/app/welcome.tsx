import React from "react";
import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function Welcome() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>It's Welcome screen</Text>
      <Link href="/home">Go to home</Link>
    </View>
  );
}
