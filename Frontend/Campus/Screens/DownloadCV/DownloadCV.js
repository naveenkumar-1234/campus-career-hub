import { View, Text ,ScrollView,SafeAreaView,Image,TouchableOpacity,Alert, Button, Platform,ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import MenuBar from '../../assets/MenuBar.png';
// import RNFetchBlob from 'rn-fetch-blob';
import { useRoute } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import ipaddress from '../../ipadd';
export default function DownloadCV() {
const router=useRoute()
const [isLoading,setLoading]=useState(false)
const [users,setUsers]=useState([])
  // const router_data=router.params?.id
  const download=async(std_id)=>{
    setLoading(true)
    console.log(std_id);
  const randowInt=Math.round(Math.random()*1E6)
  const filename=`file-${randowInt}.pdf`;
  
  const result= await FileSystem.downloadAsync(
     `http://${ipaddress}/downloadresume/${std_id}`
     ,
    FileSystem.documentDirectory + filename
  )
  console.log("1",result.headers)

  // console.log("1",result.headers)
  console.log(result.headers["Content-Type"]);
  // console.log(result.headers["Content-Type"]);
  console.log(result.uri);
  const fileName=result.uri.split('/').pop()
  console.log(fileName);
  saveFile(result.uri,fileName,result.headers["Content-Type"])
  }
  const saveFile=async(uri,filename,mimeType)=>
  {
    console.log("2",mimeType);
   if(Platform.OS==="android"){
     const permission=await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
     if(permission.granted){
       console.log("Connect");
       try{
       const base64=await FileSystem.readAsStringAsync(uri,{encoding:FileSystem.EncodingType.Base64})
       const createdFile=await FileSystem.StorageAccessFramework.createFileAsync(permission.directoryUri,filename,mimeType)
       console.log(createdFile)
       await FileSystem.writeAsStringAsync(createdFile, base64, { encoding: FileSystem.EncodingType.Base64 });
      } 
      catch(error){
        setLoading(false)
        console.error("Error saving file:", error);
      }finally{
        setLoading(false)
        Alert.alert("Status","File downloaded successfully!!")
      }
    }
      else{
        shareAsync(uri)
        setLoading(false)

     }
   }else{
    shareAsync(uri)
    setLoading(false)

   }
  }

  const fetchData = async () => {
    
    try {
      const response = await fetch(`http://${ipaddress}/students`);
      const data = await response.json();
      setUsers(data);
      
    } catch (err) {
      console.log(err);
    }
  };
 


useEffect(()=>{
  fetchData()
  setLoading(false)
},[])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#6287A1D9", borderRadius: 25, paddingTop: 26, paddingBottom: 274 }}>
        <View style={{ flexDirection: "row", marginBottom: 4, marginHorizontal: 15 }}>
          <Image source={MenuBar} resizeMode={"stretch"} style={{ width: 31, height: 33, marginTop: 5, marginRight: 24 }} />
        </View>
        {isLoading?(<View style={{height:'100%',flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator color="#000000" size={65} style={{justifyContent:'center',alignItems:'ce'}} />
        </View>):(<View>
          {users.map((user) => (
          <View key={user.student_id} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 13, borderWidth: 1, borderColor: "#ccc" ,marginVertical:10, borderRadius:20}}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{user.student_name}</Text>
              <Text style={{ fontSize: 14, color: "#666" }}>{user.student_email}</Text>
            </View>
            <TouchableOpacity  style={{borderWidth:1,paddingVertical:6,paddingHorizontal:14,borderRadius:20,backgroundColor:'#6287A1D9',borderColor:'black'}} onPress={()=>{
						download(user.student_id);
					}}>
						<Text style={{fontSize:16,color:'white',fontWeight:'bold'}} >Download CV</Text>
					</TouchableOpacity>
          </View>
        ))}
        </View>)}
      </ScrollView>

    
     
    
    </SafeAreaView>
  )
}