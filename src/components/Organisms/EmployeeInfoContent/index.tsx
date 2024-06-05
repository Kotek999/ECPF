import React from "react";
import { ScrollViewContainer } from "../../../components/Atoms/ScrollViewContainer";
import { Header } from "../../../components/Atoms/Header";
import { AreaContainer } from "../../../components/Atoms/AreaContainer";
import { InfoMessage } from "../../../components/Atoms/InfoMessage";
import { TextInput } from "../../../components/Atoms/TextInput";
import { navigateTo } from "../../../helpers/functions/navigateTo";
import { NextButton } from "../../../components/Atoms/NextButton";
import { RenderCheckBoxes } from "../../../components/Atoms/RenderCheckboxes";
import { TextInputsContainer } from "../../..//components/Atoms/TextInputsContainer";
import { SCREEN } from "../../../../routes";

export const EmployeeInfoContent = () => {
  const { onPressGoToScreen } = navigateTo(SCREEN.ActivitiesInfo);

  return (
    <ScrollViewContainer>
      <Header screenTitle="Dane Pracownika" />
      <AreaContainer>
        <InfoMessage title="Proszę podać informacje dotyczące pracownika" />
        <TextInputsContainer inputTitle="Numer Id Pracownika:">
          <TextInput
            keyboardType="numeric"
            placeholder="numer id"
            value={"employeeId"}
            iconName="numeric"
          />
          <RenderCheckBoxes />
        </TextInputsContainer>
        <NextButton onPress={onPressGoToScreen} marginTop={108} />
      </AreaContainer>
    </ScrollViewContainer>
  );
};
