import React from "react";
import { TextInput } from "../TextInput";
import { inputsData } from "../../Data/FieldsData";
import { TextInputsContainer } from "../TextInputsContainer";

export const RenderTextInputs = () => {
  return (
    <>
      {inputsData.map((input, i) => {
        return (
          <TextInputsContainer key={i} inputTitle={input.title}>
            <TextInput
              keyboardType={input.keyboardType}
              placeholder={input.placeholder}
              iconName={input.iconName}
              value={input.value}
            />
          </TextInputsContainer>
        );
      })}
    </>
  );
};
