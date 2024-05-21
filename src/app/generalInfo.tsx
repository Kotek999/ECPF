import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text, Heading } from "native-base";
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
            marginBottom: 20,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            width: screenWidth,
            height: 60,
            backgroundColor: "#ff1744",
          }}
        >
          <Heading textAlign="center" fontSize="2xl" color="white">
            Informacje Ogólne
          </Heading>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: insets.bottom + 60,
          }}
        >
          <View
            style={{
              marginHorizontal: 5,
              marginVertical: 5,
              padding: 20,
              backgroundColor: "#363636",
              borderRadius: 8,
              elevation: 3,
              width: screenWidth - 25,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                Forma
              </Text>
            </View>

            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  color="gray.200"
                  style={{ flex: 1, fontSize: 16, marginBottom: 5 }}
                >
                  Numer:
                </Text>
                <Text
                  color="gray.200"
                  style={{
                    flex: 1,
                    textAlign: "right",
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  {params.field1}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  color="gray.200"
                  style={{ flex: 1, fontSize: 16, marginBottom: 5 }}
                >
                  Waga:
                </Text>
                <Text
                  color="gray.200"
                  style={{
                    flex: 1,
                    textAlign: "right",
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  {params.field2}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  color="gray.200"
                  style={{ flex: 1, fontSize: 16, marginBottom: 5 }}
                >
                  Właściciel:
                </Text>
                <Text
                  color="gray.200"
                  style={{
                    flex: 1,
                    textAlign: "right",
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  {params.field3}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 5,
              marginVertical: 5,
              padding: 20,
              backgroundColor: "#363636",
              borderRadius: 8,
              elevation: 3,
              width: screenWidth - 25,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                Pracownik
              </Text>
            </View>

            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  color="gray.200"
                  style={{ flex: 1, fontSize: 16, marginBottom: 5 }}
                >
                  Numer:
                </Text>
                <Text
                  color="gray.200"
                  style={{
                    flex: 1,
                    textAlign: "right",
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  {params.field4}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  color="gray.200"
                  style={{ flex: 1, fontSize: 16, marginBottom: 5 }}
                >
                  Zmiana:
                </Text>
                <Text
                  color="gray.200"
                  style={{
                    flex: 1,
                    textAlign: "right",
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  {params.selectedValue}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  color="gray.200"
                  style={{ flex: 1, fontSize: 16, marginBottom: 5 }}
                >
                  Data:
                </Text>
                <Text
                  color="gray.200"
                  style={{
                    flex: 1,
                    textAlign: "right",
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  {aktualnaData()}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <TouchableOpacity
            style={{
              width: screenWidth / 2,
              backgroundColor: "#ff1744",
              borderRadius: 5,
              padding: 10,
              alignItems: "center",
              alignContent: "center",
            }}
            onPress={() => router.navigate("/activitiesInfo")}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Zatwierdź
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#ff1744" />
    </View>
  );
}
