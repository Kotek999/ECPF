import React from "react";
import { Stack } from "expo-router";
import { NativeBaseProvider } from "native-base";

export default function Layout() {
  return (
    <NativeBaseProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
    </NativeBaseProvider>
  );
}
