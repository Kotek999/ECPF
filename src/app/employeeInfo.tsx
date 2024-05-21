import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text, Heading, Input, Checkbox } from "native-base";
import { useLocalSearchParams, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { screenHeight, screenWidth } from "../helpers/dimensions";

export default function EmployeeInfo() {
  const insets = useSafeAreaInsets();

  const params = useLocalSearchParams<{
    field1?: string;
    field2?: string;
    field3?: string;
    field4?: string;

    selectedValue?: string;
  }>();
  const handleChange = (fieldName: string, value: string) => {
    router.setParams({ ...params, [fieldName]: value });
  };

  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const timeChange = (value: string) => {
    router.setParams({ selectedValue: value });
  };

  const handleCheckboxChange = (value: string) => {
    setSelectedValue((prevValue) => (prevValue !== value ? value : null));
    timeChange(value);
  };

  const times = ["6:00", "14:00", "22:00"];

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
            Dane Pracownika
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
              Proszę podać informacje dotyczące pracownika:
            </Text>
            <Text marginBottom="2" fontSize="xl" color="trueGray.200">
              Numer Id Pracownika:
            </Text>
            <Input
              borderRadius={10}
              bg="white"
              fontSize="md"
              h={12}
              _focus={{
                bg: "white",
                borderWidth: 0,
                borderColor: "transparent",
              }}
              placeholder="numer id"
              marginBottom="5"
              value={params.field4 || ""}
              onChangeText={(value) => handleChange("field4", value)}
            />
            <Text marginBottom="2" fontSize="xl" color="trueGray.200">
              Zmiana:
            </Text>
            {times.map((time, index) => (
              <Checkbox
                key={index}
                colorScheme="green"
                my={2}
                value={params.selectedValue || ""}
                isChecked={selectedValue === time}
                onChange={() => handleCheckboxChange(time)}
              >
                <Text color="trueGray.200" fontSize="sm">
                  {time}
                </Text>
              </Checkbox>
            ))}
          </View>
        </View>
        <View style={{ marginTop: 40, alignItems: "center" }}>
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
                `/generalInfo?field1=${params.field1 || ""}&field2=${
                  params.field2 || ""
                }&field3=${params.field3 || ""}&field4=${
                  params.field4 || ""
                }&selectedValue=${params.selectedValue || ""}`
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
