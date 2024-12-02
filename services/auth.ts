import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = async (token : string): Promise<undefined| true >=> {
    try {
        console.log(token)
        await AsyncStorage.setItem("token", token);
        return true
    } catch (error) {
        console.error("Failed to save token: " + error);
    }
}

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        if (token !== null) {
            return token;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Failed to get token: " + error);
    }
}
const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('token');
        return true;
    } catch (error) {
        console.error("Failed to get token: " + error);
    }
}
export default { get: getToken, store: storeToken, remove:removeToken}