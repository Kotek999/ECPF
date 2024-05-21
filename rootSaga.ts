import { all } from "redux-saga/effects";
import { formData } from "./src/redux/formData/saga";

export function* rootSaga() {
  yield all([formData()]);
}
