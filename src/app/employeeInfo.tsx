import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text, Heading, Input, Radio } from "native-base";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { screenHeight, screenWidth } from "../helpers/dimensions";

export default function EmployeeInfo() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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
              width={screenWidth / 1.5}
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
            />
            <Text marginBottom="2" fontSize="xl" color="trueGray.200">
              Zmiana:
            </Text>
            <Radio.Group
              defaultValue="0"
              name="exampleGroup"
              accessibilityLabel="favorite colorscheme"
            >
              <Radio colorScheme="emerald" value="1" my={2}>
                <Text color="trueGray.200" fontSize="sm">
                  6:00
                </Text>
              </Radio>
              <Radio colorScheme="emerald" value="2" my={2}>
                <Text color="trueGray.200" fontSize="sm">
                  14:00
                </Text>
              </Radio>
              <Radio colorScheme="emerald" value="3" my={2}>
                <Text color="trueGray.200" fontSize="sm">
                  22:00
                </Text>
              </Radio>
            </Radio.Group>
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
            onPress={() => router.navigate("/generalInfo")}
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
