import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (key: string): Promise<string | null> => {
    return await AsyncStorage.getItem(key);
};

export const setItem = async (key: string, value: string): Promise<void> => {
    await AsyncStorage.setItem(key, value);
};

export const removeItem = async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(key);
};

export const clearStorage = async (): Promise<void> => {
    await AsyncStorage.clear();
};
