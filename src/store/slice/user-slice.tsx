import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface userSliceI {
  email: string;
}

const initialState: userSliceI = {
  email: "",
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setUserEmail } = UserSlice.actions;
export const SelectUser = (state: RootState) => state.User;
export default UserSlice.reducer;
