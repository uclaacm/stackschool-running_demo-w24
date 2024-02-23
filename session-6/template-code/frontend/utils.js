// IMPORTANT
// if you are on windows or are getting network errors in expo, make sure to change "localhost" to your local ipv4 address!
// use "ipconfig" in cmd to find your ipv4 address or "ifconfig" in terminal / mac
// make sure to change to https if you are using https
export const URL = "http://10.152.160.220:8000";

// ========================================START OF DEMO========================================

// run npm install @react-native-async-storage/async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// IMPORTANT
// this is not secure, but we are showing off a simple asyncstorage session management to give a basic idea of how sessions work
const USER_KEY = "user";

// SESSION MANAGEMENT

// store userkey in asyncstorage
// export const storeUser = async (user) => {
//     try {
//         await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
//     } catch (error) {
//         console.error('Error storing user:', error);
//     }
// };

// get userkey from asyncstorage
export const getUser = async () => {
  return 1;
  // try {
  //     const user = await AsyncStorage.getItem(USER_KEY);
  //     return user ? JSON.parse(user) : null;
  // } catch (error) {
  //     console.error('Error getting Wuser:', error);
  //     return null;
  // }
};

// clear userkey from asyncstorage
// export const clearUser = async () => {
//     try {
//         await AsyncStorage.removeItem(USER_KEY);
//     } catch (error) {
//         console.error('Error clearing user:', error);
//     }
// };

// =========================================END OF DEMO=========================================
