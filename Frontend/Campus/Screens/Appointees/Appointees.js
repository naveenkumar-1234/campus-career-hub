import { SafeAreaView, View, ScrollView, Image, Text, } from "react-native";
import Search from "../../assets/SearchIcon.png";
import MenuBar from "../../assets/MenuBar.png";
import { useState,useEffect } from "react";
import ipaddress from "../../ipadd";
export default function Appointees() {
  const [appointData, setAppointData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://${ipaddress}/appointees`, {
        method: "GET",
      });
      const data = await response.json();
      setAppointData(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#6287A1D9",
          borderRadius: 25,
          paddingTop: 26,
          paddingBottom: 274,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginBottom: 4,
            marginHorizontal: 15,
          }}
        >
        
          <Text
            style={{
              color: "#000000",
              fontSize: 16,
              marginTop: 17,
            }}
          >
            {"Appointees"}
          </Text>
          <View
            style={{
              flex: 1,
            }}
          ></View>
         
        </View>
        <View
          style={{
            width: 374,
            height: 1,
            backgroundColor: "#000000",
            marginBottom: 20,
          }}
        ></View>
        {appointData.map((item)=>(
          <View style={{
            flexDirection: "column",
            borderWidth: 2,
            padding: 10,
            marginHorizontal: 10,
            marginVertical: 5,
            borderRadius:20,
            gap:10,paddingVertical:10,
            backgroundColor:'#D7D7D7'
          }}
            key={item.id}
          
          >
            <Text  >{item.title}</Text>
            <Text>{item.position}</Text>
            <Text>{item.company_name}</Text>
            <Text>{item.location}</Text>

          </View>
        
        ))}
        
        
      </ScrollView>
    </SafeAreaView>
  )
}