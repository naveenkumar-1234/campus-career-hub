import { View, Text,SafeAreaView,ScrollView,TouchableOpacity,Image ,TextInput,Button,Alert} from 'react-native'
import React from 'react'
import Search from '../../assets/SearchIcon.png';
import MenuBar from '../../assets/MenuBar.png';
import { useState } from 'react';
import ipaddress from '../../ipadd';
export default function AddAppointess() {
    const [inputData, setInputData] = useState({
        title: '',
        position: '',
        company_name: '',
        location: '',

      });
    
      const submitData = async () => {
        try {
            // console.log(inputData);
          const response = await fetch(`http://${ipaddress}/addappoint`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputData)
          });
    
          if (response.ok) {
            Alert.alert('Success', 'Data submitted successfully!');
          } else {
            Alert.alert('Error', 'Failed to submit data. Please try again later.');
          }
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Failed to submit data. Please try again later.');
        }
      };
      const handleInputChange = (key, value) => {
        setInputData(prevState => ({
          ...prevState,
          [key]: value
        }));
      };
//   const fetchData = async () => {
//     try {
//       const response = await fetch("http://192.168.175.41:8080/addnotice", {
//         method: "POST",headers:{'Content-Type':'application/json'},
//         body:JSON.stringify()
//       });
//       const data = await response.json();
//       setNotice(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
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
            justifyContent:"center",
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
            {"Add Appointees"}
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
            justifyContent:'center',
            
            padding: 10,
            marginHorizontal: 10,
            marginVertical: 5,
          }}
        >
           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',gap:30 }}>
      <TextInput
        placeholder="Title"
        value={inputData.title}
        onChangeText={text => handleInputChange('title', text)}
        style={{ marginBottom: 10, borderWidth: 1, borderColor: 'black',  width: '80%',paddingVertical:15,paddingHorizontal:10 }}
      />
      <TextInput
        placeholder="Position"
        value={inputData.position}
        onChangeText={text => handleInputChange('position', text)}
        style={{ marginBottom: 10, borderWidth: 1, borderColor: 'black', width: '80%',paddingVertical:15,paddingHorizontal:10}}
      />
      <TextInput
        placeholder="Company_name"
        value={inputData.enroll_nolink}
        onChangeText={text => handleInputChange('company_name', text)}
        style={{ marginBottom: 10, borderWidth: 1, borderColor: 'black', width: '80%',paddingVertical:15,paddingHorizontal:10 }}
      />
      <TextInput
        placeholder="Location"
        value={inputData.location}
        onChangeText={text => handleInputChange('location', text)}
        style={{ marginBottom: 10, borderWidth: 1, borderColor: 'black',  width: '80%',paddingVertical:15,paddingHorizontal:10}}
      />
      
      <Button title="ADD DATA" onPress={submitData} />
    </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}