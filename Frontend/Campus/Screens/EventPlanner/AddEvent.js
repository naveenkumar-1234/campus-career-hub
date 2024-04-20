import { View, Text,SafeAreaView,ScrollView,TouchableOpacity,Image ,TextInput,Button,Alert} from 'react-native'
import React from 'react'
import Search from '../../assets/SearchIcon.png';
import MenuBar from '../../assets/MenuBar.png';
import { useState } from 'react';
import ipaddress from '../../ipadd';
export default function AddEvent() {
    const [inputData, setInputData] = useState({
        eventDetails:""

      });
    
      const submitData = async () => {
        try {
            // console.log(inputData);
          const response = await fetch(`http://${ipaddress}/addevent`, {
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
      const handleInputChange = (value) => {
        setInputData(() => ({
          eventDetails: value
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
        
        
          <Text
            style={{
              color: "#000000",
              fontSize: 16,
              marginTop: 17,
              justifyContent:"center"
            }}
          >
            {"Add Event"}
          </Text>
          
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
        placeholder="Details of Event"
        value={inputData.company_name}
        onChangeText={text => handleInputChange(text)}
        style={{ marginBottom: 10, borderWidth: 1, borderColor: 'black',  width: '80%',paddingVertical:15,paddingHorizontal:10 }}
      />
     
      <Button title="ADD DATA" onPress={submitData} />
    </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}