import { SafeAreaView, View, ScrollView, Image, Text, } from "react-native";
import Search from "../../assets/SearchIcon.png";
import MenuBar from "../../assets/MenuBar.png";
export default function Appointees() {
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
            {"Appointees"}
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
            marginBottom: 20,
          }}
        ></View>
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
              <Text  >Sharafath Zulfiah  [2024]</Text>
              <Text>Position: Technical Support</Text>
              <Text>Company name: Zoho Corporation</Text>
              <Text>Location: Chennai</Text>
              {/* <Text>CONTACT EMAIL: {item.contact_email}</Text> */}
 
            </View>
          {/* ))} */}
        
        
        
      </ScrollView>
    </SafeAreaView>
  )
}