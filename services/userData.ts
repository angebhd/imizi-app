import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserData = async (userData: any): Promise<void> => {
  try {
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
    console.log("User data stored locally.");
  } catch (error) {
    console.error("Error storing user data:", error);
  }
};

export const getUserData = async (): Promise<any | null> => {
  try {
    const data = await AsyncStorage.getItem("userData");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return null;
  }
};
