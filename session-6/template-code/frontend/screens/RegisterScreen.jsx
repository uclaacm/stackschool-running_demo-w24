// ========================================START OF DEMO========================================

import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { URL } from "../utils";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // const isEmailValid = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  // const isPasswordValid = (password) => {
  //   // at least 8 characters long, at least one uppercase letter, and at least one special character
  //   const passwordRegex =
  //     /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
  //   return passwordRegex.test(password);
  // };

  // const handleSignUp = useCallback(async () => {
  //   if (!email || !username || !first || !last || !password || !confirm) {
  //     alert("Please fill in all fields.");
  //     return;
  //   }

  //   if (!isEmailValid(email)) {
  //     alert("Please enter a valid email.");
  //     return;
  //   }

  //   if (!isPasswordValid(password)) {
  //     alert(
  //       "Password must be at least 8 characters long and have at least one uppercase letter and special character."
  //     );
  //     return;
  //   }

  //   if (password !== confirm) {
  //     alert("Passwords do not match.");
  //     return;
  //   }

  //   // call the register endpoint
  //   try {
  //     const response = await fetch(`${URL}/register`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, username, first, last, password, image }),
  //     });
  //     if (!response.ok) {
  //       const data = await response.json();
  //       console.error("Error creating user:", data.error);
  //       alert(`${data.error}`);
  //       return;
  //     } else {
  //       navigation.navigate("Login");
  //     }
  //   } catch (error) {
  //     console.error("Error creating user:", error.message);
  //     alert("Failed to create user. Please try again.");
  //   }
  // }, [email, username, first, last, password, confirm]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerText}> SoundsRight. </Text>
        <Text style={styles.subText}> Register </Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="grey"
          autoCapitalize="none"
          autoCompleteType="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
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
          placeholder="First Name"
          placeholderTextColor="grey"
          autoCapitalize="none"
          autoCompleteType="given-name"
          value={first}
          onChangeText={(text) => setFirst(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="grey"
          autoCapitalize="none"
          autoCompleteType="family-name"
          value={last}
          onChangeText={(text) => setLast(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="grey"
          autoCapitalize="none"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="grey"
          autoCapitalize="none"
          secureTextEntry={true}
          value={confirm}
          onChangeText={(text) => setConfirm(text)}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSignUp} style={styles.loginButton}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.smallGreyText}>
          {" "}
          Already have an account?{" "}
          <Text
            style={styles.smallWhiteText}
            onPress={() => navigation.navigate("Login")}
          >
            {" "}
            Sign in{" "}
          </Text>
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
