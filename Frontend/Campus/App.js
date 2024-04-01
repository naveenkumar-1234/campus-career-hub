import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from './Screens/UserSelectionPage/Home';
import  Login  from './Screens/LoginPage/LoginPage';
import  HomeScreen  from './Screens/AppPage/HomeScreen';
import SignUp from './Screens/SignupPage/Signup'
import UploadCv from './Screens/UploadCV/UploadCv';
import DownloadCV from './Screens/DownloadCV/DownloadCV';
import Notice from './Screens/NoticePage/Notice';
import InternShip from './Screens/Internship/InternShip';
import EventPlanner from './Screens/EventPlanner/EventPlanner';
import AddNotice from './Screens/NoticePage/AddNotice';
// import AddIntern from './Screens/Internship/addIntern';
import SkillAppraisal from './Screens/Skill Appraisal/SkillAppraisal';
import Appointees from './Screens/Appointees/Appointees';

const Stack =createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}} />
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
        <Stack.Screen name='Signup' component={SignUp} options={{headerShown:false}} />
        <Stack.Screen name='frontscreen' component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name='UploadCv' component={UploadCv} options={{headerShown:false}} />
        <Stack.Screen name='DownloadCV' component={DownloadCV} options={{headerShown:false}} />
        <Stack.Screen name='Notice' component={Notice} options={{headerShown:false}} />
        <Stack.Screen name='Internship' component={InternShip} options={{headerShown:false}} />
        <Stack.Screen name='Eventplanner' component={EventPlanner} options={{headerShown:false}} />
        <Stack.Screen name='addNotice' component={AddNotice} options={{headerShown:false}} />
        {/* <Stack.Screen name='addInternship' component={AddIntern} options={{headerShown:false}} /> */}
        <Stack.Screen name='skill' component={SkillAppraisal} options={{headerShown:false}} />
        <Stack.Screen name='appointees' component={Appointees} options={{headerShown:false}} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


