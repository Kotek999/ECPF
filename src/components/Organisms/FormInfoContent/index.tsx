import React from "react";
import { ScrollViewContainer } from "../../../components/Atoms/ScrollViewContainer";
import { Header } from "../../../components/Atoms/Header";
import { AreaContainer } from "../../../components/Atoms/AreaContainer";
import { InfoMessage } from "../../../components/Atoms/InfoMessage";
import { RenderTextInputs } from "../../../components/Atoms/RenderTextInputs";
import { NextButton } from "../../../components/Atoms/NextButton";
import { navigateTo } from "../../../helpers/functions/navigateTo";
import { SCREEN } from "../../../../routes";

export const FormInfoContent = () => {
  const { onPressGoToScreen } = navigateTo(SCREEN.EmployeeInfo);

  return (
    <ScrollViewContainer>
      <Header screenTitle="Dane formy" />
      <AreaContainer>
        <InfoMessage title="Proszę podać informacje dotyczące formy" />
        <RenderTextInputs />
        <NextButton onPress={onPressGoToScreen} marginTop={30} />
      </AreaContainer>
    </ScrollViewContainer>
  );
};
