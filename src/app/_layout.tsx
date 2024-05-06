import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="formInfo" options={{ headerShown: false }} />
          <Stack.Screen name="employeeInfo" options={{ headerShown: false }} />
          <Stack.Screen name="generalInfo" options={{ headerShown: false }} />
          <Stack.Screen
            name="activitiesInfo"
            options={{ headerShown: false }}
          />
        </Stack>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
