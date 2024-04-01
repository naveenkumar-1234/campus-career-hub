import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, Alert, } from "react-native";
import Menubar from '../../assets/MenuBar.png';
import Avatar from '../../assets/AvatarImage.png';
import Notice from '../../assets/NoticeIcon.png';
import Appointees from '../../assets/Appointees.png';
import Event from '../../assets/Event.png';
import Search from '../../assets/SearchIcon.png';
import UploadCV from '../../assets/UploadCV.png';
import Notification from '../../assets/NotificationIcon.png';
 import Internship from '../../assets/1.png';
 import Skill from '../../assets/2.png';
import { useNavigation, useRoute } from "@react-navigation/native";

export default function HomeScreen(){
	
    const navigator=useNavigation()
    const router=useRoute();
    const userData=router.params?.data

	const typeOfUser=router.params?.userType
    const handleUpload=(data)=>{
		
		const user_id=data.data.student_id
		console.log(data.data.student_id);
		console.log(user_id,"fgf")
		console.log(router.params);
        navigator.navigate("UploadCv",{id:user_id})
    }
	const handleDownload=()=>{
         navigator.navigate("DownloadCV")
		
	}
	const handleIntern=()=>{
		if(typeOfUser=="student"){
			navigator.navigate('Internship')

		}else{
			console.log("add");
			// navigator.navigate('addInternship')
		}
	}
	const handleNotice=()=>{
		console.log(typeOfUser);
		if(typeOfUser=="student"){
			navigator.navigate('Notice')

		}else{
			console.log("add");
			navigator.navigate('addNotice')
		}
	}
	const handleEventPlan=()=>{
		navigator.navigate('Eventplanner')
	}
	
	const handleAvatar=()=>{
		console.log();
		Alert.alert(typeOfUser)
	}
	const handleNotification=()=>{
		Alert.alert("Notification","Empty")
	}
	const handleSkill=()=>{
		navigator.navigate('skill')
	}
	const handleAppointees=()=>{
		navigator.navigate('appointees')
	}
    
    return (
        <SafeAreaView 
			style = {{
				flex: 1,
				backgroundColor: "#FFFFFF",
			}}>
			<ScrollView  
				style = {{
					flex: 1,
					backgroundColor: "#6287A1D9",
					borderRadius: 25,
					paddingTop: 21,
					paddingBottom: 425,
				}}>
				<View 
					style = {{
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 7,
						marginHorizontal: 20,
					}}>
					<Image
						source = {Menubar} 
						resizeMode = {"stretch"}
						style = {{
							width: 31,
							height: 33,
						}}
					/>
					<View 
						style = {{
							flex: 1,
							alignSelf: "stretch",
						}}>
					</View>
					<TouchableOpacity onPress={handleAvatar}  >
					<Image
						source = {Avatar} 
						resizeMode = {"stretch"}
						style = {{
							width: 31,
							height: 33,
							marginRight: 28,
						}}
					/>
					</TouchableOpacity>
					<TouchableOpacity onPress={handleNotification}>
						<Image
						source = {Notification} 
						resizeMode = {"stretch"}
						style = {{
							width: 29,
							height: 33,
							marginRight: 19,
						}}
					/>
					</TouchableOpacity>
					<Image
						source = {Search} 
						resizeMode = {"stretch"}
						style = {{
							width: 32,
							height: 33,
						}}
					/>
				</View>
				<View 
					style = {{
						width: 377,
						height: 2,
						backgroundColor: "#000000",
						marginBottom: 25,
					}}>
				</View>
				<View 
					style = {{
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 6,
						marginHorizontal: 20,
					}}>
					<TouchableOpacity  onPress={handleNotice} >
					<Image
						source = {Notice} 
						resizeMode = {"stretch"}
						style = {{
							width: 77,
							height: 75,
						}}
					/>
					</TouchableOpacity>
					<View 
						style = {{
							flex: 1,
							alignSelf: "stretch",
						}}>
					</View>
					<TouchableOpacity onPress={handleEventPlan}  >
					<Image
						source = {Event} 
						resizeMode = {"stretch"}
						style = {{
							width: 77,
							height: 75,
							marginRight: 51,
						}}
					/>
					</TouchableOpacity>
					<TouchableOpacity onPress={handleIntern}>
					<Image
						source = {Internship}
						resizeMode = {"stretch"}
						style = {{
							width: 77,
							height: 75,
						}}
					/>
					</TouchableOpacity>
				</View>
				<View 
					style = {{
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 33,
						marginHorizontal: 30,
					}}>
					<Text 
						style = {{
							color: "#000000",
							fontSize: 16,
							marginRight: 4,
							flex: 1,
						}}>
						{"Notice"}
					</Text>
					<Text 
						style = {{
							color: "#000000",
							fontSize: 16,
							marginRight: 45,
							width: 60,
						}}>
						{"Event planner"}
					</Text>
					<Text 
						style = {{
							color: "#000000",
							fontSize: 16,
						}}>
						{"Internship"}
					</Text>
				</View>
				<View 
					style = {{
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 6,
						marginHorizontal: 22,
					}}>
					<TouchableOpacity onPress={handleSkill}  >
					<Image
						source = {Skill}
						resizeMode = {"stretch"}
						style = {{
							width: 77,
							height: 76,
						}}
					/>
					</TouchableOpacity>
					<View 
						style = {{
							flex: 1,
							alignSelf: "stretch",
						}}>
					</View>
					<TouchableOpacity onPress={()=>{
						`${typeOfUser==="student"?handleUpload(userData):handleDownload()}`
						
						
						}} >
                    <Image
						source = {UploadCV}
						resizeMode = {"stretch"}
						style = {{
							width: 77,
							height: 76,
							marginRight: 56,
						}}
					/>
                    </TouchableOpacity>
					<TouchableOpacity onPress={handleAppointees}  >
					<Image
						source = {Appointees}
						resizeMode = {"stretch"}
						style = {{
							width: 77,
							height: 75,
						}}
					/>
					</TouchableOpacity>
				</View>
				<View 
					style = {{
						flexDirection: "row",
						alignItems: "center",
						marginHorizontal: 21,
					}}>
					<Text 
						style = {{
							color: "#000000",
							fontSize: 16,
							marginRight: 4,
							flex: 1,
						}}>
						{"Skill Appraisal"}
					</Text>
					<Text 
						style = {{
							color: "#000000",
							fontSize: 16,
							marginRight: 38,
						}}>
						{typeOfUser==="student"?`Upload CV`:`Download CV`}
					</Text>
					<Text 
						style = {{
							color: "#000000",
							fontSize: 16,
						}}>
						{"Appointees"}
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
		
    )
}