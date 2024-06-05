import React from "react";
import { Input, Icon } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getParams } from "../../../helpers/functions/getParams";
import { InputsProps as TextInputProps } from "../../../types";

export const TextInput = (props: TextInputProps) => {
  const { getValue, onChangeText } = getParams();

  return (
    <Input
      keyboardType={props.keyboardType}
      borderRadius={10}
      borderColor="gray.700"
      bg="gray.700"
      marginBottom="5"
      fontSize="md"
      color="white"
      h={12}
      _focus={{
        bg: "gray.700",
        borderWidth: 0,
        borderColor: "transparent",
        color: "white",
      }}
      placeholder={props.placeholder}
      value={getValue(props.value)}
      leftElement={
        <Icon
          style={{ marginLeft: 10 }}
          as={<MaterialCommunityIcons name={props.iconName as any} />}
          size={6}
          color="gray.400"
        />
      }
      onChangeText={onChangeText(props.value)}
    />
  );
};
