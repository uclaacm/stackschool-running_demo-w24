// ========================================START OF DEMO========================================

import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { storeUser, URL } from "../utils";

export default function LoginScreen({ navigation }) {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // clear username and password fields when the screen is focused
  // useFocusEffect(
  //   useCallback(() => {
  //     setUsername("");
  //     setPassword("");
  //   }, [])
  // );

  // const handleSignIn = useCallback(async () => {
  //   if (!username || !password) {
  //     alert("Please fill in all fields.");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`${URL}/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       console.error("Error authenticating:", data.error);
  //       alert(`${data.error}`);
  //     } else {
  //       await storeUser(data);
  //       navigation.navigate("Home");
  //     }
  //   } catch (error) {
  //     console.error("Error authenticating:", error.message);
  //     alert("Failed to authenticate. Please try again.");
  //   }
  // }, [username, password]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerText}> SoundsRight. </Text>
        <Text style={styles.subText}> Login </Text>
        <TextInput
          placeholder="Username"
          placeholderTextColor="grey"
          autoCapitalize="none"
          autoCompleteType="username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="grey"
          autoCapitalize="none"
          autoCompleteType="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSignIn} style={styles.loginButton}>
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.smallGreyText}>
          {" "}
          Don't have an account?{" "}
          <Text
            style={styles.smallWhiteText}
            onPress={() => navigation.navigate("Register")}
          >
            {" "}
            Sign up{" "}
          </Text>{" "}
        </Text>
      </View>
    </View>
  );
}

// ========================================END OF DEMO========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 75,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 50,
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  headerText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 24,
    marginBottom: 30,
    textAlign: "center",
    color: "#fff",
  },
  subText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  input: {
    fontFamily: "Inter-SemiBold",
    color: "white",
    padding: 10,
    width: "100%",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 25,
  },
  loginText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "black",
  },
  loginButton: {
    marginTop: 45,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "50%",
  },
  smallGreyText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    marginTop: 30,
    textAlign: "center",
    color: "grey",
  },
  smallWhiteText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    textAlign: "center",
    color: "white",
  },
});
