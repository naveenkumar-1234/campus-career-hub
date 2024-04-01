import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import ipaddress from "../../ipadd";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userData, setUserData] = useState({});
  const navigator = useNavigation();
  const router = useRoute();
  const typeOfUser = router.params?.userType;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    console.log(typeOfUser);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getEndpoint = (types) => {
    switch (types) {
      case "student":
        return `http://${ipaddress}/std_register`;
      case "faculty":
        return `http://${ipaddress}/faculty_register`;
      case "admin":
        return `http://${ipaddress}/admin_register`;
      case "recruiter":
        return `http://${ipaddress}/recruiter_register`;
      default:
        return "";
    }
  };

  const validate = () => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      Alert.alert("Please fill required fields");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert("Please enter valid email");
      return false;
    }
    if (password.length < 8) {
      Alert.alert("Minimum 8 characters allowed");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validate()) {
      console.log("Not validate credentials");
      return;
    }

    try {
      const endPoint = getEndpoint(typeOfUser);
      setUserData({
        name: username,
        email: email,
        password: password,
      });
      const response = await fetch(endPoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
        }),
      });

      const dataFromDB = await response.json();
      console.log(dataFromDB);
      navigator.navigate("frontscreen", {
        data: dataFromDB,
        userType: typeOfUser,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSwitch = () => {
    navigator.navigate("Login", { userType: typeOfUser });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.toggleButton}
        >
          <Text>{showPassword ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity
          onPress={toggleConfirmPasswordVisibility}
          style={styles.toggleButton}
        >
          <Text>{showConfirmPassword ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => handleSignUp()}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText}>Already have an account?</Text>
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
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "#d7d7d7",
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    borderRadius: 5,
    marginTop: 10,
    paddingVertical: 7,
    paddingHorizontal: 30,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6387A1",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "70%",
    height: 65,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
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

export default SignUp;
