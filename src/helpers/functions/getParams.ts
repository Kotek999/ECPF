import { useLocalSearchParams, router } from "expo-router";
import { Params, SetState } from "../../types";

export const getParams = () => {
  const params = useLocalSearchParams<Params>();

  const onChange = () => ({
    getMultipleParam: (fieldName: string, value: string) =>
      router.setParams({ ...params, [fieldName]: value }),
    getSingleParam: (value: string) =>
      router.setParams({ employeeShiftSelectedValue: value }),
  });

  const getValue = (fieldName: keyof Params): string => {
    return params[fieldName] || "";
  };

  const onChangeText = (fieldName: string) => (value: string) => {
    onChange().getMultipleParam(fieldName, value);
  };

  const onChangeCheckbox = (value: string, state: SetState<string | null>) => {
    onChange().getSingleParam(value);
    state((prevValue) => (prevValue !== value ? value : null));
  };

  const inputData = {
    formNumber: getValue("formNumber"),
    formWeight: getValue("formWeight"),
    formOwner: getValue("formOwner"),
    employeeId: getValue("employeeId"),
    employeeShiftSelectedValue: getValue("employeeShiftSelectedValue"),
  };

  return {
    params,
    getValue,
    onChangeText,
    inputData,
    onChangeCheckbox,
  };
};
