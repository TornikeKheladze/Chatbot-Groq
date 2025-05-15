import { MMKV } from "react-native-mmkv";
import { AppStorage, Message } from "../types/common";
import { Storage } from "redux-persist";

const storage = new MMKV();

export const getSavedMessages = () => {
  const savedMessages = storage.getString("chatHistory") || "[]";
  const parsedMessages: Message[] = JSON.parse(savedMessages);
  return parsedMessages;
};

export const saveMessages = (updatedMessages: Message[]) => {
  storage.set("chatHistory", JSON.stringify(updatedMessages));
};

export const clearHistory = (): void => {
  storage.set("chatHistory", "[]");
};

export const getStorageItem = <K extends keyof AppStorage>(
  key: K
): AppStorage[K] | undefined => {
  const raw = storage.getString(key);
  if (!raw) return undefined;

  try {
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`Failed to parse storage item "${key}":`, e);
    return undefined;
  }
};

export const setStorageItem = <K extends keyof AppStorage>(
  key: K,
  value: AppStorage[K]
): void => {
  try {
    const json = JSON.stringify(value);
    storage.set(key, json);
  } catch (e) {
    console.warn(`Failed to stringify storage item "${key}":`, e);
  }
};

export const removeStorageItem = <K extends keyof AppStorage>(key: K): void => {
  storage.delete(key);
};

export const mmkvStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value ?? null);
  },
  removeItem: (key) => {
    storage.delete(key);
    return Promise.resolve();
  },
};
