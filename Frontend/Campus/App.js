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
import AddIntern from './Screens/Internship/AddIntern';
import SkillAppraisal from './Screens/Skill Appraisal/SkillAppraisal';
import Appointees from './Screens/Appointees/Appointees';

import Arithmetic from './Screens/QuestionPage/Arithmetic';
import Interpretation from './Screens/QuestionPage/Interpretation';
import Verbal from './Screens/QuestionPage/Verbal';
import Logical from './Screens/QuestionPage/Logical';
import StudentScore from './Screens/QuestionPage/StudentScore';
import AddEvent from './Screens/EventPlanner/AddEvent';
import AddAppointess from './Screens/Appointees/AddAppointess';

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
        <Stack.Screen name='addInternship' component={AddIntern} options={{headerShown:false}} />
        <Stack.Screen name='skill' component={SkillAppraisal} options={{headerShown:false}} />
        <Stack.Screen name='appointees' component={Appointees} options={{headerShown:false}} />
        <Stack.Screen name='arithmetic' component={Arithmetic} options={{headerShown:false}} />
        <Stack.Screen name='interpretation' component={Interpretation} options={{headerShown:false}} />
        <Stack.Screen name='verbal' component={Verbal} options={{headerShown:false}} />
        <Stack.Screen name='logical' component={Logical} options={{headerShown:false}} />
        <Stack.Screen name='studentscore' component={StudentScore} options={{headerShown:false}} />
        <Stack.Screen name='addevent' component={AddEvent} options={{headerShown:false}} />
        <Stack.Screen name='addappointess' component={AddAppointess} options={{headerShown:false}} />
            
      </Stack.Navigator>
    </NavigationContainer>
  );
}


