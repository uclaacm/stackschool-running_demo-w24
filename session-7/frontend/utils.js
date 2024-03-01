// Run npm install @react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CLIENT_ID, CLIENT_SECRET } from '@env';

const USER_KEY = 'user';

export const storeUser = async (user) => {
    try {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
        console.error('Error storing user:', error);
    }
};

export const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
};

export const clearUser = async () => {
    try {
        await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
        console.error('Error clearing user:', error);
    }
};


// BEGIN DEMO ##########################################


// setup keys for AsyncStorage (like dictionary/hashmap)

// const ACCESS_TOKEN = 'access';
// const EXPIRATION_DATE = 'expire';

// create function to handle Spotify authorization

export async function getAccessToken() {

// get the current access token and expiration date if it exists

//     const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
//     const expirationDate = await AsyncStorage.getItem(EXPIRATION_DATE);
//     const currentTime = Date.now();

// if we have a non expired access token stored already, then return it

    // if (accessToken && expirationDate && currentTime < Date.parse(expirationDate)) return accessToken;

// else delete the expired token and its expiration date

    // AsyncStorage.removeItem(ACCESS_TOKEN);
    // AsyncStorage.removeItem(EXPIRATION_DATE);

// fetch a new access token from the Spotify API using our client secret and client ID

    // const response = await fetch('https://accounts.spotify.com/api/token', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    // });
    
    // const data = await response.json();
    // console.log(data);

// store our new token and expiration date and return the token while catching potential errors

    // try {
    //     await AsyncStorage.setItem(ACCESS_TOKEN, data.access_token);
    // } catch (error) {
    //     console.error('Error storing access token:', error);
    // }

    // const newExpirationDate = new Date(currentTime + data.expires_in * 1000).toString();
    // try {
    //     await AsyncStorage.setItem(EXPIRATION_DATE, newExpirationDate);
    // } catch (error) {
    //     console.error('Error storing expiration date:', error);
    // }

    // return data.access_token
};

// END DEMO ##########################################