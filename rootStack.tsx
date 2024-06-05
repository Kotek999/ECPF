import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { Stack } from "expo-router";
import { store } from "./store";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

export default function RootStack() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#262626" }}>
      <Provider store={store}>
        <SafeAreaProvider>
          <NativeBaseProvider>
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  contentStyle: { backgroundColor: "#262626" },
                  animation: "fade",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="formInfo"
                options={{ animation: "fade", headerShown: false }}
              />
              <Stack.Screen
                name="employeeInfo"
                options={{ animation: "fade", headerShown: false }}
              />
              {/* <Stack.Screen
                name="generalInfo"
                options={{ headerShown: false }}
              /> */}
              <Stack.Screen
                name="activitiesInfo"
                options={{ animation: "fade", headerShown: false }}
              />
            </Stack>
          </NativeBaseProvider>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
