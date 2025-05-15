import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/common";

const initialState: { authorizedUser: User | undefined; users: User[] } = {
  authorizedUser: undefined,
  users: [],
};

type ChangePasswordPayload = {
  email: string;
  password: string;
};

interface UserWithPrevEmail extends User {
  previousEmail?: string;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      state.users = [...state.users, action.payload];
    },
    saveAuthUser: (state, action: PayloadAction<User>) => {
      state.authorizedUser = action.payload;
    },
    logout: (state) => (state.authorizedUser = undefined),
    changePassword: (state, action: PayloadAction<ChangePasswordPayload>) => {
      const { email, password } = action.payload;
      const userIndex = state.users.findIndex((item) => item.email === email);
      if (userIndex !== -1) {
        const updatedUser = { ...state.users[userIndex], password };
        state.users[userIndex] = updatedUser;
        state.authorizedUser = updatedUser;
      }
    },
    editUser: (state, action: PayloadAction<UserWithPrevEmail>) => {
      const userEmail = action.payload.previousEmail || action.payload.email;
      const userIndex = state.users.findIndex(
        (item) => item.email === userEmail
      );
      if (userIndex !== -1) {
        const updatedUser = {
          email: action.payload.email,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          password: action.payload.password,
        };
        state.users[userIndex] = updatedUser;
        state.authorizedUser = updatedUser;
      }
    },
  },
});

export const { registerUser, saveAuthUser, logout, changePassword, editUser } =
  userSlice.actions;
export default userSlice.reducer;
