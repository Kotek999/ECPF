import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text, Heading, Input } from "native-base";
import { useLocalSearchParams, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { screenHeight, screenWidth } from "../helpers/dimensions";

export default function FormInfo() {
  const insets = useSafeAreaInsets();

  const params = useLocalSearchParams<{
    field1?: string;
    field2?: string;
    field3?: string;
  }>();

  const handleChange = (fieldName: string, value: string) => {
    router.setParams({ ...params, [fieldName]: value });
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: insets.top,
        justifyContent: "flex-start",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "#262626",
      }}
    >
      <ScrollView
        style={{
          width: screenWidth,
          height: screenHeight,
          marginBottom: insets.bottom + screenHeight / 40,
        }}
        contentContainerStyle={{
          alignItems: "center",
          flexGrow: 1,
          backgroundColor: "transparent",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            width: screenWidth,
            height: 60,
            backgroundColor: "#ff1744",
          }}
        >
          <Heading textAlign="center" fontSize="2xl" color="white">
            Dane Formy
          </Heading>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            marginTop: insets.top + 40,
            paddingBottom: insets.bottom + 60,
          }}
        >
          <View>
            <Text
              color="trueGray.400"
              fontSize="sm"
              style={{ marginBottom: 20 }}
            >
              Proszę podać informacje dotyczące formy:
            </Text>
            <Text marginBottom="4" fontSize="xl" color="trueGray.200">
              Numer:
            </Text>
            <Input
              borderRadius={10}
              bg="white"
              marginBottom="5"
              fontSize="md"
              h={12}
              _focus={{
                bg: "white",
                borderWidth: 0,
                borderColor: "transparent",
              }}
              placeholder="numer"
              value={params.field1 || ""}
              onChangeText={(value) => handleChange("field1", value)}
            />
            <Text marginBottom="4" fontSize="xl" color="trueGray.200">
              Waga:
            </Text>
            <Input
              borderRadius={10}
              bg="white"
              marginBottom="5"
              fontSize="md"
              h={12}
              _focus={{
                bg: "white",
                borderWidth: 0,
                borderColor: "transparent",
              }}
              placeholder="waga"
              value={params.field2 || ""}
              onChangeText={(value) => handleChange("field2", value)}
            />
            <Text marginBottom="4" fontSize="xl" color="trueGray.200">
              Właściciel:
            </Text>
            <Input
              borderRadius={10}
              bg="white"
              marginBottom="5"
              fontSize="md"
              h={12}
              _focus={{
                bg: "white",
                borderWidth: 0,
                borderColor: "transparent",
              }}
              placeholder="właściciel"
              value={params.field3 || ""}
              onChangeText={(value) => handleChange("field3", value)}
            />
          </View>
        </View>
        <View style={{ marginTop: 0, alignItems: "center" }}>
          <TouchableOpacity
            style={{
              width: screenWidth / 2,
              backgroundColor: "#ff1744",
              borderRadius: 5,
              padding: 10,
              alignItems: "center",
              alignContent: "center",
            }}
            onPress={() =>
              router.navigate(
                `/employeeInfo?field1=${params.field1 || ""}&field2=${
                  params.field2 || ""
                }&field3=${params.field3 || ""}`
              )
            }
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Dalej
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#ff1744" />
    </View>
  );
}
