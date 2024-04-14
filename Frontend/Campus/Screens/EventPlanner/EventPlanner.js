
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
export default function EventPlanner() {
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
          <Image
            source={MenuBar}
            resizeMode={"stretch"}
            style={{
              width: 31,
              height: 33,
              marginTop: 5,
              marginRight: 24,
            }}
          />
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
          <Image
            source={Search}
            resizeMode={"stretch"}
            style={{
              width: 32,
              height: 33,
            }}
          />
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
          {/* {internData.map((item) => ( */}
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
            //  key={item.id}
            
            >
              <Text  >Round 2 of CEI priv.lim on 06/03/2024</Text>
              <Text>Revised Schedule for soft  skill training 
on 05/03/2024 </Text>
              {/* <Text>ENROLL: {item.enroll_now_link}</Text>
              <Text>CONTACT:{item.contact_number}</Text>
              <Text>CONTACT EMAIL: {item.contact_email}</Text> */}

            </View>
          {/* ))} */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}