import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ipaddress from "../../ipadd";
export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getEndpoint = (userType) => {
    switch (userType) {
      case "student":
        return `http://${ipaddress}/std_login`;
      case "faculty":
        return `http://${ipaddress}/faculty_login`;
      case "admin":
        return `http://${ipaddress}/admin_login`;
      case "recruiter":
        return `http://${ipaddress}/recruiter_login`;
      default:
        return "";
    }
  };

  const validation = (email, pass) => {
    if (!email || !pass) {
      Alert.alert("Please fill required fields");
      return false;
    }
    return true;
  };

  const studentLogin = async () => {
    if (!validation(email, pass)) {
      console.log("Invalid email or password.");
      return;
    }
    try {
      const EndPoint = getEndpoint(typeOfUser);
      const response = await fetch(EndPoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: pass }),
      });

      if (response.ok) {
        const dataFromDB = await response.json();
        console.log(dataFromDB);
        navigater.navigate("frontscreen", {
          data: dataFromDB,
          userType: typeOfUser,
        });
      } else {
        console.log("Login failed. Invalid credentials.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navigater = useNavigation();
  const route = useRoute();
  const typeOfUser = route.params?.userType;
  const handleSwitch = () => {
    console.log(ip);
    navigater.navigate("Signup", { userType: typeOfUser });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={pass}
          onChangeText={setPass}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.toggleButton}
        >
          <Text>{showPassword ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => studentLogin(email, pass)}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText}>Don't have an account?</Text>
      <TouchableOpacity onPress={handleSwitch}>
        <Text
          style={{
            fontWeight: "bold",
            color: "black",
            backgroundColor: "#d7d7d7",
            borderRadius: 20,
            paddingHorizontal: 30,
            paddingVertical: 10,
            marginTop: 10,
          }}
        >
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "#d7d7d7",
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    borderRadius: 5,
    marginTop: 10,
  },
  headText: {
    fontSize: 30,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6387A1",
  },
  input: {
    width: "70%",
    height: 60,

    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  passwordContainer: {
    width: "70%",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    width: "60%",
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  toggleButton: {
    padding: 10,
  },
  signUpText: {
    marginTop: 20,
    color: "black",
  },
});
