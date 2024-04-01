import { useRoute, useScrollToTop } from "@react-navigation/native";
import { SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import Search from "../../assets/SearchIcon.png";
import MenuBar from "../../assets/MenuBar.png";
export default function SkillAppraisal() {
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
            {"SKILL APPRAISAL"}
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
        <View style={{flexDirection:"column",gap:30,paddingHorizontal:50}}>
            <View style={{flexDirection:"row",alignItems:"center" ,gap:10}}>
                <View style={{height:10,width:10,backgroundColor:"black"}} ></View><Text style={{fontSize:20}}>Arithmetic aptitude</Text>
            </View><View style={{flexDirection:"row",alignItems:"center" ,gap:10}}>
            <View style={{height:10,width:10,backgroundColor:"black"}} ></View><Text style={{fontSize:20}}>Data Interpretation</Text>
            </View><View style={{flexDirection:"row",alignItems:"center" ,gap:10}}>
            <View style={{height:10,width:10,backgroundColor:"black"}} ></View><Text style={{fontSize:20}}>Verbal Ability</Text>
            </View><View style={{flexDirection:"row",alignItems:"center" ,gap:10}}>
            <View style={{height:10,width:10,backgroundColor:"black"}} ></View><Text style={{fontSize:20}}>Logical Reasoning</Text>
            </View>
        </View>
        
        
      </ScrollView>
    </SafeAreaView>
  )
}