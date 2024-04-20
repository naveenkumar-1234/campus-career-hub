import {
  useNavigation,
  useRoute,
  useScrollToTop,
} from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import Search from "../../assets/SearchIcon.png";
import MenuBar from "../../assets/MenuBar.png";
export default function SkillAppraisal() {
  const navigator = useNavigation();
  const router=useRoute()
  
  
  const handleClick = (topic) => {
    console.log(topic);
    const router_data=router.params?.id
    const user_id=router_data.data.student_id
    console.log(router_data)
     switch(topic){
      case "arithmetic":
    navigator.navigate("arithmetic", { id:router_data });

        break
        case "interpretation":
    navigator.navigate("interpretation", { id:router_data });
          
        break
        case "verbal":
    navigator.navigate("verbal", { id:router_data });

        break
        case "logical":
    navigator.navigate("logical", { id:router_data });

        break
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
         
        </View>
        <View
          style={{
            width: 374,
            height: 1,
            backgroundColor: "#000000",
            marginBottom: 20,
          }}
        ></View>
        <View
          style={{ flexDirection: "column", gap: 30, paddingHorizontal: 50 }}
        >
          <TouchableOpacity
            
            onPress={() => {
              handleClick("arithmetic");
            }}
          >
            <View 
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View
                style={{ height: 10, width: 10, backgroundColor: "black" }}
              ></View>
              <Text style={{ fontSize: 20 }}>Arithmetic aptitude</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleClick("interpretation");
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View
                style={{ height: 10, width: 10, backgroundColor: "black" }}
              ></View>
              <Text style={{ fontSize: 20 }}>Data Interpretation</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleClick("verbal");
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View
                style={{ height: 10, width: 10, backgroundColor: "black" }}
              ></View>
              <Text style={{ fontSize: 20 }}>Verbal Ability</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleClick("logical");
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View
                style={{ height: 10, width: 10, backgroundColor: "black" }}
              ></View>
              <Text style={{ fontSize: 20 }}>Logical Reasoning</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
