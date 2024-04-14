import { useRoute } from "@react-navigation/native";
import { SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import Search from "../../assets/SearchIcon.png";
import MenuBar from "../../assets/MenuBar.png";
import * as DocumentPicker from 'expo-document-picker'
import { useState } from "react";
import ipaddress from "../../ipadd";
export default function UploadCv() {
  const router = useRoute();
  const[loading,setLoading]=useState(false)

   const uploadFile=async()=>{
     try{
        setLoading(true)
          const doc=DocumentPicker.getDocumentAsync({
            type:['application/pdf'],
          })
          const router_data=router.params?.id
          const user_id=router_data.data.student_id
          console.log("1",user_id);
          // console.log("1",user_id);
          const fileAssest=(await doc).assets[0]
         console.log("2",fileAssest)
          const formData=new FormData();
            formData.append('file',{
             uri:fileAssest.uri,
             name:fileAssest.name,
             type:fileAssest.mimeType,
             size:fileAssest.size
          })
        console.log("3",user_id);
        formData.append('student_id',user_id)
        console.log("Sended Form data:",formData);
          const response=await fetch(`http://${ipaddress}/upload`,{
            method:'POST',body:formData,headers: {
                'Content-Type': 'multipart/form-data', 
              },
          })
          if(response.ok){
           Alert.alert("File uploaded successfully")
          }else if(response.status=='500'){
            Alert.alert("Unable to upload file")
          }
     }catch(err){
        console.log("Err",err)
    }finally{
      setLoading(false)
    }
  }

  
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
            {"UPLOAD CV"}
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
            marginBottom: 208,
          }}
        ></View>
        {loading?(<ActivityIndicator color="#000000" size={65} />):(<TouchableOpacity onPress={()=>{uploadFile()}}  >
        <View 
          style={{
            width: 116,
            height: 50,
            alignItems: "center",
            backgroundColor: "#D9D9D9",
            borderRadius: 20,
            paddingVertical: 11,
            marginBottom: 175,
            marginHorizontal: 129,
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 16,
            }}
          >
            {"Upload"}
          </Text>
        </View>
        </TouchableOpacity>)}
        {/* <View 
                style = {{
                    width: 68,
                    height: 35,
                    alignItems: "center",
                    backgroundColor: "#D9D9D9",
                    borderRadius: 20,
                    paddingVertical: 11,
                    marginHorizontal: 35,
                }}>
                         <Text 
                    style = {{
                        color: "#000000",
                        fontSize: 16,
                    }}>
                    
                </Text> 
            </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}
