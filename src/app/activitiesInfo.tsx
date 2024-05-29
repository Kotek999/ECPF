import React, { useState } from "react";
import { TouchableOpacity, ScrollView, TextInput } from "react-native";
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
import {
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { screenHeight, screenWidth } from "../helpers/dimensions";

export default function ActivitiesInfo() {
  const insets = useSafeAreaInsets();

  type TasksProps = {
    id: number;
    name: string;
  };

  type Task = TasksProps & {
    serialNumber: string;
    originalTime: string;
    elapsedTime: number;
    icon: string | null;
    text: string;
    submitted: boolean;
    locked: boolean;
  };

  const [tasks, setTasks] = useState<Task[]>([]);

  const [selectedTask, setSelectedTask] = useState<string>("");

  const [isTimeRunning, setIsTimeRunning] = useState<boolean[]>([]);
  const [intervalIds, setIntervalIds] = useState<NodeJS.Timeout[]>([]);

  const [showTotalTime, setShowTotalTime] = useState<boolean>(false);
  const [endTimes, setEndTimes] = useState<string[]>([]);

  const [activityFieldErrorMessage, setActivityFieldErrorMessage] =
    useState<string>("");
  const [commentFieldErrorMessage, setCommentFieldErrorMessage] =
    useState<string>("");

  type AvailableTasksData = TasksProps[];

  const testTasks: AvailableTasksData = [
    {
      id: 1,
      name: "Task 1",
    },
    {
      id: 2,
      name: "Task 2",
    },
    {
      id: 3,
      name: "Task 3",
    },
    {
      id: 4,
      name: "Task 4",
    },
    {
      id: 5,
      name: "Task 5",
    },
    {
      id: 6,
      name: "Task 6",
    },
    {
      id: 7,
      name: "Task 7",
    },
    {
      id: 8,
      name: "Task 8",
    },
    {
      id: 9,
      name: "Task 9",
    },
    {
      id: 10,
      name: "Task 10",
    },
    {
      id: 11,
      name: "Task 11",
    },
    {
      id: 12,
      name: "Task 12",
    },
    {
      id: 13,
      name: "Task 13",
    },
    {
      id: 14,
      name: "Task 14",
    },
    {
      id: 15,
      name: "Task 15",
    },
    {
      id: 16,
      name: "Task 16",
    },
    {
      id: 17,
      name: "Task 17",
    },
    {
      id: 18,
      name: "Task 18",
    },
    {
      id: 19,
      name: "Task 19",
    },
    {
      id: 20,
      name: "Task 20",
    },
    {
      id: 21,
      name: "Task 21",
    },
  ];

  const getCurrentTime = (): string => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const addTask = () => {
    if (!selectedTask) {
      setActivityFieldErrorMessage("Nie wybrano żadnej czynności z listy");
      return;
    }

    const selectedTaskObj: TasksProps = JSON.parse(selectedTask);

    if (tasks.length > 0) {
      clearInterval(intervalIds[tasks.length - 1]);
      const updatedEndTimes = [...endTimes];
      updatedEndTimes[tasks.length - 1] = getCurrentTime();
      setEndTimes(updatedEndTimes);
      setIsTimeRunning((prev) =>
        prev.map((value, index) => (index === tasks.length - 1 ? false : value))
      );
    }

    const newTask: Task = {
      ...selectedTaskObj,
      serialNumber: `Task-${tasks.length + 1}`,
      originalTime: getCurrentTime(),
      elapsedTime: 0,
      icon: null,
      text: "",
      submitted: false,
      locked: false,
    };

    setTasks([...tasks, newTask]);
    setSelectedTask("");
    setIsTimeRunning((prev) => [...prev, true]);
    setIntervalIds((prev) => [
      ...prev,
      setInterval(() => updateElapsedTime(tasks.length), 1000),
    ]);
    setActivityFieldErrorMessage("");
  };

  const handleIconPress = (taskId: number, icon: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              icon: icon === "dislike2" ? "dislike2" : icon,
              submitted: icon === "dislike2" ? false : task.submitted,
              text: icon === "dislike2" ? "" : task.text,
              locked: icon !== "dislike2",
            }
          : task
      )
    );
  };

  const handleTextChange = (taskId: number, text: string) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, text } : task))
    );
  };

  const handleSubmit = (taskId: number) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task?.text.trim() === "") {
      setCommentFieldErrorMessage("Pole tekstowe nie może być puste.");
    } else {
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, submitted: true, locked: true } : task
        )
      );
      setCommentFieldErrorMessage("");
    }
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
      const updatedEndTimes = [...endTimes];
      updatedEndTimes[index] = getCurrentTime();
      setEndTimes(updatedEndTimes);
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
      return `${hours} godz`;
    } else if (minutes > 0) {
      return `${minutes} min`;
    } else {
      return `${seconds} s`;
    }
  };

  const formatElapsedTimeWithSeconds = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    let formattedTime = "";

    if (hours > 0) {
      formattedTime += `${hours} ${
        hours === 1 ? "godzina" : hours < 5 ? "godziny" : "godzin"
      } `;
    }

    if (minutes > 0) {
      formattedTime += `${minutes} ${
        minutes === 1 ? "minuta" : minutes < 5 ? "minuty" : "minut"
      } `;
    }

    if (seconds > 0 || (hours === 0 && minutes === 0)) {
      formattedTime += `${seconds} ${
        seconds === 1
          ? "sekunda"
          : seconds % 10 >= 2 &&
            seconds % 10 <= 4 &&
            (seconds % 100 < 10 || seconds % 100 >= 20)
          ? "sekundy"
          : "sekund"
      }`;
    }

    return formattedTime.trim();
  };

  const calculateTotalTime = () => {
    let totalSeconds = 0;
    tasks.forEach((task) => {
      totalSeconds += task.elapsedTime;
    });
    return formatElapsedTimeWithSeconds(totalSeconds);
  };

  const handleShowTotalTime = () => {
    const currentTime = getCurrentTime();
    const updatedEndTimes = endTimes.map(() => currentTime);
    setEndTimes(updatedEndTimes);

    const lastTaskIndex = tasks.length - 1;
    if (lastTaskIndex >= 0) {
      const updatedEndTimesForLastTask = [...endTimes];
      updatedEndTimesForLastTask[lastTaskIndex] = currentTime;
      setEndTimes(updatedEndTimesForLastTask);
    }

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
        <View
          style={{
            width: screenWidth - 30,
            backgroundColor: "#363636",
            borderWidth: 1,
            borderColor: "#262626",
            borderRadius: 10,
            padding: 10,
            marginBottom: 8,
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 2,
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <Text
                color="gray.400"
                style={{
                  fontSize: 15,
                }}
              >
                L.P
              </Text>
            </View>
            <View style={{ flex: 5 }}>
              <Text
                color="gray.400"
                style={{
                  fontSize: 15,
                }}
              >
                Wykonane
              </Text>
            </View>
            <View style={{ flex: 4 }}>
              <Text color="gray.400" style={{ fontSize: 15 }}>
                Godzina
              </Text>
            </View>
            <View style={{ flex: 2, alignItems: "flex-end" }}>
              <Text color="gray.400" style={{ fontSize: 15 }}>
                Czas
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 5, marginBottom: 5 }}>
          {tasks.length === 0 ? (
            <Text color="white" style={{ fontSize: 18 }}>
              Brak zadań do wykonania
            </Text>
          ) : (
            <>
              {tasks.map((task, index) => (
                <View
                  key={task.id}
                  style={{
                    width: screenWidth - 30,
                    backgroundColor: "#363636",
                    borderWidth: 1,
                    borderColor: "#262626",
                    borderRadius: 10,
                    padding: 10,
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      marginTop: 5,
                      height: 25,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      backgroundColor: "transparent",
                    }}
                  >
                    <Text
                      color="gray.400"
                      style={{
                        textAlign: "left",
                        fontSize: 15,
                      }}
                    >
                      Przedmiot kontroli
                    </Text>
                    <Text
                      color="gray.400"
                      style={{
                        textAlign: "right",
                        fontSize: 15,
                      }}
                    >
                      {!task.icon && (
                        <>
                          <TouchableOpacity
                            onPress={() => handleIconPress(task.id, "like1")}
                          >
                            <Icon
                              style={{ marginRight: 10 }}
                              as={<AntDesign name="like2" />}
                              size={6}
                              color="green.500"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => handleIconPress(task.id, "dislike1")}
                          >
                            <Icon
                              style={{ marginRight: 10 }}
                              as={<AntDesign name="dislike2" />}
                              size={6}
                              color="red.500"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              handleIconPress(task.id, "minus-circle")
                            }
                          >
                            <Icon
                              as={
                                <MaterialCommunityIcons name="minus-circle-outline" />
                              }
                              size={6}
                              color="blue.500"
                            />
                          </TouchableOpacity>
                        </>
                      )}
                      {task.icon === "like1" && (
                        <TouchableOpacity
                          onPress={() => handleIconPress(task.id, "like1")}
                        >
                          <Icon
                            style={{ marginRight: 5 }}
                            as={<AntDesign name="like1" />}
                            size={6}
                            color="green.500"
                          />
                        </TouchableOpacity>
                      )}
                      {task.icon === "dislike1" && (
                        <TouchableOpacity
                          onPress={() => handleIconPress(task.id, "dislike1")}
                        >
                          <Icon
                            style={{ marginRight: 5 }}
                            as={<AntDesign name="dislike1" />}
                            size={6}
                            color="red.500"
                          />
                        </TouchableOpacity>
                      )}
                      {task.icon === "minus-circle" && (
                        <TouchableOpacity
                          onPress={() =>
                            handleIconPress(task.id, "minus-circle")
                          }
                        >
                          <Icon
                            style={{ marginRight: 5 }}
                            as={<MaterialCommunityIcons name="minus-circle" />}
                            size={6}
                            color="blue.500"
                          />
                        </TouchableOpacity>
                      )}
                    </Text>
                  </View>
                  <Text
                    color="white"
                    style={{
                      alignSelf: "flex-start",
                      textAlign: "left",
                      marginTop: 10,
                      marginBottom: 0,
                      fontSize: 16,
                    }}
                  >
                    {task.name}
                  </Text>
                  {task.icon === "dislike1" ? (
                    <Text
                      color="gray.400"
                      style={{
                        fontSize: 15,
                        marginTop: 10,
                        marginBottom: 5,
                      }}
                    >
                      Uwagi
                    </Text>
                  ) : null}
                  {task.icon === "dislike1" && !task.submitted && (
                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <TextInput
                          placeholderTextColor="gray"
                          style={{
                            width: screenWidth / 1.4,
                            backgroundColor: "#363636",
                            color: "white",
                            borderColor:
                              commentFieldErrorMessage !== "" ? "red" : "gray",
                            borderWidth: 0.6,
                            marginBottom: 0,
                            paddingHorizontal: 5,
                            borderRadius: 5,
                          }}
                          placeholder="Wpisz uwagę"
                          value={task.text}
                          onChangeText={(text) =>
                            handleTextChange(task.id, text)
                          }
                        />
                        <TouchableOpacity onPress={() => handleSubmit(task.id)}>
                          <Icon
                            style={{ marginRight: 5 }}
                            as={<MaterialIcons name="add-comment" />}
                            size={6}
                            color="#ff1744"
                          />
                        </TouchableOpacity>
                      </View>

                      {commentFieldErrorMessage !== "" && (
                        <View
                          style={{
                            marginTop: 10,
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Icon
                            as={<FontAwesome5 name="exclamation-circle" />}
                            size={4}
                            color="red.500"
                          />
                          <Text
                            color="red.500"
                            style={{ marginLeft: 6, fontSize: 14 }}
                          >
                            {commentFieldErrorMessage}
                          </Text>
                        </View>
                      )}
                    </View>
                  )}
                  {task.submitted && task.text !== "" && (
                    <Text
                      color="yellow.400"
                      style={{
                        alignSelf: "flex-start",
                        textAlign: "left",
                        marginTop: 0,
                        marginBottom: 0,
                        fontSize: 14,
                      }}
                    >
                      {task.text}
                    </Text>
                  )}
                  <View>
                    <View
                      style={{
                        marginTop: 20,
                        flex: 1,
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          flex: 2,
                          flexDirection: "row",
                          alignItems: "flex-start",
                        }}
                      >
                        <Text color="white" style={{ fontSize: 18 }}>
                          {task.id}.
                        </Text>
                      </View>
                      <View style={{ flex: 5 }}>
                        <Checkbox
                          style={{ marginLeft: 20 }}
                          value={isTimeRunning[index] ? "unchecked" : "checked"}
                          onChange={() => toggleTimeRunning(index)}
                          colorScheme="green"
                          size="lg"
                          aria-label="Uruchom/zatrzymaj czas"
                          isChecked={!isTimeRunning[index]}
                        />
                      </View>
                      <View style={{ flex: 4 }}>
                        <Text color="white" style={{ fontSize: 18 }}>
                          {endTimes[index] || "00:00"}
                        </Text>
                      </View>
                      <View style={{ flex: 2, alignItems: "flex-end" }}>
                        <Text color="white" style={{ fontSize: 18 }}>
                          {formatElapsedTime(task.elapsedTime)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </>
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
              <View style={{ flex: 1, justifyContent: "flex-start" }}>
                <Text color="gray.400" style={{ fontSize: 14 }}>
                  Dodane czynności: <Text color="white">{tasks.length}</Text>
                </Text>
              </View>
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
            borderColor={
              activityFieldErrorMessage !== "" ? "red.500" : "transparent"
            }
            selectedValue={selectedTask}
            accessibilityLabel="Wybierz czynność"
            placeholder="Wybierz czynność"
            onValueChange={(itemValue) => setSelectedTask(itemValue)}
          >
            {testTasks.map((task) => (
              <Select.Item
                key={task.id}
                label={task.name}
                value={JSON.stringify(task)}
              />
            ))}
          </Select>
        </Box>
        {activityFieldErrorMessage !== "" && (
          <View style={{ flexDirection: "row" }}>
            <Icon
              as={<FontAwesome5 name="exclamation-circle" />}
              size={5}
              color="red.500"
            />
            <Text color="red.500" style={{ marginLeft: 8, fontSize: 16 }}>
              {activityFieldErrorMessage}
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
