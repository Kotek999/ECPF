import { ReactNode, Dispatch, SetStateAction, JSX } from "react";
import { KeyboardTypeOptions, GestureResponderEvent } from "react-native";

type Children = ReactNode;
type OnPress = (event: GestureResponderEvent) => void;
type onPressAction = {
  onPress: OnPress;
};

export type JSX = JSX.Element;
export type Dimension = "window" | "screen";

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type ChildProps = {
  children: Children;
};

export type Params = {
  formNumber: string;
  formWeight: string;
  formOwner: string;
  employeeId: string;
  employeeShiftSelectedValue: string;
};

export type InputsProps = {
  keyboardType?: KeyboardTypeOptions;
  placeholder: string;
  iconName: string;
  value: keyof Params;
};

type TitleProp = {
  title: string;
};

export type InputsData = InputsProps & TitleProp;

export type TextInputsContainerProps = ChildProps & {
  inputTitle: string;
};

export type NextButtonProps = onPressAction & {
  marginTop: number;
};

export type InfoMessageProps = TitleProp;

export type HeaderProps = {
  screenTitle: string;
};

export type ButtonProps = onPressAction &
  TitleProp & {
    divideValue: number;
  };
