
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import Search from "../../assets/SearchIcon.png";
  import MenuBar from "../../assets/MenuBar.png";
  import ipaddress from "../../ipadd";
export default function EventPlanner() {
  const [eventData, setEventData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://${ipaddress}/events`, {
        method: "GET",
      });
      const data = await response.json();
      setEventData(data);
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
            {"EVENT PLANNER"}
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
            marginBottom: 10,
          }}
        ></View>
        <View
          style={{
            flexDirection: "column",
            
            padding: 10,
            marginHorizontal: 10,
            marginVertical: 5,
          }}
        >
         {eventData.map((item) => (
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
              {/* <Text  >Round 2 of CEI priv.lim on 06/03/2024</Text>
              <Text>Revised Schedule for soft  skill training 
on 05/03/2024 </Text> */}
              <Text>{item.eventDetails}</Text>
              {/* <Text>CONTACT:{item.contact_number}</Text> */}
              {/* <Text>CONTACT EMAIL: {item.contact_email}</Text> */} 

            </View>
           ))} 
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}