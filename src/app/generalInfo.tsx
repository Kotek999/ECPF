import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text, Heading, Spinner } from "native-base";
import { useRouter, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { screenHeight, screenWidth } from "../helpers/dimensions";

export default function GeneralInfo() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const params = useLocalSearchParams<{
    field1?: string;
    field2?: string;
    field3?: string;
    field4?: string;

    selectedValue?: string;
  }>();

  const aktualnaData = () => {
    const data = new Date();
    const dzien = data.getDate();
    const miesiac = data.getMonth() + 1;
    const rok = data.getFullYear();

    const dzienString = dzien < 10 ? `0${dzien}` : `${dzien}`;
    const miesiacString = miesiac < 10 ? `0${miesiac}` : `${miesiac}`;

    const dataString = `${dzienString}.${miesiacString}.${rok}`;

    return <Text>{dataString}</Text>;
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "#262626",
      }}
    >
      <Spinner size="lg" color="red.500" />
    </View>
  );
}
