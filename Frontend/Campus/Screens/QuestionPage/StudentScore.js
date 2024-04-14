import { View, Text,SafeAreaView,ScrollView,Image,TouchableOpacity,ActivityIndicator, } from 'react-native'
import React from 'react'
import MenuBar from "../../assets/MenuBar.png"
import { useState,useEffect } from 'react';
import ipaddress from '../../ipadd';
export default function StudentScore() {
  const [isLoading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [score,setScore]=useState()
  const fetchData = async () => {
    setLoading(true); 
    try {
      const response = await fetch(`http://${ipaddress}/students`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      setStudents(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#6287A1D9", borderRadius: 25, paddingTop: 26, paddingBottom: 274 }}>
        <View style={{ flexDirection: "row", marginBottom: 4, marginHorizontal: 15 }}>
          <Image source={MenuBar} resizeMode={"stretch"} style={{ width: 31, height: 33, marginTop: 5, marginRight: 24 }} />
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          students.map((item) => (
            <View style={{flexDirection:"row",justifyContent:"space-between",marginVertical:10,borderWidth:2,padding:10,flex:1,marginHorizontal:20,borderRadius:10}} key={item.student_id}>
              <Text>{item.student_name}</Text>
              <Text>
                Score :5
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
