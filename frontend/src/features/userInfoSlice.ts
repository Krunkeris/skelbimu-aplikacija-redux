import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfoType } from "../types/types";

const initialState: UserInfoType = {
  _id: "",
  username: "",
  email: "",
  role: "",
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    getUserInfo: (state) => {
      const user = localStorage.getItem("user");
      if (user) {
        const parsedUser: UserInfoType = JSON.parse(user);
        return { ...state, ...parsedUser };
      }
      return state;
    },
    clearUserInfo: () => initialState,
  },
});

export const { getUserInfo, clearUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
