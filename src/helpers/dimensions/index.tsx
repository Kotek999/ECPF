import { Dimensions } from "react-native";
import { Dimension } from "../../types";

const nameOfDimension: Dimension = "window";

const screenWidth = Dimensions.get(nameOfDimension).width;
const screenHeight = Dimensions.get(nameOfDimension).height;

export { screenWidth, screenHeight };
