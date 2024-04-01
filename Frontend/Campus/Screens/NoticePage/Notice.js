import { View, Text,SafeAreaView,ScrollView,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import Search from '../../assets/SearchIcon.png';
import MenuBar from '../../assets/MenuBar.png';
import ipaddress from '../../ipadd';
import { useState,useEffect } from 'react';
export default function Notice() {
  const [notice, setNotice] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://${ipaddress}/notice`, {
        method: "GET",
      });
      const data = await response.json();
      setNotice(data);
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
            {"NOTICE"}
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
          {notice.map((item) => (
            <View style={{
              flexDirection: "column",
              borderWidth: 2,
              padding: 10,
              marginHorizontal: 10,
              marginVertical: 5,
              borderRadius:20,
              gap:10,paddingVertical:10,
              backgroundColor:'#D7D7D7'
            }} key={item.id}>
              <Text  >COMPANY NAME: {item.company_name}</Text>
              <Text>DESIGNATION: {item.designation}</Text>
              <Text>REQUIRED SKILLS: {item.required_skills}</Text>
              <Text>VACANCIES:{item.vacancies}</Text>
              <Text>TARGET DEGREE BRANCHES: {item.target_degree_branches}</Text>
              <Text>JOB LOCATION: {item.job_location}</Text>
              {/* <Text>SELECTION PROCESS: {item.selection_process}</Text> */}
              <Text>INTERVIEW DATE: {item.interview_date}</Text>

            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}