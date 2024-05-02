import React from "react";
import { Link } from "expo-router";
import { View, Text, Heading } from "native-base";

export default function Welcome() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Heading>It's Welcome screen</Heading>
      <Link href="/home">
        <Text fontSize="lg">Go to home</Text>
      </Link>
    </View>
  );
}
