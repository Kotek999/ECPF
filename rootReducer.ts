import { combineReducers } from "redux";
import formDataReducer from "./src/redux/formData/action";

export const rootReducer = combineReducers({
  formData: formDataReducer,
});
