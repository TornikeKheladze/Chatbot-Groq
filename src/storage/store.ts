import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import themeSlice from "./themeSlice";
import chatSlice from "./chatSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { mmkvStorage } from "./storage";

const persistConfig = {
  key: "root",
  storage: mmkvStorage,
};

const persistedUserReducer = persistReducer(persistConfig, userSlice);
const persistedThemeReducer = persistReducer(persistConfig, themeSlice);
const persistedChatReducer = persistReducer(persistConfig, chatSlice);

export const store = configureStore({
  reducer: {
    users: persistedUserReducer,
    theme: persistedThemeReducer,
    chat: persistedChatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
