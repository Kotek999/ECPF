import React, { useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  Text,
  Heading,
  Divider,
  Checkbox,
  Box,
  Select,
  PresenceTransition,
  Icon,
} from "native-base";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import { screenHeight, screenWidth } from "../helpers/dimensions";

export default function ActivitiesInfo() {
  const insets = useSafeAreaInsets();

  type Task = {
    id: number;
    name: string;
    serialNumber: string;
    originalTime: string;
    elapsedTime: number;
  };

  const [tasks, setTasks] = useState<Task[]>([]);

  const [selectedTask, setSelectedTask] = useState<string>("");

  const [isTimeRunning, setIsTimeRunning] = useState<boolean[]>([]);
  const [intervalIds, setIntervalIds] = useState<NodeJS.Timeout[]>([]);

  const [showTotalTime, setShowTotalTime] = useState<boolean>(false);

  const [isSelectedActivity, setIsSelectedActivity] = useState<boolean>(false);

  const availableTasks: string[] = [
    "Task 1",
    "Task 2",
    "Task 3",
    "Task 4",
    "Task 5",
    "Task 6",
  ];

  const addTask = () => {
    if (selectedTask.trim() === "") {
      setIsSelectedActivity(true);
      return;
    }

    if (tasks.length > 0) {
      clearInterval(intervalIds[tasks.length - 1]);
      setIsTimeRunning((prev) =>
        prev.map((value, index) => (index === tasks.length - 1 ? false : value))
      );
    }

    const newTask: Task = {
      id: Date.now(),
      name: selectedTask,
      serialNumber: "123",
      originalTime: "0s",
      elapsedTime: 0,
    };

    setTasks([...tasks, newTask]);
    setSelectedTask("");
    setIsTimeRunning((prev) => [...prev, true]);
    setIntervalIds((prev) => [
      ...prev,
      setInterval(() => updateElapsedTime(tasks.length), 1000),
    ]);
  };

  const toggleTimeRunning = (index: number) => {
    setIsTimeRunning((prev) =>
      prev.map((value, i) => (i === index ? !value : value))
    );

    if (!isTimeRunning[index]) {
      const intervalId = setInterval(() => updateElapsedTime(index), 1000);
      setIntervalIds((prevIds) => [
        ...prevIds.slice(0, index),
        intervalId,
        ...prevIds.slice(index + 1),
      ]);
    } else {
      clearInterval(intervalIds[index]);
    }
  };

  const updateElapsedTime = (index: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) => {
        if (i === index) {
          let { elapsedTime } = task;
          elapsedTime++;

          let updatedTask = { ...task, elapsedTime };

          if (elapsedTime >= 60 && elapsedTime % 60 === 0) {
            updatedTask = {
              ...updatedTask,
              originalTime: `${Math.floor(elapsedTime / 60)}m 0s`,
            };
          }

          if (elapsedTime >= 3600 && elapsedTime % 3600 === 0) {
            updatedTask = {
              ...updatedTask,
              originalTime: `${Math.floor(elapsedTime / 3600)}g 0m 0s`,
            };
          }

          return updatedTask;
        }
        return task;
      })
    );
  };

  const formatElapsedTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    if (hours > 0) {
      return `${hours}g ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const calculateTotalTime = () => {
    let totalSeconds = 0;
    tasks.forEach((task) => {
      totalSeconds += task.elapsedTime;
    });
    return formatElapsedTime(totalSeconds);
  };

  const handleShowTotalTime = () => {
    setShowTotalTime(true);
    setIsTimeRunning((prev) =>
      prev.map((value, index) => (index === tasks.length - 1 ? false : value))
    );
    clearInterval(intervalIds[tasks.length - 1]);
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: insets.top,
        justifyContent: "flex-start",
        alignItems: "center",
        alignContent: "center",
        // backgroundColor: "#2C3E50",
        backgroundColor: "#262626",
      }}
    >
      <ScrollView
        style={{
          width: screenWidth,
          height: screenHeight,
          marginBottom: insets.bottom + screenHeight / 14,
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
            Lista czynności i ich czas
          </Heading>
        </View>
        <View style={{ marginTop: 5, marginBottom: 5 }}>
          {tasks.length === 0 ? (
            <Text color="white" style={{ fontSize: 18 }}>
              Brak zadań do wykonania
            </Text>
          ) : (
            tasks.map((task, index) => (
              <View
                key={task.id}
                style={{
                  width: screenWidth - 30,
                  height: 70,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  backgroundColor: "#363636",
                  borderWidth: 1,
                  borderColor: "#262626",
                  borderRadius: 10,
                  padding: 10,
                  marginBottom: 10,
                }}
              >
                <Text color="white" style={{ fontSize: 18 }}>
                  {index + 1}. {task.name}
                </Text>
                <View
                  style={{
                    flex: 1,
                    marginLeft: 20,
                    alignItems: "flex-start",
                  }}
                >
                  <Checkbox
                    value={isTimeRunning[index] ? "unchecked" : "checked"}
                    onChange={() => toggleTimeRunning(index)}
                    colorScheme="green"
                    size="lg"
                    aria-label="Uruchom/zatrzymaj czas"
                    isChecked={!isTimeRunning[index]}
                  />
                </View>
                <Text color="white" style={{ fontSize: 18 }}>
                  {formatElapsedTime(task.elapsedTime)}
                </Text>
              </View>
            ))
          )}
        </View>

        <Divider
          h={0.5}
          my="4"
          w={screenWidth}
          _light={{
            bg: "gray.500",
          }}
        />

        {showTotalTime && (
          <PresenceTransition
            visible={showTotalTime}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 350,
              },
            }}
          >
            <View
              style={{
                marginTop: 10,
                marginBottom: 30,
                alignSelf: "flex-start",
              }}
            >
              <Heading size="md" color="white">
                Podsumowanie Pracy:
              </Heading>
            </View>

            <View
              style={{
                width: screenWidth - 30,
                height: 70,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                backgroundColor: "#363636",
                borderWidth: 1,
                borderColor: "#262626",
                borderRadius: 10,
                padding: 10,
                marginBottom: 10,
              }}
            >
              {/* <Text color="red.400" style={{ fontSize: 18 }}>
              coś...
            </Text> */}
              {/* <View
              style={{
                flex: 1,
                marginLeft: 20,
                alignItems: "flex-start",
              }}
            >
              <Text color="red.400" style={{ fontSize: 18 }}>
                coś...
              </Text>
            </View> */}
              {/* <Text color="red.400" style={{ fontSize: 18 }}>
          e29uie29e2iie2
        </Text> */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  color="white"
                  style={{ fontWeight: "bold", marginRight: 10 }}
                >
                  Czas ogólny:
                </Text>
                <Text style={{ color: "gold" }}>{calculateTotalTime()}</Text>
              </View>
            </View>
          </PresenceTransition>
        )}

        <Box
          width={screenWidth - 30}
          marginTop="8"
          marginBottom="4"
          backgroundColor="#363636"
        >
          <Select
            fontSize="xl"
            color="white"
            borderColor="transparent"
            selectedValue={selectedTask}
            accessibilityLabel="Wybierz czynność"
            placeholder="Wybierz czynność"
            onValueChange={(itemValue) => setSelectedTask(itemValue)}
          >
            {availableTasks.map((task, index) => (
              <Select.Item key={index} label={task} value={task} />
            ))}
          </Select>
        </Box>
        {isSelectedActivity && tasks.length === 0 && (
          <View style={{ flexDirection: "row" }}>
            <Icon
              as={<FontAwesome5 name="exclamation-circle" />}
              size={5}
              color="red.500"
            />
            <Text color="red.500" style={{ marginLeft: 8, fontSize: 16 }}>
              Nie dodano żadnej czynności z listy
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={{
            width: screenWidth / 1.5,
            backgroundColor: "#ff1744",
            borderRadius: 5,
            padding: 10,
            alignItems: "center",
            alignContent: "center",
            marginTop: 20,
          }}
          onPress={addTask}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Dodaj
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: screenWidth / 1.5,
            backgroundColor: tasks.length === 0 ? "gray" : "#ff1744",
            borderRadius: 5,
            padding: 10,
            alignItems: "center",
            alignContent: "center",
            marginTop: 20,
          }}
          onPress={handleShowTotalTime}
          disabled={tasks.length === 0}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Wyświetl podsumowanie
          </Text>
        </TouchableOpacity>
        <StatusBar style="light" backgroundColor="#ff1744" />
      </ScrollView>
    </View>
  );
}
