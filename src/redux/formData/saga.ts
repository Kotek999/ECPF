import { call, put, takeLatest, all } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { setFormData, setFormDataSuccess, setFormDataFailure } from "./action";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Fields = {
  numId: string | undefined;
  weight: string | undefined;
  owner: string | undefined;
};

type FormData = {
  fields: Fields;
};

function* onFormData(action: PayloadAction<FormData>) {
  try {
    const { fields } = action.payload;
    const formatData = JSON.stringify(fields);
    yield call(AsyncStorage.setItem, "formData", formatData);
    yield put(setFormDataSuccess("SAGA, DANE ZOSTAŁY ZAPISANE"));
    console.log("saga success", fields);
  } catch (error: any) {
    yield put(setFormDataFailure(error.message));
    console.error("saga error:", error);
  }
}

export function* formData() {
  yield takeLatest(setFormData, onFormData);
}

export function* dataSaga() {
  yield all([formData()]);
}
