import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, ActivityIndicator } from 'react-native';
import MenuBar from "../../assets/MenuBar.png";
import ipaddress from '../../ipadd';

export default function StudentScore() {
  const [isLoading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true); 
    try {
      const response = await fetch(`http://${ipaddress}/seescore`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      const uniqueStudents = removeDuplicates(data, 'std_name');
      setStudents(uniqueStudents);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); 
    }
  };

  const removeDuplicates = (array, key) => {
    return array.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t[key] === item[key]
      ))
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#6287A1D9", borderRadius: 25, paddingTop: 26, paddingBottom: 274 }}>
        <View style={{ flexDirection: "row", marginBottom: 4, marginHorizontal: 15 }}>
          <Image source={MenuBar} resizeMode={"stretch"} style={{ width: 31, height: 33, marginTop: 5, marginRight: 24 }} />
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          students.map((student, index) => (
            <View key={index} style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10, borderWidth: 2, padding: 10, flex: 1, marginHorizontal: 20, borderRadius: 10 }}>
              <Text>{student.std_name}</Text>
              <View>
                <Text>Arithmetic: {student.scores.arithmetic}</Text>
                <Text>Verbal: {student.scores.verbal}</Text>
                <Text>Logical: {student.scores.logical}</Text>
                <Text>Interpretation: {student.scores.interpretation}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
