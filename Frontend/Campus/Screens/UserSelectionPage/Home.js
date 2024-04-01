import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from "react-native";

export function Home() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.Row}>
          <AvatarText
            image={require("../../assets/Avatar.png")}
            text="Student"
            value="student"
          />
          <AvatarText
            image={require("../../assets/Avatar.png")}
            text="Faculty"
            value="faculty"
          />
        </View>
        <View style={styles.Row}>
          <AvatarText image={require("../../assets/Avatar.png")} text="Admin" 
            value="admin"
          
          />
          <AvatarText
            image={require("../../assets/Avatar.png")}
            text="Recruiter"
            value="recruiter"
          />
        </View>
      </View>
    </View>
  );
}

const AvatarText = ({ image, text,value }) => {
  const navigate=useNavigation();
  const handleNavigate=(value)=>{
    navigate.navigate("Login",{userType:value})
  console.log(value)
  }
  return (
    <View style={styles.avatarContainer}>
      <Image source={image} style={styles.avatarImage} />
      <TouchableOpacity style={styles.buttonStyle}  onPress={()=>{handleNavigate(value)}} >
        <Text>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6387A1",
  },
  container: {
    width: "80%",
    height: "50%",
    justifyContent: "space-evenly",
  },
  avatarContainer: {
    alignItems: "center",
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  buttonStyle: {
    backgroundColor: "#D9D9D9",
    fontSize: 16,
    paddingHorizontal:30,
    paddingVertical:7,
    fontWeight: "bold",
    marginTop: 8,
    color: "#000",
    borderRadius: 10, 
  },
});
