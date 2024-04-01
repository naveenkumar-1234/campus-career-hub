import { View, Text ,ScrollView,SafeAreaView,Image,TouchableOpacity,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import MenuBar from '../../assets/MenuBar.png';
// import RNFetchBlob from 'rn-fetch-blob';
import * as FileSystem from 'expo-file-system';
export default function DownloadCV() {
  const [users,setUsers]=useState([])
  const fetchData = async () => {
    
    try {
      const response = await fetch('http://192.168.175.41:8080/students');
      const data = await response.json();
      setUsers(data);
      
    } catch (err) {
      console.log(err);
    }
  };
  const downloadResume = async (student_id) => {
    try {
      const response = await fetch('http://192.168.175.41:8080/downloadresume', {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ student_id }),
      });
      console.log(response.status);
      console.log(response.json())
      // const blob = await response.blob();
      // console.log(blob);
      const { uri } = await response.json();
    const downloadResumOptions = {
      fromUrl: uri,
      toFile: `${FileSystem.documentDirectory}resume.pdf`, // You can provide a dynamic file name here
    };

    const { uri: downloadedFileUri } = await FileSystem.downloadAsync(downloadResumOptions);

      Alert.alert('Download Successful', 'The resume has been downloaded successfully.');
    } catch (err) {
      console.log(err);
      Alert.alert('Download Failed', 'Unable to download the resume. Please try again later.');
    }
  };


useEffect(()=>{
  fetchData()
},[])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#6287A1D9", borderRadius: 25, paddingTop: 26, paddingBottom: 274 }}>
        <View style={{ flexDirection: "row", marginBottom: 4, marginHorizontal: 15 }}>
          <Image source={MenuBar} resizeMode={"stretch"} style={{ width: 31, height: 33, marginTop: 5, marginRight: 24 }} />
        </View>
        {users.map((user) => (
          <View key={user.student_id} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{user.student_name}</Text>
              <Text style={{ fontSize: 14, color: "#666" }}>{user.student_email}</Text>
            </View>
            <TouchableOpacity onPress={() => downloadResume(user.student_id)}>
              <Text style={{ color: "blue", fontSize: 16 }}>Download CV</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}