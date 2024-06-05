import React from "react";
import { View } from "native-base";
import { Button } from "../Button";
import { NextButtonProps } from "../../../types";

export const NextButton = (props: NextButtonProps) => {
  return (
    <View style={{ marginTop: props.marginTop }}>
      <Button divideValue={2} title="Dalej" onPress={props.onPress} />
    </View>
  );
};
