import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";

// ========================================START OF DEMO========================================
// import { React, useState, useEffect } from "react";
// import { StatusBar } from "react-native";
// import LoginScreen from "./screens/LoginScreen";
// import RegisterScreen from "./screens/RegisterScreen";
// import { getUser } from "./utils";

// run npx expo install expo-splash-screen
// also run npx expo install --fix
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
// =========================================END OF DEMO=========================================

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
  });

  // ========================================START OF DEMO========================================
  // const [initialRoute, setInitialRoute] = useState("");

  // check if user was logged in previously, set initial route accordingly
  // useEffect(() => {
  //   const checkUserSession = async () => {
  //     const user = await getUser();

  //     if (user) {
  //       setInitialRoute("Home");
  //     } else {
  //       setInitialRoute("Login");
  //     }
  //   };

  //   checkUserSession();
  // }, []);

  // SPLASH SCREEN SETUP - NOT A PART OF THE DEMO
  // prevent app from hiding splash screen until fonts are loaded
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  // hide splash screen when fonts are loaded
  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }
  // END OF SPLASH SCREEN SETUP

  // =========================================END OF DEMO=========================================

  return (
    <NavigationContainer>
      {/* ========================================START OF DEMO======================================== */}
      {/* device status bar */}
      <StatusBar barStyle="auto" />
      {/* set initial route based on user session, headerShown = true is useful for debugging */}
      <Stack.Navigator
        initialRouteName="Home"
        // initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
      {/* =========================================END OF DEMO========================================= */}
    </NavigationContainer>
  );
}
