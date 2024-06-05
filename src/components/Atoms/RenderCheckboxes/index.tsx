import React, { useState } from "react";
import { View, Text, Checkbox } from "native-base";
import { getParams } from "../../../helpers/functions/getParams";
import { shiftTimesData } from "../../Data/ShifTimesData";

export const RenderCheckBoxes = () => {
  const { inputData, onChangeCheckbox } = getParams();
  const [employeeShiftSelectedValue, setEmployeeShiftSelectedValue] = useState<
    string | null
  >(null);
  return (
    <View style={{ alignSelf: "flex-start" }}>
      <Text
        marginBottom="2"
        fontSize="xl"
        color="gray.300"
        letterSpacing={0.8}
        fontWeight="medium"
      >
        Zmiana:
      </Text>
      {shiftTimesData.map((shiftTime, i) => {
        const isShiftTimeSelected = employeeShiftSelectedValue === shiftTime;
        return (
          <Checkbox
            key={i}
            backgroundColor={isShiftTimeSelected ? "green.600" : "gray.700"}
            borderColor="transparent"
            colorScheme="green"
            my={2}
            value={inputData.employeeShiftSelectedValue}
            isChecked={isShiftTimeSelected}
            onChange={() =>
              onChangeCheckbox(shiftTime, setEmployeeShiftSelectedValue)
            }
          >
            <Text alignItems="center" width="full" color="white" fontSize="sm">
              {shiftTime}
            </Text>
          </Checkbox>
        );
      })}
    </View>
  );
};
