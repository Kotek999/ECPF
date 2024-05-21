import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DataState {
  data: string | null;
  loading: boolean;
  error: string | null;
}

// type Data = {
//   data: string;
// };

type Fields = {
  numId: string | undefined;
  weight: string | undefined;
  owner: string | undefined;
};

type FormData = {
  fields: Fields;
};

const initialState: DataState = {
  data: null,
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormData>) => {
      state.loading = true;
      const { fields } = action.payload;
    },
    setFormDataSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    setFormDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setFormData, setFormDataSuccess, setFormDataFailure } =
  dataSlice.actions;
export default dataSlice.reducer;
