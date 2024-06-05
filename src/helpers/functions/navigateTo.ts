import { router } from "expo-router";
import { getParams } from "./getParams";

export const navigateTo = (screenName: string) => {
  const { inputData } = getParams();

  const onPressGoToScreen = () => {
    router.navigate(
      `/${screenName}?formNumber=${inputData.formNumber}&formWeight=${inputData.formWeight}&formOwner=${inputData.formOwner}&employeeId=${inputData.employeeId}&employeeShiftSelectedValue=${inputData.employeeShiftSelectedValue}`
    );
  };

  return { onPressGoToScreen };
};
